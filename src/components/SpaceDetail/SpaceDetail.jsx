import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { getTokens } from '../../lib/auth'
import { ClipboardList, PieChart, CheckCircle2 } from "lucide-react"

function SpaceDetail() {

    //  to get the project id directly from the URL 
    const { project_id } = useParams()
    const [tasks, setTasks] = useState([])
    const [project, setProject] = useState()


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

    }


    useEffect(() => {
        handleReques()
        fetchProject()
    }, [project_id])


    return (
        <div className="min-h-screen bg-[#f9fafe] py-10 px-8">   {/* className=" bg-[#f9fafe]" */}
            <div className=" py-20 px-8"></div>
            <h1 className="text-4xl font-extrabold text-[#004aad] mb-10 tracking-tight flex items-center gap-2">
                <PieChart className="text-[#004aad] h-8 w-8" />
                {/* {`Workspace #${project_id}`} Dashboard */}
                {project?.title ? `${project.title} Dashboard` : "Loading..."}
            </h1>

            {/* boxes */}
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
                        {tasks.filter((t) => t.state === "In progress").length}
                    </p>
                </div>


                <div className="bg-white p-5 rounded-xl shadow hover:shadow-md transition-all text-center">
                    <ClipboardList className="text-yellow-500 mx-auto mb-2" />
                    <h2 className="font-semibold text-gray-700">To Do</h2>
                    <p className="text-2xl font-bold text-gray-900">
                        {tasks.filter((t) => t.state === "To Do").length}
                    </p>
                </div>

                <div className="bg-white p-5 rounded-xl shadow hover:shadow-md transition-all text-center">
                    <PieChart className="text-purple-500 mx-auto mb-2" />
                    <h2 className="font-semibold text-gray-700">Total Task</h2>
                    <p className="text-2xl font-bold text-gray-900">{tasks.length}</p>
                </div>
            </div>

            {/* Task List Section */}
            <div className="bg-white rounded-2xl shadow p-8">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <ClipboardList className="text-[#004aad]" /> Tasks
                    </h2>
                </div>
            </div>


        </div>
    )
}

export default SpaceDetail
