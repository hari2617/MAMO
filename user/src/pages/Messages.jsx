import React, { useEffect, useState } from 'react'
import { dummyChats } from '../assets/assets';
import { MessageCircle, Search } from 'lucide-react';


const Messages = () => {

  const [chats,setChats] =useState([]);
  const [searchQuery,setSearchQuery] =useState("");
  const [loading,setLoading] =useState(true);

  const fetchChats =async ()=>{
    setChats(dummyChats);
    setLoading(false);
  }

  useEffect(()=>{
    fetchChats();

    const interval=setInterval(()=>{
      fetchChats();
    },10*1000);
    return()=>clearInterval(interval);
  },[])



  return (
    <div className='mx-auto min-h-screen px-6 md:px-16 lg:px-24 xl:px-32'>
        <div className='py-10' >
          {/*Header */}
          <div>
            <h1 className='text-3xl font-bold text-gray-800 mb-2'>Messages</h1>
            <p className='text-sm text-gray-500'>Chat with Buyers and Sellers</p>
          </div>

          {/*Search*/}
          <div className='relative max-w-xl mb-8 mt-8'>
            <Search className='absolute left-3 top-1/2 transform  -translate-y-1/2 
              text-gray-400 w-5 h-5'/>
              <input type="text" placeholder='Search conversations....' value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)} 
                className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-indigo-500'/>
          </div>

          {/*chat list*/}
          {loading? ( 
            <div className='text-center text-gray-500 py-20'>
              Loading messages.....
            </div>
          ): chats.length===0?(
            <div className='bg-white p-14 border border-gray-200 rounded-2xl shadow-xs text-center'>
              <div className='w-16 h-16 flex items-center justify-center rounded-full bg-gray-100 mx-auto mb-4'>
                  <MessageCircle className='w-8 h-8 text-gray-400'/> 
              </div>
              <h3 className='text-xl font-medium mb-3 text-gray-800'>{searchQuery?'No Chats Found':'No Messages Yet'}</h3>
            </div>
          ):()}

        </div>
    </div>
  )
}

export default Messages