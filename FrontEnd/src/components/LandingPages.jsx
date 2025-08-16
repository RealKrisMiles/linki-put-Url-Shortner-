import React from "react";
import Card from "./Card";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useStoreContext } from "../contextApi/ContextApi";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};




  return (
    <motion.div
      className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-violet-100 to-violet-300 lg:px-20 sm:px-10 px-6 flex flex-col justify-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="flex flex-col lg:flex-row items-center py-16 lg:py-10 gap-12 lg:gap-20"
        variants={itemVariants}
      >
        <div className="flex flex-col lg:w-2/3 w-full">
          <motion.h1
            className="font-bold font-roboto text-slate-900 md:text-6xl text-4xl md:leading-[60px] sm:leading-[50px] leading-tight"
            variants={itemVariants}
          >
            Linki-put Simplifies URL Shortening to share it with your friends.
          </motion.h1>
          <motion.p
            className="text-slate-700 lg:text-xl text-lg mt-6 mb-10 max-w-xl leading-relaxed tracking-wide"
            variants={itemVariants}
          >
            Linki-put simplifies URL shortening for{" "}
            <span className="font-semibold">Efficient Sharing</span>, making
            sharing links effortless and efficient. With its user-friendly
            interface, Linki-put allows you to generate concise, easy-to-share
            URLs in seconds. Simplify your sharing experience with Linki-put
            today.
          </motion.p>

          <motion.div className="flex items-center gap-5 lg:gap-10" variants={itemVariants}>
            <motion.button
              className="bg-violet-700 text-amber-50 hover:bg-violet-500 hover:text-violet-900 rounded-md font-semibold px-6 py-3 shadow-lg transition-transform transform"
              onClick={dashBoardNavigateHandler}
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.95 }}
            >
              Manage Links
            </motion.button>
            <motion.button
              className="bg-amber-400 text-violet-900 hover:bg-amber-300 hover:text-violet-900 rounded-md font-semibold px-6 py-3 shadow-lg transition-transform transform"
              onClick={dashBoardNavigateHandler}
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.95 }}
            >
              Create Short Link
            </motion.button>
              <motion.button
              className="bg-pink-500 text-white hover:bg-pink-400 rounded-md font-semibold px-6 py-3 shadow-lg transition-transform transform"
              onClick={easterEggNavigateHandler}
              whileHover={{ scale: 1.1, rotate: 10 }}
              whileTap={{ scale: 0.9, rotate: -10 }}
              title="Click me for a surprise!"
            >
              🎉 Surprise!
            </motion.button>
          </motion.div>
        </div>

        <motion.div
          className="flex justify-center items-center lg:w-1/3 w-full rounded-xl shadow-xl border-4 border-violet-200 overflow-hidden"
          variants={itemVariants}
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 120 }}
        >
          <img
            className="sm:w-[400px] h-[260px] w-full object-cover"
            src="/Image/logoimg.png"
            alt="Linki-put funny logo"
          />
        </motion.div>
      </motion.div>

      <motion.div className="sm:pt-16 pt-12 text-center" variants={itemVariants}>
        <p className="text-slate-900 font-bold lg:w-[60%] md:w-[70%] sm:w-[80%] mx-auto text-lg sm:text-xl tracking-wide select-none">
          Trusted by Developers and their Friends. So trust me.
        </p>

        <motion.div
          className="pt-8 grid lg:gap-8 gap-6 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <Card
              title="Simple URL Shortening"
              desc="We streamline link sharing while giving you insights into your 
                    performance. With a simple interface and powerful features, 
                    Linki-put is designed for individuals, businesses, and creators 
                    who value efficiency."
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card
              title="Powerful Analytics"
              desc="Gain insights into your link performance with our comprehensive analytics tools. 
                    Track clicks, geographical data, and referral sources to optimize 
                    your reach."
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card
              title="Enhanced Security"
              desc="All shortened URLs are protected with advanced encryption and 
                    security checks, ensuring your data stays safe and trustworthy."
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card
              title="Fast & Reliable"
              desc="Enjoy lightning-fast redirects and top-notch uptime. 
                    Your shortened URLs will always be available to provide a 
                    seamless experience for your users."
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default LandingPages;
