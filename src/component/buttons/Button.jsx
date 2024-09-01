import React from 'react'

function Button({name,handler}) {
  return (
    <button 
    onClick={handler}
    className='bg-blue-800 w-96 h-12 rounded-md'>
          {name}
        </button>
  )
}

export default Button