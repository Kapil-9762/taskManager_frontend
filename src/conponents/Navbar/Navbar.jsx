import React, { useState } from 'react'
import './Navbar.css';
import userLogo from "../../assets/user.png";
import { VscThreeBars } from "react-icons/vsc";
import { GiCrossedBones } from "react-icons/gi";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authActoins } from '../../store/authSlice';
const Navbar = () => {
  const [hideShow, setHideShow] = useState(false);
  const dispatch = useDispatch();
  const isLoggedin = useSelector((state) => state.isLoggedin);
  const handleLogout = () => {
    localStorage.removeItem("id")
    dispatch(authActoins.logout());
  }
  return (
     <div className='navbar container'>
        <nav className='nav-items flex jc-sb'>
            <h1 className='nav-logo'>TODO</h1>
            <div className={`items ${hideShow ? "" : "mobileMenu" } flex al-center gap-30`}>
                <Link className='item' to="/">Home</Link>
                <Link className='item' to="/about">About us</Link>
                <Link className='item' to="/todo">Todo</Link>
                {
                !isLoggedin && <>
                  <Link className='item' to="/signup">Sign Up</Link>
                  <Link className='item' to="/signin">Sign In</Link>
                 </>
                }
                {
                isLoggedin && <Link className='item' to="#" onClick={handleLogout}>Log Out</Link>
                }
                {/* <li><img src={userLogo} alt="user logo" width={30}/></li> */}
             </div>
             {
            hideShow ? <GiCrossedBones className='mobile-menuIcon' onClick={() => setHideShow(false)}/>
            : 
            <VscThreeBars className='mobile-menuIcon' onClick={() => setHideShow(true)} />
              }
        </nav>
    </div>
  )
}

export default Navbar
