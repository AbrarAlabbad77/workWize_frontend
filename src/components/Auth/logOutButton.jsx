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
      <button className="hover:text-[#004aad] px-4 py-1 border border-[#004aad] rounded-lg hover:bg-[#004aad] hover:text-white transition font-medium" onClick={handleLogOut}>Log out</button>
    </div>
  )
}

export default LogOutButton
