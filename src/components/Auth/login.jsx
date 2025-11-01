// src/Login.js
import React, { useState } from "react"
import axios from "axios"
import { saveTokens, getUserFromToken } from "../../lib/auth"
import { useNavigate } from "react-router"


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

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/login/", { username, password })
            saveTokens(response.data.access, response.data.refresh)
            setUser(getUserFromToken())
            // navigate("/Home")
        } catch (error) {
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