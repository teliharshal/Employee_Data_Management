// src/pages/Home.js
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  const cardVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const titleVariants = {
    animate: {
      scale: [1, 1.05, 1],
      transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
    },
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-50 to-blue-100 p-6 font-sans">
      
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="text-center bg-white shadow-2xl rounded-3xl p-8 sm:p-12 max-w-lg w-full transform hover:scale-105 transition-transform duration-500 ease-in-out"
      >
        {/* Title */}
        <motion.h1
          variants={titleVariants}
          animate="animate"
          className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6"
        >
          Employee Data Management
        </motion.h1>

        {/* Subtitle */}
        <p className="text-md sm:text-lg text-gray-700 mb-8 max-w-md mx-auto">
          Manage your employees seamlessly with a simple, powerful CRUD platform. Add, edit, and track employee information in one place.
        </p>

        {/* CTA Button */}
        <motion.div 
          whileHover={{ y: -5 }} 
          whileTap={{ scale: 0.95 }} 
          transition={{ type: "spring", stiffness: 400 }}
        >
          <Link
            to="/login"
            className="inline-block px-10 py-4 bg-indigo-600 text-white font-semibold rounded-full shadow-lg hover:bg-indigo-700 transition-colors duration-300 transform hover:shadow-xl"
          >
            Get Started
          </Link>
        </motion.div>
      </motion.div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="mt-12 text-gray-500 text-xs sm:text-sm text-center"
      >
        <p>&copy; {new Date().getFullYear()} Employee Data Management. All rights reserved.</p>
        <p className="mt-1">
          Developed with <span role="img" aria-label="heart">❤️</span> and React.js
        </p>
      </motion.footer>
    </div>
  );
}
