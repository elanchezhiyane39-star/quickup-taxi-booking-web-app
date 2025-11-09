CREATE TABLE `bookings` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`customer_id` integer NOT NULL,
	`driver_id` integer,
	`pickup_location` text NOT NULL,
	`pickup_lat` real NOT NULL,
	`pickup_lng` real NOT NULL,
	`dropoff_location` text NOT NULL,
	`dropoff_lat` real NOT NULL,
	`dropoff_lng` real NOT NULL,
	`vehicle_type` text NOT NULL,
	`status` text NOT NULL,
	`fare_estimate` real NOT NULL,
	`final_fare` real,
	`payment_method` text NOT NULL,
	`payment_status` text NOT NULL,
	`booking_time` text NOT NULL,
	`pickup_time` text,
	`completion_time` text,
	FOREIGN KEY (`customer_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`driver_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `driver_details` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`vehicle_type` text NOT NULL,
	`vehicle_number` text NOT NULL,
	`vehicle_model` text NOT NULL,
	`license_number` text NOT NULL,
	`rating` real DEFAULT 5 NOT NULL,
	`total_trips` integer DEFAULT 0 NOT NULL,
	`is_available` integer DEFAULT false NOT NULL,
	`earnings_total` real DEFAULT 0 NOT NULL,
	`current_lat` real,
	`current_lng` real,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `payments` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`booking_id` integer NOT NULL,
	`amount` real NOT NULL,
	`payment_method` text NOT NULL,
	`transaction_id` text,
	`status` text NOT NULL,
	`created_at` text NOT NULL,
	FOREIGN KEY (`booking_id`) REFERENCES `bookings`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `promo_codes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`code` text NOT NULL,
	`discount_percentage` integer NOT NULL,
	`max_discount` real NOT NULL,
	`valid_from` text NOT NULL,
	`valid_until` text NOT NULL,
	`is_active` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `promo_codes_code_unique` ON `promo_codes` (`code`);--> statement-breakpoint
CREATE TABLE `ratings` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`booking_id` integer NOT NULL,
	`customer_id` integer NOT NULL,
	`driver_id` integer NOT NULL,
	`rating` integer NOT NULL,
	`feedback` text,
	`created_at` text NOT NULL,
	FOREIGN KEY (`booking_id`) REFERENCES `bookings`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`customer_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`driver_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`email` text NOT NULL,
	`phone` text,
	`name` text NOT NULL,
	`role` text NOT NULL,
	`profile_image` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_phone_unique` ON `users` (`phone`);