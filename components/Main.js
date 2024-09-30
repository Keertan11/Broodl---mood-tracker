import React from 'react'

const Main = (props) => {
    const {children} = props
  return (
    <main className='flex-1 flex flex-col mx-4'>
        {children}
    </main>
  )
}

export default Main
