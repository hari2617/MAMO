import React from 'react'
import {PricingTable} from '@clerk/clerk-react'
const Plans = () => {
  return (
    <div className='max-w-2xl mx-auto  my-24 '>
        <div className='text-center'>
            <h2 className='font-medium text-4xl text-gray-800'>Choose your plan</h2>
            <p className='text-gray-600 text-sm max-w-md mx-auto mt-2'>Start for free and scale up as you grow. Find the perfect plans for you content creation needs.</p>
        </div>

        <div className='my-10'>
            <PricingTable />
        </div>
    </div>
  )
}

export default Plans