
import { Heading } from '../components/Heading'
import { SubHeading } from '../components/SubHeading'
import { InputBox } from '../components/InputBox'
import { Button } from '../components/Button'
import { BottomWarning } from '../components/BottomWarning'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const Signup = () => {
  const navigate = useNavigate();
  const [firstname, setFirstName] = useState("")
  const [lastname, setLastName] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  return (<div className="bg-blue-200 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign up"} />
        <SubHeading label={'Enter Your info'} />
        <InputBox onChange={e => {
          setFirstName(e.target.value)
        }} placeholder={'Vishal'} label={'First Name'} />
        <InputBox onChange={e => {
          setLastName(e.target.value)
        }} placeholder={'Kumar'} label={'Last Name'} />
        <InputBox onChange={e => {
          setUsername(e.target.value)
        }} placeholder={'Vishal@gmail.com'} label={'Email'} />
        <InputBox onChange={e => {
          setPassword(e.target.value)
        }} placeholder={'123456'} label={'Password'} />
        <div className='pt-4'> 
          <Button onClick={ async()=>{
            const response =await axios.post("http://localhost:3000/user/signup",{
              username:username,
              password:password,
              firstname:firstname,
              lastname:lastname
            })
            localStorage.setItem("token",response.data.token)
            setTimeout(() => {
              navigate('/dashboard')
            }, 500);

          }} label={"Create new account"} /></div>
        <BottomWarning label={'Already have a account'} buttonText={'Signin'} to={'/signin'} />

      </div>
    </div>

  </div >)
}