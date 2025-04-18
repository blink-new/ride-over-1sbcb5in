
import { Link } from 'react-router-dom'
import { Car, Facebook, Instagram, Twitter } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-primary-600 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Car className="h-6 w-6" />
              <span className="text-xl font-bold">RideOver</span>
            </Link>
            <p className="text-sm text-primary-100 mb-4">
              The next generation ride-hailing service for all your transportation needs.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-primary-200 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-primary-200 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-primary-200 transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-primary-100">
              <li><a href="#" className="hover:text-white transition-colors">Car Rides</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Motorcycle Rides</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Package Delivery</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Multi-stop Rides</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Scheduled Rides</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-primary-100">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-primary-100">
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Licenses</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-primary-500 mt-8 pt-8 text-center text-primary-100">
          <p>&copy; {new Date().getFullYear()} RideOver. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer