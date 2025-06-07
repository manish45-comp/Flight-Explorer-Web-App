import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import PasswordInput from "../../components/common/Inputs/PasswordInput";
import InputField from "../../components/common/Inputs/InputField";
import Button from "../../components/common/Buttons/Button";
import { RegistrationSchema } from "../../utils/schema";
import { addUser, getUser } from "../../db/userDB";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";
import toast from "react-hot-toast";

const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(RegistrationSchema),
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const existing = await getUser(data.email);
      if (existing) return setError("User already exists.");

      const hashed = await bcrypt.hash(data.password, 10);
      await addUser({ ...data, confirmPassword: hashed, password: hashed });
      navigate("/");
      toast.success("Register Successfull Please login");
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <form className="w-full space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <p className="text-red-500 text-sm text-center mb-4">{error}</p>
      <select
        name="role"
        onBlur={() => trigger("role")}
        {...register("role")}
        className="w-full py-2 px-3 rounded-lg bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 appearance-none"
      >
        <option value="" disabled>
          {" "}
          {/* Added value="" and disabled for better default handling */}
          Select Role
        </option>
        <option value="admin">admin</option>
        <option value="user">user</option>
      </select>
      {errors.role && (
        <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>
      )}{" "}
      {/* Added error display for role */}
      <div className="w-full space-y-4">
        <InputField
          name="name"
          register={register}
          error={errors.name?.message}
          label="Name"
          type="text"
        />
        <InputField
          name="email"
          register={register}
          error={errors.email?.message}
          label="Email"
          type="text"
        />
        <PasswordInput
          register={register}
          error={errors.password?.message}
          name="password"
          label="Password"
        />
        <PasswordInput
          register={register}
          error={errors.confirmPassword?.message}
          name="confirmPassword"
          label="Confirm Password"
        />
      </div>
      <Button disabled={isSubmitting}>
        {isSubmitting ? "Loading..." : "Sign Up"}
      </Button>
    </form>
  );
};

export default RegistrationForm;
