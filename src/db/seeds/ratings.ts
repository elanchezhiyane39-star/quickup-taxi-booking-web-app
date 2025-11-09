import { db } from '@/db';
import { ratings } from '@/db/schema';

async function main() {
    const sampleRatings = [
        {
            bookingId: 3,
            customerId: 6,
            driverId: 14,
            rating: 5,
            feedback: 'Excellent service! Driver was very professional and punctual.',
            createdAt: new Date('2024-01-15T15:35:00').toISOString(),
        },
        {
            bookingId: 7,
            customerId: 10,
            driverId: 18,
            rating: 5,
            feedback: 'Great ride, clean car and smooth driving.',
            createdAt: new Date('2024-01-16T12:25:00').toISOString(),
        },
        {
            bookingId: 11,
            customerId: 8,
            driverId: 16,
            rating: 5,
            feedback: 'Best taxi experience ever!',
            createdAt: new Date('2024-01-17T19:10:00').toISOString(),
        },
        {
            bookingId: 1,
            customerId: 4,
            driverId: 12,
            rating: 4,
            feedback: 'Good service, driver was polite but took a longer route.',
            createdAt: new Date('2024-01-15T11:05:00').toISOString(),
        },
        {
            bookingId: 2,
            customerId: 5,
            driverId: 13,
            rating: 4,
            feedback: 'Nice ride, would recommend.',
            createdAt: new Date('2024-01-15T14:50:00').toISOString(),
        },
        {
            bookingId: 4,
            customerId: 7,
            driverId: 15,
            rating: 4,
            feedback: 'Driver was friendly, AC was good.',
            createdAt: new Date('2024-01-15T17:35:00').toISOString(),
        },
        {
            bookingId: 5,
            customerId: 8,
            driverId: 16,
            rating: 4,
            feedback: 'Comfortable journey, slightly late pickup.',
            createdAt: new Date('2024-01-16T09:55:00').toISOString(),
        },
        {
            bookingId: 6,
            customerId: 9,
            driverId: 17,
            rating: 4,
            feedback: 'Overall good experience.',
            createdAt: new Date('2024-01-16T11:20:00').toISOString(),
        },
        {
            bookingId: 8,
            customerId: 11,
            driverId: 19,
            rating: 4,
            feedback: 'Decent service, car was clean.',
            createdAt: new Date('2024-01-16T15:45:00').toISOString(),
        },
        {
            bookingId: 9,
            customerId: 12,
            driverId: 12,
            rating: 4,
            feedback: 'Good driver, safe journey.',
            createdAt: new Date('2024-01-17T10:15:00').toISOString(),
        },
        {
            bookingId: 10,
            customerId: 13,
            driverId: 15,
            rating: 3,
            feedback: 'Average experience, car needs better maintenance.',
            createdAt: new Date('2024-01-17T14:40:00').toISOString(),
        },
        {
            bookingId: 12,
            customerId: 5,
            driverId: 13,
            rating: 3,
            feedback: 'Driver was okay but music was too loud.',
            createdAt: new Date('2024-01-17T21:55:00').toISOString(),
        },
        {
            bookingId: 3,
            customerId: 6,
            driverId: 14,
            rating: 3,
            feedback: 'Acceptable ride, nothing special.',
            createdAt: new Date('2024-01-18T08:20:00').toISOString(),
        },
        {
            bookingId: 7,
            customerId: 10,
            driverId: 18,
            rating: 3,
            feedback: 'Service was fine but driver seemed in a hurry.',
            createdAt: new Date('2024-01-18T13:10:00').toISOString(),
        },
        {
            bookingId: 4,
            customerId: 7,
            driverId: 15,
            rating: 3,
            feedback: 'Car was not very clean, but reached on time.',
            createdAt: new Date('2024-01-18T16:45:00').toISOString(),
        },
    ];

    await db.insert(ratings).values(sampleRatings);
    
    console.log('✅ Ratings seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});