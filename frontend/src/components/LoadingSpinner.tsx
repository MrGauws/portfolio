"use client";

import { motion } from "framer-motion";

const spinnerVariants = {
  animate: {
    rotate: 360,
    transition: {
      repeat: Infinity,
      duration: 1,
      ease: "linear",
    },
  },
};

const LoadingSpinner = () => {
  return (
    <motion.div
      className="flex items-center justify-center py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full"
        variants={spinnerVariants}
        animate="animate"
      />
    </motion.div>
  );
};

export default LoadingSpinner;