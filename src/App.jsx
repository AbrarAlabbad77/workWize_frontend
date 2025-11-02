import axios from 'axios'
import React, { useState } from 'react'
import { BrowserRouter, Routes, Route ,useLocation} from 'react-router'
import { getUserFromToken } from './lib/auth' 

// component 
import Signup1 from './components/Auth/Signup1'
import Navbar from './components/Navbar/Navbar'
import Login from './components/Auth/Login'
import Home from './components/Home/Home'
import AboutUs from './components/AboutUs/AboutUs'



// component from shadcn
import { Button } from "@/components/ui/button"

// color light #004aad ,,dark #03306d

function App() {
  //  To keep trck of user login 
  const [user , setUser] = useState(getUserFromToken());
  <BrowserRouter> const location = useLocation() </BrowserRouter>
  const hideNavbar = location.pathname === "/login/" || location.pathname === "/signUp/";

  return (
    <div>
      <BrowserRouter>
      {!hideNavbar && <Navbar user={user} setUser={setUser} />} 
      {/* <Navbar user={user} setUser={setUser}/> */}


        <Routes>
          <Route path='aboutUs/' element={< AboutUs/>} />
          <Route path='signUp/' element={< Signup1/>} />
          <Route path='home/' element={< Home/>} />
          <Route path='login/' element={<Login setUser={setUser}/>}/>
        </Routes>
        
      </BrowserRouter>
    </div>
  )
}

export default App
