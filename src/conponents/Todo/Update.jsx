import React, { useEffect, useState } from 'react'
import './Update.css'
import axios from 'axios';
import { toast } from 'react-toastify';
const Update = ({setDisUpdate,updateData,userId }) => {
  // console.log(userId);
  // let userId = localStorage.getItem("id");
  const [updValue, setUpdate] = useState({title:"",body:""});
  useEffect(() => {
    if (updateData) {
      setUpdate({
        title: updateData.title || "",
        body: updateData.body || ""
      });
    }
  }, [updateData]);    

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdate({ ...updValue, [name]: value });
  }

  const handleUpdate = async () => {
    if (userId) {
      try {
        await axios.put(`${import.meta.env.VITE_API_URL}/api/v2/updateTask/${updateData._id}`,updValue).then((res) => {
        toast.success(res.data.message);
        setDisUpdate(false);
      })
    } catch (error) {
      toast.error(error.message);
     }
    }
    else {
      toast.info("please sign first.")
      setDisUpdate(false);
    }
  }
  return (
    <div className='update flex f-col gap-30'>
      <input type="text" name='title' value={updValue.title} onChange={handleUpdateChange} required/>
       <textarea name="body" rows="3" value={updValue.body} onChange={handleUpdateChange} required/>
      <button onClick={handleUpdate}>Update</button>
    </div>
  )
}
export default Update
