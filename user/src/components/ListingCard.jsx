import React from 'react'
import { platformIcons } from '../assets/assets'
import { BadgeCheck,LineChart,MapPin,User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'



const ListingCard = ({listing}) => {

const navigate=useNavigate();

  return (
    <div className='relative bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-md transition'>
        {
            listing.featured&&(
              <>
              <p className='py-1'/>
              <div className='absolute top-0 w-full bg-linear-to-r from-pink-500 to-purple-500 text-white text-center text-xs font-semibold py-1 tracking-wide uppercase'>
                Featured
              </div>
              </>
              
            )
        }

        <div className='pt-8 p-5' >
          <div className='flex items-center gap-3'>
                {platformIcons[listing.platform]}

                <div className='flex flex-col'>
                    <h2>{listing.title}</h2>
                    <p className='text-gray-600 text-[14px]'>@{listing.username} - <span className='capitalize'>{listing.platform}</span></p>

                </div>
                {listing.verified&& <BadgeCheck className='text-green-500 ml-auto w-5 h-5'/>}
          </div>

          <div className='flex flex-wrap justify-between items-center my-5 max-w-lg gap-3'>

              <div className='flex  text-sm items-center text-gray-600'>

                 <User className='size-6 text-gray-400 mr-1'/>
                 <span className='text-lg font-median text-gray-900 mr-1 '>{listing.followers_count}</span>
                 followers

              </div>

              {
                listing.engagement_rate&&(
                  <div className='flex text-sm items-center text-gray-600'>
                     <LineChart className='size-6 text-gray-400 mr-1'/>
                     <span className='text-lg font-median text-gray-900 mr-1 '>{listing.engagement_rate}</span>
                     % engagement
                  </div>
                )
              }
          </div>

          <div className='flex gap-3 items-center mb-3'>
            <span className='bg-pink-100 py-1 capitalize text-pink-600 rounded-full text-xs font-medium p-3'>{listing.niche}</span>
            {
              listing.country&&(
                <div className='flex text-sm text-gray-500 items-center gap-1'>
                  <MapPin className='size-6 text-gray-500 mr-1'/>
                  {listing.country}
                </div>
              )
            }
          </div>
  
          <p className='text-xs text-gray-500 line-clamp-2 my-4 '>{listing.description}</p>

          <hr className='text-gray-200 my-4'/>

          <div className='flex justify-between gap-3 mt-5 items-center'>

              <div className='flex flex- text-xs text-gray-500'>
                <span className='text-2xl font-medium text-gray-800'>
                  ${listing.price}
                </span>
              </div>

              <div >
                <button className="bg-blue-600 text-white rounded-2xl p-3 px-4 text-sm"  onClick={()=> {navigate(`/listings/${listing.id}`); scrollTo(0,0) } }>More Details</button>
              </div>
          </div>

          
        </div>
    </div>
  )
}

export default ListingCard