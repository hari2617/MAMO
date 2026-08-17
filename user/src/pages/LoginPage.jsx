import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { AuthContext } from '../context/AuthContext'
import { useContext } from 'react'




const LoginPage = () => {

const { setUser } = useContext(AuthContext)


const [email,setEmail] = useState("")
const [pass,setPass] = useState("")
const [err,setErr] = useState("")

const navigate=useNavigate()

const handleLogin = async (e)=>{

    e.preventDefault()

    if(email && pass){
        try{
            setErr("")
            const res = await axios.post("http://localhost:7000/api/loginDetails",{email,pass},{withCredentials: true,})
            console.log(res)
            
                setUser(res.data)
                navigate('/')
            
        }
        catch(err){
            if (err.response) {
            setErr(err.response.data);
            } else {
            setErr("Server Error");
        }   
            console.log(err)
        }
    }else{
        setErr("Fill All the Required Fields")
    }
    
    
}



  return (
    <div className='flex items-center justify-center  min-h-screen'>
        <div className='bg-blue-50 w-[400px] h-[300px] rounded-xl p-5'>
            
            <form onSubmit={handleLogin}  className="flex flex-col items-center justify-center h-full">
            <h1 className='font-bold text-blue-700 text-2xl mb-4 '>LOGIN</h1>
            <input type="text" onChange={(e)=>setEmail(e.target.value)} placeholder='Email*' className='w-2xs border p-2 border-gray-300 rounded-xl mb-3'/>
            
            <input type="password"  onChange={(e)=>setPass(e.target.value)} placeholder='Password*' className='w-2xs border p-2 border-gray-300 rounded-xl mb-3'/>
            <button type='submit' className='rounded-xl bg-blue-700  p-2 text-white'>Submit</button>
            <div className='text-rose-600'>{err}</div>
        </form>
        </div>
        
    </div>
  )
}

export default LoginPage