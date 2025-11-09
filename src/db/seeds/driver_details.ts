import { db } from '@/db';
import { driverDetails } from '@/db/schema';

async function main() {
    const sampleDriverDetails = [
        {
            userId: 12,
            vehicleType: 'mini',
            vehicleNumber: 'MH02AB1234',
            vehicleModel: 'Maruti Swift',
            licenseNumber: 'MH-0520110012345',
            rating: 4.7,
            totalTrips: 342,
            isAvailable: true,
            earningsTotal: 45600.50,
            currentLat: 19.0760,
            currentLng: 72.8777,
        },
        {
            userId: 13,
            vehicleType: 'mini',
            vehicleNumber: 'DL01CD5678',
            vehicleModel: 'Hyundai i10',
            licenseNumber: 'DL-1320110067890',
            rating: 4.5,
            totalTrips: 289,
            isAvailable: true,
            earningsTotal: 38400.75,
            currentLat: 28.6139,
            currentLng: 77.2090,
        },
        {
            userId: 14,
            vehicleType: 'sedan',
            vehicleNumber: 'KA03EF9012',
            vehicleModel: 'Honda City',
            licenseNumber: 'KA-0320110098765',
            rating: 4.9,
            totalTrips: 567,
            isAvailable: true,
            earningsTotal: 78900.25,
            currentLat: 12.9716,
            currentLng: 77.5946,
        },
        {
            userId: 15,
            vehicleType: 'sedan',
            vehicleNumber: 'MH12GH3456',
            vehicleModel: 'Maruti Dzire',
            licenseNumber: 'MH-1220110054321',
            rating: 4.6,
            totalTrips: 423,
            isAvailable: false,
            earningsTotal: 56700.00,
            currentLat: 19.0760,
            currentLng: 72.8777,
        },
        {
            userId: 16,
            vehicleType: 'sedan',
            vehicleNumber: 'TN09IJ7890',
            vehicleModel: 'Hyundai Verna',
            licenseNumber: 'TN-0920110087654',
            rating: 4.8,
            totalTrips: 501,
            isAvailable: true,
            earningsTotal: 68500.50,
            currentLat: 13.0827,
            currentLng: 80.2707,
        },
        {
            userId: 17,
            vehicleType: 'suv',
            vehicleNumber: 'KA05KL2345',
            vehicleModel: 'Toyota Innova Crysta',
            licenseNumber: 'KA-0520110076543',
            rating: 5.0,
            totalTrips: 234,
            isAvailable: true,
            earningsTotal: 85000.00,
            currentLat: 12.9716,
            currentLng: 77.5946,
        },
        {
            userId: 18,
            vehicleType: 'suv',
            vehicleNumber: 'DL08MN6789',
            vehicleModel: 'Mahindra Scorpio',
            licenseNumber: 'DL-0820110065432',
            rating: 4.4,
            totalTrips: 189,
            isAvailable: false,
            earningsTotal: 52300.75,
            currentLat: 28.6139,
            currentLng: 77.2090,
        },
        {
            userId: 19,
            vehicleType: 'auto',
            vehicleNumber: 'MH14OP1234',
            vehicleModel: 'Bajaj Auto Rickshaw',
            licenseNumber: 'MH-1420110054321',
            rating: 4.2,
            totalTrips: 850,
            isAvailable: false,
            earningsTotal: 42500.25,
            currentLat: 19.0760,
            currentLng: 72.8777,
        },
    ];

    await db.insert(driverDetails).values(sampleDriverDetails);
    
    console.log('✅ Driver details seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});