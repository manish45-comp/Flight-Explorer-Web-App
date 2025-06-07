import * as yup from "yup";

export const LoginSchema = yup
  .object({
    email: yup.string().required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
    rememberMe: yup.boolean(),
  })
  .required();

export const RegistrationSchema = yup
  .object({
    name: yup.string().required("Name is required"),
    email: yup
      .string()
      .email("Enter valid email address")
      .required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Password must match")
      .required("Password is required"),
  })
  .required();
