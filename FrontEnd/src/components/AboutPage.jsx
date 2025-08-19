import React from 'react';
import { FaLink, FaShareAlt, FaEdit, FaChartLine } from 'react-icons/fa';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.3, delayChildren: 0.2 }
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: 'easeOut' } 
  },
};

const AboutPage = () => {
  return (
    <motion.div 
      className="lg:px-20 sm:px-10 px-5 min-h-[calc(100vh-64px)] pt-16 bg-gradient-to-br from-purple-300 via-indigo-200 to-pink-100 flex justify-center items-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl sm:py-16 py-12 px-10 sm:px-16">
        
        <motion.h1 
          className="sm:text-5xl text-4xl font-extrabold italic mb-8 border-b-4 border-violet-500 inline-block pb-2 text-gray-900 tracking-wide drop-shadow-lg"
          variants={itemVariants}
        >
          About Linki-put
        </motion.h1>
        
        <motion.p 
          className="text-gray-700 text-lg sm:text-xl mb-14 leading-relaxed max-w-4xl mx-auto font-light"
          variants={itemVariants}
        >
          Linki-put is a fast, simple, and reliable URL shortener that helps you share clean, 
          easy-to-remember links. Whether you’re sharing on social media, messaging apps, 
          or in professional documents, Linki-put keeps your links neat and user-friendly.
        </motion.p>

        <motion.div className="space-y-12 max-w-4xl mx-auto" variants={containerVariants}>
          
          <motion.div className="flex items-start space-x-5" variants={itemVariants}>
            <FaLink className="text-red-500 text-5xl sm:text-6xl flex-shrink-0 drop-shadow-md" />
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2 tracking-wide">
                Simple URL Shortening
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed font-light">
                We streamline link sharing while giving you insights into your 
                performance. With a simple interface and powerful features, 
                Linki-put is designed for individuals, businesses, and creators 
                who value efficiency.
              </p>
            </div>
          </motion.div>

          <motion.div className="flex items-start space-x-5" variants={itemVariants}>
            <FaShareAlt className="text-blue-500 text-5xl sm:text-6xl flex-shrink-0 drop-shadow-md" />
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2 tracking-wide">
                Powerful Analytics
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed font-light">
                Gain insights into your link performance with our comprehensive analytics tools. 
                Track clicks, geographical data, and referral sources to optimize 
                your reach.
              </p>
            </div>
          </motion.div>

          <motion.div className="flex items-start space-x-5" variants={itemVariants}>
            <FaEdit className="text-yellow-500 text-5xl sm:text-6xl flex-shrink-0 drop-shadow-md" />
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2 tracking-wide">
                Enhanced Security
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed font-light">
                All shortened URLs are protected with advanced encryption and 
                security checks, ensuring your data stays safe and trustworthy.
              </p>
            </div>
          </motion.div>

          <motion.div className="flex items-start space-x-5" variants={itemVariants}>
            <FaChartLine className="text-green-500 text-5xl sm:text-6xl flex-shrink-0 drop-shadow-md" />
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2 tracking-wide">
                Fast & Reliable
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed font-light">
                Enjoy lightning-fast redirects and top-notch uptime. 
                Your shortened URLs will always be available to provide a 
                seamless experience for your users.
              </p>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </motion.div>
  )
}

export default AboutPage;
