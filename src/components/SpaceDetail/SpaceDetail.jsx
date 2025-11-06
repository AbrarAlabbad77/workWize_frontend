import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { getTokens } from '../../lib/auth'
import { ClipboardList, PieChart, CheckCircle2, Clock, PartyPopper } from "lucide-react"

// component 
import NewTask from '../NewTask/NewTask'


function SpaceDetail() {

    //  to get the project id directly from the URL 
    const { project_id } = useParams()
    const [tasks, setTasks] = useState([])
    const [project, setProject] = useState()
    const [loading, setLoading] = useState(true)
    // const [showPopup , setShowPopup] = useState(false)
    const [openModal, setOpenModal] = useState(false);


    const handleRequest = async () => {
        try {
            const { access } = getTokens()
            const response = await axios.get(`http://127.0.0.1:8000/api/projects/${project_id}/tasks/`, { headers: { Authorization: `Bearer ${access}` } })
            setTasks(response.data)
        }
        catch (error) {
            console.error("Loading Task failed:", error.response?.data);
        }
    }

    const handleDelete = async (taskId) => {
    try {
        const { access } = getTokens();
        await axios.delete(
            `http://127.0.0.1:8000/api/tasks/${taskId}/`, 
            { headers: { Authorization: `Bearer ${access}` } }
        );

        // to UI immediately without refreshing page
        setTasks(prev => prev.filter(task => task.id !== taskId));

    } catch (error) {
        console.error("Delete failed:", error.response?.data);
    }
};



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
        handleRequest()
        fetchProject()
    }, [project_id])


    // calculate due date for task 
    const dueSoonCount = tasks.filter((task) => {
        const dueDate = new Date(task.due_data);
        const today = new Date();
        const diffDays = (dueDate - today) / (1000 * 60 * 60 * 24);
        return diffDays >= 0 && diffDays <= 7;
    }).length;

    // this code appear till the data fetch from the backend 
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

            {/**********Task List Section *********************/}
            <div className="bg-white rounded-2xl shadow p-8">

                {/* title */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <ClipboardList className="text-[#004aad]" /> Tasks
                    </h2>
                    {tasks.length > 0 ? (<button onClick={() => setOpenModal(true)} className="w-30 bg-[#004aad]  text-white py-2 rounded-lg font-semibold hover:bg-blue-800 transition">
                        Add Task +</button>) : ('')}
                    <NewTask open={openModal} onClose={() => {
                        setOpenModal(false)
                        handleRequest()
                    }} projectId={project_id} />
                </div>

                {tasks.length > 0 ? (
                    <ul className="space-y-3">
                        {tasks.map((task) => (
                            <li
                                key={task.id}
                                className="flex justify-between items-center p-4 border rounded-xl hover:shadow-md transition bg-white"
                            >

                                {/* Left section: title and due date */}
                                <div className="flex flex-col">
                                    <h3 className="font-semibold text-gray-800 text-base">{task.title}</h3>
                                    <p className="text-sm text-gray-500">
                                        Due: {new Date(task.due_data).toLocaleDateString()}
                                    </p>
                                </div>


                                {/* Right section: buttons and priority */}
                                <div className="flex items-center gap-3">
                                    {/* Priority badge */}
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-semibold ${task.priority === "High"
                                                ? "bg-red-50 text-red-600 border border-red-200"
                                                : task.priority === "Medium"
                                                    ? "bg-yellow-50 text-yellow-600 border border-yellow-200"
                                                    : "bg-green-50 text-green-600 border border-green-200"
                                            }`}
                                    >
                                        {task.priority}
                                    </span>

                                    {/* Edit button */}
                                    <button
                                       
                                        className="flex items-center gap-1 bg-[#004aad] hover:bg-blue-600 text-white text-xs font-medium px-4 py-1.5 rounded-full shadow-sm transition"
                                    >
                                        ✏️ Edit
                                    </button>

                                    {/* Delete button */}
                                    <button
                                        onClick={() => handleDelete(task.id)}
                                        className="flex items-center gap-1 hover:bg-red-600 text-xs font-medium px-4 py-1.5 rounded-full shadow-sm transition 
                                        bg-red-50 text-red-600 border border-red-200 hover:text-white"
                                    >
                                        🗑 Delete
                                    </button>
                                </div>
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

                        <button onClick={() => setOpenModal(true)}
                            className="w-50 mt-4 bg-[#004aad] text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-800 transition mx-auto block">
                            Add Task </button>
                        <NewTask open={openModal} onClose={() => setOpenModal(false)} onTaskCreated={handleRequest} projectId={project_id} />

                    </div>
                )}
            </div>





        </div>
    )
}

export default SpaceDetail
