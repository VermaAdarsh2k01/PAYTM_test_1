import React from 'react'
import Card from '../assets/card2.png'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/Button';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react'
import gsap from "gsap"


gsap.registerPlugin(useGSAP);

function Hero() {
    const gsapRef = useRef()
    const navigate = useNavigate();
    const t1 = gsap.timeline()
    const textRef = useRef()
    const navRef = useRef()

    useGSAP( ()=>{
        
        t1.from(textRef.current , {
            opacity:0,
            x:'100px'
        })
        t1.from(navRef.current , {
            opacity:0
        })
        t1.from(gsapRef.current ,{
            opacity:0,
            // delay:0.4,
            x:"-100px"
        })
    })
    

    return (
        <div className=' w-screen h-screen flex max-[600px]:flex-col'>
            <div className='w-[70%] h-screen flex items-center justify-center max-[600px]:w-[100vw] max-[600px]:h-[60vh] max-[600px]:flex-col max-[600px]:gap-5' >
                <div className='w-[50%]  flex items-center justify-end pr-5'>
                    <img ref={gsapRef} className="w-[50%] rotate-6 shadow-2xl max-[1025px]:w-[70%] max-[600px]:shadow-none max-[600px]:w-[100vw]" src={Card}></img>
                </div> 
                <div className='w-[50%] font-black text-8xl inter flex items-start ps-5 gap-6 max-[1025px]:text-7xl max-[1025px]:ps-0 max-[600px]:text-[2.8rem] max-[600px]:font-black max-[600px]:gap-4 ' ref={textRef}>
                    <p className=' tracking-tighter'>SEND</p> 
                    <p>IT</p>
                </div>
            </div>
            <div className='w-[50%] h-screen flex items-center justify-center max-[600px]:w-[100vw] max-[600px]:h-[30vh]'>
                <div className='w-[90%] h-[90%]  flex flex-col items-center justify-evenly inter border-x-2 border-black rounded-3xl ' ref={navRef}>
                    <p className='text-4xl text-black max-[1025px]:text-3xl max-[600px]:hidden'>Welcome to <span className='inter font-black  '>SEND IT</span></p>
                    <p className='text-gray-500 text-justify text-sm px-20 max-[1025px]:px-10 max-[600px]:hidden'>Hello and welcome! 👋 We're thrilled to have you here. You've just stepped into a world of seamless, secure, and speedy money transfers with our newly developed app.</p>
                    <div className='flex flex-col gap-10'>
                        <div className='flex flex-col items-center justify-center'>
                            <div className='w-40 flex items-center justify-center'>
                                <Button 
                                    onClick={() => {navigate("/signup")}}
                                    label={"Sign up"} 
                                />
                            </div>
                            <p className=' text-gray-400 text-sm'>New User? Create account</p>
                        </div>
                        <div className='flex flex-col items-center justify-center'>
                            <div className='w-40 flex items-center justify-center'>
                                <Button 
                                    
                                    onClick={() => {navigate("/signin")}}
                                    label={"Sign In"} 
                                />
                            </div>
                            <p className=' text-gray-400 text-sm'>Already a user ? Log in</p>
                        </div>
                    </div>
                </div>
            </div>
        
        </div>
    )
}

export default Hero
