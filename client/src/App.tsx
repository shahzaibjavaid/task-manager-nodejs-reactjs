import { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import HomePage from './components/HomePage'

type PrivateRouteProps = {
  children: React.ReactNode
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const token = localStorage.getItem('authToken')
  const tokenExpirationTime = localStorage.getItem('tokenExpirationTime')
  const currentTime = new Date().getTime() / 1000 // Current time in seconds

  // Check if token exists and if it's expired
  if (
    token &&
    tokenExpirationTime &&
    currentTime < parseInt(tokenExpirationTime)
  ) {
    return <>{children}</>
  } else {
    localStorage.removeItem('authToken') // Remove expired token
    localStorage.removeItem('tokenExpirationTime') // Remove expiration time
    return <Navigate to='/login' />
  }
}

const App = () => {
  // const [darkMode, setDarkMode] = useState(false)
  const darkMode = false
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('authToken')
    const tokenExpirationTime = localStorage.getItem('tokenExpirationTime')
    const currentTime = new Date().getTime() / 1000 // Current time in seconds

    // Check if token exists and if it's expired
    if (
      token &&
      tokenExpirationTime &&
      currentTime < parseInt(tokenExpirationTime)
    ) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
      localStorage.removeItem('authToken') // Remove expired token
      localStorage.removeItem('tokenExpirationTime') // Remove expiration time
    }
  }, [])

  if (isLoggedIn === null) {
    return <div>Loading...</div> // Show loader until token check is done
  }

  return (
    <Router>
      <div
        className={darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}
      >
        <Routes>
          {/* Public Routes */}
          <Route
            path='/login'
            element={isLoggedIn ? <Navigate to='/' /> : <Login />}
          />
          <Route
            path='/signup'
            element={isLoggedIn ? <Navigate to='/' /> : <Signup />}
          />

          {/* Private Routes */}
          <Route
            path='/'
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route
            path='/dashboard'
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App
