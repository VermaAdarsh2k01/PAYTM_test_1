import React from 'react'
import { SiTicktick } from "react-icons/si";
import gsap from "gsap"
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import card from '../assets/card2.png'


gsap.registerPlugin(useGSAP);

function Success() {

    const cardRef = useRef()
    const gsapRef = useRef()
    const t1 = gsap.timeline()

    useGSAP( ()=>{
        t1.from( cardRef.current ,{
            x:"-100vw",
            opacity: 0,
            duration: 1,

        }),
        t1.to( cardRef.current ,{
            opacity: 0,
        }),

        t1.from( gsapRef.current , {
            opacity:0,
            duration:0.5
        })
    })

  return (
    <div className='w-screen h-screen  absolute top-0 z-2 flex items-center justify-center bg-white' >
        <div className=' gap-5 flex flex-col items-center justify-center w-[25vw] max-[1025px]:w-[30vw] max-[600px]:w-[80vw] h-[52vh] bg-[#121212] rounded-2xl' ref={gsapRef}>
            <div className='text-green-500'><SiTicktick size={`8rem`} /></div>
            <p className=' inter font-black text-white '>Transfer Succesfull</p>
        </div>
        <div className='absolute left-0 w-full flex items-center justify-end ' ref={cardRef}>
            <img src={card} className='w-52 rotate-90 max-[600px]:w-[40vw]'/>
        </div>
    </div>
  )
}

export default Success
