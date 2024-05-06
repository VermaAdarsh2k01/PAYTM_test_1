import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import '../App.css'
import React , {useState , useEffect } from 'react'
import axios from "axios"

export const Dashboard = () => {

    const[balance , setBalance] = useState(0);

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
        <div className="flex items-center justify-center bg-[#F6F0E3] ">
            <div className="bg-white h-screen w-[30vw] rounded-2xl border-4 border-black max-[1025px]:w-[35vw] max-[500px]:w-[100vw]  max-[500px]:border-0 ">
                <Appbar />
                <div className="m-8 min-h-[80vh] max-[1025px]:mx-2 ">
                    <Balance value={balance} />
                    <Users />
                </div>
            </div>
        </div>
    )
}
