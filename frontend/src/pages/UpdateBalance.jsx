import React, { useState , useEffect} from 'react';
import axios from 'axios';
import Success from '../components/Success'
import { Appbar } from '../components/Appbar';
import { useNavigate } from "react-router-dom"
import { IoIosWallet } from "react-icons/io";
import { IoMdHome } from "react-icons/io";

const UpdateBalance = () => {
    const [balanceChange, setBalanceChange] = useState(0);
    const [isTransferSuccessful, setIsTransferSuccessful] = useState(false);
    const navigate = useNavigate()
    const homeNavigate = useNavigate()
    
    useEffect(() => {
        if (isTransferSuccessful) {
            const timer = setTimeout(() => {
                setIsTransferSuccessful(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isTransferSuccessful]);


    function changeHandle(e)
    {
        setBalanceChange(e.target.value)
        console.log(e.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const userId = localStorage.getItem('userId');
        console.log(typeof(balanceChange))

        try {
            const response = await axios.put('http://192.168.29.189:3000/api/v1/account/update', { 
                userId ,
                balanceChange: Number(balanceChange)
            },{
                headers:{
                    Authorization : "Bearer " + localStorage.getItem("token")
                }
            });
            console.log(response.data);
            
            setIsTransferSuccessful(true)
        } catch (error) {
            console.error(error);
            alert('Error updating balance');
        }
    };

    return (

        <div className="flex items-center justify-center bg-[#121212] w-screen h-screen relative">
            <div className="bg-white h-screen w-[27vw] rounded-[7%] border-x-2 border-black max-[1025px]:w-[35vw] max-[500px]:w-[100vw]  max-[500px]:border-0 overflow-hidden ">
                
                <Appbar />
                
                <div className='flex flex-col justify-center items-center w-full min-h-[100vh] '>
                    <div className=" h-min text-card-foreground max-w-md p-4 space-y-8 w-96 max-[1025px]:w-[30vw] max-[600px]:w-[80vw] bg-white rounded-lg border border-slate-400 ">
                            <div className="flex flex-col space-y-1.5 p-6">
                                <h2 className="text-3xl  text-center inter font-black">Add money</h2>
                            </div>
                            <div className="p-6">
                                <div className="flex items-center justify-center gap-10">
                                <div className="">
                                    <form onSubmit={handleSubmit} className='flex flex-col gap-7'>
                                        <label className='text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex flex-col gap-3'>
                                            Balance to be added:
                                            <input type="number" value={balanceChange} min="1" onChange={changeHandle} className='required flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm'/>
                                        </label>
                                        <button type="submit " className='justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500'>Update Balance</button>
                                    </form>
                                </div>
                                </div>
                            </div>
                    </div>
                    <div className="w-full flex flex-col items-center justify-end h-[28vh] max-[500px]:h-[20vh]">
                            <div className="flex  items-center justify-between px-1 w-28 h-14 rounded-full bg-slate-800" >
                                <button onClick= {() => { homeNavigate("/dashboard")}} className=" text-slate-300 flex items-center justify-center ps-1">
                                <IoMdHome  size={`2rem`} />
                                </button>
                                <button  onClick={()=>{ navigate("/update") }} className="text-slate-300  w-12 h-12 bg-slate-400 rounded-full flex items-center justify-center">
                                <IoIosWallet size={`2rem`} /> 
                                </button>
                            </div>
                    </div>
                </div>
            </div>
            {isTransferSuccessful && <Success/>}
        </div>
    );
};

export default UpdateBalance;
