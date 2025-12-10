import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
const Home = () => {
  return (
    <div className='home container flex al-center jc-center'>
      <div className="home-container flex f-col gap-20">
        <h1>Organize your <br /> work and life, finaly</h1>
        <p>Become focused, organized and claim with todo app. The world's #1 task manager app</p>
        <button><Link to="/todo">Make Todo List</Link></button>
      </div>
    </div>
  )
}

export default Home
