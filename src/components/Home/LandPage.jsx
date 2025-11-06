import React from 'react'
import { useNavigate } from 'react-router'

// component form shadcn 
// import { Button } from "@/components/ui/button"


function LandPage() {

    const navigate = useNavigate()

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-4 space-y-6 pt-45">

            {/* First Part  */}
            <div className="items-center justify-center flex flex-col items-center justify-center text-center gap-4" >
                <img src="../../images/logo.png" className="h-25 w-auto mx-auto" />
                <p className='text-5xl'>Helping Your Team</p>
                <h1 className='text-5xl leading-30' >Working Better, Together</h1>
                <p className="text-gray-500 text-lg max-w-2xl mb-10">
                    We provide an easy-to-use platform that keeps your team connected,
                    organized, and productive — with clarity and confidence.
                </p>


                {/* Buttons */}
                <div className="flex gap-4 justify-center">
                    <button onClick={() => navigate('/signup/')} className=" bg-[#004aad] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#1A4295] transition-all duration-200">
                        Join Us
                    </button>
                    <button onClick={() => window.open("https://wa.me/966536228772", "_blank")} className="bg-white border border-gray-300 px-6 py-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
                        Contact Us
                    </button>
                </div>
            </div>

                 {/*  second part */}
            <div className="flex  flex-row flex-col items-center justify-center text-center gap-4 mt-30" >
                <div>
                    <img src="../../images/puzzl.svg" className="h-100 w-auto mx-auto" />
                </div>

                <div>
                    
                     <p className="text-gray-500 text-2xl max-w-2xl mb-10">
                        WorkWize helps teams collaborate effortlessly — plan tasks, manage work,
                        and stay aligned with zero confusion.
                    </p>
                </div>

            </div>

            {/*  third part */}
            <div className="flex  flex-row flex-col items-center justify-center text-center gap-4 mt-20" >
                <div>
                   <p className="text-gray-500 text-2xl max-w-2xl mb-10">
                        Keep everyone focused on what matters. Assign tasks, set deadlines,
                        track progress — all in one powerful workspace.
                    </p>
                </div>

                <div>
                    <img src="../../images/Good team-bro.svg" className="h-100 w-auto mx-auto" />
                </div>
            </div>


            {/* Footer  */}
            <footer className="w-[95%] mx-auto bg-[#1A4295] text-white py-4 mt-10 rounded-2xl shadow-md">
                <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">


                    <img src="../../images/footer.png" className="h-12 object-contain" />
                    <p className="text-gray-200 text-xs md:text-sm">
                        © {new Date().getFullYear()} WorkWize — All rights reserved.
                    </p>

                </div>
            </footer>

        </div>
    )
}

export default LandPage
