import TopBar from './Topbar'
import Sidebar from './Sidebar'
const HomePage = () => {
  return (
    <div className='flex h-screen bg-neutral-900'>
      <Sidebar />
      <div className='flex-1 ml-[16.6667%]'>
        <TopBar />

        {/* Scrollable Grid Panel */}
        <div className='p-5 h-[calc(100vh-6%)] overflow-y-auto'>
          <div className='flex mb-5'>
            <div>
              <h2 className='text-gray-100 text-xl font-semibold'>All Tasks</h2>
              <div className='w-10 h-0.5 bg-neutral-900 dark:bg-[#aaca1c] mt-1'></div>
            </div>
            <button className='text-white ml-auto'>Add</button>
          </div>

          <div className='grid grid-cols-4 gap-5'>
            {/* Example Grid Boxes */}
            {[...Array(20)].map((_, index) => (
              <div
                key={index}
                className='bg-gray-300 p-4 rounded-lg min-h-64 shadow'
              >
                <p>Box {index + 1}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
