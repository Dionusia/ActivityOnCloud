import React, { useEffect } from "react";
import instance from "../AxiosConfig";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleLogin = () => {
        instance.post('/login', {
            email: email,
            password: password
        })
        .then(response => {
            console.log(response.data);
            navigate('/dashboard');
        })
        .catch(error => {
            //TODO add error message popup maybe
            console.error('There was an error logging in: ' + error);
        })
    }

    return (
        <div className="flex flex-col justify-center items-center h-screen w-screen">
            <h1 className="mb-10 text-xl" >Welcome</h1>
            <div className="flex flex-col justify-center items-center space-y-3 w-11/12 max-w-2xl">
                <div className="flex flex-col space-y-2 text-center p-1 w-full">
                    <label htmlFor="Email">Username</label>
                    <input 
                        type="email" 
                        placeholder="Enter Email" 
                        className="rounded-lg text-center"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)} />
                </div>
                <div className="flex flex-col space-y-2 text-center p-1 w-full">
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        placeholder="Enter Password" 
                        className="rounded-lg text-center" 
                        value={password}
                        onChange={(event) => setPassword(event.target.value)} />
                </div>
                <div className="flex justify-center w-full">
                    <button 
                        className="bg-customGreen text-white text-center rounded-lg p-2 w-1/2 max-w-40"
                        type="submit"
                        onClick={handleLogin}>Login</button>
                </div>
            </div>
        </div>
    );
};

export default Login;