import { Link } from 'react-router-dom'

const Login = () => {
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
        <form>
          <div className='my-2'>
            <label className='py-1'>Username</label>
            <input
              type='text'
              name='username'
              className='w-full p-2 mt-2 rounded-sm border-1 border-gray-500 border-l-2 border-l-[#aaca1c] bg-black outline-none'
            />
          </div>
          <div className='my-5'>
            <label className='py-1'>Password</label>
            <input
              type='text'
              name='username'
              className='w-full p-2 mt-2 rounded-sm border-1 border-gray-500 border-l-2 border-l-[#aaca1c] bg-black outline-none'
            />
          </div>
          <div className='my-5'>
            <button className='mt-2 bg-[#aaca1c] w-full rounded-full text-gray-900 p-2 cursor-pointer'>
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
