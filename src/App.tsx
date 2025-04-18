
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from './components/theme-provider'
import { Toaster } from './components/ui/sonner'

// Pages
import HomePage from './pages/home'
import LoginPage from './pages/login'
import RegisterPage from './pages/register'
import RidePage from './pages/ride'
import ProfilePage from './pages/profile'
import NotFoundPage from './pages/not-found'

// Layout
import MainLayout from './layouts/main-layout'

// Create a client
const queryClient = new QueryClient()

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  
  // Check if user is authenticated
  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      setIsAuthenticated(true)
    }
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="rideOver-theme">
        <Router>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<HomePage />} />
              <Route path="ride" element={<RidePage />} />
              <Route 
                path="profile" 
                element={
                  isAuthenticated ? 
                  <ProfilePage /> : 
                  <Navigate to="/login" replace />
                } 
              />
            </Route>
            <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/register" element={<RegisterPage setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App