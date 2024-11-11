// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";

import './index.css'
import App from './App.jsx'
import Register from './Authentication/register.jsx';
import Login from './Authentication/login.jsx';
import store from './Store/store.js';
import ProtectedRoute from './Protected/protectedRoute.jsx';
import UserProtected from './Protected/userProtected.jsx';
import CreatePoll from './Admin/createPoll.jsx';
import AdminProtected from './Protected/adminProtected.jsx';
import {SocketContext ,socket} from "./Context/socket.js"

const router=createBrowserRouter([
  {
    path:"/",
    element:<UserProtected><App /></UserProtected>
  },
  {
    path:"/register",
    element:<ProtectedRoute><Register  /></ProtectedRoute>
  },
  {
    path:"/login",
    element:<ProtectedRoute><Login  /></ProtectedRoute>
  },
  {
    path:"/adminLogin",
    element:<ProtectedRoute><Login  /></ProtectedRoute>
  },
  {
    path:"/admin",
    element:<AdminProtected><CreatePoll  /></AdminProtected>
  },
  
])

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <SocketContext.Provider value={socket} >
    <Provider  store={store}>
    <RouterProvider router={router} />
</Provider >
</SocketContext.Provider>
    
  // </StrictMode>,
)
