import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import '../App.css'
import React , {useState , useEffect } from 'react'
import axios from "axios"
import { FaPlusCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom"
import { IoIosWallet } from "react-icons/io";

export const Dashboard = () => {

    const[balance , setBalance] = useState(0);

    const navigate = useNavigate()

    useEffect(() => {
        const fetchBalance = async () => {
            
            try {
                const response = await axios.get('http://192.168.29.189:3000/api/v1/account/balance', {
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
        <div className="flex items-center justify-center bg-[#F6F0E3] w-screen h-screen">
            <div className="bg-white h-screen w-[27vw] rounded-[7%] border-x-2  border-black max-[1025px]:w-[35vw] max-[500px]:w-[100vw]  max-[500px]:border-0 ">
                <Appbar />
                <div className="mx-8 my-8 min-h-[80vh] max-[1025px]:mx-2 ">
                    <Balance value={balance} />
                    <Users />
                    <div className="w-full flex flex-col items-center justify-end h-[15vh] ">
                        <button onClick={()=>{ navigate("/update") }} className="flex flex-col items-center justify-center w-16 h-16  rounded-2xl bg-green-400" >
                            <IoIosWallet size={`2rem`}/> 
                            <p>Add</p>
                        </button>
                    </div>
                </div> 
            </div>
        </div>
    )
}
