// src/Login.js
import axios from "axios"
import { useNavigate } from "react-router"
import React, { useState } from "react"
import { saveTokens, getUserFromToken } from "../../lib/auth"


export default function Login({ setUser }) {

    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    //  when user write , this mehtod will be called ,save the input from user into the state variable
    const handleChange = (event) => {
        setFormData({
            ...formData, [event.target.name]: event.target.value
        })
    }

    const handleSubmit = async (event) => 
    {
        event.preventDefault()
        try {
            const responce = await axiox.post('http://127.0.0.1:8000/api/login/', formData)
            saveTokens(responce.data.access,responce.data.refresh)
            setUser(getUserFromToken())
            // navigate("/Home")
        } catch (error) 
        {
            console.error("Login failed:", error.response?.data);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input name='username' placeholder='Username' onChange={handleChange} />
                <input name='password' placeholder='Password' onChange={handleChange} />
                <button type='submit' > Log in</button>
            </form>
        </div>

    )
}