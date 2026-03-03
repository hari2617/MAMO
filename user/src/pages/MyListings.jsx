import { CheckCircle, DollarSign, Eye, Plus, TrendingUp } from 'lucide-react';
import React from 'react'
import { useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import StatCard from '../components/StatCard';

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
        <StatCard title='Total Vakue' value={soldListings} icon={<DollarSign className='size-6 text-yellow-600'/>} color='yellow'/>      
      </div>
        
    </div>
  )
}

export default MyListings