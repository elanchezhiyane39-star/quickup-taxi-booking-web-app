import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { driverDetails, users } from '@/db/schema';
import { eq } from 'drizzle-orm';

// GET all drivers or filter by availability
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const available = searchParams.get('available');
    const userId = searchParams.get('userId');

    if (userId) {
      const driver = await db
        .select({
          id: driverDetails.id,
          userId: driverDetails.userId,
          vehicleType: driverDetails.vehicleType,
          vehicleNumber: driverDetails.vehicleNumber,
          vehicleModel: driverDetails.vehicleModel,
          licenseNumber: driverDetails.licenseNumber,
          rating: driverDetails.rating,
          totalTrips: driverDetails.totalTrips,
          isAvailable: driverDetails.isAvailable,
          earningsTotal: driverDetails.earningsTotal,
          currentLat: driverDetails.currentLat,
          currentLng: driverDetails.currentLng,
          name: users.name,
          email: users.email,
          phone: users.phone,
          profileImage: users.profileImage,
        })
        .from(driverDetails)
        .leftJoin(users, eq(driverDetails.userId, users.id))
        .where(eq(driverDetails.userId, parseInt(userId)));

      if (driver.length === 0) {
        return NextResponse.json({ error: 'Driver not found' }, { status: 404 });
      }

      return NextResponse.json(driver[0]);
    }

    let query = db
      .select({
        id: driverDetails.id,
        userId: driverDetails.userId,
        vehicleType: driverDetails.vehicleType,
        vehicleNumber: driverDetails.vehicleNumber,
        vehicleModel: driverDetails.vehicleModel,
        licenseNumber: driverDetails.licenseNumber,
        rating: driverDetails.rating,
        totalTrips: driverDetails.totalTrips,
        isAvailable: driverDetails.isAvailable,
        earningsTotal: driverDetails.earningsTotal,
        currentLat: driverDetails.currentLat,
        currentLng: driverDetails.currentLng,
        name: users.name,
        email: users.email,
        phone: users.phone,
        profileImage: users.profileImage,
      })
      .from(driverDetails)
      .leftJoin(users, eq(driverDetails.userId, users.id));

    if (available === 'true') {
      query = query.where(eq(driverDetails.isAvailable, true));
    }

    const drivers = await query;
    return NextResponse.json(drivers);
  } catch (error) {
    console.error('Error fetching drivers:', error);
    return NextResponse.json({ error: 'Failed to fetch drivers' }, { status: 500 });
  }
}

// POST update driver availability
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, isAvailable, currentLat, currentLng } = body;

    const updated = await db
      .update(driverDetails)
      .set({ 
        isAvailable,
        ...(currentLat && { currentLat }),
        ...(currentLng && { currentLng })
      })
      .where(eq(driverDetails.userId, userId))
      .returning();

    return NextResponse.json(updated[0]);
  } catch (error) {
    console.error('Error updating driver:', error);
    return NextResponse.json({ error: 'Failed to update driver' }, { status: 500 });
  }
}
