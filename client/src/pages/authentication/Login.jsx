import React, { useState } from 'react'
import { FaUser,  FaKey  } from "react-icons/fa";
import { Link } from 'react-router-dom'
import {toast} from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { loginUserThunk } from '../../store/slice/user/userThunk';

function Login() {

  const dispatch = useDispatch();

  const [loginData, setLoginData] = useState({
    username : '',
    password : ''
  })

  const handleInputChange =(e) => {
    // console.log(e.target.name)
    // console.log(e.target.value)
    setLoginData((prev)=>({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }
   // key: value → creates a property literally named "key"
   // [key]: value → extracts the value from the variable key and uses it as the property
   // ✅ [e.target.name] matches the key name with the input's name attribute
  console.log(loginData); // will display username and password

  const handleLogin = async () => {
    console.log("login clicked")
    toast.success('Logged in successfully!', { duration: 2000 });
    await dispatch(loginUserThunk(loginData))
  }
  



  return (

    
    <div className='flex justify-center items-center p-6 min-h-screen'>
      <div className='max-w-[40rem] w-full flex flex-col gap-5 bg-base-200 p-6 rounded-lg'>

       {/* username  */}
       <h2>Please login..!!</h2>
       <label className="input validator w-full">
        <FaUser /> {/* icon form react-icons*/}
        <input
         type="text"
         required
         placeholder="Username"
         onChange={handleInputChange}
         name='username'
        />
       </label>

        {/* password */}

       <label className="input validator  w-full">
        <FaKey />
        <input
         type="password"
         required
         placeholder="Password"
         onChange={handleInputChange}
         name='password'
        />
       </label>

       <button onClick={handleLogin} className="btn btn-primary mx-[40%]">Login</button>

       <p>
        Don`t have an account? &nbsp;
        <Link to= '/signup' className='text-blue-400 underline'>Sign Up</Link>
       </p>
      </div>
    </div>
  )
}

export default Login