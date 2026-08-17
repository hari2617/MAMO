import React, { useContext } from 'react'
import logo from "../assets/logo-mamo.png";
import { Link, useNavigate } from 'react-router-dom';
import {BoxIcon, GripIcon,ListIcon,MessageCircleMoreIcon} from 'lucide-react'
import { AuthContext } from '../context/AuthContext';
import { useState } from 'react';
import { useEffect } from 'react';



const Navbar = () => {

    const navigate=useNavigate()
    
    const {user} =useContext(AuthContext)
    const [curruser,setCurruser] = useState()

    useEffect(()=>{

        setCurruser(user)

    },[user])

    const [menuOpen, setMenuOpen] = React.useState(false)
  return (
    <div>
         <nav className='h-20'>
                <div className='fixed left-0 top-0 right-0 z-100 flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white transition-all'>
                    <img onClick={()=>{navigate('/'); scrollTo(0,0)}} src={logo} className="h-9 w-[100] cursor-pointer" alt="" />
                    

                    {/* Desktop Menu */}
                    <div className='hidden sm:flex items-center gap-4 md:gap-8 max-md:text-sm text-gray-800'>
                        <Link to={'/'} > Home </Link>
                        <Link  to={'/marketplace'} > Marketplace </Link>
                        <Link  to={user?'/messages':'#'}> Messages </Link>
                        {/* <Link to={user?'/my-listings':'#'} > My Listings </Link> */}
                    </div>

                    {
                        !user && (<div>
                        <button onClick={()=>navigate('/signin')} className='bg-blue-600 text-white rounded-xl p-3 px-5 text-sm'>Sign In</button>
                    </div>)
                    }

                    {
                        curruser && (
                            <img
                                src={`http://localhost:7000/uploads/${curruser.profImage}`}
                                alt="Profile"

                                className='rounded-full size-11 cursor-pointer'

                                onClick={()=>navigate('/my-listings')}
                                />
                        )
                    }
                    
                   

                </div>
                {/* Mobile Menu */}
                <div className={`sm:hidden fixed inset-0 ${menuOpen ? 'w-full' : 'w-0'} overflow-hidden bg-white backdrop-blur shadow-xl rounded-lg z-200 text-sm transition-all`}>
                    <div className='flex flex-col items-center justify-center h-full text-xl font-semibold gap-6 p-4'>
                         <Link href="#" to={'/'} onClick={() =>{setMenuOpen(false); scrollTo(0, 0)}}> Home </Link>
                        <Link href="#" to={'/marketplace'} onClick={() =>{setMenuOpen(false); scrollTo(0, 0)}}> Marketplace </Link>
                        <Link href="#" onClick={() =>{setMenuOpen(false); scrollTo(0, 0)}} > Messages </Link>
                        <Link href="#" onClick={() =>{setMenuOpen(false); scrollTo(0, 0)}} > My Listings </Link>
                        <button className=' cursor-pointer px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full'>Login</button>
                        <svg onClick={() => setMenuOpen(false)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute size-8 right-6 top-6 text-gray-500 hover:text-gray-700 cursor-pointer"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                    </div>
                </div>
            </nav>
    </div>
  )
}

export default Navbar