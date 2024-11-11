
import { useState,useRef,useEffect } from "react"
import api from "../interceptor"
import {useDispatch, useSelector} from "react-redux"
import toast, { Toaster } from 'react-hot-toast';
import { removeUserCredential } from "../Store/authSlice";
// const notify = () => toast('Here is your toast.');


const CreatePoll=()=>{
  const dispatch = useDispatch();


    const [question,setQuestion]=useState("")
    const [options, setOptions] = useState(["", "", "", ""]);


    const handleQuestion=(e)=>{
        setQuestion(e.target.value)

    }

    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
      };



    const submitForm=(e)=>{
        e.preventDefault()


        const validate = () => {
            return question.trim() !== "" && options.every(option => option.trim() !== "");
          };
        
        if(validate()){
            console.log(question,options)

            api.post('/createPoll',{question:question,options:options})

        }else{
           
            toast.error('fill in all feild !')
            
        }

    }

    const handleLogout=()=>{

      dispatch(removeUserCredential())
    }
      

    return (
        <>

<div className="absolute top-4  z-60 p-4">
  <button
  onClick={handleLogout}
    type="button"
    className="text-gray-900 bg-white border  border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
  >
    Logout
  </button>
</div>


        <Toaster
  position="top-center"
  reverseOrder={false}
/>
        <div className="bg-gray-200 w-screen h-screen flex items-center justify-center">
        <form className=" max-w-sm mx-auto  ">
        <div className="mb-5 w-96">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">
            Question  ? 
          </label>
          <input
            type="email"
            id="email"
            value={question}
            onChange={handleQuestion}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="question"
           
          />

        </div>
        <div className="mb-5">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">
            Option 
          </label>

          {options.map((option, index) => (
            <input
              key={index}
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-2"
              placeholder={`Option ${index + 1}`}
             
            />
          ))}


        
         
        </div>




        
        
        <button
         
          onClick={submitForm}
          className="text-white mt-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
        >
          Publish
        </button>
      </form>
      </div>
      </>
    )
}

export default CreatePoll