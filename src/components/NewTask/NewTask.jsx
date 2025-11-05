import React, { useState } from 'react'
import axios from 'axios'
import { getTokens } from '../../lib/auth'


function NewTask({ onClose, projectId }) {

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        due_data: "",
        priority: "",
        created_at: "",
        assignee: "",
        project_id: projectId
    });

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }


    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const { access } = getTokens();
            const response = await axios.post(
                "http://127.0.0.1:8000/api/tasks/",
                formData,
                { headers: { Authorization: `Bearer ${access}` } }
            );
            console.log("Task Created:", response.data);
            onClose();
        } catch (error) {
            console.error("Task creation failed:", error.response?.data);
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-md w-80 text-center">
                <h2 className="text-xl font-semibold mb-3">Create Task</h2>
                <p className="mb-4">This is a popup!</p>
                <form onSubmit={handleSubmit}>

                    <label className="block text-sm font-medium text-gray-700 mb-2 mt-4">🎯 Task Title</label>
                    <input name='title' placeholder='ex:readme file' onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />


                    <label className="block text-sm font-medium text-gray-700 mb-2 mt-4">📝 Give it a short description</label>
                    <input name='description' placeholder='create readme file with plan and ERD ' onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />

                    <label className="block text-sm font-medium text-gray-700 mb-2 mt-4">⏳ Deadline</label>
                    <input type="date" name='due_data' placeholder='' onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />

                    <label className="block text-sm font-medium text-gray-700 mb-2 mt-4">Priority</label>
                    <input name='priority' placeholder='Low' onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />


                    <label className="block text-sm font-medium text-gray-700 mb-2 mt-4">Created At </label>
                    <input name='created_at' placeholder='11/11/2025' onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />

                    <label className="block text-sm font-medium text-gray-700 mb-2 mt-4">Team Member ID to Assignee To</label>
                    <input name='assignee' placeholder='53134' onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />

                    <button type='submit'
                        className="w-full  bg-[#004aad] text-white font-medium py-2.5 rounded-lg hover:bg-[#1A4295] transition-colors mt-8" > Create Task 🌟 </button>

                    <button type="button" onClick={onClose}
                        className="w-full  bg-[#004aad] text-white font-medium py-2.5 rounded-lg hover:bg-[#1A4295] transition-colors mt-8" >  Cancel </button>


                </form>

                {/* <button
                    onClick={onClose}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                    Close
                </button> */}
            </div>
        </div>
    );
}

export default NewTask;
