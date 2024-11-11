


import React ,{useState,useEffect }from 'react'
import {useDispatch, useSelector} from "react-redux"
import {Navigate,useNavigate} from "react-router-dom"



const ProtectedRoute=({children})=>{

    
    const user=useSelector((state)=>state.auth.userInfo)
    const data=useSelector((state)=>state.auth.data)
   
    if (!user) {
        return children
      }
      
      if (user&&data.role === false) {
        return <Navigate to="/" />;
      }
      
      if (user&&data.role === true) {
        return <Navigate to="/admin" />;
      }
    
    
      return   children

    
}
export default ProtectedRoute