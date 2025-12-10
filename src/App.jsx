import React, { useEffect } from 'react'
import Navbar from './conponents/Navbar/Navbar'
import Home from './conponents/home/Home'
import './App.css';
import Footer from './conponents/Footer/Footer';
import About from './conponents/about/About';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from './conponents/singup/Signup';
import Signin from './conponents/signin/Signin';
import Todo from './conponents/Todo/Todo';
import { useDispatch } from 'react-redux';
import { authActoins } from './store/authSlice';
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const authId = localStorage.getItem("id");
    if (authId) {
      dispatch(authActoins.login());
    }
  },[])
  return (
    <div>
      <div className="hero-page">
        <BrowserRouter>
          <Navbar/>
          <Routes>
             <Route path="/" element={<Home />} />
             <Route path="/about" element={<About />} />
             <Route path="/todo" element={<Todo />} />
             <Route path="/signup" element={<Signup />} />
             <Route path="/signin" element={<Signin/>} />
          </Routes>
        </BrowserRouter>
      </div>
      <Footer/>
    </div>
  )
}

export default App
