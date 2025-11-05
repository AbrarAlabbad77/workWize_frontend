import React from 'react'
import { Link } from 'react-router'
import AboutUs from '../AboutUs/AboutUs' 
import LogOutButton from '../Auth/logOutButton'



function Navbar({user , setUser}) {
  return (
    <div className="fixed top-5 left-1/2 transform -translate-x-1/2 w-[1400px] h-16 bg-white border-b flex items-center justify-between px-6 shadow-sm rounded-lg">
        
      <img src="../../images/logo.png"  className="h-15 w-auto" />

      {/* Pages link */}
      <nav className="flex gap-6 items-center text-gray-700"> 
        {user ? 
        <>
        <LogOutButton setUser={setUser}/> 
        </>
        : 
        <>
        <Link to="landhome/" className="hover:text-[#004aad] px-4 py-1 border border-[#004aad] rounded-lg hover:bg-[#004aad] hover:text-white transition font-medium">
        Home </Link>
        <Link to="/aboutUs" className="hover:text-[#004aad] px-4 py-1 border border-[#004aad] rounded-lg hover:bg-[#004aad] hover:text-white transition font-medium">
        About us </Link>
        <Link to="/login/" className="hover:text-[#004aad] px-4 py-1 border border-[#004aad] rounded-lg hover:bg-[#004aad] hover:text-white transition font-medium">
        Login </Link>
        

        </>}
      </nav>
    </div>
  )
}

export default Navbar
