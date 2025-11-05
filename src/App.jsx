import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router'
import { getUserFromToken } from './lib/auth'

// component 
import Signup1 from './components/Auth/Signup1'
import Navbar from './components/Navbar/Navbar'
import Login from './components/Auth/Login'
import AboutUs from './components/AboutUs/AboutUs'
import NewProject from './components/NewProject/NewProject'
import LandPage from './components/Home/LandPage'
import Home from './components/Home/Home'
import SpaceDetail from './components/SpaceDetail/SpaceDetail'
import NewTask from './components/NewTask/NewTask'
import { getTokens } from './lib/auth'
import { jwtDecode } from 'jwt-decode'
import { clearTokens } from './lib/auth'


// color light #004aad ,,dark #03306d

function App() {
  //  To keep trck of user login 
  const [user, setUser] = useState(getUserFromToken());
  

  // ******** to handle uer token .... 
  // if token expired it set user to null & clean token & navgiagte to land home
  useEffect(() => {
    const {access} = getTokens()

    if (!access){
      setUser(null)
      return
    }

    const expired = jwtDecode(access).exp * 1000
    const now = Date.now()

    if(now >= expired){ // it means token is expired 
      clearTokens()
      setUser(null)
      Navigate("/login/")
    }
    else{
      setUser(jwtDecode(access))}

  }, [])

  return (
    <div>
      <BrowserRouter>
        <Navbar user={user} setUser={setUser}/>


        <Routes>
          <Route path='aboutUs/' element={< AboutUs />} />
          <Route path='signup/' element={< Signup1 />} />
          <Route path='login/' element={<Login setUser={setUser} />} />
          <Route path='newspace/' element={< NewProject />} />
          <Route path='landhome/' element={< LandPage />} />
          <Route path='home/' element={< Home />} />
          <Route path='spaces/:project_id' element={< SpaceDetail />} />
          <Route path='spaces/:project_id' element={< NewTask />} />
        </Routes>

      </BrowserRouter>
    </div>
  )
}

export default App
