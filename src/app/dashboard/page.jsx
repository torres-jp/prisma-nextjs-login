'use client'

function DashBoardPage() {
  return (
    <section className='h-screen flex justify-center items-center text-red-500 text-4xl font-bold'>
      <div>
        <h1 className='text-white text-5xl'>DashBoard Page</h1>
        <button className='bg-white text-black px-4 rounded-md mt-4'>
          Logout
        </button>
      </div>
    </section>
  )
}

export default DashBoardPage
