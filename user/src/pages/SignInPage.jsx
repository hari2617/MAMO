import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { useContext } from 'react'


const SignInPage = () => {

    const [name,setName]= useState("")
    const [email,setEmail] = useState("")
    const [pass,setPass] = useState("")
    const [err,setErr] = useState("")
    const [image, setImage] = useState(null);
    //const [preview, setPreview] = useState();
    
    const navigate=useNavigate()


    const handleImage = (e)=>{
        const file = e.target.files[0];

            if (file) {
                setImage(file);
            }
    }

    const handleForm = async (e)=>{
        e.preventDefault();


        if(email && pass && name){

            const formData = new FormData(); //sending to server as form becoz of image(in the form of file)

            formData.append("name", name);
            formData.append("email", email);
            formData.append("password", pass);

            if (image) {
            formData.append("profImage", image);
            }

            try{
                setErr("")
                const res = await axios.post("http://localhost:7000/api/signInDetails",formData,{withCredentials: true,})
                console.log(res)
                navigate('/login')
            }
            catch(err){
                console.log(err)
            }
    }else{
        setErr("Fill All the Required Fields")
    }
    }


  return (
    <div className='flex items-center justify-center  min-h-screen'>
        <div className='bg-blue-50 w-[400px] h-380px] rounded-xl p-5'>
            
            <form  onSubmit={handleForm} className="flex flex-col items-center justify-center h-full">
            <h1 className='font-bold text-blue-700 text-2xl mb-4 '>Create an Account</h1>
            <input type="text" onChange={(e)=>setName(e.target.value)} placeholder='Name*' className='w-2xs border p-2 border-gray-300 rounded-xl mb-3'/>
            <input type="text" onChange={(e)=>setEmail(e.target.value)} placeholder='Email*' className='w-2xs border p-2 border-gray-300 rounded-xl mb-3'/>
            
            <input type="password"  onChange={(e)=>setPass(e.target.value)} placeholder='Password*' className='w-2xs border p-2 border-gray-300 rounded-xl mb-3'/>
            <div className='w-2xs text-center border border-gray-300 rounded-xl mb-3 p-6'>
                <input id="image" type="file" accept="image/*" className={`${image ? "" : "hidden"} w-45 mb-3 truncate` } onChange={handleImage} />

                <label
                htmlFor="image"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700 mb-3"
                >
                Choose Profile Image
                </label>
            </div>
            <button type='submit' className='rounded-xl mb-5 bg-blue-700  p-2 text-white'>Submit</button>
            <div className='text-rose-600'>{err}</div>
            
        </form>
        </div>
        
    </div>
  )
}

export default SignInPage