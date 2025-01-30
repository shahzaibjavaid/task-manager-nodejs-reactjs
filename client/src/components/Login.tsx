import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

interface DecodedToken {
  id: number
  iat: number
  exp: number
}

const Login = () => {
  const navigate = useNavigate() // For navigation
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null)

  // Formik setup
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Username is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: async (values) => {
      try {
        // Send the POST request to the login API
        const response = await axios.post(
          `${import.meta.env.VITE_TASK_API_URL}/auth/login`,
          {
            username: values.username,
            password: values.password,
          }
        )

        // Check if login was successful and store the token
        if (response.status === 200 && response.data.token) {
          // Store token in localStorage or sessionStorage for authentication
          const token = response.data.token
          const decodedToken: DecodedToken = jwtDecode(token) // Decode the token to get the 'exp' field

          // Store token and its expiration time (in seconds)
          localStorage.setItem('authToken', token)
          localStorage.setItem(
            'tokenExpirationTime',
            decodedToken.exp.toString()
          )

          // Redirect to the dashboard or home page after successful login
          navigate('/dashboard') // Adjust the route as needed
        }
      } catch (error: any) {
        // Handle error (e.g., show an error message)
        if (error?.response?.data?.error) {
          // Show error from backend response
          setErrorMessage(error.response.data.error)
        } else {
          // Handle unexpected errors
          setErrorMessage('An unexpected error occurred. Please try again.')
        }
      }
    },
  })

  return (
    <div className='flex items-center justify-center min-h-screen bg-neutral-900 text-white'>
      <div className='w-full max-w-lg'>
        <div className='py-5'>
          <h1 className='text-pretty text-neutral-900 dark:text-neutral-100 text-lg font-semibold text-center mb-1'>
            Task Manager App
          </h1>
          <div className='w-12 h-0.5 bg-neutral-900 dark:bg-[#aaca1c] mx-auto'></div>
        </div>

        <h2 className='text-pretty text-neutral-900 dark:text-neutral-100 text-2xl font-semibold text-center'>
          Sign in to your account
        </h2>
        <span className='text-neutral-600 dark:text-neutral-400 text-sm block text-center py-2'>
          Don't have an account?{' '}
          <Link className='text-[#aaca1c] underline' to='/signup'>
            Sign up now
          </Link>
        </span>
        <div className='py-5'>
          <hr className='h-px bg-gray-200 border-0 bg-gray-700' />
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className='my-2'>
            <label className='py-1'>Username</label>
            <input
              type='text'
              name='username'
              className='w-full p-2 mt-2 rounded-sm border-1 border-gray-500 border-l-2 border-l-[#aaca1c] bg-black outline-none'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
            />
            {formik.touched.username && formik.errors.username && (
              <div className='text-red-500 text-sm'>
                {formik.errors.username}
              </div>
            )}
          </div>
          <div className='my-5'>
            <label className='py-1'>Password</label>
            <input
              type='password'
              name='password'
              className='w-full p-2 mt-2 rounded-sm border-1 border-gray-500 border-l-2 border-l-[#aaca1c] bg-black outline-none'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password && (
              <div className='text-red-500 text-sm'>
                {formik.errors.password}
              </div>
            )}
          </div>

          {/* Show error message if login failed */}
          {errorMessage && (
            <div className='text-red-500 text-sm mb-2'>{errorMessage}</div>
          )}

          <div className='my-5'>
            <button
              type='submit'
              className='mt-2 bg-[#aaca1c] w-full rounded-full text-gray-900 p-2 cursor-pointer'
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
