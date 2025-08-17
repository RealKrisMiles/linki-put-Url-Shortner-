import { MotionGlobalConfig } from 'motion';
import { motion } from "motion/react"
import React, { useState } from 'react'
import { IoIosMegaphone, IoIosMenu } from 'react-icons/io';
import { RxCross2 } from 'react-icons/rx';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useStoreContext } from '../contextApi/ContextApi';
import Button from '@mui/material/Button';
const Navbar = () => {

        
    }
  return (
<div className="h-16 bg-violet-400 z-50 flex items-center sticky top-0">
  <div className="lg:px-14 sm:px-8 px-4 w-full flex justify-between items-center">


    <Link to="/">
      <h1 className="font-bold text-3xl text-white italic">Linki-put</h1>
    </Link>


    <ul
      className={`flex sm:gap-10 gap-4 sm:items-center sm:static absolute left-0 top-[62px] sm:shadow-none shadow-md 
      ${navbarOpen ? "h-fit sm:pb-0 pb-5" : "h-0 overflow-hidden"} 
      transition-all duration-200 sm:h-fit sm:bg-transparent bg-custom-gradient 
      sm:w-auto w-full sm:flex-row flex-col px-4 sm:px-0`}
    >
      <li className="hover:text-amber-50 font-medium transition-all duration-150">
        <Link
          className={`${path === "/" ? "text-white font-semibold" : "text-gray-200"}`}
          to="/"
        >
          Home
        </Link>
      </li>
      
      <li className="hover:text-amber-50 font-medium transition-all duration-150">
        <Link
          className={`${path === "/aboutpage" ? "text-white font-semibold" : "text-gray-200"}`}
          to="/aboutpage"
        >
          About
        </Link>
      </li>
      {token && (<li className="hover:text-amber-50 font-medium transition-all duration-150">
        <Link
          className={`${path === "/dashboard" ? "text-white font-semibold" : "text-gray-200"}`}
          to="/dashboard"
        >
          Dashboard
        </Link>
      </li>)}
      {!token && (   <li>
        <Link
          to="/register"
          className="sm:ml-0 -ml-1 bg-rose-700 text-white cursor-pointer w-24 text-center font-semibold px-2 py-2 rounded-md hover:text-slate-300 transition-all duration-150 block"
        >
          Sign Up
        </Link>
      </li>)}
         {token && (  <button onClick={onLogOutHandler} className='sm:ml-0 -ml-1 bg-rose-700 text-white cursor-pointer w-24 text-center font-semibold px-2 py-2 rounded-md hover:text-slate-300 transition-all duration-150 block'>Logout</button> )}
        
      
   
    </ul>


    <button
      onClick={() => setnavbarOpen(!navbarOpen)}
      className="sm:hidden flex items-center"
    >
      {navbarOpen ? (
        <RxCross2 className="text-white text-3xl" />
      ) : (
        <IoIosMenu className="text-white text-3xl" />
      )}
    </button>
  </div>
</div>

  )
}

export default Navbar