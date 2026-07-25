import { Children, createContext, useEffect, useState } from "react";
import axios from "axios"

export const AuthContext = createContext();

export const AuthProvider =({children})=>{

    const [user,setUser] = useState({});
    const [loading,setLoading] = useState(true)

    useEffect(()=>{
        axios.get("http://localhost:7000/api/auth/check", {withCredentials: true,})
        .then((res)=>{
            setUser(res.data.user)
            console.log("auth sucess")
        })
        .catch((err)=>{
            console.log(err)
            setUser(null)
        })
        .finally(()=>{
            setLoading(false)
        })
    },[])


    return(
        <AuthContext.Provider value={{user,loading,setUser,}}>
            {children}
        </AuthContext.Provider>
    )

}