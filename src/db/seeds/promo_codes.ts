import { db } from '@/db';
import { promoCodes } from '@/db/schema';

async function main() {
    const now = new Date();
    
    const samplePromoCodes = [
        {
            code: 'QUICKUP20',
            discountPercentage: 20,
            maxDiscount: 10.0,
            validFrom: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString(),
            validUntil: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            isActive: true,
        },
        {
            code: 'FIRST50',
            discountPercentage: 50,
            maxDiscount: 25.0,
            validFrom: new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000).toISOString(),
            validUntil: new Date(now.getTime() + 60 * 24 * 60 * 60 * 1000).toISOString(),
            isActive: true,
        },
        {
            code: 'WEEKEND15',
            discountPercentage: 15,
            maxDiscount: 8.0,
            validFrom: new Date(now.getTime() - 15 * 24 * 60 * 60 * 1000).toISOString(),
            validUntil: new Date(now.getTime() + 15 * 24 * 60 * 60 * 1000).toISOString(),
            isActive: true,
        },
        {
            code: 'SAVE30',
            discountPercentage: 30,
            maxDiscount: 15.0,
            validFrom: new Date(now.getTime() - 20 * 24 * 60 * 60 * 1000).toISOString(),
            validUntil: new Date(now.getTime() + 45 * 24 * 60 * 60 * 1000).toISOString(),
            isActive: true,
        },
        {
            code: 'NEWUSER100',
            discountPercentage: 100,
            maxDiscount: 50.0,
            validFrom: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString(),
            validUntil: new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000).toISOString(),
            isActive: true,
        }
    ];

    await db.insert(promoCodes).values(samplePromoCodes);
    
    console.log('✅ Promo codes seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});