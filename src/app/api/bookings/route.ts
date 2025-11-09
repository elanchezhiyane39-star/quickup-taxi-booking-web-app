import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { bookings, users, driverDetails, payments } from '@/db/schema';
import { eq, and, desc } from 'drizzle-orm';

// GET all bookings or filter by user
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const customerId = searchParams.get('customerId');
    const driverId = searchParams.get('driverId');
    const status = searchParams.get('status');

    let query = db.select().from(bookings);

    if (customerId) {
      const allBookings = await db
        .select()
        .from(bookings)
        .where(eq(bookings.customerId, parseInt(customerId)))
        .orderBy(desc(bookings.bookingTime));
      return NextResponse.json(allBookings);
    }

    if (driverId) {
      const allBookings = await db
        .select()
        .from(bookings)
        .where(eq(bookings.driverId, parseInt(driverId)))
        .orderBy(desc(bookings.bookingTime));
      return NextResponse.json(allBookings);
    }

    if (status) {
      const allBookings = await db
        .select()
        .from(bookings)
        .where(eq(bookings.status, status))
        .orderBy(desc(bookings.bookingTime));
      return NextResponse.json(allBookings);
    }

    const allBookings = await db.select().from(bookings).orderBy(desc(bookings.bookingTime));
    return NextResponse.json(allBookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
  }
}

// POST create new booking
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      customerId,
      pickupLocation,
      pickupLat,
      pickupLng,
      dropoffLocation,
      dropoffLat,
      dropoffLng,
      vehicleType,
      fareEstimate,
      paymentMethod,
    } = body;

    // Create booking
    const newBooking = await db
      .insert(bookings)
      .values({
        customerId,
        pickupLocation,
        pickupLat,
        pickupLng,
        dropoffLocation,
        dropoffLat,
        dropoffLng,
        vehicleType,
        status: 'pending',
        fareEstimate,
        paymentMethod,
        paymentStatus: 'pending',
        bookingTime: new Date().toISOString(),
      })
      .returning();

    // Create payment record
    await db.insert(payments).values({
      bookingId: newBooking[0].id,
      amount: fareEstimate,
      paymentMethod,
      status: 'pending',
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json(newBooking[0], { status: 201 });
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
  }
}
