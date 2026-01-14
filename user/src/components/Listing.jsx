import React from 'react'
import Title from './Title';
import {useSelector} from 'react-redux'
import ListingCard from './ListingCard';


const Listing = () => {
  
  const {listings } =useSelector(state=> state.listing)
    return (
    <>

    <div className='mt-20 mb-15'>
        <Title title="Latest Listings" description="Discover the hottest social profiles available right now."/>
    </div>

   <div className='flex flex-col gap-7 px-5'>
    {
        listings.slice(0,4).map((listing,index)=>(
            <div key={index} className='mx-auto w-full max-w-3xl rounded-3xl'>
                 <ListingCard listing={listing}/>
            </div>
        ))
    }
   </div>
    </>
    
  )
}

export default Listing