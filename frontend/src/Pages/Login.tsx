import React from "react";
import { useState } from "react";
import Cookies from 'js-cookie';
import ActivityContext from "../ActivityContext";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
    // const [user, setUser] = useState<User | null>(null);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const activityContext = React.useContext(ActivityContext);
    const instance = activityContext.instance;
    const navigate = useNavigate();
    

    const handleLogin = (event: React.FormEvent) => {
        event.preventDefault(); //prevent the default refresh of the page on form submit
        if(instance !== null) {
            instance.post('/auth/login', {
                email: email,
                password: password
            })
            .then(response => {
                console.log(response.data);
                // setUser(response.data);  
                const newUser = response.data;
                console.log('User:', newUser);
                
                if(newUser !== null && newUser !== undefined) {
                    console.log('login successful', newUser);
                    
                    //set the cookies with the user data
                    Cookies.set('token', newUser.token);
                    Cookies.set('expiresIn', newUser.expiresIn);
                    Cookies.set('adminId', newUser.adminId);
                    console.log('Cookies:', Cookies.get('token'), Cookies.get('expiresIn'), Cookies.get('adminId'));
                    
                    //set the axios header with the token in order to be included in the requests by default
                    instance.defaults.headers.common['Authorization'] = 'Bearer ' + newUser.token;
                    // console.log('Axios headers:', instance.defaults.headers.common);
                    
                    //check role of user to direct him to the correct page
                    navigate('/dashboard');
                } else 
                    console.error('newUser is null in Login.');
            })
            .catch(error => {
                //TODO add error message popup maybe
                console.error('There was an error logging in: ' + error);
            })
        } else {
            console.error('Axios instance is null in Login.');
        }
    }

    return (
        <div className="flex flex-col justify-center items-center h-screen w-screen text-center">
            <form onSubmit={handleLogin} className="w-11/12 max-w-sm">
            <h1 className="mb-10 text-xl"> Welcome to Activity On Cloud</h1>
                <div className="flex flex-col justify-center items-center space-y-3 w-full">
                    <div className="flex flex-col space-y-2 text-center p-1 w-full">
                        <label htmlFor="Email">Username</label>
                        <input 
                            type="text" 
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
                            type="submit" >Login</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Login;