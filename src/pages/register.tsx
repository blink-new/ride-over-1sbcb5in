
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Car, Eye, EyeOff, CheckCircle } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card'
import { useToast } from '../hooks/use-toast'

interface RegisterPageProps {
  setIsAuthenticated: (value: boolean) => void
}

const RegisterPage = ({ setIsAuthenticated }: RegisterPageProps) => {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { toast } = useToast()

  // Password strength indicators
  const hasMinLength = password.length >= 8
  const hasUpperCase = /[A-Z]/.test(password)
  const hasLowerCase = /[a-z]/.test(password)
  const hasNumber = /[0-9]/.test(password)
  const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)
  
  const passwordStrength = [
    hasMinLength,
    hasUpperCase,
    hasLowerCase,
    hasNumber,
    hasSpecialChar
  ].filter(Boolean).length

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 2) return 'bg-red-500'
    if (passwordStrength <= 4) return 'bg-yellow-500'
    return 'bg-green-500'
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!fullName || !email || !password || !confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }
    
    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      })
      return
    }
    
    if (passwordStrength < 3) {
      toast({
        title: "Error",
        description: "Please use a stronger password",
        variant: "destructive",
      })
      return
    }
    
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      // Store user data in localStorage
      const userData = {
        id: '1',
        email,
        name: fullName,
      }
      localStorage.setItem('user', JSON.stringify(userData))
      
      setIsAuthenticated(true)
      toast({
        title: "Success",
        description: "Your account has been created successfully",
      })
      navigate('/')
      
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2">
            <Car className="h-8 w-8 text-primary-600" />
            <span className="text-2xl font-bold text-primary-600">RideOver</span>
          </Link>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Create your account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
              Sign in
            </Link>
          </p>
        </div>
        
        <Card>
          <form onSubmit={handleRegister}>
            <CardHeader>
              <CardTitle>Register</CardTitle>
              <CardDescription>
                Enter your information to create an account
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                
                {/* Password strength meter */}
                {password && (
                  <div className="mt-2 space-y-2">
                    <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${getPasswordStrengthColor()} transition-all duration-300`} 
                        style={{ width: `${(passwordStrength / 5) * 100}%` }}
                      ></div>
                    </div>
                    <ul className="text-xs space-y-1">
                      <li className={`flex items-center gap-1 ${hasMinLength ? 'text-green-600' : 'text-gray-500'}`}>
                        {hasMinLength ? <CheckCircle size={12} /> : <span className="w-3">·</span>}
                        At least 8 characters
                      </li>
                      <li className={`flex items-center gap-1 ${hasUpperCase ? 'text-green-600' : 'text-gray-500'}`}>
                        {hasUpperCase ? <CheckCircle size={12} /> : <span className="w-3">·</span>}
                        Uppercase letter
                      </li>
                      <li className={`flex items-center gap-1 ${hasLowerCase ? 'text-green-600' : 'text-gray-500'}`}>
                        {hasLowerCase ? <CheckCircle size={12} /> : <span className="w-3">·</span>}
                        Lowercase letter
                      </li>
                      <li className={`flex items-center gap-1 ${hasNumber ? 'text-green-600' : 'text-gray-500'}`}>
                        {hasNumber ? <CheckCircle size={12} /> : <span className="w-3">·</span>}
                        Number
                      </li>
                      <li className={`flex items-center gap-1 ${hasSpecialChar ? 'text-green-600' : 'text-gray-500'}`}>
                        {hasSpecialChar ? <CheckCircle size={12} /> : <span className="w-3">·</span>}
                        Special character
                      </li>
                    </ul>
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                {password && confirmPassword && password !== confirmPassword && (
                  <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
                )}
              </div>
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Create account"}
              </Button>
              <p className="text-xs text-center text-gray-500">
                By creating an account, you agree to our{' '}
                <Link to="#" className="text-primary-600 hover:text-primary-500">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="#" className="text-primary-600 hover:text-primary-500">
                  Privacy Policy
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
        
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 text-gray-500">Or continue with</span>
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-3 gap-3">
            <Button variant="outline" className="w-full">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2048px-Google_%22G%22_Logo.svg.png" alt="Google" className="h-5 w-5" />
            </Button>
            <Button variant="outline" className="w-full">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/2021_Facebook_icon.svg/2048px-2021_Facebook_icon.svg.png" alt="Facebook" className="h-5 w-5" />
            </Button>
            <Button variant="outline" className="w-full">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1667px-Apple_logo_black.svg.png" alt="Apple" className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage