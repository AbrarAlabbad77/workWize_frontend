import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { getTokens } from '../../lib/auth'


function Home({ user, setUser }) {

    const [project, setProject] = useState([])

    const handleReguest = async () => {
        try {
            const { access } = getTokens();
            const response = await axios.get('http://127.0.0.1:8000/api/myspacese/', { headers: { Authorization: `Bearer ${access}` } })

            setProject(response.data)
            console.log('spaces', response.data)
        }
        catch (error) {
            console.error("Loading Spacese failed:", error.response?.data);
        }
    }

    useEffect(() => {
        handleReguest()
    })
    return (
        <div>
            <div>
                <p className="text-3xl font-extrabold text-[#004aad]">Your Spaceses</p>
                {project.length > 0 ?
                    (project.map((pro) => (
                        <div key={space.id}>
                            <p className="text-xl font-semibold">{pro.title}</p>
                            <p className="text-gray-600">{pro.description}</p>
                            <p className="text-gray-600">{pro.deadline}</p>
                        </div> )))
                    :
                    (<p className="text-gray-500">No spaces found.</p>)
                    }


            </div>
        </div>
    )
}

export default Home
