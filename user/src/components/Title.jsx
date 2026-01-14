import React from 'react'

const Title = ({title,description}) => {
  return (
    <div className='flex items-center flex-col mb-8'>
        <h3 className='font-bold text-2xl text-gray-800 '>{title}</h3>
        <p className='text-slate-600  md:max-w-110 max-w-95'>{description}</p>
    </div>
  )
}

export default Title