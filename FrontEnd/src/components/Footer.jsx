import React from 'react'
import {FaTwitter,FaInstagram,FaLinkedin,FaGithub } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className='bg-violet-400  items-center text-white py py-8 z-40 relative'>
        <div className='container mx-auto px-6 lg:px-14 flex flex-col items-center lg:flex-row lg:justify-between'>
            <div className='text-center lg:text-left'>
                <h2 className='text-3xl font-bold mb-2'>Linki-put</h2>
                <p>Simplifying URL shortening for efficient sharing</p>
            </div>
            <p className='mt-4 lg:mt-0'>
                &copy; 2025 Linki-Put. All rights reserved.
            </p>
            <div className='mt-4 lg:mt-0 flex gap-5'>
                <a href="https://github.com/RealKrisMiles" className='hover:text-gray-200'> <FaGithub size={24}/></a>
                <a href="#" className='hover:text-gray-200'> <FaTwitter size={24}/></a>
                <a href="https://www.instagram.com/rajathkprabhu/" className='hover:text-gray-200'> <FaInstagram size={24}/></a>
                <a href="https://www.linkedin.com/in/rajathkrishnaprabhu/" className='hover:text-gray-200'> <FaLinkedin size={24}/></a>
            </div>

        </div>
    </footer>
  )
}

export default Footer