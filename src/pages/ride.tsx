
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Loader } from '@googlemaps/js-api-loader'
import { Car, Bike, Package, Clock, MapPin, Navigation, CreditCard, Wallet, Phone, AlertCircle } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group'
import { useToast } from '../hooks/use-toast'
import { Skeleton } from '../components/ui/skeleton'

// Mock data for ride options
const rideOptions = [
  {
    id: 'standard',
    name: 'Standard',
    icon: <Car className="h-5 w-5" />,
    price: 25.00,
    time: '15-20 min',
    description: 'Affordable, everyday rides'
  },
  {
    id: 'premium',
    name: 'Premium',
    icon: <Car className="h-5 w-5" />,
    price: 35.00,
    time: '15-20 min',
    description: 'Luxury vehicles with top-rated drivers'
  },
  {
    id: 'okada',
    name: 'Okada',
    icon: <Bike className="h-5 w-5" />,
    price: 15.00,
    time: '10-15 min',
    description: 'Quick motorcycle rides to beat traffic'
  }
]

// Mock data for payment methods
const paymentMethods = [
  {
    id: 'card',
    name: 'Credit Card',
    icon: <CreditCard className="h-5 w-5" />
  },
  {
    id: 'mobile',
    name: 'Mobile Money',
    icon: <Phone className="h-5 w-5" />
  },
  {
    id: 'wallet',
    name: 'RideOver Wallet',
    icon: <Wallet className="h-5 w-5" />
  }
]

const RidePage = () => {
  const [pickup, setPickup] = useState<string>(localStorage.getItem('pickup') || '')
  const [destination, setDestination] = useState<string>(localStorage.getItem('destination') || '')
  const [selectedRide, setSelectedRide] = useState<string>('standard')
  const [selectedPayment, setSelectedPayment] = useState<string>('card')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isMapLoading, setIsMapLoading] = useState<boolean>(true)
  const [bookingStep, setBookingStep] = useState<number>(1)
  const mapRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const { toast } = useToast()

  // Initialize Google Maps
  useEffect(() => {
    if (!mapRef.current) return
    
    const initMap = async () => {
      try {
        // In a real app, you would use your actual API key
        const loader = new Loader({
          apiKey: 'GOOGLE_MAPS_API_KEY_PLACEHOLDER',
          version: 'weekly',
        })
        
        const google = await loader.load()
        
        const map = new google.maps.Map(mapRef.current, {
          center: { lat: 5.6037, lng: -0.1870 }, // Accra, Ghana coordinates
          zoom: 12,
          styles: [
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{ color: '#e9e9e9' }, { lightness: 17 }]
            },
            {
              featureType: 'landscape',
              elementType: 'geometry',
              stylers: [{ color: '#f5f5f5' }, { lightness: 20 }]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.fill',
              stylers: [{ color: '#ffffff' }, { lightness: 17 }]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{ color: '#ffffff' }, { lightness: 29 }, { weight: 0.2 }]
            },
            {
              featureType: 'road.arterial',
              elementType: 'geometry',
              stylers: [{ color: '#ffffff' }, { lightness: 18 }]
            },
            {
              featureType: 'road.local',
              elementType: 'geometry',
              stylers: [{ color: '#ffffff' }, { lightness: 16 }]
            },
            {
              featureType: 'poi',
              elementType: 'geometry',
              stylers: [{ color: '#f5f5f5' }, { lightness: 21 }]
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [{ color: '#dedede' }, { lightness: 21 }]
            },
            {
              elementType: 'labels.text.stroke',
              stylers: [{ visibility: 'on' }, { color: '#ffffff' }, { lightness: 16 }]
            },
            {
              elementType: 'labels.text.fill',
              stylers: [{ saturation: 36 }, { color: '#333333' }, { lightness: 40 }]
            },
            {
              elementType: 'labels.icon',
              stylers: [{ visibility: 'off' }]
            },
            {
              featureType: 'transit',
              elementType: 'geometry',
              stylers: [{ color: '#f2f2f2' }, { lightness: 19 }]
            },
            {
              featureType: 'administrative',
              elementType: 'geometry.fill',
              stylers: [{ color: '#fefefe' }, { lightness: 20 }]
            },
            {
              featureType: 'administrative',
              elementType: 'geometry.stroke',
              stylers: [{ color: '#fefefe' }, { lightness: 17 }, { weight: 1.2 }]
            }
          ]
        })
        
        // Add markers if pickup and destination are set
        if (pickup && destination) {
          // This is a simplified example - in a real app, you would geocode the addresses
          const pickupMarker = new google.maps.Marker({
            position: { lat: 5.6037, lng: -0.1870 },
            map,
            title: 'Pickup Location',
            icon: {
              url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
            }
          })
          
          const destinationMarker = new google.maps.Marker({
            position: { lat: 5.6500, lng: -0.1962 },
            map,
            title: 'Destination',
            icon: {
              url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
            }
          })
          
          // Draw a route between the two points
          const directionsService = new google.maps.DirectionsService()
          const directionsRenderer = new google.maps.DirectionsRenderer({
            map,
            suppressMarkers: true,
            polylineOptions: {
              strokeColor: '#0ea5e9',
              strokeWeight: 5
            }
          })
          
          directionsService.route(
            {
              origin: { lat: 5.6037, lng: -0.1870 },
              destination: { lat: 5.6500, lng: -0.1962 },
              travelMode: google.maps.TravelMode.DRIVING
            },
            (response, status) => {
              if (status === 'OK') {
                directionsRenderer.setDirections(response)
              }
            }
          )
        }
        
        setIsMapLoading(false)
      } catch (error) {
        console.error('Error loading Google Maps:', error)
        setIsMapLoading(false)
      }
    }
    
    initMap()
  }, [pickup, destination])

  const handleBookRide = () => {
    if (!pickup || !destination) {
      toast({
        title: "Error",
        description: "Please enter pickup and destination locations",
        variant: "destructive",
      })
      return
    }
    
    if (bookingStep === 1) {
      setBookingStep(2)
      return
    }
    
    setIsLoading(true)
    
    // Simulate booking process
    setTimeout(() => {
      toast({
        title: "Success",
        description: "Your ride has been booked successfully!",
      })
      
      // In a real app, you would navigate to a ride tracking page
      navigate('/')
      
      setIsLoading(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map Section */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden">
              <div 
                ref={mapRef} 
                className="w-full h-[500px] relative"
              >
                {isMapLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                    <div className="flex flex-col items-center">
                      <Loader className="h-8 w-8 animate-spin text-primary-600" />
                      <p className="mt-2 text-sm text-gray-500">Loading map...</p>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>
          
          {/* Booking Section */}
          <div>
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6">Book Your Ride</h2>
                
                {bookingStep === 1 ? (
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <Label htmlFor="pickup">Pickup Location</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                        <Input
                          id="pickup"
                          placeholder="Enter pickup location"
                          value={pickup}
                          onChange={(e) => setPickup(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <Label htmlFor="destination">Destination</Label>
                      <div className="relative">
                        <Navigation className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                        <Input
                          id="destination"
                          placeholder="Enter destination"
                          value={destination}
                          onChange={(e) => setDestination(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    
                    <Tabs defaultValue="now" className="w-full">
                      <TabsList className="grid grid-cols-2 mb-4">
                        <TabsTrigger value="now" className="flex items-center gap-2">
                          <Clock size={16} />
                          <span>Ride Now</span>
                        </TabsTrigger>
                        <TabsTrigger value="schedule" className="flex items-center gap-2">
                          <Clock size={16} />
                          <span>Schedule</span>
                        </TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="now">
                        <p className="text-sm text-muted-foreground mb-4">
                          Your driver will arrive in approximately 5-10 minutes after booking.
                        </p>
                      </TabsContent>
                      
                      <TabsContent value="schedule">
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="date">Date</Label>
                              <Input id="date" type="date" className="mt-1" />
                            </div>
                            <div>
                              <Label htmlFor="time">Time</Label>
                              <Input id="time" type="time" className="mt-1" />
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Schedule your ride up to 7 days in advance.
                          </p>
                        </div>
                      </TabsContent>
                    </Tabs>
                    
                    <Button 
                      onClick={handleBookRide} 
                      className="w-full"
                    >
                      Continue
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Trip Details</h3>
                        <div className="text-sm text-muted-foreground mt-1">
                          <p>{pickup} → {destination}</p>
                          <p>Distance: 5.2 km • Est. time: 15-20 min</p>
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setBookingStep(1)}
                      >
                        Edit
                      </Button>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-3">Select Ride Type</h3>
                      <RadioGroup 
                        value={selectedRide} 
                        onValueChange={setSelectedRide}
                        className="space-y-3"
                      >
                        {rideOptions.map((option) => (
                          <div
                            key={option.id}
                            className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
                              selectedRide === option.id 
                                ? 'border-primary-600 bg-primary-50' 
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <RadioGroupItem value={option.id} id={option.id} />
                              <div className="flex items-center gap-2">
                                <div className="bg-primary-100 text-primary-600 p-2 rounded-full">
                                  {option.icon}
                                </div>
                                <div>
                                  <Label htmlFor={option.id} className="font-medium">
                                    {option.name}
                                  </Label>
                                  <p className="text-xs text-muted-foreground">
                                    {option.description}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">₵{option.price.toFixed(2)}</p>
                              <p className="text-xs text-muted-foreground">{option.time}</p>
                            </div>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-3">Payment Method</h3>
                      <RadioGroup 
                        value={selectedPayment} 
                        onValueChange={setSelectedPayment}
                        className="space-y-3"
                      >
                        {paymentMethods.map((method) => (
                          <div
                            key={method.id}
                            className={`flex items-center p-3 rounded-lg border transition-all ${
                              selectedPayment === method.id 
                                ? 'border-primary-600 bg-primary-50' 
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <RadioGroupItem value={method.id} id={method.id} />
                            <div className="ml-3 flex items-center gap-2">
                              <div className="bg-primary-100 text-primary-600 p-2 rounded-full">
                                {method.icon}
                              </div>
                              <Label htmlFor={method.id} className="font-medium">
                                {method.name}
                              </Label>
                            </div>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                    
                    <div className="border-t pt-4">
                      <div className="flex justify-between mb-2">
                        <span>Base fare</span>
                        <span>₵{rideOptions.find(o => o.id === selectedRide)?.price.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span>Distance (5.2 km)</span>
                        <span>₵10.00</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span>Service fee</span>
                        <span>₵2.50</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg mt-4">
                        <span>Total</span>
                        <span>₵{(rideOptions.find(o => o.id === selectedRide)?.price || 0 + 12.50).toFixed(2)}</span>
                      </div>
                    </div>
                    
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex items-start gap-2">
                      <AlertCircle className="text-yellow-500 h-5 w-5 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-yellow-700">
                        By booking this ride, you agree to our <a href="#" className="underline">Terms of Service</a> and <a href="#" className="underline">Safety Guidelines</a>.
                      </p>
                    </div>
                    
                    <Button 
                      onClick={handleBookRide} 
                      className="w-full"
                      disabled={isLoading}
                    >
                      {isLoading ? "Processing..." : "Book Ride"}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RidePage