

import React, { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RiAccountCircleFill } from "react-icons/ri";
import { CiLogin } from "react-icons/ci";




function LoginSignup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                // Move toast success here if it is necessary
                // toast.success("Logged in successfully!");
            } else {
                setUser(null);
            }
        });
        return unsubscribe;
    }, []);

    const handleSignup = async (event) => {
        event.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            // Moved login toast here as it was being triggered prematurely
            toast.success("Signed up successfully!");
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            toast.error(error.message);
            console.error("Sign-up error:", error);
        }
    };



    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            console.log('Authentication success:', result);
            setUser(result.user); // Update user state immediately
            toast.success("Logged in successfully!");
        } catch (error) {
            console.error("Login error:", error);
            if (error.code === "auth/wrong-password") {
                toast.error("Wrong password. Please try again!");
            } else {
                toast.error(error.message);
            }
        }
    };




    const handleGoogleLogin = async (event) => {
        event.preventDefault();
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            toast.success("Google sign-in successful!");
        } catch (error) {
            toast.error(error.message);
            console.error("Google sign-in error:", error);
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            toast.info("Logged out successfully!");
            navigate('/');
        } catch (error) {
            toast.error(error.message);
            console.error("Logout error:", error);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen  bg-gray-100" >
                  <ToastContainer position="top-center" autoClose={2000} />

            
            <div className="p-8 bg-white shadow-lg rounded-lg m-4 ">
            <div className='flex justify-center items-center'> <img src="https://axionfoam.com/axionlogo.png" alt="" className='w-36'/></div>
     
           
                <form action="" className='h-390 ' >
                    <h2 className=" flex justify-center items-center  text-6xl font-bold text-gray-800 mb-4 "> <RiAccountCircleFill /> </h2>
                    <input
                        className="w-full mb-4 p-2 border border-gray-300 rounded"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}

                    />

                    <input
                        className="w-full mb-4 p-2 border border-gray-300 rounded"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <span className='items-center flex justify-center flex-col gap-4'>

                        <button className=" w-32 mb-2  py-2 bg-blue-500 hover:bg-blue-600 text-white rounded flex justify-center items-center gap-1" onClick={handleLogin}><CiLogin />Login</button>
                        <p>Dont have an Account ?</p>
                        <button className="  w-48   py-2 bg-green-500 hover:bg-green-600 text-white rounded" onClick={handleSignup}>Sign Up</button>
                        <p className='text-center text-xs'>OR</p>
                        <button className="  w-32 py-2 bg-gray-100 hover:border  text-black rounded flex justify-center items-center gap-2" onClick={handleGoogleLogin}>
                            <img src="data:image/png;base64,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" alt="" className='w-8' />
                            Google</button>

                    </span>
                    {user && (
                        <button onClick={handleLogout} className="mt-4 w-full py-2 bg-gray-500 hover:bg-gray-600 text-white rounded">Logout</button>
                    )}
                </form>
            </div>
        </div>
    );
}

export default LoginSignup;
