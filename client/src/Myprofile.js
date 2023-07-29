import React, { useEffect, useState } from 'react'
import {useLocation, Navigate } from 'react-router-dom'
import axios from 'axios'
import Navbar from './Navbar'

const Myprofile = () => {
  const location = useLocation();
  const currentURL = location.pathname;
  const dashboardURL = currentURL.split("/")
  const [data,setData] = useState([])
  const [updateData, setUpdateData] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: ""
  })
  const changeHandler = e => {
    setUpdateData({...updateData, [e.target.name]:e.target.value})
  }
  const updateHandler = e => {
    e.preventDefault()
    console.log(data.email)
    console.log(updateData)
    if(data.email!==updateData.email) {
      console.log("In if")
      axios.put(`http://localhost:5000${currentURL}`, updateData, {
        headers: {
          'x-token': localStorage.getItem('token')
        }, 
      }).then
      (res => {console.log('Response: ',res.data);
      }).catch(error=>{
        if (error.response) {
          alert(error.response.data);
        } else if (error.request) {
          console.log(error.request);
        } else {
          alert('Error', error.message);
        }
        console.log(error.config);
      })
    }else{
      console.log("In else")
      alert('Email must be updated')
    }
  }
  useEffect(() => {
    axios.get(`http://localhost:5000${currentURL}`,{
      headers: {
        'x-token': localStorage.getItem('token')
      }
    }).then(res=>setData(res.data)
    ).catch(error=>{
      if (error.response) {
        alert(error.response.data);
      } else if (error.request) {
        console.log(error.request);
      } else {
        alert('Error', error.message);
      }
      console.log(error.config);
    })
  },[data])
  if(!localStorage.getItem('token')) {
    return <Navigate to='/login' />
  }
  const deleteAccount = () => {
    axios.delete(`http://localhost:5000${currentURL}`,{
      headers: {
        'x-token': localStorage.getItem('token')
      }
    }).then(localStorage.removeItem('token')
    ).catch(error=>{
      if (error.response) {
        alert(error.response.data);
      } else if (error.request) {
        console.log(error.request);
      } else {
        alert('Error', error.message);
      }
      console.log(error.config);
    })
  }

  return (
    <div>
      <Navbar deleteAccount={deleteAccount} />
      <center style={{marginTop:"20px"}}>
        <div>
          <h2 style={{textTransform: 'capitalize'}}>Hello {data.name}</h2>
          <form className='form' onSubmit={updateHandler} action='profileUpdate.html' style={{display: 'flex',flexDirection:'column',gap:'10px', alignItems:'center'}}>
            <div className='form-group' style={{display: 'flex',alignItems:'center'}}><label style={{width: '120px',marginRight: '10px' }}>Name</label>&nbsp;<input type='text' name='name' onChange={changeHandler} /> </div>
            <div className='form-group' style={{display: 'flex',alignItems:'center'}}><label style={{width: '120px',marginRight: '10px' }}>Email</label>&nbsp;<input type='text' name='email' onChange={changeHandler} /> </div>
            <div className='form-group' style={{display: 'flex',alignItems:'center'}}><label style={{width: '120px',marginRight: '10px' }}>Password</label>&nbsp;<input type='password' name='password' onChange={changeHandler} /> </div>
            <div className='form-group' style={{display: 'flex',alignItems:'center'}}><label style={{width: '120px',marginRight: '10px' }}>Confirm Password</label>&nbsp;<input type='password' name='confirmpassword' onChange={changeHandler} /> </div>
            <div className='form-group'><input className='btn btn-info' type='submit' value='Update Profile' /></div>
          </form>
        </div>
      </center>
    </div>
  )
}

export default Myprofile
