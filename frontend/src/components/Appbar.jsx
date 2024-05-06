import React from 'react'
import card from '../assets/card2.png'

export const Appbar = () => {


  return (
    <>
        <div className="border-b-2 shadow h-20 flex justify-between">
            <div className="flex items-center justify-center h-full ml-4 inter text-2xl font-black">
                <p className='text-[#586CFD]'>SEND IT</p>
                {/* <img src={card} className='h-full rotate-90'/> */}
            </div>
            <div className="flex items-center justify-center">
                <div className="flex flex-col justify-center h-full mr-4">
                    Hello
                </div>
                <div className="rounded-full h-12 w-12 bg-[#586CFD] flex justify-center mt-1 mr-2">
                    <div className="flex justify-center text-white items-center h-full text-xl">
                        U
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}


