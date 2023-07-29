import React, { useState } from 'react'
import {Link, Navigate, useNavigate} from 'react-router-dom'
import Navbar from './Navbar'
import axios from 'axios'

const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: ""
  })
  const [auth, setAuth] = useState(false)
  const navigate = useNavigate();

  const changeHandler = e => {
    setData({...data,[e.target.name]:e.target.value})
  }
  const submitHandler = e => {
    e.preventDefault()
    console.log(data)
    axios.post('http://localhost:5000/register',{
      name: data.name,
      email: data.email,
      password: data.password,
      confirmpassword: data.confirmpassword
    }).then(
      res => {console.log(res); setAuth(true); navigate('/login', { state: { success: true } });}
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
  if(auth) {
    return <Navigate to='/login' />
  }
  return (
    <div>
      <Navbar/>
      <center style={{margin:"100px"}}>
        <h2>Sign up</h2>
        <p style={{fontStyle:"italic"}}>Create your Account</p>
        <form onSubmit={submitHandler} className='form' action='create-profile.html' autoComplete='off'>
          <div className='form-group'><input type='text' placeholder='Name' name='name' onChange={changeHandler} /></div>
          <div className='form-group'><input type='email' placeholder='Email Address' name='email' onChange={changeHandler} /></div>
          <div className='form-group'><input type='password' placeholder='Password' name='password' onChange={changeHandler} /></div>
          <div className='form-group'><input type='password' placeholder='Confirm Password' name='confirmpassword' onChange={changeHandler} /></div>
          <div className='form-group'><input className='btn btn-success' type='submit' value='Sign Up' /></div>
        </form>
        <p>Existing User? <Link to='/login'>Sign In</Link></p>
      </center>
    </div>
  )
}

export default Register
