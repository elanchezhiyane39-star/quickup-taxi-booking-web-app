# 🚗 QuickUp - Full-Stack Taxi Booking Application

## ✨ Project Overview

QuickUp is a comprehensive, modern taxi booking platform built with **Next.js 15**, **TypeScript**, **Tailwind CSS**, and **Drizzle ORM**. The application features real-time GPS tracking, Google Maps integration, multi-role authentication, and a beautiful responsive UI with light/dark theme support.

---

## 🎯 Features Implemented

### 👤 User Side (Customer)
- ✅ **Authentication System**
  - Email/Password login and registration
  - Better-auth integration with session management
  - Protected routes with middleware
  - Demo account: `customer1@quickup.com` / `password123`

- ✅ **Booking System**
  - Live GPS location detection
  - Google Maps integration with route visualization
  - Pickup and dropoff location selection with geocoding
  - Real-time fare estimation based on distance
  - Multiple vehicle types (Mini, Sedan, SUV, Auto)
  - Multiple payment options (Cash, UPI, Card, Wallet)
  - Instant booking confirmation

- ✅ **Trip Management**
  - Complete trip history with all bookings
  - Status tracking (Pending, In Progress, Completed, Cancelled)
  - Booking details with pickup/dropoff locations
  - Payment information and receipts
  - Trip ratings and feedback system

- ✅ **Profile Management**
  - View and edit personal information
  - Profile picture placeholder
  - Account settings
  - Sign out functionality

### 🚙 Driver Side
- ✅ **Driver Dashboard**
  - Online/Offline availability toggle
  - Real-time earnings display
  - Total trips and rating statistics
  - Vehicle information display

- ✅ **Ride Management**
  - View pending ride requests
  - Accept/Reject booking requests
  - Pickup and dropoff location details
  - Fare information
  - Customer details

- ✅ **Performance Tracking**
  - Total earnings overview
  - Trip history
  - Customer ratings and reviews
  - Performance metrics

### 🛡️ Admin Panel
- ✅ **Dashboard Overview**
  - Total revenue statistics
  - Active rides count
  - Total users and drivers
  - Total bookings

- ✅ **User Management**
  - View all customers
  - Customer details and registration dates
  - User activity tracking

- ✅ **Driver Management**
  - View all registered drivers
  - Driver status (Online/Offline)
  - Vehicle information
  - Ratings and earnings
  - Trip count

- ✅ **Booking Management**
  - View all bookings across the platform
  - Filter by status
  - Booking details and revenue tracking
  - Payment status monitoring

### 🎨 UI/UX Features
- ✅ **Modern Design**
  - Beautiful gradient color scheme (Purple/Blue theme)
  - Smooth animations and transitions
  - 3D animated car moving on road (homepage)
  - Floating animations and pulse effects
  - Glass morphism navigation bar

- ✅ **Responsive Design**
  - Mobile-first approach
  - Tablet and desktop optimized
  - Flexible grid layouts
  - Adaptive components

- ✅ **Theme Support**
  - Light and Dark mode toggle
  - System preference detection
  - Persistent theme selection
  - Smooth theme transitions

---

## 🗄️ Database Schema

### Tables Created:
1. **users** - User accounts (customers, drivers, admins)
2. **driver_details** - Driver profiles and vehicle information
3. **bookings** - Ride booking records
4. **ratings** - Customer feedback and ratings
5. **payments** - Payment transactions
6. **promo_codes** - Discount codes and offers
7. **Auth tables** - Better-auth session management

### Sample Data:
- 21 users (3 admins, 10 customers, 8 drivers)
- 8 drivers with realistic vehicle details
- 25 bookings with various statuses
- 15 ratings and reviews
- 20 payment records
- 5 active promo codes

---

## 🚀 API Endpoints

### Authentication
- `POST /api/auth/sign-in` - User login
- `POST /api/auth/sign-up` - User registration
- `POST /api/auth/sign-out` - User logout
- `GET /api/auth/session` - Get current session

### Users
- `GET /api/users` - Get all users (with filters)
- `GET /api/users?id={id}` - Get user by ID
- `GET /api/users?email={email}` - Get user by email
- `GET /api/users?role={role}` - Get users by role
- `POST /api/users` - Create new user
- `PUT /api/users` - Update user

### Bookings
- `GET /api/bookings` - Get all bookings
- `GET /api/bookings?customerId={id}` - Get customer bookings
- `GET /api/bookings?driverId={id}` - Get driver bookings
- `GET /api/bookings?status={status}` - Get bookings by status
- `POST /api/bookings` - Create new booking
- `PUT /api/bookings/{id}` - Update booking
- `DELETE /api/bookings/{id}` - Cancel booking

### Drivers
- `GET /api/drivers` - Get all drivers
- `GET /api/drivers?userId={id}` - Get driver by user ID
- `GET /api/drivers?available=true` - Get available drivers
- `POST /api/drivers` - Update driver availability

### Ratings
- `GET /api/ratings` - Get all ratings
- `GET /api/ratings?bookingId={id}` - Get rating for booking
- `GET /api/ratings?driverId={id}` - Get driver ratings
- `POST /api/ratings` - Create new rating

### Payments
- `GET /api/payments` - Get all payments
- `GET /api/payments?bookingId={id}` - Get payment for booking
- `POST /api/payments` - Process payment

### Promo Codes
- `GET /api/promo-codes` - Get active promo codes
- `GET /api/promo-codes?code={code}` - Validate promo code

---

## 📱 Pages & Routes

### Public Pages
- `/` - Homepage with hero section and features
- `/login` - Login and registration page

### Customer Pages (Protected)
- `/booking` - Book a new ride with Google Maps
- `/trip-history` - View all past and current bookings
- `/profile` - Manage profile settings

### Driver Pages (Protected)
- `/driver` - Driver dashboard with ride requests

### Admin Pages (Protected)
- `/admin` - Admin dashboard with analytics

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Shadcn/UI
- **State Management**: React Hooks
- **Maps**: Google Maps API (@react-google-maps/api)
- **Theme**: next-themes
- **Notifications**: Sonner (Toast)
- **Icons**: Lucide React
- **Animations**: Framer Motion

### Backend
- **API Routes**: Next.js API Routes
- **Database**: Turso (SQLite)
- **ORM**: Drizzle ORM
- **Authentication**: Better-auth
- **Validation**: Zod (via Drizzle)

### Development
- **Package Manager**: Bun
- **Runtime**: Node.js
- **Linting**: ESLint
- **TypeScript**: Type checking

---

## 🎨 Color Scheme

### Light Mode
- Primary: Purple (`oklch(0.55 0.25 265)`)
- Accent: Cyan (`oklch(0.88 0.15 180)`)
- Background: Light Gray
- Card: White

### Dark Mode
- Primary: Light Purple (`oklch(0.65 0.28 265)`)
- Accent: Teal (`oklch(0.45 0.2 180)`)
- Background: Dark Blue-Gray
- Card: Dark Purple-Gray

---

## 📋 How to Use

### For Customers:
1. **Sign Up/Login**: Create an account or use demo: `customer1@quickup.com`
2. **Book a Ride**: 
   - Go to `/booking`
   - Enter pickup location (or use current location)
   - Enter dropoff location
   - Select vehicle type
   - Choose payment method
   - View fare estimate
   - Click "Book Ride"
3. **Track Booking**: View real-time status in trip history
4. **Rate Driver**: After ride completion, rate your experience

### For Drivers:
1. **Login**: Use driver account: `driver1@quickup.com`
2. **Go Online**: Toggle availability switch in dashboard
3. **Accept Rides**: View pending requests and accept/reject
4. **Complete Trip**: Navigate to pickup, complete the ride
5. **View Earnings**: Track your earnings in dashboard

### For Admins:
1. **Login**: Use admin account: `admin1@quickup.com`
2. **Monitor Platform**: View all statistics and metrics
3. **Manage Users**: View and manage customers
4. **Manage Drivers**: Monitor driver performance
5. **Track Bookings**: View all platform bookings

---

## 🔑 Demo Accounts

### Customer
- Email: `customer1@quickup.com`
- Password: `password123`

### Driver
- Email: `driver1@quickup.com`
- Password: `password123`

### Admin
- Email: `admin1@quickup.com`
- Password: `password123`

---

## 🌟 Key Highlights

1. **Real-time Google Maps Integration**: Live location tracking, route visualization, and distance calculation
2. **Dynamic Fare Calculation**: Automatic fare estimation based on distance and vehicle type
3. **Multi-Role System**: Separate interfaces for customers, drivers, and admins
4. **Comprehensive API**: RESTful API with full CRUD operations
5. **Beautiful UI**: Modern design with animations and theme support
6. **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
7. **Database Integration**: Complete backend with seeded data
8. **Authentication**: Secure auth system with session management
9. **Type Safety**: Full TypeScript implementation

---

## 🚀 Future Enhancements (Recommended)

- Real-time WebSocket for live ride tracking
- Push notifications for booking updates
- In-app chat between driver and customer
- Payment gateway integration (Stripe/Razorpay)
- Email notifications
- SMS OTP verification
- Driver route navigation
- Ride scheduling (pre-booking)
- Ride sharing/pooling
- Multi-language support
- Mobile app (React Native)
- AI-based driver matching
- Dynamic pricing with surge pricing

---

## 📝 Notes

- Google Maps API key is included (demo key with restrictions)
- Database is hosted on Turso (serverless SQLite)
- Authentication uses Better-auth with bearer tokens
- All API routes are functional and tested
- Sample data is pre-populated for testing

---

## 🎉 Application Status

✅ **FULLY FUNCTIONAL** - All core features implemented and working!

The QuickUp taxi booking application is ready for demonstration and further development. All pages are responsive, APIs are connected, and the database is populated with realistic sample data.

**Happy Riding! 🚗💨**
