import { sqliteTable, integer, text, real } from 'drizzle-orm/sqlite-core';

// Users table
export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  email: text('email').notNull().unique(),
  phone: text('phone').unique(),
  name: text('name').notNull(),
  role: text('role').notNull(), // 'customer', 'driver', 'admin'
  profileImage: text('profile_image'),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

// Driver details table
export const driverDetails = sqliteTable('driver_details', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id').notNull().references(() => users.id),
  vehicleType: text('vehicle_type').notNull(), // 'mini', 'sedan', 'suv', 'auto'
  vehicleNumber: text('vehicle_number').notNull(),
  vehicleModel: text('vehicle_model').notNull(),
  licenseNumber: text('license_number').notNull(),
  rating: real('rating').notNull().default(5.0),
  totalTrips: integer('total_trips').notNull().default(0),
  isAvailable: integer('is_available', { mode: 'boolean' }).notNull().default(false),
  earningsTotal: real('earnings_total').notNull().default(0),
  currentLat: real('current_lat'),
  currentLng: real('current_lng'),
});

// Bookings table
export const bookings = sqliteTable('bookings', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  customerId: integer('customer_id').notNull().references(() => users.id),
  driverId: integer('driver_id').references(() => users.id),
  pickupLocation: text('pickup_location').notNull(),
  pickupLat: real('pickup_lat').notNull(),
  pickupLng: real('pickup_lng').notNull(),
  dropoffLocation: text('dropoff_location').notNull(),
  dropoffLat: real('dropoff_lat').notNull(),
  dropoffLng: real('dropoff_lng').notNull(),
  vehicleType: text('vehicle_type').notNull(),
  status: text('status').notNull(), // 'pending', 'accepted', 'in_progress', 'completed', 'cancelled'
  fareEstimate: real('fare_estimate').notNull(),
  finalFare: real('final_fare'),
  paymentMethod: text('payment_method').notNull(), // 'cash', 'upi', 'card', 'wallet'
  paymentStatus: text('payment_status').notNull(), // 'pending', 'completed', 'failed'
  bookingTime: text('booking_time').notNull(),
  pickupTime: text('pickup_time'),
  completionTime: text('completion_time'),
});

// Ratings table
export const ratings = sqliteTable('ratings', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  bookingId: integer('booking_id').notNull().references(() => bookings.id),
  customerId: integer('customer_id').notNull().references(() => users.id),
  driverId: integer('driver_id').notNull().references(() => users.id),
  rating: integer('rating').notNull(), // 1-5
  feedback: text('feedback'),
  createdAt: text('created_at').notNull(),
});

// Payments table
export const payments = sqliteTable('payments', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  bookingId: integer('booking_id').notNull().references(() => bookings.id),
  amount: real('amount').notNull(),
  paymentMethod: text('payment_method').notNull(),
  transactionId: text('transaction_id'),
  status: text('status').notNull(), // 'pending', 'completed', 'failed', 'refunded'
  createdAt: text('created_at').notNull(),
});

// Promo codes table
export const promoCodes = sqliteTable('promo_codes', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  code: text('code').notNull().unique(),
  discountPercentage: integer('discount_percentage').notNull(),
  maxDiscount: real('max_discount').notNull(),
  validFrom: text('valid_from').notNull(),
  validUntil: text('valid_until').notNull(),
  isActive: integer('is_active', { mode: 'boolean' }).notNull(),
});


// Auth tables for better-auth
export const user = sqliteTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: integer("email_verified", { mode: "boolean" })
    .$defaultFn(() => false)
    .notNull(),
  image: text("image"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .$defaultFn(() => new Date())
    .notNull(),
});

export const session = sqliteTable("session", {
  id: text("id").primaryKey(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  token: text("token").notNull().unique(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = sqliteTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: integer("access_token_expires_at", {
    mode: "timestamp",
  }),
  refreshTokenExpiresAt: integer("refresh_token_expires_at", {
    mode: "timestamp",
  }),
  scope: text("scope"),
  password: text("password"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const verification = sqliteTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
    () => new Date(),
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(
    () => new Date(),
  ),
});