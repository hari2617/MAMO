import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setListings, setUserListings } from '../app/features/listingSlice'



const DataProvider = ({children})=>{

    const dispatch = useDispatch()
    
    useEffect( ()=>{
        const fetchData = async()=>{
            const res = await axios.get('http://localhost:7000/api/getListings')
            dispatch(setListings(res.data))
            dispatch(setUserListings(res.data))

        }

        fetchData()    

    },[])

    return children
}

export default DataProvider