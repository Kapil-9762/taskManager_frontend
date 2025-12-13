import React from 'react'
import './Task.css';
import { SlArrowDown } from "react-icons/sl";
const Task = ({ task, id, delId,updtFun,updateId }) => {
  const handleDelete = () => {
    delId(id);
  }
  const handleUpdate = (e) => {
    e.preventDefault();
    updtFun(updateId);
  }
  return (
    <div className='task flex f-col gap-10' id={id}>
      <div className="task-subc flex jc-sb al-center">
        <p className='title'>{task.title}</p>
        <div className="task-fun flex gap-30 al-center">
            <button id={updateId} onClick={handleUpdate}>Update</button>
            <button onClick={handleDelete}>Delete</button>
            {/* <SlArrowDown className='view-icon'/> */}
        </div>
      </div>
      <p className='task-body'>{task.body}</p>
    </div>
  )
}
export default Task
