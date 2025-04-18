
import { Link } from 'react-router-dom'
import { Car, ArrowLeft } from 'lucide-react'
import { Button } from '../components/ui/button'

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <Car className="h-24 w-24 text-primary-600" />
            <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
              ?
            </div>
          </div>
        </div>
        
        <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
        <p className="text-muted-foreground mb-8">
          Oops! It seems like you've taken a wrong turn. The page you're looking for doesn't exist or has been moved.
        </p>
        
        <Link to="/">
          <Button className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default NotFoundPage