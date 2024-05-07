import React from 'react'
import Card from '../assets/card2.png'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/Button';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react'
import gsap from "gsap"



gsap.registerPlugin(useGSAP);

function Hero2() {
    const gsapRef = useRef()
    const navigate = useNavigate();
    const t1 = gsap.timeline()
    const screenRef = useRef()
    const sendRef = useRef()

    useGSAP( ()=>{
        
        
        t1.from(sendRef.current , {
            opacity:0,
            x:"100px",
            
        })
        t1.from(gsapRef.current ,{
            opacity:0,
            duration: 0.5,
            x:"-100px"
        }),
        t1.to(gsapRef.current , {
            rotate: 5,
            
        })
        t1.to(screenRef.current , {
            y:'-100vh',
            delay:1
        })
    })

    return(
        <>
            <div className='w-[100vw] h-[100vh] relative'>
                <div className='w-full h-full  z-10 absolute top-0 left-0 bg-white' ref={screenRef}>
                    <div className='w-full h-full flex items-center justify-center gap-5'>
                        <img ref={gsapRef} className="w-48" src={Card}/>
                        <p className='text-8xl inter font-black tracking-tight' ref={sendRef}>SEND IT</p>
                    </div>
                </div>
                <div className='w-full h-full flex items-center justify-center'>
                    <div className='w-[30%] h-screen flex items-center justify-center max-[600px]:w-[100vw] max-[600px]:h-[30vh]'>
                        <div className='w-[90%] h-[90%]  flex flex-col items-center justify-evenly inter border-x-2 border-black rounded-3xl ' >
                            <p className='text-4xl text-black max-[1025px]:text-3xl max-[600px]:hidden'>Welcome to <span className='inter font-black  '>SEND IT</span></p>
                            <p className='text-gray-500 text-justify text-sm px-10 max-[1025px]:px-10 max-[600px]:hidden'>Hello and welcome! 👋 We're thrilled to have you here. You've just stepped into a world of seamless, secure, and speedy money transfers with our newly developed app.</p>
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
            </div>        
        </>
    )
}

export default Hero2