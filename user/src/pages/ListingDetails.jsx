import React, { useEffect, useState } from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {ArrowLeftIcon, ArrowUpRightFromSquareIcon, Loader2Icon} from 'lucide-react'
import { getProfileLink, platformIcons } from '../assets/assets'


const ListingDetails = () => {


  const navigate=useNavigate();
  const [listing,setListing]=useState(null);

  

  const{listings}=useSelector((state)=>state.listing)
  
  const {listingId}=useParams();

  useEffect(()=>{
    const list=listings.find((listing)=>listing.id===listingId)

    if(list){
    setListing(list);
  }
  },[listingId,listings])

  const platformLink =listing && getProfileLink(listing.platform,listing.username)

  return listing? (
    <div className='min-h-screen mx-auto px-6 md:px-16 lg:px-24 xl:px-32'>
      {/* Back button */}
      <button className='flex items-center gap-2  text-slate-600 py-5' 
      onClick={()=>navigate(-1)}>
        <ArrowLeftIcon className='size-4 text-gray-600'/> Back to Previous page
      </button>

      {/* */}

      <div className='flex flex-start gap-10 max-md:flex-col'>
        <div className='flex-1 max-md:w-full'>
            <div className='gap-2 bg-white rounded-xl border border-gray-200 p-6 mb-5'>
              <div className='flex items-center gap-3'>
                  <div className='p-2 rounded-xl'>{platformIcons[listing.platform]}</div>
                  <div>
                    <h2 >{listing.title} 
                      <Link to={platformLink}><ArrowUpRightFromSquareIcon className='size-4 text-indigo-600'/></Link> 
                    </h2>
                  </div>
              </div>
              
            </div>
        </div>
        <div></div>
      </div>

    </div>
  ):(
    <div className='h-screen  flex justify-center items-center'>
      <Loader2Icon className="size-7 animate-spin text-indigo-600"/>
    </div>
  )
}

export default ListingDetails