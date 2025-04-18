
import { useState, useEffect } from 'react'
import { User, CreditCard, MapPin, Clock, Star, Shield, LogOut } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { useNavigate } from 'react-router-dom'
import { useToast } from '../hooks/use-toast'

interface UserData {
  id: string
  name: string
  email: string
  phone?: string
  address?: string
}

// Mock ride history data
const rideHistory = [
  {
    id: '1',
    date: '2023-06-15',
    time: '14:30',
    from: 'Accra Mall, Accra',
    to: 'Kotoka International Airport, Accra',
    price: 45.00,
    status: 'completed',
    driver: 'John Mensah',
    rating: 5
  },
  {
    id: '2',
    date: '2023-06-10',
    time: '09:15',
    from: 'University of Ghana, Legon',
    to: 'Makola Market, Accra',
    price: 35.00,
    status: 'completed',
    driver: 'Kwame Asante',
    rating: 4
  },
  {
    id: '3',
    date: '2023-06-05',
    time: '18:45',
    from: 'A&C Mall, East Legon',
    to: 'Labadi Beach Hotel, Accra',
    price: 30.00,
    status: 'completed',
    driver: 'Abena Owusu',
    rating: 5
  }
]

const ProfilePage = () => {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState<UserData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { toast } = useToast()

  useEffect(() => {
    // Get user data from localStorage
    const user = localStorage.getItem('user')
    if (user) {
      const parsedUser = JSON.parse(user)
      setUserData(parsedUser)
      setFormData(parsedUser)
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (formData) {
      setFormData({
        ...formData,
        [name]: value
      })
    }
  }

  const handleSaveProfile = () => {
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      if (formData) {
        // Update localStorage
        localStorage.setItem('user', JSON.stringify(formData))
        setUserData(formData)
        setIsEditing(false)
        
        toast({
          title: "Success",
          description: "Your profile has been updated successfully",
        })
      }
      
      setIsLoading(false)
    }, 1000)
  }

  const handleLogout = () => {
    localStorage.removeItem('user')
    navigate('/login')
  }

  if (!userData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <p>Loading profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Sidebar */}
        <div>
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={`https://ui-avatars.com/api/?name=${userData.name}&background=0D8ABC&color=fff`} />
                  <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h2 className="text-2xl font-bold">{userData.name}</h2>
                <p className="text-muted-foreground">{userData.email}</p>
                
                <div className="flex items-center justify-center mt-4 space-x-2">
                  <div className="bg-primary-100 text-primary-600 p-2 rounded-full">
                    <Star className="h-5 w-5" />
                  </div>
                  <span className="font-medium">4.9</span>
                  <span className="text-muted-foreground">(25 rides)</span>
                </div>
                
                <div className="w-full mt-6 space-y-4">
                  <Button variant="outline" className="w-full justify-start" onClick={() => setIsEditing(true)}>
                    <User className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Payment Methods
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <MapPin className="mr-2 h-4 w-4" />
                    Saved Locations
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Shield className="mr-2 h-4 w-4" />
                    Security
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Main Content */}
        <div className="lg:col-span-2">
          {isEditing ? (
            <Card>
              <CardHeader>
                <CardTitle>Edit Profile</CardTitle>
                <CardDescription>
                  Update your personal information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData?.name || ''}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData?.email || ''}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData?.phone || ''}
                        onChange={handleInputChange}
                        placeholder="+233 XX XXX XXXX"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData?.address || ''}
                        onChange={handleInputChange}
                        placeholder="Your address"
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-2 pt-4">
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleSaveProfile} disabled={isLoading}>
                      {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          ) : (
            <Tabs defaultValue="rides">
              <TabsList className="grid grid-cols-3 mb-8">
                <TabsTrigger value="rides" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>Ride History</span>
                </TabsTrigger>
                <TabsTrigger value="wallet" className="flex items-center gap-2">
                  <Wallet className="h-4 w-4" />
                  <span>Wallet</span>
                </TabsTrigger>
                <TabsTrigger value="rewards" className="flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  <span>Rewards</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="rides">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Ride History</CardTitle>
                    <CardDescription>
                      View details of your past rides
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {rideHistory.map((ride) => (
                        <div key={ride.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">
                                  {new Date(ride.date).toLocaleDateString()} • {ride.time}
                                </span>
                              </div>
                              <h3 className="font-medium mt-1">{ride.from} → {ride.to}</h3>
                            </div>
                            <div className="text-right">
                              <span className="font-medium">₵{ride.price.toFixed(2)}</span>
                              <div className="flex items-center mt-1">
                                <span className="text-sm text-muted-foreground mr-1">Rating:</span>
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-3 w-3 ${
                                        i < ride.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-between items-center mt-4">
                            <div className="flex items-center">
                              <Avatar className="h-8 w-8 mr-2">
                                <AvatarImage src={`https://ui-avatars.com/api/?name=${ride.driver}&background=0D8ABC&color=fff`} />
                                <AvatarFallback>{ride.driver.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <span className="text-sm">{ride.driver}</span>
                            </div>
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6 text-center">
                      <Button variant="outline">
                        Load More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="wallet">
                <Card>
                  <CardHeader>
                    <CardTitle>RideOver Wallet</CardTitle>
                    <CardDescription>
                      Manage your wallet balance and transactions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-primary-600 text-white rounded-lg p-6 mb-6">
                      <h3 className="text-lg font-medium mb-1">Current Balance</h3>
                      <p className="text-3xl font-bold">₵120.00</p>
                      <div className="mt-4 flex space-x-2">
                        <Button variant="secondary" size="sm">Add Money</Button>
                        <Button variant="secondary" size="sm">Withdraw</Button>
                      </div>
                    </div>
                    
                    <h3 className="font-medium mb-4">Recent Transactions</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">Ride Payment</p>
                          <p className="text-sm text-muted-foreground">June 15, 2023 • 14:30</p>
                        </div>
                        <span className="text-red-500 font-medium">-₵45.00</span>
                      </div>
                      <div className="flex justify-between items-center p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">Added Money</p>
                          <p className="text-sm text-muted-foreground">June 12, 2023 • 10:15</p>
                        </div>
                        <span className="text-green-500 font-medium">+₵100.00</span>
                      </div>
                      <div className="flex justify-between items-center p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">Ride Payment</p>
                          <p className="text-sm text-muted-foreground">June 10, 2023 • 09:15</p>
                        </div>
                        <span className="text-red-500 font-medium">-₵35.00</span>
                      </div>
                    </div>
                    
                    <div className="mt-6 text-center">
                      <Button variant="outline">
                        View All Transactions
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="rewards">
                <Card>
                  <CardHeader>
                    <CardTitle>Loyalty Rewards</CardTitle>
                    <CardDescription>
                      Earn points with every ride and redeem for rewards
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg p-6 mb-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-lg font-medium mb-1">Your Points</h3>
                          <p className="text-3xl font-bold">350</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm opacity-80">Membership Level</p>
                          <p className="font-bold">Silver</p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <p className="text-sm opacity-80 mb-1">150 more points to reach Gold level</p>
                        <div className="w-full bg-white/20 rounded-full h-2">
                          <div className="bg-white rounded-full h-2" style={{ width: '70%' }}></div>
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="font-medium mb-4">Available Rewards</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <h4 className="font-medium">Free Ride</h4>
                        <p className="text-sm text-muted-foreground mb-3">Get a free ride up to ₵50</p>
                        <div className="flex justify-between items-center">
                          <span className="font-bold">500 points</span>
                          <Button size="sm" variant="outline">Redeem</Button>
                        </div>
                      </div>
                      <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <h4 className="font-medium">Discount Coupon</h4>
                        <p className="text-sm text-muted-foreground mb-3">20% off your next 3 rides</p>
                        <div className="flex justify-between items-center">
                          <span className="font-bold">300 points</span>
                          <Button size="sm" variant="outline">Redeem</Button>
                        </div>
                      </div>
                      <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <h4 className="font-medium">Priority Pickup</h4>
                        <p className="text-sm text-muted-foreground mb-3">Get priority driver matching for 1 week</p>
                        <div className="flex justify-between items-center">
                          <span className="font-bold">200 points</span>
                          <Button size="sm" variant="outline">Redeem</Button>
                        </div>
                      </div>
                      <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <h4 className="font-medium">Wallet Credit</h4>
                        <p className="text-sm text-muted-foreground mb-3">₵25 added to your wallet</p>
                        <div className="flex justify-between items-center">
                          <span className="font-bold">250 points</span>
                          <Button size="sm" variant="outline">Redeem</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProfilePage