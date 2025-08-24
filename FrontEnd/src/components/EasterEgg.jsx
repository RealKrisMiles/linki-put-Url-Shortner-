import React from "react";
import { FaCode, FaCoffee, FaBug, FaRocket, FaHandshake, FaGithub, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const EasterEgg = () => {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-purple-300 via-indigo-400 to-pink-300 flex flex-col justify-center items-center px-5 text-center">
      <div className="bg-white bg-opacity-90 backdrop-blur-md rounded-3xl shadow-2xl p-12 max-w-xl">
        <h1 className="text-5xl font-extrabold italic text-violet-800 mb-6 drop-shadow-md">
          🚀 Hey There, Future Employer! 🚀
        </h1>
        <p className="text-lg text-gray-700 mb-10 font-montserrat leading-relaxed">
          Are you looking for a <span className="font-bold text-purple-700">full-stack superhero</span> to boost your development team?
          <br />
          Look no further! I code with passion, drink 💻 + ☕️, and chase bugs like a boss.
        </p>

        <div className="flex justify-center gap-10 text-violet-700 text-4xl mb-10">
          <FaCode title="Developer Extraordinaire" />
          <FaCoffee title="Fuel for Creativity" />
          <FaBug title="Bug Squasher" />
          <FaRocket title="Launch Specialist" />
          <FaHandshake title="Awesome Team Player" />
        </div>

        <p className="text-xl font-semibold mb-8 text-purple-900 drop-shadow-sm">
          Please... Hire Me! 🙏
        </p>
        <div className='mt-4 lg:mt-0 flex justify-center gap-5'>
                        <a href="https://github.com/RealKrisMiles" className='hover:text-gray-200'> <FaGithub size={24}/></a>
                        <a href="#" className='hover:text-gray-200'> <FaTwitter size={24}/></a>
                        <a href="https://www.instagram.com/rajathkprabhu/" className='hover:text-gray-200'> <FaInstagram size={24}/></a>
                        <a href="https://www.linkedin.com/in/rajathkrishnaprabhu/" className='hover:text-gray-200'> <FaLinkedin size={24}/></a>
        </div>
       
      </div>
    </div>
  );
};

export default EasterEgg;