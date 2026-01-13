import React from 'react'
import logo from "../assets/logo-mamo.png";
import { Link, useNavigate } from 'react-router-dom';
import { useClerk, useUser, UserButton } from '@clerk/clerk-react';
import {BoxIcon, GripIcon,ListIcon,MessageCircleMoreIcon} from 'lucide-react'


const Navbar = () => {
    const {user}=useUser();
    const {openSignIn}=useClerk();

    const navigate=useNavigate()

    const [menuOpen, setMenuOpen] = React.useState(false)
  return (
    <div>
         <nav className='h-20'>
                <div className='fixed left-0 top-0 right-0 z-100 flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white transition-all'>
                    <img onClick={()=>{navigate('/'); scrollTo(0,0)}} src={logo} className="h-9 w-[100] cursor-pointer" alt="" />
                    

                    {/* Desktop Menu */}
                    <div className='hidden sm:flex items-center gap-4 md:gap-8 max-md:text-sm text-gray-800'>
                        <Link href="#" to={'/'} onClick={() => scrollTo(0, 0)}> Home </Link>
                        <Link href="#" to={'/marketplace'} onClick={() => scrollTo(0, 0)}> Marketplace </Link>
                        <Link href="#" to={user?'/messages':'#'} onClick={() =>user? scrollTo(0, 0):openSignIn()}> Messages </Link>
                        <Link href="#" to={user?'/my-listings':'#'} onClick={() => user?scrollTo(0, 0):openSignIn()}> My Listings </Link>
                    </div>

                    {!user?( <div>
                        <button onClick={()=>openSignIn()} className='max-sm:hidden cursor-pointer px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full'>Login</button>
                        <svg onClick={() => setMenuOpen(true) } xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sm:hidden"><path d="M4 5h16" /><path d="M4 12h16" /><path d="M4 19h16" /></svg>
                    </div>):(
                        <UserButton>
                            <UserButton.MenuItems>
                                <UserButton.Action label='Marketplace' labelIcon={<GripIcon size={16}/>} onClick={()=> navigate('/marketplace')}/>
                                <UserButton.Action label='Messages' labelIcon={<MessageCircleMoreIcon size={16}/>} onClick={()=> navigate('/messages')}/>
                                <UserButton.Action label='My Listings' labelIcon={<ListIcon size={16}/>} onClick={()=> navigate('/my-listings')}/>
                                <UserButton.Action label='My Orders' labelIcon={<BoxIcon size={16}/>} onClick={()=> navigate('/my-orders')}/>
                            </UserButton.MenuItems>
                        </UserButton>
                    )}

                   

                </div>
                {/* Mobile Menu */}
                <div className={`sm:hidden fixed inset-0 ${menuOpen ? 'w-full' : 'w-0'} overflow-hidden bg-white backdrop-blur shadow-xl rounded-lg z-200 text-sm transition-all`}>
                    <div className='flex flex-col items-center justify-center h-full text-xl font-semibold gap-6 p-4'>
                         <Link href="#" to={'/'} onClick={() =>{setMenuOpen(false); scrollTo(0, 0)}}> Home </Link>
                        <Link href="#" to={'/marketplace'} onClick={() =>{setMenuOpen(false); scrollTo(0, 0)}}> Marketplace </Link>
                        <Link href="#"  onClick={() =>openSignIn()}> Messages </Link>
                        <Link href="#" onClick={() =>openSignIn()}> My Listings </Link>
                        <button className=' cursor-pointer px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full'>Login</button>
                        <svg onClick={() => setMenuOpen(false)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute size-8 right-6 top-6 text-gray-500 hover:text-gray-700 cursor-pointer"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                    </div>
                </div>
            </nav>
    </div>
  )
}

export default Navbar