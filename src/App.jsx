import axios from 'axios'
import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router'
import { getUserFromToken } from './lib/auth'

// component 
import Signup1 from './components/Auth/Signup1'



function App() {
  //  To keep trck of user login 
  const [user , setUser] = useState({getUserFromToken})

  
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='signUp' element={< Signup1/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
