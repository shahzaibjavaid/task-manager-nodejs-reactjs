import { useState } from 'react'

const TopBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen)

  return (
    <div className='bg-neutral-900 h-[6%] text-white p-4 border-b border-gray-700 flex items-center gap-4'>
      {/* Search Bar */}
      <input
        type='text'
        placeholder='Search...'
        className='flex-1 bg-neutral-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 max-w-2xl'
      />

      {/* Dropdown with Icon */}
      <div className='relative ml-auto'>
        <button
          onClick={toggleDropdown}
          className='flex items-center gap-2 bg-neutral-800 px-3 py-2 rounded-lg hover:bg-neutral-700'
        >
          <span>Options</span>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-5 w-5'
            viewBox='0 0 20 20'
            fill='currentColor'
          >
            <path
              fillRule='evenodd'
              d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
              clipRule='evenodd'
            />
          </svg>
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className='absolute right-0 mt-2 w-40 bg-neutral-800 text-white rounded-lg shadow-lg'>
            <ul className='py-2'>
              <li className='px-4 py-2 hover:bg-neutral-700 cursor-pointer'>
                Profile
              </li>
              <li className='px-4 py-2 hover:bg-neutral-700 cursor-pointer'>
                Settings
              </li>
              <li className='px-4 py-2 hover:bg-neutral-700 cursor-pointer'>
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default TopBar
