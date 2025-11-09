import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { 
  Car, 
  MapPin, 
  CreditCard, 
  Star, 
  Shield, 
  Clock,
  ArrowRight,
  Menu
} from "lucide-react";

export default function Home() {
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
          
          <div className="hidden md:flex items-center space-x-6">
            <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium hover:text-primary transition-colors">
              How It Works
            </Link>
            <Link href="/login" className="text-sm font-medium hover:text-primary transition-colors">
              Login
            </Link>
            <ThemeToggle />
            <Link href="/booking">
              <Button className="rounded-full bg-gradient-to-r from-primary to-accent hover:opacity-90">
                Book Now
              </Button>
            </Link>
          </div>

          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        {/* Animated Car */}
        <div className="absolute bottom-32 left-0 w-full h-32 opacity-20">
          <div className="animate-drive">
            <Car className="h-16 w-16 text-primary" />
          </div>
        </div>

        <div className="container mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="inline-block">
                <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                  🚗 Your Trusted Ride Partner
                </span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                Get Your Ride{" "}
                <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient">
                  Instantly
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-2xl">
                Book reliable, safe, and affordable taxi rides in seconds. 
                Track your driver in real-time with QuickUp's smart booking platform.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/booking">
                  <Button size="lg" className="rounded-full text-lg px-8 bg-gradient-to-r from-primary to-accent hover:opacity-90 group">
                    Book Your Ride
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/driver">
                  <Button size="lg" variant="outline" className="rounded-full text-lg px-8">
                    Become a Driver
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-8">
                <div>
                  <div className="text-3xl font-bold text-primary">50K+</div>
                  <div className="text-sm text-muted-foreground">Happy Riders</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">1K+</div>
                  <div className="text-sm text-muted-foreground">Drivers</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">4.8★</div>
                  <div className="text-sm text-muted-foreground">Rating</div>
                </div>
              </div>
            </div>

            <div className="relative lg:h-[600px] animate-float">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-3xl"></div>
              <img 
                src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&h=1000&fit=crop" 
                alt="Taxi Service" 
                className="relative rounded-3xl shadow-2xl object-cover w-full h-full border-4 border-background"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose QuickUp?</h2>
            <p className="text-xl text-muted-foreground">Everything you need for a perfect ride experience</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: MapPin,
                title: "Live GPS Tracking",
                description: "Track your driver in real-time with accurate GPS location updates"
              },
              {
                icon: Clock,
                title: "Quick Booking",
                description: "Book your ride in under 30 seconds with our smart booking system"
              },
              {
                icon: CreditCard,
                title: "Multiple Payment Options",
                description: "Pay with UPI, Card, Wallet, or Cash - whatever suits you best"
              },
              {
                icon: Shield,
                title: "Safe & Secure",
                description: "Verified drivers and 24/7 support for your safety"
              },
              {
                icon: Star,
                title: "Top Rated Drivers",
                description: "All drivers are verified with excellent customer ratings"
              },
              {
                icon: Car,
                title: "Multiple Vehicle Types",
                description: "Choose from Mini, Sedan, SUV, or Auto based on your needs"
              }
            ].map((feature, idx) => (
              <div 
                key={idx}
                className="group bg-card p-8 rounded-2xl border shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="bg-primary/10 w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground">Get your ride in 3 simple steps</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Enter Destination",
                description: "Tell us where you want to go and get instant fare estimate"
              },
              {
                step: "02",
                title: "Get Matched",
                description: "We'll find the nearest available driver for you instantly"
              },
              {
                step: "03",
                title: "Enjoy Your Ride",
                description: "Track your ride in real-time and pay after completion"
              }
            ].map((item, idx) => (
              <div key={idx} className="relative">
                <div className="bg-gradient-to-br from-primary to-accent text-primary-foreground text-4xl font-bold w-20 h-20 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  {item.step}
                </div>
                <h3 className="text-2xl font-semibold mb-3">{item.title}</h3>
                <p className="text-muted-foreground text-lg">{item.description}</p>
                {idx < 2 && (
                  <div className="hidden md:block absolute top-10 left-full w-full h-1 bg-gradient-to-r from-primary to-accent -z-10"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary to-accent text-primary-foreground">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Download the app or book directly from your browser
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/booking">
              <Button size="lg" variant="secondary" className="rounded-full text-lg px-8">
                Book Your First Ride
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/driver">
              <Button size="lg" variant="outline" className="rounded-full text-lg px-8 bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary">
                Start Driving with Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/30 py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-primary text-primary-foreground p-2 rounded-xl">
                  <Car className="h-5 w-5" />
                </div>
                <span className="text-xl font-bold">QuickUp</span>
              </div>
              <p className="text-muted-foreground">
                Your trusted taxi booking platform for safe and reliable rides.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link href="/about" className="hover:text-primary">About Us</Link></li>
                <li><Link href="/careers" className="hover:text-primary">Careers</Link></li>
                <li><Link href="/contact" className="hover:text-primary">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link href="/help" className="hover:text-primary">Help Center</Link></li>
                <li><Link href="/safety" className="hover:text-primary">Safety</Link></li>
                <li><Link href="/terms" className="hover:text-primary">Terms</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link href="/login" className="hover:text-primary">Login</Link></li>
                <li><Link href="/booking" className="hover:text-primary">Book a Ride</Link></li>
                <li><Link href="/driver" className="hover:text-primary">Drive with Us</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 QuickUp. All rights reserved. Made with ❤️ for riders.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}