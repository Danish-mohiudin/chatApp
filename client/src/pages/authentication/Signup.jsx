import React, { useState } from "react";
import { FaUser, FaKey } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom'
import { registerUserThunk } from "../../store/slice/user/userThunk";
import toast from 'react-hot-toast'

function Signup() {
  const navigate = useNavigate();
  const diapatch = useDispatch();


  const [signupData, setSignupData] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender:"male"
  });

  const handleInputChange = (e) => {
    setSignupData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignup = async () => {
    if(signupData.password!== signupData.confirmPassword){
      return toast.error('Passwords do not match!')
    }
    const response = await diapatch(registerUserThunk(signupData));
    if(response?.payload?.success){
      navigate('/');
    };
  };
  return (
    <div className="flex justify-center items-center p-6 min-h-screen">
      <div className="max-w-[40rem] w-full flex flex-col gap-5 bg-base-200 p-6 rounded-lg">
        <h2>Please Signup..!!</h2>
        <label className="input validator w-full">
          <FaUser /> {/* icon form react-icons*/}
          <input
            type="text"
            required
            placeholder="Full Name"
            name="fullName"
            onChange={handleInputChange}
          />
        </label>

        {/* username  */}

        <label className="input validator w-full">
          <FaUser /> {/* icon form react-icons*/}
          <input
            type="text"
            required
            placeholder="username"
            name="username"
            onChange={handleInputChange}
          />
        </label>

        {/* password */}

        <label className="input validator w-full">
          <FaKey />
          <input
            type="password"
            required
            placeholder="Password"
            name="password"
            onChange={handleInputChange}
          />
        </label>

        <label className="input validator w-full">
          <FaKey />
          <input
            type="password"
            required
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={handleInputChange}
          />
        </label>

        <div className="input input-bordered flex items-center gap-5">
          <label htmlFor="male" className="flex gap-3 items-center">
            <input
              id="male"
              type="radio"
              name="gender"
              value="male"
              className="radio radio-primary"
              onChange={handleInputChange}
              />
            Male
          </label>
          <label htmlFor="female" className="flex gap-3 items-center">
            <input
              id="female"
              value="female"
              type="radio"
              name="gender"
              className="radio radio-primary"
              onChange={handleInputChange}
            />
            Female
          </label>
        </div>

        <button onClick={handleSignup} className="btn btn-primary mx-[30%]">
          Sign Up
        </button>

        <p>
          Already have an account? &nbsp;
          <Link to="/login" className="text-blue-400 underline">
            LogIn
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
