import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import './Signup.css';
import { Link, useNavigate } from 'react-router-dom';
const Signup = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState("Sign Up");
  const [signInputs, setSignInputs] = useState({
    username: "",
    email: "",
    password: ""
  });
  const handleSignupInput = (e) => {
    const { name, value } = e.target;
    setSignInputs({ ...signInputs, [name]: value });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader("Loading...")
    try {
      // console.log(signInputs);
      await axios
        .post(`${import.meta.env.VITE_API_URL}/api/v1/register`, signInputs)
        .then((response) => {
          if (response.data.message === "User already exist, you can do sign in") {
            return toast.info("User already exist, you can do sign in");
          }
          else {
            alert("Sign Up successfully, now do sign in.")
            setSignInputs({ username: "", email: "", password: "" })
            navigate("/signin");  
          }
        });
    } catch (error) {
      console.log(error.message);
    }
    setLoader("Sign Up");
  }
  return (
    <div className='signup container flex jc-center al-center'>
      <ToastContainer/>
      <div className="signup-container flex f-col gap-20 al-center">
        <h1>Sign Up</h1>
        <form className='flex f-col al-center gap-20' onSubmit={handleSubmit}>
            <input type="text" name='username' placeholder='Enter your name' autoComplete='off' value={signInputs.username} onChange={handleSignupInput} required/>
            <input type="email" name='email' placeholder='Enter your email' pattern="^[a-z0-9]+@gmail\.com$"
              autoComplete='off' value={signInputs.email} onChange={handleSignupInput} required/>
            <input type="password" name='password' placeholder='Enter your password' autoComplete='off' value={signInputs.password} onChange={handleSignupInput} required/>
            <p>have you already an account? <Link className='sign-in' to="/signin">Sign In</Link></p>
            <button type="submit">{loader}</button>
        </form>
      </div>
    </div>
  )
}

export default Signup
