import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router"

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
            const response = await axios.post('http://127.0.0.1:8000/api/signup/',formData)
            console.log('User Created Sucessfuly', response.data)
            navigate('/login')
        }
        catch(error) {
            console.error("Signup failed:", error.response?.data);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input name='username' placeholder='Username' onChange={handleChange} />
                <input name='email'    placeholder='Email' onChange={handleChange} />
                <input name='phone'    placeholder='Phone Number' onChange={handleChange}></input>
                <input name='password' placeholder='Password' onChange={handleChange} />
                <button type='submit' > Sign UP</button>
            </form>
        </div>
    )
}

export default signUp
