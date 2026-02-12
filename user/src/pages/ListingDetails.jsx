import React, { useEffect, useState } from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {ArrowLeftIcon, ArrowUpRightFromSquareIcon, Calendar, CheckCircle2, ChevronLeftIcon, ChevronRightIcon, DollarSign, Eye, LineChart, Loader2Icon, Users} from 'lucide-react'
import { getProfileLink, platformIcons } from '../assets/assets'


const ListingDetails = () => {


  const navigate=useNavigate();
  const [listing,setListing]=useState(null);

  

  const{listings}=useSelector((state)=>state.listing)
  
  const {listingId}=useParams();

  useEffect(()=>{
    const list=listings.find((listing)=>listing.id===listingId)

    //hhihi
    if(list){
    setListing(list);
  }
  },[listingId,listings])

  const platformLink =listing && getProfileLink(listing.platform,listing.username)

  const[current,setCurrent]=useState(0);

  const images=listing?.images||[]; 

  const prev = ()=> setCurrent((curr)=> curr==0?images.length-1:curr-1)

  const next = ()=> setCurrent((curr)=> curr==images.length-1?0:curr+1)

  return listing? (
    <div className='min-h-screen mx-auto px-6 md:px-16 lg:px-24 xl:px-32'>
      {/* Back button */}
      <button className='flex items-center gap-2  text-slate-600 py-5' 
      onClick={()=>navigate(-1)}>
        <ArrowLeftIcon className='size-4 text-gray-600'/> Back to Previous page
      </button>

    

      <div className='flex flex-start gap-10 max-md:flex-col'>
        <div className='flex-1 max-md:w-full'>
          
            {/*Top section */}
            <div className='gap-2 bg-white rounded-xl border border-gray-200 p-6 mb-5'>
              
              <div className='flex flex-col md:flex-row md:items-end md:justify-between gap-4'>

              <div className='flex items-center gap-3'>
                  <div className='p-2 rounded-xl'>{platformIcons[listing.platform]}</div>
                  <div >
                    <h2 className='flex items-center gap-2 text-gray-800 font-medium text-xl'>{listing.title} 
                      <Link to={platformLink}><ArrowUpRightFromSquareIcon className='size-4 hover:text-indigo-400'/></Link> 
                    </h2>
                    <p className='text-gray-500 text-sm mt-1'>
                      @{listing.username} • {listing.platform?.charAt(0).toUpperCase()+listing.platform?.slice(1)}
                    </p>

                    <div className='flex gap-2 mt-2'>
                      {listing.verified && (
                        <span className='flex items-center text-sm bg-indigo-50 text-indigo-600 rounded-md py-1 px-2'>
                            <CheckCircle2 className='size-4 mr-1'/>
                            Verified
                        </span>
                      )}

                      {listing.monetized && (
                        <span className='flex items-center text-sm bg-green-50 text-green-600 rounded-md py-1 px-2'>
                            <DollarSign className='size-4 mr-1'/>
                            Monetized
                        </span>
                      )}
                    </div>

                  </div>
              </div>

              <div className='text-right'>
                <h1 className='font-bold text-xl text-gray-800'>${listing.price?.toLocaleString()}</h1>
                <p className='text-gray-500 text-sm'>USD</p>
              </div>

              </div>
              
            </div>

            {/*Screenshot section*/}
            {images?.length>0 && (

            <div className='bg-white rounded-2xl border border-gray-200 overflow-hidden mb-5'>
              <div className='p-4'>
                <h4 className='font-semibold text-gray-800'>Screenshots & Proof</h4>
              </div>

              {/*slide container*/}
              <div className='relative w-full aspect-video overflow-hidden'>
                    <div className='flex transition-transform duration-300 ease-in-out'
                    style={{transform:`translateX(-${current*100}%)`}}>
                      {
                        images.map((img,index)=>(
                          <img key={index} src={img} alt="Listing Proof" 
                          className='w-full shrink-0'/>
                        ))
                      }
                    </div>

                    {/*Navigation Buttons*/}
                    <button onClick={prev} className='absolute left-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow'>
                        <ChevronLeftIcon className='size-4 text-gray-700'/> 
                    </button>

                    <button onClick={next} className='absolute right-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow'>
                        <ChevronRightIcon className='size-4 text-gray-700'/> 
                    </button>
              </div>

              

            </div>
            )}

            {/*account metrics*/}
            <div className='border border-gray-200 rounded-2xl bg-white mb-4'>
              <div className='border-b border-gray-100 p-4'>
                <h4 className='font-medium text-gray-800'>Account Metrics</h4>
              </div>

              <div className='grid grid-cols-2 md:grid-cols-4 gap-4 p-4 text-center'>
                      <div>
                        <Users className='size-5 text-gray-400 mx-auto mb-1'/>
                        <p className='text-gray-800 font-medium '>{listing?.followers_count.toLocaleString()}</p>
                        <p className='text-xs text-gray-500'>followers</p>
                      </div>
                      <div>
                        <LineChart className='size-5 text-gray-400 mx-auto mb-1'/>
                        <p className='text-gray-800 font-medium '>{listing?.engagement_rate}%</p>
                        <p className='text-xs text-gray-500'>engagement</p>
                      </div>
                      <div>
                        <Eye className='size-5 text-gray-400 mx-auto mb-1'/>
                        <p className='text-gray-800 font-medium '>{listing?.monthly_views.toLocaleString()}</p>
                        <p className='text-xs text-gray-500'>Monthly views</p>
                      </div>
                      <div>
                        <Calendar className='size-5 text-gray-400 mx-auto mb-1'/>
                        <p className='text-gray-800 font-medium '>{new Date(listing.createdAt).toLocaleDateString()}</p>
                        <p className='text-xs text-gray-500'>Listed</p>
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