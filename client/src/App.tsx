// import { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import HomePage from './components/Homepage'

// Type for PrivateRoute props
type PrivateRouteProps = {
  children: React.ReactNode
}

// PrivateRoute Component

const App = () => {
  // const [darkMode, setDarkMode] = useState(false)
  // const [isLoggedIn, setIsLoggedIn] = useState(true)
  const isLoggedIn = true
  const darkMode = false

  const PrivateRoute = ({ children }: PrivateRouteProps) => {
    return isLoggedIn ? <>{children}</> : <Navigate to='/login' />
  }

  return (
    <Router>
      <div
        className={darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}
      >
        <Routes>
          {/* Public Routes */}
          <Route path='/login' element={isLoggedIn ? <Login /> : <Login />} />
          <Route
            path='/signup'
            element={isLoggedIn ? <Signup /> : <Signup />}
          />

          {/* Private Routes */}
          <Route
            path='/'
            element={
              <PrivateRoute>
                <HomePage isLoggedIn={isLoggedIn} />
              </PrivateRoute>
            }
          />
          <Route
            path='/dashboard'
            element={
              <PrivateRoute>
                <HomePage isLoggedIn={isLoggedIn} />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App
