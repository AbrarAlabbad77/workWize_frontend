import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router"
import { Link } from 'react-router'

function signUp() {

    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        phone: "",
    });

    //  when user write , this mehtod will be called ,save the input from user into the state variable
    const handleChange = (event) => {
        setFormData({
            ...formData, [event.target.name]: event.target.value
        })
    }

    // called when the user submit the form 
    const handleSubmit = async (event) => {

        // to prevent the brower from reloading the page when the evet hanppen
        event.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/signup/', formData)
            console.log('User Created Sucessfuly', response.data)
            navigate('/login')
        }
        catch (error) {
            console.error("Signup failed:", error.response?.data);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6">
                <h2 className="text-2xl font-bold text-center text-gray-800">Create an Account</h2>
                <form onSubmit={handleSubmit}>

                    <label className="block text-sm font-medium text-gray-700 mb-2 mt-4">Username</label>
                    <input name='username' placeholder='ex:Reema' onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />


                    <label className="block text-sm font-medium text-gray-700 mb-2 mt-4">Email</label>
                    <input name='email' placeholder='ex:username@domain.com' onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />

                    <label className="block text-sm font-medium text-gray-700 mb-2 mt-4">Phone Number</label>
                    <input name='phone' placeholder='+966543987' onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />

                    <label className="block text-sm font-medium text-gray-700 mb-2 mt-4">Password</label>
                    <input name='password' placeholder='ex:njhwe@879' onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />


                    <button type='submit'
                        className="w-full  bg-[#004aad] text-white font-medium py-2.5 rounded-lg hover:bg-blue-700 transition-colors mt-8" > Sign UP</button>
                </form>

                <div className="flex items-center justify-center gap-2 mt-4">
                    <h5 className="text-gray-700">Or have an account?</h5>
                    <Link to="/login" className="text-blue-600 hover:underline font-medium" style={{ color: "#004aad" }}>
                        Log in
                    </Link>
                </div>
            </div>
        </div>

    )
}

export default signUp
