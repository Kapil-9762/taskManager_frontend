import React, { useState } from 'react'
import '../singup/Signup.css';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActoins } from '../../store/authSlice';
const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signinInputs, setSignInputs] = useState({
    email: "",
    password: ""
  });

  const handlesigninInputss = (e) => {
    const { name, value } = e.target;
    setSignInputs({...signinInputs,[name]:value})
  }
  const handleSigninSubmit =async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(`${import.meta.env.VITE_API_URL}/api/v1/signin`, signinInputs)
        .then((response) => {
          if (response.data.message === "Invalid email") {
            return toast.error(response.data.message);
          }
          else if (response.data.message === "Password is not correct") {
            return toast.error(response.data.message)
          }
          else {
            localStorage.setItem("id", response.data.others._id);
            dispatch(authActoins.login());
            navigate("/todo");
          }
      });
    } catch (error) {
      toast.error(error.message);
    }
    // console.log(signinInputs);
    setSignInputs({email: "",password: ""})
  }
  return (
    <div className='signup container flex jc-center al-center'>
      <ToastContainer/>
      <div className="signup-container flex f-col gap-20 al-center">
        <h1>Sign In</h1>
        <form className='flex f-col al-center gap-20' onSubmit={handleSigninSubmit}>
            <input type="email" name='email' placeholder='Enter your email' pattern="^[a-z0-9]+@gmail\.com$" autoComplete='off' value={signinInputs.email} onChange={handlesigninInputss} required/>
            <input type="password" name='password' placeholder='Enter your password' autoComplete='off' value={signinInputs.password} onChange={handlesigninInputss} required/>
            <p>Don't have an account? <Link className='sign-in' to="/signup">Sign Up</Link></p>
            <button type="submit">Sign In</button>
        </form>
      </div>
    </div>
  )
}

export default Signin
