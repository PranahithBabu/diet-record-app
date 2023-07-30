import React, { useEffect, useState } from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';

const Dashboard = () => {
  const location = useLocation();
  const currentURL = location.pathname;
  const profileURL = currentURL.split("/")
  const [item, setItem] = useState({
    itemname: "",
    calorie: "",
    protein: ""
  })
  const [data, setData] = useState([])
  const [search, setSearch] = useState("")
  const [filteredData, setFilteredData] = useState([]);
  const [showSearch, setShowSearch] = useState(false)
  const [checkinSwitch, setCheckinSwitch] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [countData, setCountData] = useState()
  const [recordData, setRecordData] = useState()
  const [screenSize, setScreenSize] = useState(false)
  useEffect(() => {
    axios.get(`https://diet-record-app.onrender.com${currentURL}`,{
      headers: {
        'x-token': localStorage.getItem('token')
      }
    }).then(res => setData(res.data)
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

  useEffect(() => {
    const filtered = data.filter((x) => x.itemname && x.itemname.toLowerCase().includes(search.toLowerCase()));
    setFilteredData(filtered)
  },[search,data])
  
  useEffect(() => {
    if(window.innerWidth >= 1200) {
        setScreenSize(true)
    }else if (window.innerWidth<1200) {
      setScreenSize(false)
    }
  })

  if(!localStorage.getItem('token')) {
    return <Navigate to='/login' />
  }

  const dateChangeHandler = (date) => {
    setSelectedDate(date)
    console.log(selectedDate.toLocaleDateString())
  }

  const changeHandler = e => {
    setItem({...item, [e.target.name]:e.target.value})
  }
  const submitHandler = e => {
    e.preventDefault()
    console.log(item)
    axios.post(`https://diet-record-app.onrender.com${currentURL}`, item, 
    {
      headers: {
        'x-token': localStorage.getItem('token'),
        'Content-Type': 'application/json'
      }
    }
    ).then(
      res => {
        setData([...data, res]);
        setItem({itemname:'',calorie:'',protein:''});
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
  const searchHandler = e => {
    setSearch(e.target.value)
  }
  const searchBtnHandler = () => {
    setShowSearch(!showSearch)
  }

  const checkBtn = (dt) => {
    console.log("Date: ",dt)


    const inputDateString = dt

    const inputDate = new Date(inputDateString);
    console.log("Inp: ",inputDate)

    const year = inputDate.getUTCFullYear();
    const month = String(inputDate.getUTCMonth() + 1).padStart(2, "0");
    const day = String(inputDate.getUTCDate()).padStart(2, "0");
    const hours = String(inputDate.getUTCHours()).padStart(2, "0");
    const minutes = String(inputDate.getUTCMinutes()).padStart(2, "0");
    const seconds = String(inputDate.getUTCSeconds()).padStart(2, "0");

    const iso8601Date = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.000Z`;
    console.log("Formatted: ",iso8601Date)


    axios.patch(`https://diet-record-app.onrender.com${currentURL}`,{date: iso8601Date}
    ,{
      headers: {
        'x-token': localStorage.getItem('token')
      }
    }
    ).then(res => {
      const {allDate, specificDate} = res.data
      setRecordData(specificDate)
    })
  }

  const checkinBtn = (_id, calorie, protein) => {
    const currentDate = new Date().toLocaleDateString()
    console.log("Current: ",currentDate)
    const selected = selectedDate.toLocaleDateString()
    console.log("Selected: ",selected)
    axios.put(`https://diet-record-app.onrender.com${currentURL}`,{_id, date:selected, caloriecount:calorie, proteincount:protein}
    ,{
      headers: {
        'x-token': localStorage.getItem('token')
      }
    }
    ).then(res=>setCountData(res.data)
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
    setCheckinSwitch(true)
  }

  const deleteItemBtn = (_id) => {
    console.log(localStorage.getItem('token'))
    console.log(profileURL[2])
    axios.delete(`https://diet-record-app.onrender.com${currentURL}`,{data:{_id: _id},
      headers: {
        'x-token': localStorage.getItem('token')}
    }
    ).then(res => console.log(res)
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
  const navBelowStyle = screenSize ? {marginTop:"60px"} : {marginTop:"160px"}
  const topStyle = screenSize ? { display: "flex", padding: "20px" } : {};
  const fixedStyle = screenSize ? {position:'fixed', maxWidth:'300px', backgroundColor: '#f2f2f2', padding: '10px' } : {};
  const scrollableStyle = screenSize ? { marginLeft: '320px',overflowY:'auto', overflowX:'hidden', width:'100%' } : {};
  const rowStyle = screenSize ? { display:'flex', backgroundColor: '#e0e0e0', padding: '10px', paddingRight:'30px'} : {};

  return (
    <div>
      <nav className='navbar bg-light' style={{position:'fixed',width:'100%',background:'#f1f1f1',top:'0',left:'0',padding:'10px',zIndex:'100'}}>
        <h1>Diet Record</h1>
        <div style={{display:'flex', alignItems:'center'}}>
        <div>
        {showSearch &&
          <input type='text' style={{width:"150px",top:'33px',marginRight:'5px'}} placeholder='Search for the item...' name='item' value={search} onChange={searchHandler} /> } 
          <i class="fas fa-search" style={{cursor:"pointer",top:"33px"}} onClick={searchBtnHandler}></i>
        </div>
        <ul style={{alignItems:'right'}}>
            <li><Link to={`/myprofile/${profileURL[2]}`}>My Profile</Link></li>
            <li onClick={()=>localStorage.removeItem('token')}><Link to='/login'>Logout</Link></li>
        </ul>
        </div>
      </nav>
      <section style={navBelowStyle}>
      <div className='container' style={topStyle}>
        <div className='fixed-element' style={fixedStyle}>
          <div>
            <form onSubmit={submitHandler} className='form' action='items.html' autoComplete='off'>
              <div className='form-group'><input type='text' placeholder='Item Name' value={item.itemname} name='itemname' onChange={changeHandler} /></div>
              <div className='form-group'><input type='text' placeholder='Calories' name='calorie' value={item.calorie} onChange={changeHandler} /></div>
              <div className='form-group'><input type='text' placeholder='Protein in gm' name='protein' value={item.protein} onChange={changeHandler} /></div>
              <div className='form-group'><input className='btn btn-info' type='submit' value='Add Item' /></div>
            </form>
          </div>
            <div>
              <Calendar onChange={dateChangeHandler} value={selectedDate} />
              <button style={{marginTop:'10px'}} className='btn btn-primary' onClick={()=>checkBtn(selectedDate)}>Check</button>
              {recordData ? <div>
                <h5 style={{marginRight:'50px'}}>Calories: {recordData.caloriecount}</h5>
                <h5 style={{alignItems:'left'}}>Protein: {recordData.proteincount}gm</h5>            
              </div> : <p>Not Yet Recorded!</p>}
            </div>
          </div>
          <div className='scrollable-element' style={scrollableStyle}>
          {filteredData.length>0 ?
            <div className='row' style={rowStyle}>
              {filteredData.map(newitem => 
                <div className='col-md-4' key={newitem._id}>
                  <div class="card" style={{width: "100%"}}>
                    <h5 class="card-header">{newitem.itemname}</h5>
                    <div class="card-body">
                      <ul class="list-group">
                        <li class="list-group-item">Calorie: {newitem.calorie}</li>
                        <li class="list-group-item">Protein: {newitem.protein}gm</li>
                      </ul> <br/>
                      <button className="btn btn-danger" onClick={()=>deleteItemBtn(newitem._id)}>Delete</button> &nbsp;
                      <button className='btn btn-success' onClick={()=>checkinBtn(newitem._id, newitem.calorie, newitem.protein)}>Check In</button>
                    </div>
                  </div> <br/>
                </div>
              )}
            </div>
            : <div style={{}}></div> }
          </div>
        </div>
      </section>
    </div>
  )
}

export default Dashboard

