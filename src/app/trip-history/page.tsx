"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";
import { Car, MapPin, Calendar, DollarSign, Star, Download } from "lucide-react";
import { toast } from "sonner";

interface Booking {
  id: number;
  pickupLocation: string;
  dropoffLocation: string;
  vehicleType: string;
  status: string;
  fareEstimate: number;
  finalFare: number | null;
  paymentMethod: string;
  paymentStatus: string;
  bookingTime: string;
  completionTime: string | null;
}

export default function TripHistoryPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await fetch("/api/bookings?customerId=4");
      if (!response.ok) throw new Error("Failed to fetch bookings");
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      toast.error("Failed to load trip history");
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      completed: "default",
      in_progress: "secondary",
      pending: "outline",
      cancelled: "destructive",
    };

    return (
      <Badge variant={variants[status] || "outline"}>
        {status.replace("_", " ").toUpperCase()}
      </Badge>
    );
  };

  const getVehicleIcon = (type: string) => {
    const icons: Record<string, string> = {
      mini: "🚗",
      sedan: "🚙",
      suv: "🚐",
      auto: "🛺",
    };
    return icons[type] || "🚗";
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Car className="h-12 w-12 animate-bounce text-primary" />
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
              QuickUp
            </span>
          </Link>

          <div className="flex items-center space-x-4">
            <Link href="/booking">
              <Button className="bg-gradient-to-r from-primary to-accent">Book New Ride</Button>
            </Link>
            <Link href="/profile">
              <Button variant="ghost">Profile</Button>
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Trip History</h1>
          <p className="text-muted-foreground">View all your past and ongoing rides</p>
        </div>

        <div className="grid gap-6">
          {bookings.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Car className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">No trips yet</h3>
                <p className="text-muted-foreground mb-4">Book your first ride to get started</p>
                <Link href="/booking">
                  <Button className="bg-gradient-to-r from-primary to-accent">
                    Book Your First Ride
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            bookings.map((booking) => (
              <Card key={booking.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-4xl">{getVehicleIcon(booking.vehicleType)}</div>
                      <div>
                        <CardTitle className="text-xl">
                          {booking.vehicleType.charAt(0).toUpperCase() + booking.vehicleType.slice(1)} Ride
                        </CardTitle>
                        <CardDescription>Booking #{booking.id}</CardDescription>
                      </div>
                    </div>
                    {getStatusBadge(booking.status)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-start space-x-2">
                        <MapPin className="h-5 w-5 text-green-500 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Pickup</p>
                          <p className="text-sm text-muted-foreground">{booking.pickupLocation}</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2">
                        <MapPin className="h-5 w-5 text-red-500 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Dropoff</p>
                          <p className="text-sm text-muted-foreground">{booking.dropoffLocation}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm">
                          {new Date(booking.bookingTime).toLocaleString()}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm font-semibold">
                          ${(booking.finalFare || booking.fareEstimate).toFixed(2)}
                        </p>
                        <Badge variant="outline" className="text-xs">
                          {booking.paymentMethod.toUpperCase()}
                        </Badge>
                      </div>
                      {booking.status === "completed" && (
                        <div className="flex items-center space-x-2">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <Button variant="link" className="h-auto p-0 text-sm">
                            Rate this trip
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>

                  {booking.status === "completed" && (
                    <div className="flex space-x-2 pt-4 border-t">
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Download Receipt
                      </Button>
                      <Button variant="outline" size="sm">
                        Book Again
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
