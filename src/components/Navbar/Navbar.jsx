import React from 'react'
import { Link } from 'react-router'
import AboutUs from '../AboutUs/AboutUs' 
import LogOutButton from '../Auth/logOutButton'



function Navbar({user , setUser}) {
  return (
    <div className="fixed top-5 left-1/2 transform -translate-x-1/2 w-[1300px] h-16 bg-white border-b flex items-center justify-between px-6 shadow-sm rounded-lg">
        
        <img src="../../images/logo.png"  className="h-15 w-auto" />
      <nav className="flex gap-6 items-center text-gray-700"> 
        {user ? 
        (<>
        <LogOutButton setUser={setUser}/> 
        </>)
        : 
        <>
        (<Link  className="hover:text-[#004aad] transition-colors"to='/aboutUs'>about us</Link>
        <Link   className="hover:text-[#004aad] transition-colors"to='/login'>Login</Link>)

        </>}
      </nav>
    </div>
  )
}

export default Navbar
