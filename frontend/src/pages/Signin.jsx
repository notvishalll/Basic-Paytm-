import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:3000/user/signin', {
                username,
                password
            });

            if (response.data.token) {
                localStorage.setItem('token', response.data.token);

                setTimeout(() => {
                    navigate('/dashboard');
                }, 500);
            }
        } catch (error) {
            console.error("Login failed", error);
        }
    };

    return (
        <div className="bg-red-200 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <Heading label={'Signin'} />
                    <SubHeading label={'Enter Your details to access your account'} />
                    <InputBox 
                        onChange={(e) => setUsername(e.target.value)} 
                        placeholder={'example@gmail.com'} 
                        label={'Email'} 
                    />
                    <InputBox 
                        onChange={(e) => setPassword(e.target.value)} 
                        placeholder={'********'} 
                        label={'Password'} 
                        type={'password'} 
                    />
                    <div className="pt-4">
                        <Button 
                            onClick={handleLogin} 
                            label={'Log in'} 
                        />
                    </div>
                    <BottomWarning 
                        label={"Don't have an Account"} 
                        buttonText={'Create new account'} 
                        to={'/signup'} 
                    />
                </div>
            </div>
        </div>
    );
}
