
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Car, Bike, Package, Clock, Shield, Star, ChevronRight } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { Input } from '../components/ui/input'

const HomePage = () => {
  const navigate = useNavigate()
  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  
  const handleBookRide = () => {
    if (pickup && destination) {
      localStorage.setItem('pickup', pickup)
      localStorage.setItem('destination', destination)
      navigate('/ride')
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 max-w-lg">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Your Ride, Your Way, Anytime
              </h1>
              <p className="text-lg text-primary-100">
                Experience the next generation of ride-hailing with RideOver. Fast, safe, and reliable rides at your fingertips.
              </p>
              
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg">
                <Tabs defaultValue="ride" className="w-full">
                  <TabsList className="grid grid-cols-3 mb-4">
                    <TabsTrigger value="ride" className="flex items-center gap-2">
                      <Car size={16} />
                      <span>Ride</span>
                    </TabsTrigger>
                    <TabsTrigger value="bike" className="flex items-center gap-2">
                      <Bike size={16} />
                      <span>Okada</span>
                    </TabsTrigger>
                    <TabsTrigger value="delivery" className="flex items-center gap-2">
                      <Package size={16} />
                      <span>Delivery</span>
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="ride" className="space-y-4">
                    <div className="space-y-3">
                      <Input
                        placeholder="Pickup location"
                        value={pickup}
                        onChange={(e) => setPickup(e.target.value)}
                        className="bg-white/20 border-0 placeholder:text-white/70 text-white"
                      />
                      <Input
                        placeholder="Destination"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        className="bg-white/20 border-0 placeholder:text-white/70 text-white"
                      />
                      <Button 
                        onClick={handleBookRide} 
                        className="w-full bg-white text-primary-600 hover:bg-primary-50"
                      >
                        Book Ride
                      </Button>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="bike" className="space-y-4">
                    <div className="space-y-3">
                      <Input
                        placeholder="Pickup location"
                        className="bg-white/20 border-0 placeholder:text-white/70 text-white"
                      />
                      <Input
                        placeholder="Destination"
                        className="bg-white/20 border-0 placeholder:text-white/70 text-white"
                      />
                      <Button 
                        onClick={() => navigate('/ride')} 
                        className="w-full bg-white text-primary-600 hover:bg-primary-50"
                      >
                        Book Okada
                      </Button>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="delivery" className="space-y-4">
                    <div className="space-y-3">
                      <Input
                        placeholder="Pickup location"
                        className="bg-white/20 border-0 placeholder:text-white/70 text-white"
                      />
                      <Input
                        placeholder="Delivery destination"
                        className="bg-white/20 border-0 placeholder:text-white/70 text-white"
                      />
                      <Button 
                        onClick={() => navigate('/ride')} 
                        className="w-full bg-white text-primary-600 hover:bg-primary-50"
                      >
                        Schedule Delivery
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
            
            <div className="hidden md:block">
              <img 
                src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                alt="RideOver Car Service" 
                className="rounded-lg shadow-xl w-full h-auto object-cover transform -rotate-3 hover:rotate-0 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
        
        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
            <path fill="#ffffff" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,138.7C1248,117,1344,75,1392,53.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>
      
      {/* Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose from our wide range of transportation and delivery options designed to meet your needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow overflow-hidden group">
              <div className="h-48 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                  alt="Car Rides" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-semibold">Car Rides</h3>
                  <Car className="text-primary-600" />
                </div>
                <p className="text-muted-foreground mb-4">
                  Comfortable and convenient rides for your daily commute or special occasions.
                </p>
                <Button variant="outline" className="w-full group-hover:bg-primary-600 group-hover:text-white transition-colors">
                  Book Now
                </Button>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow overflow-hidden group">
              <div className="h-48 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1558981852-426c6c22a060?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                  alt="Okada Rides" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-semibold">Okada Rides</h3>
                  <Bike className="text-primary-600" />
                </div>
                <p className="text-muted-foreground mb-4">
                  Quick and efficient motorcycle rides to beat the traffic and reach your destination faster.
                </p>
                <Button variant="outline" className="w-full group-hover:bg-primary-600 group-hover:text-white transition-colors">
                  Book Now
                </Button>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow overflow-hidden group">
              <div className="h-48 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                  alt="Package Delivery" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-semibold">Package Delivery</h3>
                  <Package className="text-primary-600" />
                </div>
                <p className="text-muted-foreground mb-4">
                  Fast and secure delivery services for your packages, documents, and goods.
                </p>
                <Button variant="outline" className="w-full group-hover:bg-primary-600 group-hover:text-white transition-colors">
                  Send Package
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose RideOver</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We're committed to providing the best ride experience with innovative features and exceptional service.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mb-4">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Real-time Tracking</h3>
              <p className="text-muted-foreground">
                Track your ride or delivery in real-time with accurate ETA updates.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Safety First</h3>
              <p className="text-muted-foreground">
                Enhanced safety features including driver verification and ride sharing.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mb-4">
                <Star className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Loyalty Rewards</h3>
              <p className="text-muted-foreground">
                Earn points with every ride and redeem them for discounts and free rides.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mb-4">
                <Package className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Multiple Options</h3>
              <p className="text-muted-foreground">
                Choose from cars, motorcycles, or delivery services based on your needs.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-primary-600 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-8 md:mb-0 md:mr-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to get started?</h2>
              <p className="text-primary-100 max-w-lg">
                Download the RideOver app now and experience the future of transportation. Available on iOS and Android.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-white text-primary-600 hover:bg-primary-50">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1667px-Apple_logo_black.svg.png" alt="Apple" className="w-5 h-5 mr-2" />
                App Store
              </Button>
              <Button className="bg-white text-primary-600 hover:bg-primary-50">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Google_Play_2022_icon.svg/2048px-Google_Play_2022_icon.svg.png" alt="Google Play" className="w-5 h-5 mr-2" />
                Google Play
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our customers have to say about their RideOver experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="mr-4">
                    <img 
                      src="https://randomuser.me/api/portraits/women/12.jpg" 
                      alt="Sarah Johnson" 
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">Sarah Johnson</h4>
                    <div className="flex text-yellow-400">
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "RideOver has been a game-changer for my daily commute. The drivers are professional, and the app is so easy to use. I love the real-time tracking feature!"
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="mr-4">
                    <img 
                      src="https://randomuser.me/api/portraits/men/32.jpg" 
                      alt="Michael Thompson" 
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">Michael Thompson</h4>
                    <div className="flex text-yellow-400">
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "I use the package delivery service for my small business, and it's been reliable every time. The delivery tracking is precise, and my customers love it!"
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="mr-4">
                    <img 
                      src="https://randomuser.me/api/portraits/women/45.jpg" 
                      alt="Jessica Williams" 
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">Jessica Williams</h4>
                    <div className="flex text-yellow-400">
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "The Okada option is perfect for beating traffic in the city. I get to work on time every day now, and the safety measures make me feel secure during the ride."
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center mt-12">
            <Button variant="outline" className="group">
              <span>View More Testimonials</span>
              <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage