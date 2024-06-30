import { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";

export function Me() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    
    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            navigate('/signup');
        } else {
            navigate('/dashboard')}
}, [navigate]);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="bg-red-200 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <Heading label={`Welcome, ${user.name}`} />
                    <SubHeading label={`Email: ${user.email}`} />
                </div>
            </div>
        </div>
    );
}
