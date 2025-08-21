import React from 'react';
import ShortenUrlPage from '../components/ShortenUrlPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPages from '../components/LandingPages';
import AboutPage from '../components/AboutPage';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RegisterPage from '../components/RegisterPage';
import Login from '../components/Login';
import DashBoardLayout from '../DashBoard/DashBoardLayout';
import { Toaster } from 'react-hot-toast';
import PrivateRoute from '../PrivateRoute'; // <-- Only if this file exists
import ErrorPage from '../components/ErrorPage';
import EasterEgg from '../components/EasterEgg';



const AppRouter = () => {
  return (
  <>
    <Navbar/>
        <Toaster />
      <Routes>
        <Route path='/' element={<LandingPages/>}></Route>
        <Route path='/aboutpage' element={<AboutPage/>}></Route>
        <Route path='/register' element={<PrivateRoute publicPage={true}><RegisterPage/></PrivateRoute>}></Route>
        <Route path='/login' element={<PrivateRoute publicPage={true}><Login/></PrivateRoute>}></Route>
        <Route path='/dashboard' element={<PrivateRoute publicPage={false}><DashBoardLayout/></PrivateRoute>}></Route>
         <Route path='/easteregg' element={<EasterEgg/>}></Route>
         <Route path='*' element={<ErrorPage message="We can't find the page you are looking for"/>}></Route>
          <Route path='/error' element={<ErrorPage message="Error"/>}></Route>
      </Routes>
      <Footer/>
</>
  )
}

export default AppRouter

export const SubDomainRouter=()=>{
    return(
        <Routes>
        <Route path='/:url' element={<ShortenUrlPage/>}></Route>
       
      </Routes>
    )
}