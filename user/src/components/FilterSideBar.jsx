import { Filter, X } from 'lucide-react'
import React, { useState } from 'react'
import { useNavigate, useSearchParams} from 'react-router-dom'

const FilterSideBar = ({mobileScreen,setMobileScreen}) => {

    const navigate=useNavigate();

    const[typeValue,setTypeValue] =useSearchParams();
    const[searchValue,setSearchValue] = useState(typeValue.get("search")||"");

   const onChangeHandle =(e)=>{

    if(e.target.value){
        setSearchValue(e.target.value);
        setTypeValue({search:e.target.value})
    }else{
        navigate("/marketplace");
        setSearchValue("");
    }
   }
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

        <div className='p-4 space-y-6 sm:max-h-[calc(100vh-200px)] overflow-y-scrollno-scrollbar'>
                
                {/* search bar*/}
                <div className='flex justify-between items-center'>
                    <input type="text" placeholder='Search Platforms like instagram, etc.' className='w-full border border-gray-500 px-3 py-2 text-black outline-indigo-500 rounded-md text-sm' onChange={onChangeHandle} value={searchValue}/>
                </div>
            </div>
    </div>
  )
}

export default FilterSideBar