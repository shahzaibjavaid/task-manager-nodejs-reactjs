import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'

interface FormValues {
  username: string
  password: string
  confirmPassword: string
}

const Signup = () => {
  const navigate = useNavigate() // For navigation
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null)
  const [successMessage, setSuccessMessage] = React.useState<string | null>(
    null
  )

  const formik = useFormik<FormValues>({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Username is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
        .required('Confirm password is required'),
    }),
    onSubmit: async (values) => {
      try {
        // Send the POST request to the API
        const response = await axios.post(
          `${import.meta.env.VITE_TASK_API_URL}/auth/register`,
          {
            username: values.username,
            password: values.password,
          }
        )

        // Check if registration was successful
        if (response.status === 201) {
          // Show success message
          setSuccessMessage('Registration successful! Redirecting to login...')

          // Delay the navigation to the login page
          setTimeout(() => {
            navigate('/login')
          }, 2000) // Delay for 2 seconds before navigating
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
          Create a new account
        </h2>
        <span className='text-neutral-600 dark:text-neutral-400 text-sm block text-center py-2'>
          Already have an account?{' '}
          <Link className='text-[#aaca1c] underline' to='/login'>
            Sign in
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
          <div className='my-5'>
            <label className='py-1'>Confirm Password</label>
            <input
              type='password'
              name='confirmPassword'
              className='w-full p-2 mt-2 rounded-sm border-1 border-gray-500 border-l-2 border-l-[#aaca1c] bg-black outline-none'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
            />
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <div className='text-red-500 text-sm'>
                  {formik.errors.confirmPassword}
                </div>
              )}
          </div>

          {/* Show error message if registration failed */}
          {errorMessage && (
            <div className='text-red-500 text-sm mb-2'>{errorMessage}</div>
          )}

          {/* Show success message if registration was successful */}
          {successMessage && (
            <div className='text-green-500 text-sm mb-2'>{successMessage}</div>
          )}

          <div className='my-5'>
            <button
              type='submit'
              className='mt-2 bg-[#aaca1c] w-full rounded-full text-gray-900 p-2 cursor-pointer'
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup
