import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputField from "../../components/common/Inputs/InputField";
import PasswordInput from "../../components/common/Inputs/PasswordInput";
import FormLink from "../../components/common/FormLinks/FormLink"; // This was in the original, but not used in the final JSX. Kept for consistency if it's meant to be there.
import Button from "../../components/common/Buttons/Button";
import { useNavigate } from "react-router-dom";
import { LoginSchema } from "../../utils/schema";
import { getUser } from "../../db/userDB";
import { useState } from "react";
import bcrypt from "bcryptjs";
import { useDispatch } from "react-redux";
import { login } from "../../features/auth/authSlice";
import toast from "react-hot-toast";

const LoginForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    trigger,
  } = useForm({
    resolver: yupResolver(LoginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const user = await getUser(data.email);
      if (!user) return setError("User not found.");
      const match = await bcrypt.compare(data.password, user.password);
      if (!match) return setError("Invalid credentials");
      dispatch(login({ user: user.email, role: user.role }));
      navigate(user.role === "admin" ? "/admin" : "/dashboard");
      toast.success("Login Successfull");
    } catch (error) {
      toast.error(error + "Failed to Login try again");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
      <p className="text-red-500 text-sm text-center mb-4">{error}</p>
      <div className="w-full space-y-4">
        <InputField
          name="email"
          register={register}
          error={errors.email?.message}
          label="Email"
          trigger={trigger}
          type="text"
        />
        <PasswordInput
          placeholder="••••••••••"
          trigger={trigger}
          register={register}
          name="password"
          label="Password"
          type="password"
          error={errors.password?.message}
        />
      </div>

      <Button disabled={isSubmitting}>
        {isSubmitting ? "Loading..." : "Sign in"}
      </Button>
    </form>
  );
};

export default LoginForm;
