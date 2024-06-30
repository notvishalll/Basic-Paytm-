import axios from "axios"
import { useEffect, useState } from "react"

export const Balance = () =>{
    const [balance,setBalance] = useState(0)
    
    useEffect(()=>{
        axios.get('http://localhost:3000/account/balance',{
            headers:{
                Authorization:'Bearer '+localStorage.getItem('token')
            }
        }).then((r)=>{
            setBalance(r.data.balance)
        })
    },[])

    return(<div className="flex">
        <div className="font-bold text-lg">Balance</div>
        <div className="font-semibold ml-4 text-lg text-green-800"> Rs {balance}</div>
        <div className="font-semibold ml-4 text-sm "> (for live amount reload the Webpage)</div>
    </div>)
}