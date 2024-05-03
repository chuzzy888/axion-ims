


import React from 'react';
import { Link } from 'react-router-dom';
import { RiDashboardFill } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";
import { CgTrack } from "react-icons/cg";


function Menu() {
  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='flex flex-col items-center gap-8 overflow-x-auto hide-scrollbar sm:flex-row sm:gap-8'>
        <Link to='/dashboard/table'>
          <div className='bg-red-300 hover:bg-red-400 transition-colors duration-300 md:w-52 md:h-52 w-52 h-32 flex justify-center items-center shadow-md rounded-md'>
            <p className='font-bold text-slate-900 flex justify-center items-center flex-col gap-3'> <RiDashboardFill className='text-3xl'/>Dashboard</p>
          </div>
        </Link>

        <Link to='/dashboard/product'>
          <div className='bg-yellow-300 hover:bg-yellow-400 transition-colors duration-300 md:w-52 md:h-52 w-52 h-32 flex justify-center items-center shadow-md rounded-md'>
            <p className='font-bold text-gray-900 flex justify-center items-center flex-col gap-3'><IoMdAdd className='text-3xl'/>Add Product</p>
          </div>
        </Link>

        <Link to='/expenses'>
          <div className='bg-green-500 hover:bg-green-600 transition-colors duration-300 md:w-52 md:h-52 w-52 h-32 flex justify-center items-center text-white shadow-md rounded-md'>
            <p className='font-bold flex justify-center items-center flex-col gap-3'><CgTrack className='text-3xl' />Track Expenses</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Menu;
