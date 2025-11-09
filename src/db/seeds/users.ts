import { db } from '@/db';
import { users } from '@/db/schema';

async function main() {
    const now = new Date();
    const daysAgo = (days: number) => new Date(now.getTime() - days * 24 * 60 * 60 * 1000).toISOString();

    const sampleUsers = [
        // Admin Users (3)
        {
            email: 'admin1@quickup.com',
            name: 'Admin Kumar',
            phone: '+919876543210',
            role: 'admin',
            profileImage: null,
            createdAt: daysAgo(60),
            updatedAt: daysAgo(60),
        },
        {
            email: 'admin2@quickup.com',
            name: 'Sarah Admin',
            phone: '+919876543211',
            role: 'admin',
            profileImage: null,
            createdAt: daysAgo(60),
            updatedAt: daysAgo(60),
        },
        {
            email: 'admin3@quickup.com',
            name: 'Michael Admin',
            phone: '+919876543212',
            role: 'admin',
            profileImage: null,
            createdAt: daysAgo(60),
            updatedAt: daysAgo(60),
        },
        // Customer Users (10)
        {
            email: 'customer1@quickup.com',
            name: 'Rajesh Kumar',
            phone: '+919823456789',
            role: 'customer',
            profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=RajeshKumar',
            createdAt: daysAgo(45),
            updatedAt: daysAgo(45),
        },
        {
            email: 'customer2@quickup.com',
            name: 'Priya Sharma',
            phone: '+919734567890',
            role: 'customer',
            profileImage: null,
            createdAt: daysAgo(42),
            updatedAt: daysAgo(40),
        },
        {
            email: 'customer3@quickup.com',
            name: 'John Smith',
            phone: '+919845678901',
            role: 'customer',
            profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JohnSmith',
            createdAt: daysAgo(38),
            updatedAt: daysAgo(38),
        },
        {
            email: 'customer4@quickup.com',
            name: 'Emily Davis',
            phone: '+919756789012',
            role: 'customer',
            profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=EmilyDavis',
            createdAt: daysAgo(35),
            updatedAt: daysAgo(33),
        },
        {
            email: 'customer5@quickup.com',
            name: 'Amit Patel',
            phone: '+919867890123',
            role: 'customer',
            profileImage: null,
            createdAt: daysAgo(30),
            updatedAt: daysAgo(30),
        },
        {
            email: 'customer6@quickup.com',
            name: 'Sneha Reddy',
            phone: '+919978901234',
            role: 'customer',
            profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SnehaReddy',
            createdAt: daysAgo(28),
            updatedAt: daysAgo(25),
        },
        {
            email: 'customer7@quickup.com',
            name: 'David Lee',
            phone: '+919889012345',
            role: 'customer',
            profileImage: null,
            createdAt: daysAgo(22),
            updatedAt: daysAgo(22),
        },
        {
            email: 'customer8@quickup.com',
            name: 'Anjali Gupta',
            phone: '+919790123456',
            role: 'customer',
            profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AnjaliGupta',
            createdAt: daysAgo(18),
            updatedAt: daysAgo(15),
        },
        {
            email: 'customer9@quickup.com',
            name: 'Robert Wilson',
            phone: '+919801234567',
            role: 'customer',
            profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=RobertWilson',
            createdAt: daysAgo(15),
            updatedAt: daysAgo(15),
        },
        {
            email: 'customer10@quickup.com',
            name: 'Kavita Singh',
            phone: '+919712345678',
            role: 'customer',
            profileImage: null,
            createdAt: daysAgo(10),
            updatedAt: daysAgo(10),
        },
        // Driver Users (8)
        {
            email: 'driver1@quickup.com',
            name: 'Ramesh Singh',
            phone: '+919823456780',
            role: 'driver',
            profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=RameshSingh',
            createdAt: daysAgo(50),
            updatedAt: daysAgo(50),
        },
        {
            email: 'driver2@quickup.com',
            name: 'Vijay Kumar',
            phone: '+919934567891',
            role: 'driver',
            profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=VijayKumar',
            createdAt: daysAgo(48),
            updatedAt: daysAgo(48),
        },
        {
            email: 'driver3@quickup.com',
            name: 'Suresh Reddy',
            phone: '+919845678902',
            role: 'driver',
            profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SureshReddy',
            createdAt: daysAgo(45),
            updatedAt: daysAgo(45),
        },
        {
            email: 'driver4@quickup.com',
            name: 'Karan Mehta',
            phone: '+919756789013',
            role: 'driver',
            profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=KaranMehta',
            createdAt: daysAgo(40),
            updatedAt: daysAgo(40),
        },
        {
            email: 'driver5@quickup.com',
            name: 'Prakash Yadav',
            phone: '+919867890124',
            role: 'driver',
            profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=PrakashYadav',
            createdAt: daysAgo(35),
            updatedAt: daysAgo(35),
        },
        {
            email: 'driver6@quickup.com',
            name: 'Arun Verma',
            phone: '+919978901235',
            role: 'driver',
            profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ArunVerma',
            createdAt: daysAgo(30),
            updatedAt: daysAgo(30),
        },
        {
            email: 'driver7@quickup.com',
            name: 'Sanjay Joshi',
            phone: '+919889012346',
            role: 'driver',
            profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SanjayJoshi',
            createdAt: daysAgo(25),
            updatedAt: daysAgo(25),
        },
        {
            email: 'driver8@quickup.com',
            name: 'Ravi Nair',
            phone: '+919790123457',
            role: 'driver',
            profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=RaviNair',
            createdAt: daysAgo(20),
            updatedAt: daysAgo(20),
        },
    ];

    await db.insert(users).values(sampleUsers);
    
    console.log('✅ Users seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});