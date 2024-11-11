
import React ,{useState,useEffect }from 'react'
import {useDispatch, useSelector} from "react-redux"
import {Navigate,useNavigate} from "react-router-dom"




const  AdminProtected=({children})=>{


    
    const user=useSelector((state)=>state.auth.userInfo)
    const data=useSelector((state)=>state.auth.data)
   
    

        if (!user) {
            return <Navigate to="/login" />;
          }
          
          if (user&&data.role === true) {
            return children;
          }
          
          if (user&&data.role === false) {
            return <Navigate to="/" />;
          }
        
          // Optional: handle unexpected role values
          return <Navigate to="/login" />;
    
}

export default AdminProtected

//  at that time we want to build an forbidden page and redirect  to that.