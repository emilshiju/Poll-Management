import io from "socket.io-client";
import { createContext } from 'react'

export const socket = io("http://localhost:3000");


export const SocketContext=createContext()