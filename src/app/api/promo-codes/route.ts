import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { promoCodes } from '@/db/schema';
import { eq } from 'drizzle-orm';

// GET promo codes
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get('code');

    if (code) {
      const promo = await db
        .select()
        .from(promoCodes)
        .where(eq(promoCodes.code, code.toUpperCase()));

      if (promo.length === 0) {
        return NextResponse.json({ error: 'Promo code not found' }, { status: 404 });
      }

      // Check if promo is valid
      const now = new Date();
      const validFrom = new Date(promo[0].validFrom);
      const validUntil = new Date(promo[0].validUntil);

      if (!promo[0].isActive || now < validFrom || now > validUntil) {
        return NextResponse.json({ error: 'Promo code expired or inactive' }, { status: 400 });
      }

      return NextResponse.json(promo[0]);
    }

    const allPromos = await db.select().from(promoCodes).where(eq(promoCodes.isActive, true));
    return NextResponse.json(allPromos);
  } catch (error) {
    console.error('Error fetching promo codes:', error);
    return NextResponse.json({ error: 'Failed to fetch promo codes' }, { status: 500 });
  }
}
