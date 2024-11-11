import { createSlice } from "@reduxjs/toolkit";

const initialState={
    userInfo:localStorage.getItem('accestoken')?JSON.parse(localStorage.getItem('accestoken')):null,
    data:localStorage.getItem('data')?JSON.parse(localStorage.getItem('data')):null,
    // adminInfo:localStorage.getItem('adminInfo')?JSON.parse(localStorage.getItem('adminInfo')):null
}

const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        setUserCredential:(state,action)=>{
            state.userInfo=action.payload.accestoken
            state.data=action.payload.data
            localStorage.setItem('accestoken',JSON.stringify(action.payload.accestoken))
            localStorage.setItem('data',JSON.stringify(action.payload.data))
        },
        removeUserCredential:(state,action)=>{
            state.userInfo=null
            state.data=null
            localStorage.removeItem('accestoken')
            localStorage.removeItem('data')
        }
    }
})


export const {setUserCredential,removeUserCredential}=authSlice.actions

export default authSlice.reducer