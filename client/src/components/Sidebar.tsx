const Sidebar = () => {
  return (
    <div className='w-1/6 py-4 fixed text-white text-center border-r border-gray-700 top-0 left-0 h-full flex flex-col justify-between'>
      <div>
        <h1 className='text-pretty text-neutral-900 dark:text-neutral-100 text-xl font-semibold text-center mb-1'>
          Task Manager App
        </h1>
        <div className='w-16 h-0.5 bg-neutral-900 dark:bg-[#aaca1c] mx-auto mb-4'></div>
      </div>

      {/* Centered Vertical Nav List */}
      <div className='flex flex-col items-start justify-center flex-grow space-y-4 mb-8'>
        <a
          href='#home'
          className='text-lg hover:text-[#aaca1c] w-full text-start p-3 bg-neutral-700 border-r-3 border-r-[#aaca1c]'
        >
          All Tasks
        </a>
        <a
          href='#tasks'
          className='text-lg hover:text-[#aaca1c] w-full text-start p-3'
        >
          Pending
        </a>
        <a
          href='#projects'
          className='text-lg hover:text-[#aaca1c] w-full text-start p-3'
        >
          In-Progress
        </a>
        <a
          href='#settings'
          className='text-lg hover:text-[#aaca1c] w-full text-start p-3'
        >
          Done
        </a>
      </div>

      {/* Footer */}
      <span className='absolute bottom-0 left-0 right-0 m-2 text-center text-pretty'>
        Made by <span className='text-[#aaca1c]'>Shahzaib Javaid</span> for
        <div className='flex justify-center items-center space-x-0'>
          <img src='/eclogo.png' className='w-auto h-10 flex-shrink-0' />
          <img src='/ectext.png' className='w-auto h-10 flex-shrink-0' />
        </div>
      </span>
    </div>
  )
}

export default Sidebar
