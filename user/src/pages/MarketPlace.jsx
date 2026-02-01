import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {ArrowLeftIcon,FilterIcon} from 'lucide-react'
import {useSelector} from 'react-redux'
import ListingCard from '../components/ListingCard';
import FilterSideBar from '../components/FilterSideBar';

const MarketPlace = () => {

   const {listings } =useSelector(state=> state.listing)
   const [mobileScreen,setMobileScreen]=useState(false)

   const [filters,setFilters]=useState({
      platform:null,
      maxPrice:100000,
      minFollwers:0,
      niche:null,
      verified:false,
      monetized:null,
   })

  
  const filteresListing=listings.filter((listing)=>{return true})
  const navigate=useNavigate()
  return (
    <div className='px-7 md:px-16  lg:px-24 xl:px-32' >
       <div className='flex justify-between items-center text-gray-500'>
        <button onClick={()=> navigate('/')} className='flex gap-1 items-center py-5'>
          <ArrowLeftIcon className='size-4'/>
          Back to home</button>
        <button className='flex gap-3 items-center py-5 sm:hidden' onClick={()=>setMobileScreen(true)}>
          <FilterIcon />
          Filter</button>
       </div>


       <div className='flex relative gap-8 pb-8 items-start justify-between'>
          <div >
            <FilterSideBar mobileScreen={mobileScreen} setMobileScreen={setMobileScreen} filters={filters} setFilters={setFilters}/>
          </div>
          <div className='flex-1 gap-4 grid xl:grid-cols-2'>
                {
                  filteresListing.sort((a,b)=>a.featured?-1:b.featured?1:0).map((list,index)=>(
                    <ListingCard listing={list} key={index}/> 
                  ))
                }
          </div>
       </div>
    </div>
  )
}

export default MarketPlace