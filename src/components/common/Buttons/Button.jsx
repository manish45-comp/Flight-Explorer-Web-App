import "../../../styles/button.css";
import { addRippleEffect } from "../../../utils/helper";
import { motion } from "framer-motion";

const Button = ({ children, onClick, className, disabled }) => {
  const handleClick = (event) => {
    if (disabled) return;
    const button = event.currentTarget;
    addRippleEffect(button, event);
    if (onClick) onClick(event);
  };

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      disabled={disabled}
      type="submit"
      onClick={handleClick}
      className={`${className} btn w-full h-10 rounded-md py-2 flex items-centers justify-center hover:bg-blue-600 ${
        disabled
          ? "bg-gray-700 text-white cursor-not-allowed animate-pulse"
          : "bg-blue-500 text-white cursor-pointer"
      }`}
    >
      {children}
    </motion.button>
  );
};

export default Button;
