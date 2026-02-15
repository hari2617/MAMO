import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { dummyChats } from '../assets/assets';
import { Loader2Icon, X } from 'lucide-react';
import { clearChat } from '../app/features/chatSlice';
import {format} from 'date-fns'

const ChatBox = () => {

const dispatch=useDispatch();

const {listing,isOpen,chatId} =useSelector((state)=>state.chat);

const user={id:'user_2'}

const [chat,setChat]=useState(null);
const [messages,setMessages] =useState([]);
const [newMessages,setNewMessages]=useState("");
const [isLoading,setIsLoading]=useState(true);
const [isSending,setIsSending]=useState(false);

const fetchChat=async ()=>{
    setChat(dummyChats[0]);
    setMessages(dummyChats[0].messages);
    setIsLoading(false);
}

useEffect(()=>{
    if(listing){
        fetchChat()
    }
},[listing])

if(!listing || !isOpen) return null;


  return (
    <div className='fixed inset-0 bg-black/70 bg-opacity-50 backdrop:blur-md z-100 flex items-center justify-center sm:p-4 '>

        <div className='bg-white w-full max-w-2xl h-screen sm:h-150 sm:rounded-lg shadow-2xl flex flex-col '>
            {/*Header*/}
            <div className='bg-gradient-to-r from-indigo-600 to-indigo-400 text-white sm:rounded-t-lg p-4 flex flex-between items-center'>
                    <div className='flex-1'>
                        <h3>{listing?.title}</h3>
                        <p className='text-sm text-indigo-100'>{user.id===listing?.ownerId? `Chatting with Buyer(${chat?.chatUser?.name || 'Loading...'})`: `Chatting with seller(${chat?.ownerUser?.name || 'Loading...'})`}</p>
                    </div>
                    <button onClick={()=>dispatch(clearChat())} className='hover:bg-white/20 ml-4 p-1 hover:bg-opacity-20 rounded-lg transition-colors'>
                        <X className='w-5 h-5'/>
                    </button>
            </div>

             {/*Message are*/}

             <div className='flex-1 space-y-4 overflow-y-auto p-4 bg-gray-100'>
                    {
                        isLoading? (
                            <div className='flex items-center justify-center h-full'>
                                <Loader2Icon className='size-6 animate-spin text-indigo-600'/>
                            </div>
                        ):messages.length===0?(
                            <div className='flex justify-center items-center h-full'>
                                <div className='text-center'>
                                    <p className=' text-gray-600'>No Messages yet</p>
                                    <p className='text-sm text-gray-400'>Start the conversation</p>
                                </div>

                            </div>
                        ):(
                            
                            messages.map((msg)=>(

                                <div key={msg.id} className={`flex ${user.id==msg.sender_id? 'justify-end':'justify-start'}`}>
                                        <div className={`max-w-[70%] p-3 pb-1 rounded-lg ${msg.sender_id===user.id? 'bg-indigo-600 text-white':'bg-white border border-gray-200 text-gray-700'}`}>
                                            <p className='text-sm wrap-break-word whitespace-pre-wrap'>{msg.message}</p>
                                            <p className={`text-[10px] pt-1 ${user.id===msg.sender_id ? 'text-indigo-200' : 'text-gray-400'}`}>{format(new Date(msg.createdAt),"MMM d 'at' h:mm a")}</p>
                                        </div>
                                </div>

                            ))
                            
                        )
                    }
             </div>

        </div>

    </div>
  )
}

export default ChatBox