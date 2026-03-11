import { ArrowDownCircleIcon, CheckCircle, CoinsIcon, DollarSign, Eye, Plus, StarIcon, TrendingUp, WalletIcon } from 'lucide-react';
import React from 'react'
import { useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import StatCard from '../components/StatCard';
import { platformIcons } from '../assets/assets';


const MyListings = () => {

  const {userListings,balance} =useSelector((state)=>state.listing);
  const navigate=useNavigate();

  const totalValue = userListings.reduce((sum,listing)=>sum+(listing.price || 0),0)
  const activeListings = userListings.filter((listing)=>listing.status==='active').length
  const soldListings = userListings.filter((listing)=>listing.status==='sold').length;

  return (
    <div className='px-4 md:px-16 lg:px-24 xl:px-32 pt-8'>

      {/*Header*/}
      <div className='flex flex-col md:flex-row mditems-center items-start justify-between mb-8'>
        <div>
          <h1 className='font-bold text-3xl text-gray-800 mb-1'>My Listings</h1>
          <p className='mb-1 text-gray-500'>Manage your social media account listings</p>
        </div>

        <button onClick={()=>navigate('/create-listing')} className='bg-indigo-600 hover:bg-indigo-700 rounded-lg  px-4 font-medium space-x-2 mt-4 md:mt-0 py-2 flex items-center  text-white'>
          <Plus className='h-4 w-4'/>
          <span>New Listing</span>
        </button>
      </div>
      
      {/*stats*/}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-6 mb-8'>
        <StatCard title='Total Listing' value={userListings.length} icon={<Eye className='size-6 text-indigo-600'/>} color='indigo'/>
        <StatCard title='Active Listing' value={activeListings} icon={<CheckCircle className='size-6 text-green-600'/>} color='green'/>
        <StatCard title='Sold' value={soldListings} icon={<TrendingUp className='size-6 text-indigo-600'/>} color='indigo'/>
        <StatCard title='Total Value' value={`$${soldListings}`} icon={<DollarSign className='size-6 text-yellow-600'/>} color='yellow'/>      
      </div>
        

      {/*Balance sheet*/}
      <div className='flex flex-col sm:flex-row mb-10 xl:gap-20 gap-4 border border-gray-200 p-6 justify-between bg-white rounded-xl'>

        {
          [ {label:'Earned',value:balance.earned,icon:WalletIcon},
            {label:'Withdrawn',value:balance.withdrawn,icon:ArrowDownCircleIcon},
            {label:'Available',value:balance.available,icon:CoinsIcon}
          ].map((item,index)=>(
            <div key={index} className='border rounded-xl border-gray-100 flex-1 p-4 flex justify-between items-center cursor-pointer'>
              <div className='flex items-center gap-3'>
                  <item.icon className='text-gray-500 w-6 h-6'/>
                  <p className='text-md font-medium text-gray-600'>{item.label}</p>
              </div>

              <span className='font-semibold text-xl text-gray-800'>
                ${item.value.toFixed(2)}
              </span>
            </div>
          ))
        }
      </div>

      {/*Listings*/}
      {
        userListings.length===0?
        (
          <div className='border border-gray-200 rounded-lg p-16 text-center '>
              <div className='w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <Plus className='size-8 text-gray-400'/>
              </div>
              <h3 className='text-xl font-medium mb-2 text-gray-800'>No Listings Yet</h3> 
              <p className='mb-5 text-gray-600 text-md'>start by creating your first listing</p>
              <button onClick={()=>navigate('/create-listing')} className='rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-2'>Create First Listing</button>
          </div>
        ):
        (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>

            {
              userListings.map((listing)=>(
                <div key={listing.id} className='bg-white border border-gray-200 rounded-lg hover:shadow-lg shadow-gray-200/70 transition-shadow'>
                    <div className='p-6'>
                        <div className='flex items-start justify-between gap-4 mb-4'>
                            {platformIcons[listing.platform]}
                            <div className='flex-1'>
                                <div className='flex justify-between  items-start'>
                                  <h3 className='text-lg font-semibold text-gray-800'>{listing.title}</h3>
                                  <div className='flex items-center gap-2'>
                                        <div></div>
                                        {listing.status==='active'&&(
                                          <StarIcon size={18} className={`text-yellow-500 cursor-pointer ${listing.featured&&"fill-yellow-500"}`}/>
                                        )}
                                  </div>
                                </div>

                                <p className='text-sm text-gray-500'>@{listing.username}</p>
                            </div>
                        </div>
                    </div>
                </div>
              ))
            }

          </div>
        )
      }
    </div>
  )
}

export default MyListings