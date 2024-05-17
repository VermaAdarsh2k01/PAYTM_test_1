import { useSearchParams } from 'react-router-dom';
import axios from "axios";
import { useState } from 'react';
import Success from '../components/Success'
import { useEffect } from 'react';
import { Appbar } from '../components/Appbar';
import { useNavigate } from "react-router-dom"
import { IoIosWallet } from "react-icons/io";
import { IoMdHome } from "react-icons/io";


export const SendMoney = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const [amount, setAmount] = useState(0);
    const [isTransferSuccessful, setIsTransferSuccessful] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate()
    const homeNavigate = useNavigate()


    // useEffect(() => {
    //     if (isTransferSuccessful) {
    //         const timer = setTimeout(() => {
    //             setIsTransferSuccessful(false);
    //         }, 3000);
    //         return () => clearTimeout(timer);
    //     }
    // }, [isTransferSuccessful]);

    // return <div className='relative'> 
    // <div className="flex items-center justify-center bg-[#121212] w-screen h-screen relative">
    //         <div className="bg-white h-[100vh] w-[27vw] rounded-[7%] border-x-2 border-black max-[1025px]:w-[35vw] max-[500px]:w-[100vw]  max-[500px]:border-0 overflow-hidden ">
    //         <Appbar />
    //             <div className='flex  flex-col items-center justify-center w-full h-[100vh]'>
    //                 <div className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 max-[600px]:w-[80vw] bg-white shadow-lg rounded-2xl">
    //                     <div className="flex flex-col space-y-1.5 p-6"> 
    //                         <h2 className="text-3xl font-bold text-center">Send Money</h2>
    //                     </div>
    //                     <div className="p-6">
    //                         <div className="flex items-center space-x-4">
    //                             <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
    //                             <span className="text-2xl text-white">{name[0].toUpperCase()}</span>
    //                             </div>
    //                             <h3 className="text-2xl font-semibold">{name}</h3>
    //                         </div>
    //                         <div className="space-y-4">
    //                             <div className="space-y-2">
    //                             <label
    //                                 className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    //                                 htmlFor="amount"
    //                             >
    //                                 Amount (in Rs)
    //                             </label>
    //                             <input
    //                                 onChange={(e) => {
    //                                     setAmount(e.target.value);
    //                                 }}
    //                                 type="number"
    //                                 className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
    //                                 id="amount"
    //                                 placeholder="Enter amount"
    //                             />
    //                             </div>
    //                             <button 
    //                             onClick={() => {
    //                                 axios.post("http://192.168.29.189:3000/api/v1/account/transfer", {
    //                                     to: id,
    //                                     amount
    //                                 }, {
    //                                     headers: {
    //                                         Authorization: "Bearer " + localStorage.getItem("token")
    //                                     }
    //                                 })
    //                                 setIsTransferSuccessful(true);
    //                                 setErrorMessage(""); 
    //                             }} className="justify-center rounded-md text-sm font-medium text-black ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 ">
    //                                 Initiate Transfer{console.log(isTransferSuccessful)}
    //                             </button>
                                
    //                         </div>
    //                     </div>
    //                 </div>
    //                 <div className="w-full flex flex-col items-center justify-end h-[22vh] max-[500px]:h-[16vh]">
    //                         <div className="flex  items-center justify-between  w-28 h-14 rounded-full bg-slate-800 px-2" >
    //                             <button onClick= {() => { homeNavigate("/dashboard")}} className=" text-slate-300 flex items-center justify-center">
    //                             <IoMdHome  size={`2rem`} />
    //                             </button>
    //                             <button  onClick={()=>{ navigate("/update") }} className="text-slate-300 pr-1">
    //                             <IoIosWallet size={`2rem`} /> 
    //                             </button>
    //                         </div>
    //                 </div>
    //             </div>
    //         </div>
    //         {isTransferSuccessful && <Success/>}
    //     </div>
    // </div>
    useEffect(() => {
        if (isTransferSuccessful) {
            const timer = setTimeout(() => {
                setIsTransferSuccessful(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isTransferSuccessful]);

    const handleTransfer = async () => {
        try {
            await axios.post("http://192.168.29.189:3000/api/v1/account/transfer", {
                to: id,
                amount
            }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            });
            setIsTransferSuccessful(true);
            setErrorMessage(""); 
        } catch (error) {
            setIsTransferSuccessful(false);
            setErrorMessage(error.response?.data?.message || "Transfer failed");
        }
    };

    return (
        <div className='relative'>
            <div className="flex items-center justify-center bg-[#121212] w-screen h-screen relative">
                <div className="bg-white h-[100vh] w-[27vw] rounded-[7%] border-x-2 border-black max-[1025px]:w-[35vw] max-[500px]:w-[100vw] max-[500px]:border-0 overflow-hidden ">
                    <Appbar />
                    <div className='flex flex-col items-center justify-center w-full h-[100vh]'>
                        <div className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 max-[600px]:w-[80vw] bg-white shadow-lg rounded-2xl">
                            <div className="flex flex-col space-y-1.5 p-6">
                                <h2 className="text-3xl font-bold text-center">Send Money</h2>
                            </div>
                            <div className="p-6">
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                                        <span className="text-2xl text-white">{name[0].toUpperCase()}</span>
                                    </div>
                                    <h3 className="text-2xl font-semibold">{name}</h3>
                                </div>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            htmlFor="amount"
                                        >
                                            Amount (in Rs)
                                        </label>
                                        <input
                                            onChange={(e) => setAmount(e.target.value)}
                                            type="number"
                                            min="1"
                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                            id="amount"
                                            placeholder="Enter amount"
                                        />
                                    </div>
                                    <button
                                        onClick={handleTransfer}
                                        className="justify-center rounded-md text-sm font-medium text-black ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 "
                                    >
                                        Initiate Transfer
                                    </button>
                                </div>
                            </div>
                        </div>
                        {errorMessage && (
                            <div className="text-red-500 inter font-bold text-center mt-4">
                                {errorMessage}
                            </div>
                        )}
                        <div className="w-full flex flex-col items-center justify-end h-[22vh] max-[500px]:h-[16vh]">
                            <div className="flex items-center justify-between w-28 h-14 rounded-full bg-slate-800 px-2">
                                <button onClick={() => { homeNavigate("/dashboard") }} className="text-slate-300 flex items-center justify-center">
                                    <IoMdHome size={`2rem`} />
                                </button>
                                <button onClick={() => { navigate("/update") }} className="text-slate-300 pr-1">
                                    <IoIosWallet size={`2rem`} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {isTransferSuccessful && <Success />}
            </div>
        </div>
    );
};

