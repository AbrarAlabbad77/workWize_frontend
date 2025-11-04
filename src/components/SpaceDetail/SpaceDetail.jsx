import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { getTokens } from '../../lib/auth'
import { ClipboardList, PieChart, CheckCircle2, Clock, PartyPopper } from "lucide-react"


function SpaceDetail() {

    //  to get the project id directly from the URL 
    const { project_id } = useParams()
    const [tasks, setTasks] = useState([])
    const [project, setProject] = useState()
    const [loading, setLoading] = useState(true)


    const handleReques = async () => {
        try {
            const { access } = getTokens()
            const response = await axios.get(`http://127.0.0.1:8000/api/projects/${project_id}/tasks/`, { headers: { Authorization: `Bearer ${access}` } })
            setTasks(response.data)
        }
        catch (error) {
            console.error("Loading Task failed:", error.response?.data);
        }
    }


    const fetchProject = async () => {
        try {
            const { access } = getTokens()
            const response = await axios.get(`http://127.0.0.1:8000/api/projects/${project_id}/`, { headers: { Authorization: `Bearer ${access}` } })
            setProject(response.data)
        }
        catch (error) {
            console.error("Loading Space Name failed:", error.response?.data);
        }
        finally {
            setLoading(false)
        }
    }


    useEffect(() => {
        handleReques()
        fetchProject()
    }, [project_id])


    // calculate due date for task 
    const dueSoonCount = tasks.filter((task) => {
        const dueDate = new Date(task.due_data);
        const today = new Date();
        const diffDays = (dueDate - today) / (1000 * 60 * 60 * 24);
        return diffDays >= 0 && diffDays <= 7;
    }).length;


    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8faff]">
                <img src="../../images/loading.svg" className="h-130 w-auto mx-auto ml-110" />
                <p className="text-gray-500 text-lg ">Loading your workspaces...</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#f9fafe] py-10 px-8">   {/* className=" bg-[#f9fafe]" */}
            <div className=" py-20 px-8"></div>
            <h1 className="text-4xl font-extrabold text-[#004aad] mb-10 tracking-tight flex items-center gap-2">
                <PieChart className="text-[#004aad] h-8 w-8" />
                {/* {`Workspace #${project_id}`} Dashboard */}
                {project?.title ? `${project.title} Dashboard` : "Loading..."}
            </h1>

            {/* Dashboard boxes */}
            <div className="grid grid-cols-4 gap-6 mb-10">

                <div className="bg-white p-5 rounded-xl shadow hover:shadow-md transition-all text-center">
                    <CheckCircle2 className="text-green-500 mx-auto mb-2" />
                    <h2 className="font-semibold text-gray-700">Done</h2>
                    <p className="text-2xl font-bold text-gray-900">
                        {tasks.filter((t) => t.state === "Done").length}
                    </p>
                </div>

                <div className="bg-white p-5 rounded-xl shadow hover:shadow-md transition-all text-center">
                    <ClipboardList className="text-yellow-500 mx-auto mb-2" />
                    <h2 className="font-semibold text-gray-700">In Progress</h2>
                    <p className="text-2xl font-bold text-gray-900">
                        {tasks.filter((t) => t.state === "In Progress").length}
                    </p>
                </div>

                {/* 
                <div className="bg-white p-5 rounded-xl shadow hover:shadow-md transition-all text-center">
                    <ClipboardList className="text-yellow-500 mx-auto mb-2" />
                    <h2 className="font-semibold text-gray-700">To Do</h2>
                    <p className="text-2xl font-bold text-gray-900">
                        {tasks.filter((t) => t.state === "To Do").length}
                    </p>
                </div> */}

                <div className="bg-white p-5 rounded-xl shadow hover:shadow-md transition-all text-center">
                    <PieChart className="text-purple-500 mx-auto mb-2" />
                    <h2 className="font-semibold text-gray-700">Total Task</h2>
                    <p className="text-2xl font-bold text-gray-900">{tasks.length}</p>
                </div>

                <div className="bg-white p-5 rounded-xl shadow hover:shadow-md transition-all text-center">
                    <Clock className="text-red-500 mx-auto mb-2" />
                    <h2 className="font-semibold text-gray-700">Due Soon</h2>
                    <p className="text-2xl font-bold text-gray-900">{dueSoonCount}</p>
                    <p className="text-sm text-gray-500">in the next 7 days</p>
                </div>
            </div>

            {/* Task List Section */}
            <div className="bg-white rounded-2xl shadow p-8">

                {/* title */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <ClipboardList className="text-[#004aad]" /> Tasks
                    </h2>
                    {tasks.length < 0 ? (<button className="w-30 bg-[#004aad]  text-white py-2 rounded-lg font-semibold hover:bg-blue-800 transition">
                        Add Task +</button>): ('')}
                    

                </div>

                {tasks.length > 0 ? (
                    <ul className="space-y-3">
                        {tasks.map((task) => (
                            <li
                                key={task.id}
                                className="flex justify-between items-center p-4 border rounded-lg hover:shadow-sm transition"
                            >
                                <div>
                                    <h3 className="font-semibold text-gray-800">{task.title}</h3>
                                    <p className="text-sm text-gray-500">
                                        Due: {new Date(task.due_data).toLocaleDateString()} •{" "}
                                        {/* <span className="font-medium text-gray-700">{task.state}</span> */}
                                    </p>
                                </div>
                                <span
                                    className={`px-3 py-1 rounded-full text-sm font-semibold ${task.priority === "High"
                                        ? "bg-red-100 text-red-600"
                                        : task.priority === "Medium"
                                            ? "bg-yellow-100 text-yellow-600"
                                            : "bg-green-100 text-green-600"
                                        }`}
                                >
                                    {task.priority}
                                </span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div>
                        <p className="text-gray-500 text-center pb-1">No Tasks Found .</p>

                        <div className="flex justify-center items-center gap-2">
                            <p className="text-gray-500">Let's Create Your First Task.</p>
                            <PartyPopper className="text-blue-500 h-5 w-5" />
                        </div>
                        
                        <button type="submit"
                            className="w-50 mt-4 bg-[#004aad] text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-800 transition mx-auto block">
                            Add Task </button>
                    </div>
                )}
            </div>





        </div>
    )
}

export default SpaceDetail
