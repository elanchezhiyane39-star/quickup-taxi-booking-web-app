"use client"

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { GoogleMap, useJsApiLoader, Marker, DirectionsRenderer } from "@react-google-maps/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ThemeToggle } from "@/components/theme-toggle";
import { Car, MapPin, Navigation, CreditCard, Wallet, Banknote, DollarSign } from "lucide-react";
import { toast } from "sonner";

const libraries: ("places")[] = ["places"];

const containerStyle = {
  width: "100%",
  height: "500px",
};

const defaultCenter = {
  lat: 19.0760,
  lng: 72.8777,
};

const vehicleTypes = [
  { value: "mini", label: "Mini", icon: "🚗", basePrice: 8, perKm: 1.5 },
  { value: "sedan", label: "Sedan", icon: "🚙", basePrice: 12, perKm: 2 },
  { value: "suv", label: "SUV", icon: "🚐", basePrice: 18, perKm: 3 },
  { value: "auto", label: "Auto", icon: "🛺", basePrice: 5, perKm: 1 },
];

export default function BookingPage() {
  const router = useRouter();
  const [currentLocation, setCurrentLocation] = useState(defaultCenter);
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [pickupCoords, setPickupCoords] = useState<google.maps.LatLngLiteral | null>(null);
  const [dropoffCoords, setDropoffCoords] = useState<google.maps.LatLngLiteral | null>(null);
  const [vehicleType, setVehicleType] = useState("sedan");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [fareEstimate, setFareEstimate] = useState(0);
  const [distance, setDistance] = useState(0);
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const [isBooking, setIsBooking] = useState(false);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8",
    libraries,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCurrentLocation(pos);
          setPickupCoords(pos);
        },
        () => {
          toast.error("Unable to get your location");
        }
      );
    }
  }, []);

  const calculateFare = useCallback((distanceInKm: number, vehicleType: string) => {
    const vehicle = vehicleTypes.find((v) => v.value === vehicleType);
    if (!vehicle) return 0;
    return vehicle.basePrice + distanceInKm * vehicle.perKm;
  }, []);

  useEffect(() => {
    if (pickupCoords && dropoffCoords && window.google) {
      const directionsService = new google.maps.DirectionsService();

      directionsService.route(
        {
          origin: pickupCoords,
          destination: dropoffCoords,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK && result) {
            setDirections(result);
            const distanceInMeters = result.routes[0].legs[0].distance?.value || 0;
            const distanceInKm = distanceInMeters / 1000;
            setDistance(distanceInKm);
            const fare = calculateFare(distanceInKm, vehicleType);
            setFareEstimate(fare);
          }
        }
      );
    }
  }, [pickupCoords, dropoffCoords, vehicleType, calculateFare]);

  const handlePlaceSelect = (type: "pickup" | "dropoff", value: string) => {
    if (!window.google) return;

    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: value }, (results, status) => {
      if (status === "OK" && results && results[0]) {
        const location = {
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng(),
        };

        if (type === "pickup") {
          setPickupCoords(location);
          setPickupLocation(value);
        } else {
          setDropoffCoords(location);
          setDropoffLocation(value);
        }
      }
    });
  };

  const handleBookRide = async () => {
    if (!pickupLocation || !dropoffLocation || !pickupCoords || !dropoffCoords) {
      toast.error("Please enter both pickup and dropoff locations");
      return;
    }

    setIsBooking(true);

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerId: 4, // Demo customer ID
          pickupLocation,
          pickupLat: pickupCoords.lat,
          pickupLng: pickupCoords.lng,
          dropoffLocation,
          dropoffLat: dropoffCoords.lat,
          dropoffLng: dropoffCoords.lng,
          vehicleType,
          fareEstimate,
          paymentMethod,
        }),
      });

      if (!response.ok) throw new Error("Booking failed");

      const booking = await response.json();
      toast.success("Ride booked successfully! Finding a driver...");
      
      setTimeout(() => {
        router.push(`/trip-history`);
      }, 2000);
    } catch (error) {
      toast.error("Failed to book ride. Please try again.");
    } finally {
      setIsBooking(false);
    }
  };

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Car className="h-12 w-12 animate-bounce mx-auto mb-4 text-primary" />
          <p className="text-lg">Loading map...</p>
        </div>
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
            <Link href="/trip-history">
              <Button variant="ghost">Trip History</Button>
            </Link>
            <Link href="/profile">
              <Button variant="ghost">Profile</Button>
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <Card className="lg:col-span-1 h-fit">
            <CardHeader>
              <CardTitle>Book Your Ride</CardTitle>
              <CardDescription>Enter your trip details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Pickup Location */}
              <div className="space-y-2">
                <Label htmlFor="pickup">Pickup Location</Label>
                <div className="relative">
                  <Navigation className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="pickup"
                    placeholder="Enter pickup location"
                    className="pl-10"
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    onBlur={(e) => handlePlaceSelect("pickup", e.target.value)}
                  />
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setPickupCoords(currentLocation);
                    setPickupLocation("Current Location");
                  }}
                  className="w-full"
                >
                  Use Current Location
                </Button>
              </div>

              {/* Dropoff Location */}
              <div className="space-y-2">
                <Label htmlFor="dropoff">Dropoff Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="dropoff"
                    placeholder="Enter dropoff location"
                    className="pl-10"
                    value={dropoffLocation}
                    onChange={(e) => setDropoffLocation(e.target.value)}
                    onBlur={(e) => handlePlaceSelect("dropoff", e.target.value)}
                  />
                </div>
              </div>

              {/* Vehicle Type */}
              <div className="space-y-2">
                <Label>Vehicle Type</Label>
                <div className="grid grid-cols-2 gap-2">
                  {vehicleTypes.map((vehicle) => (
                    <Button
                      key={vehicle.value}
                      variant={vehicleType === vehicle.value ? "default" : "outline"}
                      className="h-auto py-4 flex flex-col"
                      onClick={() => setVehicleType(vehicle.value)}
                    >
                      <span className="text-2xl mb-1">{vehicle.icon}</span>
                      <span className="text-sm font-semibold">{vehicle.label}</span>
                      <span className="text-xs text-muted-foreground">
                        ${vehicle.basePrice} + ${vehicle.perKm}/km
                      </span>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Payment Method */}
              <div className="space-y-2">
                <Label htmlFor="payment">Payment Method</Label>
                <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cash">
                      <div className="flex items-center">
                        <Banknote className="mr-2 h-4 w-4" />
                        Cash
                      </div>
                    </SelectItem>
                    <SelectItem value="upi">
                      <div className="flex items-center">
                        <DollarSign className="mr-2 h-4 w-4" />
                        UPI
                      </div>
                    </SelectItem>
                    <SelectItem value="card">
                      <div className="flex items-center">
                        <CreditCard className="mr-2 h-4 w-4" />
                        Card
                      </div>
                    </SelectItem>
                    <SelectItem value="wallet">
                      <div className="flex items-center">
                        <Wallet className="mr-2 h-4 w-4" />
                        Wallet
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Fare Estimate */}
              {fareEstimate > 0 && (
                <div className="bg-primary/10 p-4 rounded-lg space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Distance:</span>
                    <span className="font-semibold">{distance.toFixed(2)} km</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold">
                    <span>Estimated Fare:</span>
                    <span className="text-primary">${fareEstimate.toFixed(2)}</span>
                  </div>
                </div>
              )}

              <Button
                onClick={handleBookRide}
                disabled={isBooking || !pickupCoords || !dropoffCoords}
                className="w-full bg-gradient-to-r from-primary to-accent"
                size="lg"
              >
                {isBooking ? "Booking..." : "Book Ride"}
              </Button>
            </CardContent>
          </Card>

          {/* Map */}
          <Card className="lg:col-span-2">
            <CardContent className="p-0">
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={currentLocation}
                zoom={13}
                options={{
                  streetViewControl: false,
                  mapTypeControl: false,
                }}
              >
                {pickupCoords && (
                  <Marker
                    position={pickupCoords}
                    icon={{
                      url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
                    }}
                  />
                )}
                {dropoffCoords && (
                  <Marker
                    position={dropoffCoords}
                    icon={{
                      url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
                    }}
                  />
                )}
                {directions && <DirectionsRenderer directions={directions} />}
              </GoogleMap>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
