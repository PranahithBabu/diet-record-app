import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import {Link, Navigate, useLocation} from 'react-router-dom'
import axios from 'axios'
// import jwt from 'jsonwebtoken'
import jwt_decode from "jwt-decode";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: ""
  })
  const [auth, setAuth] = useState(false)
  const [userId, setUserId] = useState("")
  const [successMsg, setSuccessMsg] = useState(false)
  const location = useLocation();
  const successfulRegistration = location.state?.success;

  useEffect(() => {
    if(successfulRegistration) {
      console.log("In If")
      setSuccessMsg(true)
    }
  })

  const changeHandler = e => {
    setData({...data,[e.target.name]:e.target.value})
  }
  const submitHandler = e => {
    e.preventDefault()
    // console.log(data)
    axios.post('http://localhost:5000/login',data).then(
      res => {localStorage.setItem('token',res.data.token);
      setAuth(true);
      
      // let token = localStorage.getItem('token')
      // let decoded = jwt.verify(res.data.token,'jwtPassword');
      // console.log(decoded)
      // setUserId(decoded)

      const name = jwt_decode(JSON.stringify(res.data.token)); // jwt_decode() requires the token to be converted into string first
      setUserId(name.userdetails.id)
    }
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
  if(auth){
    return <Navigate to={`/dashboard/${userId}`} />
  }
  return (
    <div>
      <Navbar/>
      {successMsg ? <h3 style={{color:'green', fontStyle:'italic', marginLeft:'25%', marginRight:'25%'}}>Registration Successful. Login to Start Recording Diet!</h3> : null }
      <center style={{margin:"100px"}}>
        <h2>Sign In</h2>
        <p style={{fontStyle:"italic"}}>Sign into your Account</p>
        <form onSubmit={submitHandler} className='form' action='login-account.html' autoComplete='off'>
          <div className='form-group'><input type='email' placeholder='Email Address' name='email' onChange={changeHandler} /></div>
          <div className='form-group'><input type='password' placeholder='Password' name='password' onChange={changeHandler} /></div>
          <div className='form-group'><input className='btn btn-primary' type='submit' value='Login' onChange={changeHandler} /></div>
        </form>
        <p>Don't have an account? <Link to='/register'>Sign Up</Link></p>
      </center>
    </div>
  )
}

export default Login
