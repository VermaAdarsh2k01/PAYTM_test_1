import React from 'react'
import { FaRupeeSign } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

export const Balance = ({value}) => {

    const navigate = useNavigate()
  return (
    <div className="flex items-center justify-center w-full ">
        <div className=' px-10 py-8 flex flex-col rounded-2xl items-center justify-center bg-[#36CC7C] gap-5 max-[1025px]:px-3 max-[1025px]:py-4 '>
            <div className='flex gap-5'>
              <div className="font-bold text-lg flex items-center justify-center inter max-[1025px]:text-sm">
                  Your balance : 
              </div>
              <div className="font-black text-4xl text-white inter flex items-center justify-center max-[1025px]:text-2xl">
                  <FaRupeeSign  className='responsive-icon'/> 
                  <p>{value}</p>
              </div>
            </div>
            <button 
              
              onClick={()=>{
                navigate("/update")
              }}
            ><p className='font-black inter text-slate-800 bg-white px-4 py-3 rounded-2xl'>Add balance</p></button>
        </div>
    </div>
  )
}


