import axios from 'axios'
import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router'
import { getUserFromToken } from './lib/auth' 

// component 
import Signup1 from './components/Auth/Signup1'
import Navbar from './components/Navbar/Navbar'
import Login from './components/Auth/login'
import Home from './components/Home/Home'



function App() {
  //  To keep trck of user login 
  const [user , setUser] = useState(getUserFromToken());


  return (
    <div>
      <BrowserRouter>
      <Navbar user={user} setUser={setUser}/>

        <Routes>
          <Route path='signUp/' element={< Signup1/>} />
          <Route path='home/' element={< Home/>} />
          <Route path='login/' element={<Login setUser={setUser}/>}/>
        </Routes>
        
      </BrowserRouter>
    </div>
  )
}

export default App
