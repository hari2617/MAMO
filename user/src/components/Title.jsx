import React from 'react'

const Title = ({title,description}) => {
  return (
    <div>
        <div className='flex items-center text-center flex-col mb-5'>
            <h3 className='font-medium text-2xl text-gray-900 '>{title}</h3>
            <p className='text-slate-600  md:max-w-110 max-w-95'>{description}</p>
        </div>

       
    </div>
    
  )
}

export default Title