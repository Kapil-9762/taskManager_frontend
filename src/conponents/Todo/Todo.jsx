import React, {useEffect, useState } from 'react'
import './Todo.css';
import Task from './Task';
import { ToastContainer, toast } from 'react-toastify';
import Update from './Update';
import { GiCrossedSwords } from "react-icons/gi";
import axios from 'axios';
let updateArray=[];
const Todo = () => {
  let userId = localStorage.getItem("id");
  const [task, setTask] = useState({ title: "", body: "" });
  const [array, setArray] = useState([]);
  const [displayUpdate, setDisUpdate] = useState(false);
  const handleTask = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  }
  const handleSubmit =async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/v2/addTask`,{title:task.title,body:task.body,userId})
        .then((response) => {
          if (!userId) {
            setArray([task, ...array]); 
            toast.success("Task is added successfully.")
            toast.error("please sign in to save in account")
          }
          else {
            setArray([task, ...array]); 
            toast.success("Task is added successfully.")
          }
      })
    } catch (error) {      
      toast.error(error.message);
    }
    setTask({title:"",body:""})
  }

  // deleting data from the server
  const handleDlt =async (id) => {
    if (id) {
      try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/v2/deleteTask/${id}`, { data: { userId: userId } });
      toast.success("Task is deleted");
    } catch (error) {
      toast.error(error.message);
    }
    }
    else {
      toast.info("please sign in");
    }
    
  }

  // updating the task
  const handleUpdt =async (updateId) => {
    setDisUpdate(true);
    updateArray = array[updateId];
  }

  // fetching data from the server
  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        try {
        await axios.get(`${import.meta.env.VITE_API_URL}/api/v2/getTask/${userId}`)
          .then((response) => {
            // console.log(response.data.list);
            setArray(response.data.list);
          });
       } catch (error) {
        toast.error(error.message);
       }
      }
    }
    fetchData();
  }, [handleSubmit]);

  return (
    <div className='todo container flex jc-center'>
        <ToastContainer/>
        <div className="todo-container flex gap-20 f-col">
            <form className='flex' onSubmit={handleSubmit}>
              <input type="text" name='title' placeholder='Enter task name' value={task.title} onChange={(handleTask)} required/>
              <textarea name="body" cols="30" rows="1" placeholder='Write your task...' value={task.body} onChange={handleTask} required/>
              <button type="submit">Add Task</button>
            </form>
         <div className="todo-tasks flex f-col gap-20">
          {
           array && array.map((currTask, index) =>(
             <div key={index}>
               <Task task={currTask} id={currTask._id} delId={handleDlt} updateId={index} updtFun={handleUpdt} />
             </div>
           ))
          }
          </div>
        </div>
        <div className={`todo-update container ${displayUpdate ? "" : "hideShow"}`}>
          <div style={{position:"relative"}}>
            <GiCrossedSwords className='cross-icon' onClick={()=>setDisUpdate(false)}/>
          </div>
        <Update setDisUpdate={setDisUpdate} updateData={updateArray} userId={userId} />
        </div>
    </div>
  )
}

export default Todo
