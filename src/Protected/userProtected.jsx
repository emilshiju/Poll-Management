


import React from 'react'
import {useDispatch, useSelector} from "react-redux"
import {Navigate} from "react-router-dom"
import AdminProtected from './adminProtected'



const UserProtected=({children})=>{
    

        const user=useSelector((state)=>state.auth.userInfo)
        const data=useSelector((state)=>state.auth.data)
       
        if (!user) {
            return <Navigate to="/login" />;
          }
          
          if (user&&data.role === false) {
            return children;
          }
          
          if (user&&data.role === true) {
            return <Navigate to="/admin" />;
          }
        
        
          return <Navigate to="/login" />;
    
        

}

export default UserProtected