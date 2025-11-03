import React from 'react'
import { clearTokens } from '../../lib/auth'
import { useNavigate } from 'react-router'

function LogOutButton({setUser}) {

    const navigate = useNavigate()
    function handleLogOut (){
       clearTokens()
        setUser(null)
        navigate('/login')
    }

  return (
    <div>
      <button className="w-full  bg-[#004aad] text-white font-medium py-2.5 rounded-lg hover:bg-[#1A4295] transition-colors mt-8" onClick={handleLogOut}>Log out</button>
    </div>
  )
}

export default LogOutButton
