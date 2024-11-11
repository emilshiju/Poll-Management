
import { useEffect, useState ,useContext,useRef} from "react";

import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBIcon,
  MDBTextArea,
} from "mdb-react-ui-kit";

import MySvgComponent from "./Assest/chatBoxIcon";
import SimpleCloseIcon from "./Assest/closeIcon";
import { alertTitleClasses, getBottomNavigationActionUtilityClass } from "@mui/material";
import { removeUserCredential } from "./Store/authSlice";
// import { useContext } from "react";
// import { useDispatch } from "react-redux";
import api from "./interceptor";
import {useDispatch, useSelector} from "react-redux"
import { SocketContext } from "./Context/socket";

const App=()=>{

  const dispatch = useDispatch();

  const data=useSelector((state)=>state.auth.data)
  const socket=useContext(SocketContext)


  const [showChatBox,setShowChatBox]=useState(false)

  const [selected, setSelected] = useState(null);

  const [option,setOption]=useState()



  const set_Visibility_chatBox=()=>{
   

    setShowChatBox(!showChatBox)
  }
 
  // const socket = io;('http://localhost:3000');
  let userId=data._id
  

  async function one(){

    let res= await api.get(`/getPoll/${userId}`)
    console.log("dddddddddddddddddddddddddddddddddddddddddd")
    console.log(res.data.res)

    setOption(res.data.res)
    

    let id=res.data.curr
   
   
    setSelected(res.data.curr)

  }



  useEffect(()=>{
   

    // {console.log(socket)}
   
    socket.emit('on',userId)


  
    one()

    socket.on('votedRes',()=>{
    
       one()
    })

   

    return ()=>{
      socket.off('on');
      socket.off('votedRes');
    }



  },[])

 



 

  const options = [
    { id: 'opt-1', label: 'HTML', percent: 30 },
    { id: 'opt-2', label: 'Java', percent: 20 },
    { id: 'opt-3', label: 'Python', percent: 40 },
    { id: 'opt-4', label: 'jQuery', percent: 10 },
  ];

  const handleSelect = (id,pollId) => {

    socket.emit('userVote',{voteId:id,pollId,userId})
  
    
    setSelected(id);
  };


  const handleLogout=()=>{

    dispatch(removeUserCredential())
  }

const [currentMessage,setMessage]=useState('')
const [allMessage,setAllMessage]=useState([])

  const onChangeMessage=(e)=>{
    setMessage(e.target.value)
  }

  const clickSendMessage=()=>{

    socket.emit('sendMessage',{userId,currentMessage})

    setMessage('')
    


    
  }

  async function call(){

    let ress=await  api.get('/getAllMessaege')
    let c=ress?.data?.all
    console.log("dsiuhfuids")
       console.log(c)
       setAllMessage(c)

  }
  

  const [whoTyping,setwhoTyping]=useState('')


  useEffect(async()=>{

    call()
   

    socket.on('updated',()=>{
      call()
    })

    socket.on('showTyping',(name)=>{
     
      setwhoTyping(name.res) 
    })

   

   },[])

   
    socket.on('stopTyping',()=>{
      setwhoTyping('')
    })
   
   
const typingTimeout=useRef()

   const handleTyping = () => {


     
      socket.emit("typing", { username: userId  });
    
    
    clearTimeout(typingTimeout.current);
    
    typingTimeout.current = setTimeout(() => {
      // setIsTyping(false);
      // whoTyping('')
      socket.emit("stopTyping");
    }, 2000); // 2 seconds delay after typing stops



   
     
      // socket.emit("typing", { username: userId }); 
     // send user info if needed
    
  };

  const handleStopTyping = () => {

   
      socket.emit("stopTyping");
    
    
     
    
    
  };
   
  return (
    <>
     <div>
      <div>
        
      </div>
    <div className="  flex items-center justify-center min-h-screen bg-blue-600">
    
  




      <div className="bg-white rounded-lg p-6 z-5  max-w-md w-full shadow-lg">
       {option&&<header className="text-lg font-semibold">{option.question}</header>}
        {option&&<div className="poll-area mt-5 space-y-3 ">
          {option.options.map((a) => (
          
            <label
              key={a._id}
              className={`block rounded-lg px-4 py-3 border-2 transition duration-200 ${
                selected === option._id ? 'border-blue-600' : 'border-gray-200'
              }`}
              onClick={() => handleSelect(a._id,option._id)}
            >
              <div className="flex justify-between items-center pointer-events-none">
                
              
              
                <div className="flex items-center">
  <span
    className={`h-5 w-5 mr-2 rounded-full border-2 transition duration-200 ${
      selected === a._id ? 'border-blue-600' : 'border-gray-300'
    } relative`}
  >
    {selected === a._id && (
      <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-3 w-3 bg-blue-600 rounded-full"></span>
    )}
  </span>


  <span className="text-sm font-medium">{a.text}</span>
</div>

            
                {selected && (
                  <span className="text-sm font-medium">{a.votes}</span>
                )}
              </div>



              <div
                className={`h-2 mt-2 bg-gray-200 rounded-full overflow-hidden ${
                  selected && 'block'
                }`}
              >
                <div
                  className="bg-blue-600 h-full rounded-full transition-all duration-200"
                  style={{ width: `${a.votes}%` }}
                ></div>
              </div>


              
            </label>
          ))}
        </div>}



      </div>
      







    </div>
   </div>

 
   <div className="absolute top-4  z-60 p-4">
  <button
  onClick={handleLogout}
    type="button"
    className="text-gray-900 bg-white border  border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
  >
    Logout
  </button>
</div>


<div >
    {!showChatBox&&<div onClick={set_Visibility_chatBox} className="flex  justify-end  fixed inset-0 z-60 mt-[590px] mr-32">
  <MySvgComponent   />
</div>}
</div>




<div>

{showChatBox&&<div className="fixed  inset-0   py-10  ">
<div className="flex justify-end mr-6">
  <div className="w-full md:w-2/3 lg:w-1/3 xl:w-1/4">
 
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* <div className="flex justify-between items-end p-3 bg-info text-white rounded-t-lg border-b-0">
        <MDBIcon fas icon="angle-left" />
        
       <div className="pl-32"> <SimpleCloseIcon  /></div>
        <MDBIcon fas icon="times" />
        <p>iuhiuhuh</p>
      </div> */}

<div onClick={set_Visibility_chatBox} className="flex justify-between items-center mr-6 p-4">
  <p className="ml-24">{whoTyping}</p>
  <SimpleCloseIcon />
</div>

















      <div className="p-4  h-[550px] overflow-y-auto">
      
       

      {allMessage&&allMessage.map((a,b)=>{
        return (
      a.sender!=userId?<div className="flex items-start mb-4">
          {/* <img
            // src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
            alt="avatar 1"
            className="w-12 h-12"
          /> */}
          <div className="ml-3 bg-cyan-100 p-3 rounded-lg">
            {console.log("9999999999999999")}
      {console.log(a.message)}
            <p className="text-sm mb-0">
              {a.message}
            </p>
          </div>
        </div>:
         <div className="flex items-center justify-end mb-4">
         <div className="mr-3 bg-gray-100 p-3 rounded-lg border">
           <p className="text-sm mb-0">
           {a.message}
             {/* Thank you, I really like your product. */}
           </p>
         </div>
         {/* <img
           src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
           alt="avatar 1"
           className="w-12 h-12"
         /> */}
       </div>
        


        )})}
     
        
<div className="flex items-center space-x-2">
  <textarea
    className="w-full p-3 border rounded-lg focus:outline-none focus:border-cyan-400"
    placeholder="Type your message"
    value={currentMessage}
    onKeyDown={handleTyping}
    // onKeyUp={handleStopTyping}
    onChange={onChangeMessage}
    rows={2}
   
  />
  <button  onClick={clickSendMessage}className="p-2 bg-cyan-400 rounded-full">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
    >
      <path
        d="M3.4,20.2,4.9,14,13.5,12,4.9,10,3.4,3.8a1,1,0,0,1,1.4-1.1L21.1,10.4a1,1,0,0,1,0,1.8L4.8,21.3A1,1,0,0,1,3.4,20.2Z"
        fill="#fff"
      />
    </svg>
  </button>
</div>

      </div>












      
    </div>
  </div>
</div>
</div>}


</div>
</>
  );
};
export default App