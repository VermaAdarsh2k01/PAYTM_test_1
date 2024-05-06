import { useSearchParams } from 'react-router-dom';
import axios from "axios";
import { useState } from 'react';
import Success from '../components/Success'
import { useEffect } from 'react';


export const SendMoney = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const [amount, setAmount] = useState(0);
    const [isTransferSuccessful, setIsTransferSuccessful] = useState(false);


    useEffect(() => {
        if (isTransferSuccessful) {
            const timer = setTimeout(() => {
                setIsTransferSuccessful(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isTransferSuccessful]);

    

    return <div className='relative'> 
    <div className="flex justify-center h-screen bg-slate-300 ">
        <div className="h-full flex flex-col justify-center">
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
                            onChange={(e) => {
                                setAmount(e.target.value);
                            }}
                            type="number"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            id="amount"
                            placeholder="Enter amount"
                        />
                        </div>
                        <button 
                        onClick={() => {
                            axios.post("http://192.168.29.189:3000/api/v1/account/transfer", {
                                to: id,
                                amount
                            }, {
                                headers: {
                                    Authorization: "Bearer " + localStorage.getItem("token")
                                }
                            })
                            setIsTransferSuccessful(true)
                        }} className="justify-center rounded-md text-sm font-medium text-black ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 ">
                            Initiate Transfer{console.log(isTransferSuccessful)}
                        </button>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
    {isTransferSuccessful && <Success/>}
    </div>
}
