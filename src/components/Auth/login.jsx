// src/Login.js
import axios from "axios"
import { Link } from "react-router"
import { useNavigate } from "react-router"
import React, { useState } from "react"
import Home from '../Home/Home'
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

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const responce = await axios.post('http://127.0.0.1:8000/api/login/', formData)
            saveTokens(responce.data.access, responce.data.refresh)
            setUser(getUserFromToken())
            navigate("/home")
        } catch (error) {
            console.error("Login failed:", error.response?.data);
        }
    }

    return (
        <div className="min-h-screen flex flex-row items-center justify-center bg-gray-100 px-4">

            {/*  image  */}
            <div>
                <img src="../../images/Login-bro.svg" className="h-130 w-auto mx-auto ml-20" />
            </div>

            {/* form  */}
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6">
                <h2 className="text-2xl font-bold text-center text-gray-800">Log in</h2>
                <form onSubmit={handleSubmit}>

                    <label className="block text-sm font-medium text-gray-700 mb-2 mt-4">Username</label>
                    <input name='username' placeholder='ex:Reema' onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />

                    <label className="block text-sm font-medium text-gray-700 mb-2 mt-4">Password</label>
                    <input name='password' placeholder='ex:njhwe@879' onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />

                    <button type='submit'
                        className="w-full bg-[#004aad] text-white font-medium py-2.5 rounded-lg hover:bg-[#1A4295] transition-colors mt-8" > Log In</button>
                </form>

                <div className="flex items-center justify-center gap-2 mt-4">
                    <h5 className="text-gray-700">Do not have an account ?</h5>
                    <Link to="/signUp" className="text-blue-600 hover:underline font-medium"
                        style={{ color: "#004aad" }}>
                        create an account
                    </Link>
                </div>
            </div>
        </div>

    )
}