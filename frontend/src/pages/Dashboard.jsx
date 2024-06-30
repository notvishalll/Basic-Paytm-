import { useNavigate } from 'react-router-dom'
import {AppBar} from '../components/Appbar'
import {Balance} from '../components/Balance'
import {Users} from '../components/Users'
export function Dashboard(){
    const Navigate = useNavigate()
    return(<div>
        <AppBar/>
        <Balance/>
        <Users/>
        <button onClick={()=>{
            localStorage.removeItem('token');
            Navigate('/signup')
        }} className='w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2'>Log out</button>
        
        </div>)
}