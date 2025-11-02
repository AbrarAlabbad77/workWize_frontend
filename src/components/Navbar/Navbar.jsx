import React from 'react'
import { Link } from 'react-router'
import AboutUs from '../AboutUs/AboutUs' 
import LogOutButton from '../Auth/logOutButton'

function Navbar({user , setUser}) {
  return (
    <div className="fixed top-5 left-1/2 transform -translate-x-1/2 w-[1150px] h-16 bg-white border-b flex items-center justify-between px-6 shadow-sm rounded-lg">
        <h2>hello from nav bar</h2>
      <nav>
        {user ? 
        (<>
        <LogOutButton setUser={setUser}/> 
        </>)
        : 
        <>
        (<Link to={'/aboutUs'}>about us</Link>
        <Link to={'/login'}>Login</Link>)
        </>}
      </nav>
    </div>
  )
}

export default Navbar
