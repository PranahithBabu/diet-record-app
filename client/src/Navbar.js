import React, { useState, useEffect } from 'react'
import {Link, useLocation} from 'react-router-dom'

const Navbar = ({deleteAccount}) => {
  const location = useLocation();
  const currentURL = location.pathname;
  const [home, setHome] = useState(false)
  const [profile, setProfile] = useState(false)
  useEffect(() => {
    if(currentURL==="/" || currentURL==="/login" || currentURL==="/register"){
      setHome(true)
    }else if(currentURL.split("/")[1]==="myprofile") {
      setProfile(true)
    }
  },[currentURL])
  return (
    <div>
      <nav className='navbar bg-light'>
        <h1 style={{paddingLeft:'5px'}}>Diet Record</h1>
            {home ? 
            <ul>
              <li><Link to='/login'>Sign In</Link></li>
              <li><Link to='/register'>Sign Up</Link></li>
            </ul>
            : null }
            {profile ?
            <div style={{display:'flex', alignItems:'center'}}>
              <button className='btn btn-danger' onClick={()=>deleteAccount()}>Delete Account</button>
              <ul style={{alignItems:'right'}}>
                <li><Link to={`/dashboard/${currentURL.split("/")[2]}`}>Go to Dashboard</Link></li>
                <li onClick={()=>localStorage.removeItem('token')}><Link to='/login'>Logout</Link></li>
              </ul>
            </div>
            : null }
      </nav>
    </div>
  )
}

export default Navbar
