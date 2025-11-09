import { db } from '@/db';
import { payments } from '@/db/schema';

async function main() {
    const samplePayments = [
        // Completed bookings payments (1-12)
        {
            bookingId: 1,
            amount: 245.50,
            paymentMethod: 'upi',
            transactionId: 'UPI20240115123456',
            status: 'completed',
            createdAt: new Date('2024-01-15T09:35:00Z').toISOString(),
        },
        {
            bookingId: 2,
            amount: 180.00,
            paymentMethod: 'cash',
            transactionId: null,
            status: 'completed',
            createdAt: new Date('2024-01-16T14:50:00Z').toISOString(),
        },
        {
            bookingId: 3,
            amount: 520.75,
            paymentMethod: 'card',
            transactionId: 'CARD20240117234567',
            status: 'completed',
            createdAt: new Date('2024-01-17T18:25:00Z').toISOString(),
        },
        {
            bookingId: 4,
            amount: 310.25,
            paymentMethod: 'wallet',
            transactionId: 'WALLET20240118345678',
            status: 'completed',
            createdAt: new Date('2024-01-18T11:40:00Z').toISOString(),
        },
        {
            bookingId: 5,
            amount: 420.00,
            paymentMethod: 'upi',
            transactionId: 'UPI20240119456789',
            status: 'completed',
            createdAt: new Date('2024-01-19T16:55:00Z').toISOString(),
        },
        {
            bookingId: 6,
            amount: 195.50,
            paymentMethod: 'cash',
            transactionId: null,
            status: 'completed',
            createdAt: new Date('2024-01-20T10:20:00Z').toISOString(),
        },
        {
            bookingId: 7,
            amount: 680.00,
            paymentMethod: 'card',
            transactionId: 'CARD20240121567890',
            status: 'completed',
            createdAt: new Date('2024-01-21T19:45:00Z').toISOString(),
        },
        {
            bookingId: 8,
            amount: 275.75,
            paymentMethod: 'upi',
            transactionId: 'UPI20240122678901',
            status: 'completed',
            createdAt: new Date('2024-01-22T13:30:00Z').toISOString(),
        },
        {
            bookingId: 9,
            amount: 540.25,
            paymentMethod: 'wallet',
            transactionId: 'WALLET20240123789012',
            status: 'completed',
            createdAt: new Date('2024-01-23T17:15:00Z').toISOString(),
        },
        {
            bookingId: 10,
            amount: 230.00,
            paymentMethod: 'cash',
            transactionId: null,
            status: 'completed',
            createdAt: new Date('2024-01-24T12:05:00Z').toISOString(),
        },
        {
            bookingId: 11,
            amount: 395.50,
            paymentMethod: 'card',
            transactionId: 'CARD20240125890123',
            status: 'completed',
            createdAt: new Date('2024-01-25T15:50:00Z').toISOString(),
        },
        {
            bookingId: 12,
            amount: 460.75,
            paymentMethod: 'upi',
            transactionId: 'UPI20240126901234',
            status: 'completed',
            createdAt: new Date('2024-01-26T20:25:00Z').toISOString(),
        },
        // In progress bookings payments (13-17)
        {
            bookingId: 13,
            amount: 285.00,
            paymentMethod: 'cash',
            transactionId: null,
            status: 'pending',
            createdAt: new Date('2024-01-27T09:05:00Z').toISOString(),
        },
        {
            bookingId: 14,
            amount: 620.50,
            paymentMethod: 'upi',
            transactionId: 'UPI20240127012345',
            status: 'pending',
            createdAt: new Date('2024-01-27T10:25:00Z').toISOString(),
        },
        {
            bookingId: 15,
            amount: 340.25,
            paymentMethod: 'card',
            transactionId: 'CARD20240127123456',
            status: 'pending',
            createdAt: new Date('2024-01-27T11:45:00Z').toISOString(),
        },
        {
            bookingId: 16,
            amount: 495.00,
            paymentMethod: 'wallet',
            transactionId: 'WALLET20240127234567',
            status: 'pending',
            createdAt: new Date('2024-01-27T13:05:00Z').toISOString(),
        },
        {
            bookingId: 17,
            amount: 215.75,
            paymentMethod: 'upi',
            transactionId: 'UPI20240127345678',
            status: 'pending',
            createdAt: new Date('2024-01-27T14:25:00Z').toISOString(),
        },
        // Cancelled bookings payments (22-24)
        {
            bookingId: 22,
            amount: 320.00,
            paymentMethod: 'card',
            transactionId: 'CARD20240127456789',
            status: 'failed',
            createdAt: new Date('2024-01-27T17:05:00Z').toISOString(),
        },
        {
            bookingId: 23,
            amount: 185.50,
            paymentMethod: 'wallet',
            transactionId: 'WALLET20240127567890',
            status: 'failed',
            createdAt: new Date('2024-01-27T18:35:00Z').toISOString(),
        },
        {
            bookingId: 24,
            amount: 450.25,
            paymentMethod: 'upi',
            transactionId: 'UPI20240127678901',
            status: 'failed',
            createdAt: new Date('2024-01-27T19:55:00Z').toISOString(),
        },
    ];

    await db.insert(payments).values(samplePayments);
    
    console.log('✅ Payments seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});