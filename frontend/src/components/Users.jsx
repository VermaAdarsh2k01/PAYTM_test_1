
import React, { useEffect, useState } from 'react'
import {Button} from './Button';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export const Users = () => {

    const [users , setUsers ] = useState([]);
    const [filter , setFilter] = useState("");

    useEffect( ()=> {
        axios.get("https://paytm-test-1-1.onrender.com/api/v1/user/bulk?filter=" + filter)
            .then( response => {
                setUsers(response.data.user)
            }) 
    } , [filter])

    return (
        <div>
            <div className="font-bold mt-10 text-lg max-[1025px]:mt-5">
                Contacts
            </div>
            <div className="my-2 ">
                <input onChange={(e) => {
                    setFilter(e.target.value)
                }} type="text" placeholder="Search users..." className="w-full px-2 py-1 border-2 rounded border-slate-200"></input>
            </div>

            <div className='h-[40vh] p-2 overflow-y-auto border-4 rounded-2xl scrollbar-webkit max-[1025px]:h-[40vh]'>
                {users.map(user => <User user={user} />)}
            </div>
        </div>
    )
}

function User({user}){
    
    const navigate = useNavigate();
    let firstName = user.firstName;
    let capitalizedFirstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);

    return <div className="flex justify-between" >
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200  text-slate-600 flex justify-center mt-1 mr-2">
                <div className="flex flex-col items-center justify-center h-full text-xl font-semilbold">
                    {user.firstName[0].toUpperCase()}
                </div>
            </div>
            <div className="flex flex-col justify-center h-ful">
                <div className='font-bold'>
                    {capitalizedFirstName} {user.lastName}
                </div>
            </div>
        </div>
        <div className="flex flex-col justify-center h-full">
            <Button onClick={(e) => {
                navigate("/send?id=" + user._id + "&name=" + user.firstName);
            }} label={"Send Money"} 
            
            />
        </div>
    </div>
}
