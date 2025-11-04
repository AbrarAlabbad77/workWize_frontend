import React, { useEffect, useState  } from 'react'
import axios from 'axios'
import { getTokens } from '../../lib/auth'
import { useNavigate } from "react-router"


function Home() {

    // var
    const [project, setProject] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()


    const handleRequest = async () => {
        try {
            const { access } = getTokens();
            const response = await axios.get('http://127.0.0.1:8000/api/myspacese/', { headers: { Authorization: `Bearer ${access}` } })

            setProject(response.data)
            console.log('spaces', response.data)
        }
        catch (error) {
            console.error("Loading Spacese failed:", error.response?.data);
        }
        finally {
      setLoading(false)}
    }

    useEffect(() => {
        handleRequest()
    }, [])


    if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8faff]">
        <img src="../../images/loading.svg" className="h-130 w-auto mx-auto ml-110" />
        <p className="text-gray-500 text-lg ">Loading your workspaces...</p>
      </div>
    )
  }

    return (
        <div className="min-h-screen bg-[#f8faff] px-10 py-10 pt-28 ">

            {/* title of page */}
            <div className='flex flex-row justify-between'>
                <h1 className="text-2xl font-extrabold text-[#004aad] mb-10 tracking-tight pl-15 pt-10">Your Workspaces ✨</h1>
                 <button className="text-[#004aad] font-semibold hover:text-blue-700 transition-colors pr-10">View All Spaces → </button>
            </div>
            

            {/* Spaces Container */}
            {project.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pl-15">
                    {project.map((pro) => (
                        <div key={pro.id} className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all border border-gray-100">
                            {/* title of card */}
                            <div className="flex items-center justify-between mb-3">
                                <h2 className="text-2xl font-semibold text-gray-800">
                                    {pro.title}
                                </h2>
                                <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full font-medium">Active</span>
                            </div>

                            {/* body of the card */}
                            <p className="text-gray-600 mb-4 leading-relaxed">
                                {pro.description || "No description provided."}
                            </p>

                            <div className="flex items-center justify-between text-sm text-gray-500">
                                <p className="flex items-center gap-2">
                                    🗓 <span>{pro.deadline || "No deadline"}</span>
                                </p>
                                <button  onClick={() => navigate(`/spaces/${pro.id}`)} className="text-[#004aad] font-semibold hover:text-blue-700 transition-colors">
                                    View Details →
                                </button>
                            </div>
                        </div>
                    ))}
                </div>) 
                :// if there is no space yet 
                ( 
                    <div className="bg-white rounded-xl p-8 text-center shadow-sm border border-gray-100 mt-10">
                        <p className="text-gray-500 text-lg">
                            😅 No workspaces yet — why not create your first one?
                        </p>
                        <button className="mt-5 bg-[#004aad] text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                            + New Workspace
                        </button>
                    </div>
                )}
        </div>

    )
}

export default Home
