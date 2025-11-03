import React from 'react'
import { useState } from 'react';

function NewProject() {

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        deadline: "",
        manager_id: "",
    });

    const handleChange = (event) => {
        setFormData({
            ...formData, [event.target.name]: event.target.value
        })
    }


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/projects/', formData)
            console.log('Space Created Sucessfuly', response.data)
            // navigate('/login')
        }
        catch (error) {
            console.error("creating new spcae filled:", error.response?.data);
        }
    };


    return (
        <div>
            <div className="min-h-screen flex flex-row items-center justify-center bg-gray-100 px-4">
                {/* <div className="min-h-screen bg-gradient-to-br from-[#e0f2fe] via-[#f1f5f9] to-[#ffffff] flex items-center justify-center"> */}

                {/* form side  */}
                <div className="w-[40%] space-y-6">
                    <h2 className="text-3xl font-extrabold text-[#004aad]">🚀 Create Your Workspace</h2>
                    <p className="text-gray-600">Plan your next big project with style.</p>
                    {/* <h2 className="text-2xl font-bold text-center text-gray-800">Create a new working space</h2> */}
                    <form onSubmit={handleSubmit}>

                        <label className="block text-sm font-medium text-gray-700 mb-2 mt-4">🎯 What’s would you like to calle the space</label>
                        <input name='Title' placeholder='ex:markting ads' onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />


                        <label className="block text-sm font-medium text-gray-700 mb-2 mt-4">📝 Give it a short description</label>
                        <input name='description' placeholder='ads plan for next 6 months' onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />

                        <label className="block text-sm font-medium text-gray-700 mb-2 mt-4">⏳ Deadline</label>
                        <input name='deadline' placeholder='' onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />

                        <label className="block text-sm font-medium text-gray-700 mb-2 mt-4">👔 Supervisor ID</label>
                        <input name='manager_id' placeholder='ex:19882' onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />


                        <button type='submit'
                            className="w-full  bg-[#004aad] text-white font-medium py-2.5 rounded-lg hover:bg-[#1A4295] transition-colors mt-8" >  🌟 Create Space </button>
                    </form>
                </div>


                <div>
                    <img src="../../images/Team work.gif" className="h-130 w-auto mx-auto ml-20" />
                </div>
            </div>
        </div>
    )
}

export default NewProject
