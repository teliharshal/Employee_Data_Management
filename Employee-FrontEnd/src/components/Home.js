// // src/Pages/Home.js
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";

// export default function Home() {
//   const cardVariants = {
//     hidden: { opacity: 0, y: -50 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
//   };

//   const titleVariants = {
//     animate: {
//       scale: [1, 1.03, 1],
//       transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
//     },
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 font-sans">
//       <motion.div
//         variants={cardVariants}
//         initial="hidden"
//         animate="visible"
//         className="text-center bg-white shadow-2xl rounded-3xl p-8 sm:p-12 max-w-lg w-full transform hover:scale-105 transition-transform duration-500 ease-in-out"
//       >
//         <div className="mb-6">
//           <motion.h1
//             variants={titleVariants}
//             animate="animate"
//             className="text-4xl m:text-4xl font-extrabold text-gray-900 leading-tight"
//           // >
//             WorkForce Management
//           </motion.h1>
//         </div>

//         <p className="text-md sm:text-lg text-gray-700 mb-8 max-w-sm mx-auto">
//           Streamline your team's operations. Our comprehensive platform helps you manage employees.
//         </p>

//         <div className="flex flex-col sm:flex-row gap-4 justify-center">
//           <motion.div whileHover={{ y: -5 }} whileTap={{ scale: 0.95 }} transition={{ type: "spring", stiffness: 400 }}>
//             <Link
//               to="/login/user"
//               className="w-full sm:w-auto inline-block px-10 py-4 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-300 transform hover:shadow-xl"
//             >
//               Login as User
//             </Link>
//           </motion.div>

//           <motion.div whileHover={{ y: -5 }} whileTap={{ scale: 0.95 }} transition={{ type: "spring", stiffness: 400 }}>
//             <Link
//               to="/login/admin"
//               className="w-full sm:w-auto inline-block px-10 py-4 bg-green-600 text-white font-semibold rounded-full shadow-lg hover:bg-green-700 transition-colors duration-300 transform hover:shadow-xl"
//             >
//               Login as Admin
//             </Link>
//           </motion.div>
//         </div>
//       </motion.div>

//       <motion.footer
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 1.5, duration: 1 }}
//         className="mt-12 text-gray-500 text-xs sm:text-sm"
//       >
//         <p>&copy; {new Date().getFullYear()} WorkForce Management. All rights reserved.</p>
//         <p className="mt-1">
//           Developed with <span role="img" aria-label="heart">❤️</span> and React.
//         </p>
//       </motion.footer>
//     </div>
//   );
// }