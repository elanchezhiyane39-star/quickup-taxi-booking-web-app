import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { payments, bookings } from '@/db/schema';
import { eq } from 'drizzle-orm';

// GET payments
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const bookingId = searchParams.get('bookingId');

    if (bookingId) {
      const payment = await db
        .select()
        .from(payments)
        .where(eq(payments.bookingId, parseInt(bookingId)));
      return NextResponse.json(payment);
    }

    const allPayments = await db.select().from(payments);
    return NextResponse.json(allPayments);
  } catch (error) {
    console.error('Error fetching payments:', error);
    return NextResponse.json({ error: 'Failed to fetch payments' }, { status: 500 });
  }
}

// POST process payment
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { bookingId, amount, paymentMethod, transactionId } = body;

    // Update payment status
    const updatedPayment = await db
      .update(payments)
      .set({
        status: 'completed',
        transactionId: transactionId || `TXN${Date.now()}`,
      })
      .where(eq(payments.bookingId, bookingId))
      .returning();

    // Update booking payment status
    await db
      .update(bookings)
      .set({ paymentStatus: 'completed' })
      .where(eq(bookings.id, bookingId));

    return NextResponse.json(updatedPayment[0]);
  } catch (error) {
    console.error('Error processing payment:', error);
    return NextResponse.json({ error: 'Failed to process payment' }, { status: 500 });
  }
}
