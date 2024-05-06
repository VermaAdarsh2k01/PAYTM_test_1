import React, { useState , useEffect} from 'react';
import axios from 'axios';
import Success from '../components/Success'



const UpdateBalance = () => {
    const [balanceChange, setBalanceChange] = useState(0);
    const [isTransferSuccessful, setIsTransferSuccessful] = useState(false);
    
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
        <div className='realative'>
        <div className="flex justify-center h-screen bg-slate-300 ">
            <div className="h-full flex flex-col justify-center">
                <div className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 max-[1025px]:w-[30vw] max-[600px]:w-[80vw] bg-white shadow-lg rounded-lg ">
                    <div className="flex flex-col space-y-1.5 p-6">
                        <h2 className="text-3xl  text-center inter font-black">Add money</h2>
                    </div>
                    <div className="p-6">
                        <div className="flex items-center justify-center gap-10">
                        <div className="">
                            <form onSubmit={handleSubmit} className='flex flex-col gap-7'>
                                <label className='text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex flex-col gap-3'>
                                    Balance Change:
                                    <input type="number" value={balanceChange} onChange={changeHandle} className='required flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm'/>
                                </label>
                                <button type="submit " className='justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500'>Update Balance</button>
                            </form>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {isTransferSuccessful && <Success/>}
        </div>
    );
};

export default UpdateBalance;
