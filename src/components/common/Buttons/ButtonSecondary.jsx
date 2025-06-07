import React from "react";
import "../../../styles/button.css";
import { addRippleEffect } from "../../../utils/helper";
import { motion } from "framer-motion";

const ButtonSecondary = ({ children, onClick, className, disabled }) => {
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
      className={`${className} btn w-full h-10 rounded-md flex items-centers text-button-secondary-text border-2 border-button-secondary-border justify-center ${
        disabled
          ? "bg-gray-700 cursor-not-allowed animate-pulse"
          : "cursor-pointer"
      }`}
    >
      {children}
    </motion.button>
  );
};

export default ButtonSecondary;
