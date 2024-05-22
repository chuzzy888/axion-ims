





import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase';
import LoginSignup from './LoginSignup';
import ProductForm from './ProductForm';
import ProductTable from './ProductTable';
import Menu from './Menu';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ExpensesCalculator from './ExpensesCalculator';
import BackButton from './BackButton';
import { LuLogOut } from "react-icons/lu";


function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <LoginSignup onLogin={() => setUser(auth.currentUser)} />} />
        <Route path="/dashboard" element={user ? (
          <div className='flex flex-col h-screen bg-slate-900'>
            <div className='p-4 bg-black flex justify-between items-center max-w-full'>
              <img src="https://axionfoam.com/axionlogo.png" alt="" className='w-36' />
              <button onClick={handleLogout} className='bg-red-600 text-white hover:bg-red-500 m-2 p-1.5 rounded'><LuLogOut /></button>
            </div>
            <div className='flex-grow flex justify-center items-center overflow-hidden'>
              <Menu />
            </div>
          </div>


        ) : (
          <Navigate to="/" />
        )}
        />
        {/* Adjust the Routes to include BackButton on specific pages */}
        <Route path="/dashboard/table" element={user ? <><BackButton /><ProductTable /></> : <Navigate to="/" />} />
        <Route path="/dashboard/product" element={user ? <><BackButton /><ProductForm /></> : <Navigate to="/" />} />
        <Route path="/expenses" element={user ? <><BackButton /><ExpensesCalculator /></> : <Navigate to="/" />} />
      </Routes>
      <ToastContainer position="top-center" autoClose={2000} />
    </Router>
  );
}

export default App;
