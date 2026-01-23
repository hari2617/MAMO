import { FilterIcon, X } from 'lucide-react'
import React from 'react'

const FilterSideBar = ({mobileScreen,setMobileScreen}) => {
  return (
    <div className={`${mobileScreen ? "max-sm:fixed" : "max-sm:hidden"}   md:min-w-[300px`}>
        <div className='border border-b-stone-950 rounded-2xl p-4'>
            <div className='flex justify-between items-center'>
                <div className='flex items-center space-x-2 text-gray-500'>
                    <FilterIcon className='size-4'/>
                    <h3 className='font-semibold text-gray-500'>Filters</h3>
                </div>
                <div className='flex items-center gap-3' >
                    <X className=' text-gray-500 cursor-pointer hover:text-gray-700 p-1 hover:bg-gray-100 rounded transition-colors'/>
                    <button className='sm:hidden border text-sm text-gray-500 rounded-full border-gray-950'>
                        Apply
                    </button>

                </div>
            </div>
        </div>
    </div>
  )
}

export default FilterSideBar