"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { ThemeToggle } from "@/components/theme-toggle";
import { 
  Car, 
  DollarSign, 
  TrendingUp, 
  MapPin, 
  Check, 
  X,
  Star,
  Calendar,
  Clock
} from "lucide-react";
import { toast } from "sonner";

interface Driver {
  id: number;
  name: string;
  vehicleType: string;
  vehicleModel: string;
  vehicleNumber: string;
  rating: number;
  totalTrips: number;
  earningsTotal: number;
  isAvailable: boolean;
}

interface PendingBooking {
  id: number;
  pickupLocation: string;
  dropoffLocation: string;
  vehicleType: string;
  fareEstimate: number;
  bookingTime: string;
  customerName: string;
}

export default function DriverPage() {
  const [driver, setDriver] = useState<Driver | null>(null);
  const [pendingBookings, setPendingBookings] = useState<PendingBooking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    fetchDriverData();
    fetchPendingBookings();
  }, []);

  const fetchDriverData = async () => {
    try {
      const response = await fetch("/api/drivers?userId=12");
      if (!response.ok) throw new Error("Failed to fetch driver data");
      const data = await response.json();
      setDriver(data);
      setIsOnline(data.isAvailable);
    } catch (error) {
      toast.error("Failed to load driver data");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPendingBookings = async () => {
    try {
      const response = await fetch("/api/bookings?status=pending");
      if (!response.ok) throw new Error("Failed to fetch bookings");
      const data = await response.json();
      setPendingBookings(data.slice(0, 3)); // Show only 3 pending bookings
    } catch (error) {
      console.error("Failed to load pending bookings");
    }
  };

  const toggleAvailability = async (available: boolean) => {
    try {
      const response = await fetch("/api/drivers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: 12,
          isAvailable: available,
        }),
      });

      if (!response.ok) throw new Error("Failed to update availability");
      
      setIsOnline(available);
      toast.success(available ? "You're now online" : "You're now offline");
    } catch (error) {
      toast.error("Failed to update availability");
    }
  };

  const handleAcceptBooking = async (bookingId: number) => {
    try {
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          driverId: 12,
          status: "accepted",
          pickupTime: new Date().toISOString(),
        }),
      });

      if (!response.ok) throw new Error("Failed to accept booking");
      
      toast.success("Booking accepted! Navigate to pickup location.");
      fetchPendingBookings();
    } catch (error) {
      toast.error("Failed to accept booking");
    }
  };

  const handleRejectBooking = async (bookingId: number) => {
    try {
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: "cancelled",
        }),
      });

      if (!response.ok) throw new Error("Failed to reject booking");
      
      toast.info("Booking rejected");
      fetchPendingBookings();
    } catch (error) {
      toast.error("Failed to reject booking");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Car className="h-12 w-12 animate-bounce text-primary" />
      </div>
    );
  }

  if (!driver) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Driver Not Found</CardTitle>
            <CardDescription>Please contact support</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-primary text-primary-foreground p-2 rounded-xl">
              <Car className="h-6 w-6" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              QuickUp Driver
            </span>
          </Link>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">
                {isOnline ? "Online" : "Offline"}
              </span>
              <Switch
                checked={isOnline}
                onCheckedChange={toggleAvailability}
              />
            </div>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 pt-24 pb-12">
        {/* Driver Stats */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Welcome back, {driver.name}! 👋</h1>
          <p className="text-muted-foreground">Here's your performance overview</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Earnings
              </CardTitle>
              <DollarSign className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">
                ${driver.earningsTotal.toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                <TrendingUp className="inline h-3 w-3" /> +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Trips
              </CardTitle>
              <Car className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{driver.totalTrips}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Lifetime trips completed
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Rating
              </CardTitle>
              <Star className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{driver.rating.toFixed(1)} ⭐</div>
              <p className="text-xs text-muted-foreground mt-1">
                Based on customer reviews
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Vehicle
              </CardTitle>
              <Car className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold">{driver.vehicleModel}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {driver.vehicleNumber}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Pending Ride Requests */}
        <Card>
          <CardHeader>
            <CardTitle>Pending Ride Requests</CardTitle>
            <CardDescription>
              {isOnline
                ? "New ride requests will appear here"
                : "Turn on availability to receive ride requests"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!isOnline ? (
              <div className="text-center py-12">
                <Car className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">You're currently offline</p>
                <Button
                  onClick={() => toggleAvailability(true)}
                  className="bg-gradient-to-r from-primary to-accent"
                >
                  Go Online
                </Button>
              </div>
            ) : pendingBookings.length === 0 ? (
              <div className="text-center py-12">
                <Clock className="h-16 w-16 text-muted-foreground mx-auto mb-4 animate-pulse" />
                <p className="text-muted-foreground">Waiting for ride requests...</p>
              </div>
            ) : (
              <div className="space-y-4">
                {pendingBookings.map((booking) => (
                  <Card key={booking.id} className="border-2 border-primary/20">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline">{booking.vehicleType.toUpperCase()}</Badge>
                            <Badge className="bg-primary">
                              ${booking.fareEstimate.toFixed(2)}
                            </Badge>
                          </div>
                          <div className="flex items-start space-x-2">
                            <MapPin className="h-5 w-5 text-green-500 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium">Pickup</p>
                              <p className="text-sm text-muted-foreground">
                                {booking.pickupLocation}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-2">
                            <MapPin className="h-5 w-5 text-red-500 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium">Dropoff</p>
                              <p className="text-sm text-muted-foreground">
                                {booking.dropoffLocation}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(booking.bookingTime).toLocaleString()}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Button
                          onClick={() => handleAcceptBooking(booking.id)}
                          className="flex-1 bg-gradient-to-r from-green-500 to-green-600"
                        >
                          <Check className="mr-2 h-4 w-4" />
                          Accept
                        </Button>
                        <Button
                          onClick={() => handleRejectBooking(booking.id)}
                          variant="outline"
                          className="flex-1"
                        >
                          <X className="mr-2 h-4 w-4" />
                          Reject
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-primary" />
                Trip History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                View your completed rides and earnings
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Star className="mr-2 h-5 w-5 text-primary" />
                Reviews
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                See what customers are saying about you
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="mr-2 h-5 w-5 text-primary" />
                Payments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Manage your earnings and withdrawal
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
