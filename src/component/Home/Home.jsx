import React from 'react'

function Home({wallets}) {
  return (
    <>
    <div className='text-white flex flex-col'>
        <div >{wallets[0].address}</div>
    </div>
    </>
  )
}

export default Home