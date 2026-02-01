import { ChevronDown, Filter, X } from 'lucide-react'
import React, { useState } from 'react'
import { useNavigate, useSearchParams} from 'react-router-dom'

const FilterSideBar = ({mobileScreen,setMobileScreen,filters,setFilters}) => {

    const navigate=useNavigate();

    {/*input bar */}

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

   {/* dropdown*/}
    const[sectionsDropDown,setSectionsDropDown]=useState({
        platform:true,
        price:true,
        followers:true,
        niche:true,
        status:true
    })

    const handleDropDown=(section)=>{

        setSectionsDropDown((prev)=> ({...sectionsDropDown,[section]:!prev[section]}))
    }

    {/* platforms */}
    const platforms=[
        {value:"youtube",label:"Youtube"},
        {value:"instagram",label:"Instagram"},
        {value:"twitter",label:"Twitter"},
        {value:"facebook",label:"Facebook"},
        {value:"tiktok",label:"Tiktok"},
        {value:"linkedin",label:"LinkedIn"},
        {value:"discord",label:"Discord"},
    ]

    {/*to update the changed filters in the state */}
    const onFiltersChange=(newFilter)=>{
        setFilters({...filters,...newFilter})
    }

    {/* Niches */}

    const niches=[
        {value:"lifestyle",label:"Lifestyle"},
        {value:"fitness",label:"Fitness"},
        {value:"food",label:"Food"},
        {value:"travel",label:"Travel"},
        {value:"tech",label:"Technology"},
        {value:"gaming",label:"Gaming"},
        {value:"entertainment",label:"Entertainment"},
        {value:"fashion",label:"Fashion"},
        {value:"beauty",label:"Beauty"},
        {value:"business",label:"Business"},
        {value:"education",label:"Education"},
        {value:"music",label:"Music"},
        {value:"art",label:"Art"},
        {value:"sports",label:"Sports"},
        {value:"health",label:"Health"},
        {value:"finance",label:"Finance"},
    ]

    {/* filter clearing while clicking X*/}

    const onClearFilter =()=>{

        if(typeValue){
            navigate("/marketplace");
        }
        setFilters({
            platform:null,
            maxPrice:100000,
            minFollwers:0,
            niche:null,
            verified:false,
            monetized:null,
        })
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
                    <X className=' text-gray-500 cursor-pointer hover:text-gray-700 p-1 hover:bg-gray-100 rounded transition-colors' onClick={onClearFilter}/>
                    <button onClick={()=>setMobileScreen(false)} className='sm:hidden border text-sm text-gray-700 rounded px-3 py-1 '>
                        Apply
                    </button>

                </div>
            </div>

            
        </div>

        <div className='p-4 space-y-6 sm:max-h-[calc(100vh-200px)] overflow-y-scroll no-scrollbar'>
                
                {/* search bar*/}
                <div className='flex justify-between items-center'>
                    <input type="text" placeholder='Search Platforms like instagram, etc.' className='w-full border border-gray-500 px-3 py-2 text-black outline-indigo-500 rounded-md text-sm' onChange={onChangeHandle} value={searchValue}/>
                </div>


                {/* platform filter*/}

                <div>
                    <button onClick={()=>handleDropDown("platform")} className='flex mb-3 justify-between w-full items-center'>
                        <label className='text-sm font-medium text-gray-800'>Platform</label>
                        <ChevronDown className={`size-4 transition-transform ${sectionsDropDown.platform ? "rotate-180":""}`}/>
                    </button>

                     {sectionsDropDown.platform&&(
                    <div className='flex flex-col gap-2'>
                        {
                            platforms.map((platform)=>(
                                <label key={platform.value} className='flex items-center gap-1 text-gray-500 text-sm'>
                                    <input type="checkbox" checked={filters.platform?.includes(platform.value)||false}
                                    onChange={(e)=>{
                                        const checked=e.target.checked;
                                        const current =filters.platform||[];
                                        const updated = checked?[...current,platform.value]:current.filter((p)=> p!==platform.value)
                                        
                                        onFiltersChange({...filters,platform:updated.length>0 ? updated :null})

                                    }} />
                                    <span>{platform.label}</span>
                                </label>
                            ))
                        }
                    </div>
                )}

                </div>

                {/*price filter*/}

                <div>
                    <button onClick={()=>handleDropDown("price")} className='flex mb-3 justify-between w-full items-center'>
                        <label className='text-sm font-medium text-gray-800'>Price</label>
                        <ChevronDown className={`size-4 transition-transform ${sectionsDropDown.price ? "rotate-180":""}`}/>
                    </button>

                     {sectionsDropDown.price&&(
                    <div className='space-y-3'>
                        <input type="range" min="0" max="100000" step="100" value={filters.maxPrice || 100000}
                        onChange={(e)=>onFiltersChange({...filters,maxPrice:parseInt(e.target.value)})}
                        className='w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600'/>
                        
                        <div className='flex items-center justify-between text-sm text-gray-600'>
                            <span>$0</span>
                            <span>${(filters.maxPrice||100000).toLocaleString()}</span>
                        </div>
                    </div>
                )}

                </div>

                {/*Followers filter*/}

                 <div>
                    <button onClick={()=>handleDropDown("followers")} className='flex mb-3 justify-between w-full items-center'>
                        <label className='text-sm font-medium text-gray-800'>Minimum Foll0wers</label>
                        <ChevronDown className={`size-4 transition-transform ${sectionsDropDown.followers ? "rotate-180":""}`}/>
                    </button>

                     {sectionsDropDown.followers&&(
                    
                       <select className='w-full border px-3 py-2 border-gray-300 rounded-lg text-gray-700 outline-indigo-500' 
                        value={filters.minFollowers?.toString()||"0"}
                        onChange={(e)=>setFilters({...filters,minFollowers:parseFloat(e.target.value)|| 0})}>
                            <option value="0">Any Amount</option>
                            <option value="1000">1K+</option>
                            <option value="10000">10K+</option>
                            <option value="50000">50K+</option>
                            <option value="100000">100K+</option>
                            <option value="500000">500K+</option>
                            <option value="1000000">1M+</option>
                       </select>
                  
                )}

                </div>

                {/*Niche filter */}

                <div>
                    <button onClick={()=>handleDropDown("niche")} className='flex mb-3 justify-between w-full items-center'>
                        <label className='text-sm font-medium text-gray-800'>Niche</label>
                        <ChevronDown className={`size-4 transition-transform ${sectionsDropDown.niche ? "rotate-180":""}`}/>
                    </button>

                     {sectionsDropDown.niche&&(
                    
                       <select className='w-full border px-3 py-2 border-gray-300 rounded-lg text-gray-700 outline-indigo-500' 
                        value={filters.niche||""}
                        onChange={(e)=>setFilters({...filters,niche:e.target.value|| null})}>
                            <option value="all niche">All Niches</option>
                            {
                                niches.map((niche)=>(
                                    <option value={niche.value} key={niche.value}>{niche.label}</option>
                                ))
                            }
                           
                       </select>
                  
                )}

                </div>


                {/*Verification status */}

                <div>
                    <button onClick={()=>handleDropDown("status")} className='flex mb-3 justify-between w-full items-center'>
                        <label className='text-sm font-medium text-gray-800'>Account Status</label>
                        <ChevronDown className={`size-4 transition-transform ${sectionsDropDown.status ? "rotate-180":""}`}/>
                    </button>

                     {sectionsDropDown.status&&(
                    
                    <div className='text-sm text-gray-500'>
                        <label className='flex items-center space-x-2 cursor-pointer'>
                        <input type="checkbox" checked={filters.verified || false}
                        onChange={(e)=>setFilters({...filters,verified:e.target.checked})}/>
                        <span>Verified accounts only</span>
                      </label>

                      <label className='flex items-center space-x-2 cursor-pointer'>
                        <input type="checkbox" checked={filters.monetized || false}
                        onChange={(e)=>setFilters({...filters,monetized:e.target.checked})}/>
                        <span>monetized accounts only</span>
                      </label>
                    </div>
                      
                  
                )}

                </div>

               
            </div>
    </div>
  )
}

export default FilterSideBar