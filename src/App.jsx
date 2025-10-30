import axios from 'axios'
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router'


// component 
import SignUp from './components/signUp/SignUp'



function App() {


  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='signUp' element={<SignUp/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
