import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import '../App.css'
import React , {useState , useEffect } from 'react'
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { IoIosWallet } from "react-icons/io";
import { IoMdHome } from "react-icons/io";

export const Dashboard = () => {

    const[balance , setBalance] = useState(0);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchBalance = async () => { 
            try {
                const response = await axios.get('https://paytm-test-1-1.onrender.com/api/v1/account/balance', {
                    headers: {
                        'Authorization': "Bearer " + localStorage.getItem("token")
                    }
                });
                
                setBalance(Math.floor(response.data.balance));
            
            } catch (error) {
                console.error(error);
            }
        };

        fetchBalance();
    }, []);

    return (
        <div className="flex items-center justify-center bg-[#121212] w-screen h-screen">
            <div className="bg-white h-screen w-[27vw] rounded-[7%] border-x-2  border-black max-[1025px]:w-[35vw] max-[500px]:w-[100vw]  max-[500px]:border-0 ">
                <Appbar />
                <div className="mx-6 my-10 min-h-[80vh] max-[1025px]:mx-2 ">
                    <Balance value={balance} />
                    <Users />
                    <div className="w-full flex flex-col items-center justify-end h-[15vh] ">
                        <div className="flex  items-center justify-between px-1 w-28 h-14 rounded-full bg-slate-800" >
                            <div className="w-12 h-12 bg-slate-400 rounded-full text-slate-300 flex items-center justify-center">
                            <IoMdHome size={`2rem`} />
                            </div>
                            <button  onClick={()=>{ navigate("/update") }} className="text-slate-300 pr-1">
                            <IoIosWallet size={`2rem`} /> 
                            </button>
                        </div>
                    </div>
                </div> 
            </div>
        </div>
    )
}
