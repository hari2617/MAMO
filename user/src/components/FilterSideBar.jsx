import { Filter, X } from 'lucide-react'
import React from 'react'

const FilterSideBar = ({mobileScreen,setMobileScreen}) => {
  return (
    <div className={`${mobileScreen ? "max-sm:fixed" : "max-sm:hidden"}  z-100 max-sm:h-screen max-sm:inset-0 max-sm:overflow-scroll bg-white rounded-lg  md:min-w-[300px] shadow-sm border border-gray-200 h-fit sticky top-24`}>
        <div className='border border-gray-200  p-4'>
            <div className='flex justify-between items-center'>
                <div className='flex items-center space-x-2 text-gray-700'>
                    <Filter className='size-4'/>
                    <h3 className='font-semibold text-gray-500'>Filters</h3>
                </div>
                <div className='flex items-center gap-2' >
                    <X className=' text-gray-500 cursor-pointer hover:text-gray-700 p-1 hover:bg-gray-100 rounded transition-colors'/>
                    <button onClick={()=>setMobileScreen(false)} className='sm:hidden border text-sm text-gray-700 rounded px-3 py-1 '>
                        Apply
                    </button>

                </div>
            </div>
        </div>
    </div>
  )
}

export default FilterSideBar