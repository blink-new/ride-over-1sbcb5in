
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, X, User, Car, MapPin, Moon, Sun } from 'lucide-react'
import { Button } from './ui/button'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import { useTheme } from './theme-provider'
import { cn } from '../lib/utils'

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    localStorage.getItem('user') ? true : false
  )
  const navigate = useNavigate()
  const { theme, setTheme } = useTheme()
  
  const handleLogout = () => {
    localStorage.removeItem('user')
    setIsAuthenticated(false)
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <Car className="h-6 w-6 text-primary-600" />
            <span className="text-xl font-bold text-primary-600">RideOver</span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium hover:text-primary-600 transition-colors">
            Home
          </Link>
          <Link to="/ride" className="text-sm font-medium hover:text-primary-600 transition-colors">
            Book a Ride
          </Link>
          {isAuthenticated ? (
            <>
              <Link to="/profile" className="text-sm font-medium hover:text-primary-600 transition-colors">
                Profile
              </Link>
              <Button variant="outline" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline" className="mr-2">Login</Button>
              </Link>
              <Link to="/register">
                <Button>Register</Button>
              </Link>
            </>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="ml-2"
          >
            {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>
        </nav>
        
        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col gap-4 mt-8">
              <Link to="/" className="flex items-center gap-2 text-lg font-medium">
                <MapPin className="h-5 w-5" />
                Home
              </Link>
              <Link to="/ride" className="flex items-center gap-2 text-lg font-medium">
                <Car className="h-5 w-5" />
                Book a Ride
              </Link>
              {isAuthenticated ? (
                <>
                  <Link to="/profile" className="flex items-center gap-2 text-lg font-medium">
                    <User className="h-5 w-5" />
                    Profile
                  </Link>
                  <Button variant="outline" onClick={handleLogout} className="mt-2">
                    Logout
                  </Button>
                </>
              ) : (
                <div className="flex flex-col gap-2 mt-2">
                  <Link to="/login">
                    <Button variant="outline" className="w-full">Login</Button>
                  </Link>
                  <Link to="/register">
                    <Button className="w-full">Register</Button>
                  </Link>
                </div>
              )}
              <div className="flex items-center mt-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                >
                  {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                  <span className="ml-2">{theme === "light" ? "Dark" : "Light"} mode</span>
                </Button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

export default Navbar