import React from 'react'
// import backgroundColors from '../backgroundColors'

// component form shadcn 
import { Button } from "@/components/ui/button"

function Home() {
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
                    <button className=" bg-[#004aad] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#1A4295] transition-all duration-200">
                        Create New Space
                    </button>
                    <button className="bg-white border border-gray-300 px-6 py-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
                        Contact Sales
                    </button>
                </div>
            </div>


            {/* second part */}
            <div className="flex  flex-row flex-col items-center justify-center text-center gap-4 mt-50" >
                <div>
                    <img src="../../images/puzzl.svg" className="h-100 w-auto mx-auto" />
                </div>

                <div>
                    <p className="text-gray-500 text-3xl max-w-2xl mb-10">
                        We provide an easy-to-use platform that keeps your team connected,
                        organized, and productive — with clarity and confidence.
                    </p>
                </div>

            </div>


        </div>
    )
}

export default Home
