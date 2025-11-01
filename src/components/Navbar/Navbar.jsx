import React from 'react'
import { Link } from 'react-router'

function Navbar({user , setUser}) {
  return (
    <div>
      <nav>
        {user ? <logOutButton setUser={setUser}/> : 
        <>
        <Link to={'/login'}>Login</Link>
        </>}
      </nav>
    </div>
  )
}

export default Navbar
