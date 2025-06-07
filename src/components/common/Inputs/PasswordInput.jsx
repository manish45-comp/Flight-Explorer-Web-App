import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const PasswordInput = ({
  register,
  name,
  error,
  label,
  type,
  trigger,
  placeholder,
}) => {
  const [isTypePassword, setIsTypePassword] = useState(type === "password");

  const togglePasswordType = () => setIsTypePassword(!isTypePassword);

  return (
    <div className="text-start w-full mb-3">
      <label htmlFor={name} className="text-black text-sm font-semibold">
        {label}
      </label>
      <div className="w-full relative">
        <input
          placeholder={placeholder}
          id={name}
          {...register(name)}
          onBlur={() => trigger(name)}
          type={isTypePassword ? "password" : "text"}
          className={`${
            error ? "border-red-300" : "border-gray-300"
          } text-input-text bg-blue-100 border w-full p-2 rounded-md mt-2 focus:outline-primary bg-background`}
        />
        {error && (
          <p className="text-red-400 text-xs mt-1 tracking-wide">{error}</p>
        )}
        <motion.button
          type="button"
          onClick={togglePasswordType}
          className="p-2 rounded-full absolute right-2 top-[10px]"
          aria-label="Toggle Password Visibility"
        >
          <AnimatePresence mode="wait" initial={false}>
            {isTypePassword ? (
              <motion.div
                key="show"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.1 }}
              >
                <Eye className="text-gray-600" />
              </motion.div>
            ) : (
              <motion.div
                key="hide"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.1 }}
              >
                <EyeClosed className="text-gray-500" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  );
};

export default PasswordInput;
