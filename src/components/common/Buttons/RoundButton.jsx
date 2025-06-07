import { motion } from "framer-motion";

export const RoundButton = ({ onClick, className, children }) => {
  return (
    <motion.div
      onClick={onClick}
      whileTap={{ scale: 0.9 }}
      className={`cursor-pointer md:hover:bg-primary/20  hover:text-text-primary h-10 w-10 rounded-full grid place-content-center ${className}`}
    >
      {children}
    </motion.div>
  );
};
