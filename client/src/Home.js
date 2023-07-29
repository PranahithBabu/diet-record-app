import React from 'react'
import Navbar from './Navbar'
import {Link} from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <Navbar/>
      <center style={{marginTop:"100px"}}>
        <h2>Record your Diet Right away!!!</h2> <br/>
        <div className='container'>
          <Link to='/register'><button className='btn btn-success'>Register</button></Link> &nbsp;
          <Link to='/login'><button className='btn btn-primary'>Login</button></Link>
        </div>
      </center>
    </div>
  )
}

export default Home
