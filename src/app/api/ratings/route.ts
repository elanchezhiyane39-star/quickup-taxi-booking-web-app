import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { ratings, driverDetails } from '@/db/schema';
import { eq, avg } from 'drizzle-orm';

// GET ratings
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const bookingId = searchParams.get('bookingId');
    const driverId = searchParams.get('driverId');

    if (bookingId) {
      const rating = await db
        .select()
        .from(ratings)
        .where(eq(ratings.bookingId, parseInt(bookingId)));
      return NextResponse.json(rating);
    }

    if (driverId) {
      const driverRatings = await db
        .select()
        .from(ratings)
        .where(eq(ratings.driverId, parseInt(driverId)));
      return NextResponse.json(driverRatings);
    }

    const allRatings = await db.select().from(ratings);
    return NextResponse.json(allRatings);
  } catch (error) {
    console.error('Error fetching ratings:', error);
    return NextResponse.json({ error: 'Failed to fetch ratings' }, { status: 500 });
  }
}

// POST create rating
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { bookingId, customerId, driverId, rating, feedback } = body;

    // Create rating
    const newRating = await db
      .insert(ratings)
      .values({
        bookingId,
        customerId,
        driverId,
        rating,
        feedback,
        createdAt: new Date().toISOString(),
      })
      .returning();

    // Update driver's average rating
    const driverRatings = await db
      .select({ rating: ratings.rating })
      .from(ratings)
      .where(eq(ratings.driverId, driverId));

    const avgRating = driverRatings.reduce((sum, r) => sum + r.rating, 0) / driverRatings.length;

    await db
      .update(driverDetails)
      .set({ rating: avgRating })
      .where(eq(driverDetails.userId, driverId));

    return NextResponse.json(newRating[0], { status: 201 });
  } catch (error) {
    console.error('Error creating rating:', error);
    return NextResponse.json({ error: 'Failed to create rating' }, { status: 500 });
  }
}
