import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Home'
import Register from './Register'
import Login from './Login'
import Dashboard from './Dashboard'
import Myprofile from './Myprofile'
import Pagenotfound from './Pagenotfound'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/login' element={<Login/>} />
          <Route path={`/dashboard/:userId`} element={<Dashboard/>} />
          <Route path ={`/myprofile/:userId`} element={<Myprofile/>} />
          <Route path='/*' element={<Pagenotfound/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
