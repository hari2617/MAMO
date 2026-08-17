import { createSlice } from "@reduxjs/toolkit";

import {dummyListings} from '../../assets/assets'
const listingSlice =createSlice({
    name:"listing",
    initialState:{
        listings:[],
        userListings:[],
        balance:{
            earned:0,
            withdrawn:0,
            available:0
        }
    },
    reducers:{
        setListings:(state,action)=>{
            state.listings=action.payload
        },
        setUserListings:(state,action)=>{
            state.userListings=action.payload
        }
    }
}
)


export const {setListings,setUserListings}=listingSlice.actions
export default listingSlice.reducer