import { useState } from "react";
import { motion } from "framer-motion";
import { useForm, type FieldValues } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Login: React.FC<{ registerFlag?: boolean }> = ({
  registerFlag = false,
}) => {
  const navigate = useNavigate();
  const [serverErrors, setServerErrors] = useState<Record<string, string>>({});

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
    reset,
  } = useForm();

  const onSubmit = (data: FieldValues) => {
    console.log(data);
    if (registerFlag) {
      const registerUser = async () => {
        const response = await axios.post(
          `https://linkedin-clone-backend-xrxp.onrender.com/user/register`,
          data
        );
        console.log(response.data.status);
        if (response.data.status === 200) {
          navigate("/login");
          setServerErrors({});
          reset();
          console.log(response.data.msg);
        } else {
          const backendErrors: Record<string, string> = {};
          response.data.errors.forEach((err: { path: string; msg: string }) => {
            backendErrors[err.path] = err.msg;
          });
          setServerErrors(backendErrors);
        }
      };
      registerUser();
    } else {
      const loginUser = async () => {
        const response = await axios.post(
          `https://linkedin-clone-backend-xrxp.onrender.com/user/login`,
          data
        );
        console.log(response.data.status);
        if (response.data.status === 200) {
          console.log(response.data.msg);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("name", response.data.userName);
          console.log(response.data);
          localStorage.setItem("job", response.data.userJob);
          navigate("/");
          console.log(response.data.token);
          reset();
          setServerErrors({});
        } else {
          const backendErrors: Record<string, string> = {};
          response.data?.errors?.forEach(
            (err: { path: string; msg: string }) => {
              backendErrors[err.path] = err.msg;
            }
          );
          setServerErrors(backendErrors);
        }
      };
      loginUser();
    }
  };

  return (
    <div className="flex min-h-screen w-full max-h-screen sm:bg-[#f9fafb] items-center justify-center">
      <div className="w-full lg:w-1/2 sm:bg-[#f9fafb] p-4 flex flex-col items-center mt-24 sm:mt-0 sm:justify-center">
        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="bg-white w-full max-w-md px-4 py-6 sm:p-6 rounded-lg shadow sm:shadow-xl"
          autoComplete="off"
        >
          {/* Header */}
          <div className="space-y-2 flex flex-col items-center">
            <p className="text-2xl sm:text-3xl font-bold text-center sm:text-left">
              {registerFlag ? "Sign up" : "Sign in"}
            </p>
            <p className="text-sm text-gray-500 text-center sm:text-left">
              {registerFlag
                ? "Professional networking made simple"
                : "Please login to continue to your account"}
            </p>
          </div>

          {/* hello */}
          <div className="relative space-y-4 mt-6">
            {registerFlag && (
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="name"
                  className="text-sm text-gray-500 font-semibold"
                >
                  Your Name
                </label>
                <input
                  id="name"
                  placeholder="Enter your name"
                  {...register("name", {
                    required: true,
                    pattern: /^(?!\s*$)[A-Za-z0-9 ]+$/,
                  })}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs">Enter valid name</p>
                )}
              </div>
            )}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="email"
                className="text-sm text-gray-500 font-semibold"
              >
                Email
              </label>
              <input
                id="email"
                type="text"
                placeholder="Enter your email"
                {...register("email", {
                  required: true,
                  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                })}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
              />
              {isSubmitted && (errors.email || serverErrors.email) && (
                <p className="text-red-500 text-xs">
                  {errors.email ? "Enter a valid email" : serverErrors.email}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="password"
                className="text-sm text-gray-500 font-semibold"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                  required: true,
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                  pattern: {
                    value: /^[^\s'"`;\\]+$/,
                    message: "Password contains invalid characters",
                  },
                })}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
              />
              {isSubmitted && (errors.password || serverErrors.password) && (
                <p className="text-red-500 text-xs">
                  {errors.password
                    ? "Password must be atleast 6 characters"
                    : serverErrors.password}
                </p>
              )}
            </div>
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 mt-6 rounded-md text-white text-sm font-medium transition-all bg-[#155DFC] hover:bg-[#004dc9]"
          >
            {registerFlag ? "Sign up" : "Log in"}
          </button>

          {/* Google Sign-in */}
          <button
            type="button"
            className="flex items-center justify-center gap-2 w-full py-2 px-4 mt-2 border rounded-md text-sm font-medium border-gray-300 text-gray-700 hover:bg-gray-100 transition-all cursor-pointer"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#EA4335"
                d="M24 9.5c3.45 0 6.52 1.18 8.95 3.13l6.7-6.7C35.1 2.3 29.94 0 24 0 14.88 0 6.94 5.75 3.24 13.89l7.83 6.1C13 14.05 18.13 9.5 24 9.5z"
              />
              <path
                fill="#34A853"
                d="M24 48c6.21 0 11.42-2.08 15.22-5.64l-7.07-5.79c-2.06 1.39-4.67 2.2-8.15 2.2-6.27 0-11.6-4.23-13.51-9.93l-7.9 6.09C6.84 42.89 14.88 48 24 48z"
              />
              <path
                fill="#4A90E2"
                d="M47.5 24.5c0-1.71-.14-3.29-.41-4.84H24v9.18h13.29c-.58 3.14-2.37 5.82-5.07 7.68l7.07 5.79C43.6 37.9 47.5 31.94 47.5 24.5z"
              />
              <path
                fill="#FBBC05"
                d="M10.49 28.84A14.47 14.47 0 0 1 9.5 24c0-1.68.3-3.29.83-4.78l-7.83-6.1A23.93 23.93 0 0 0 0 24c0 3.89.93 7.56 2.57 10.8l7.92-6.09z"
              />
            </svg>
            Sign in with Google
          </button>

          {/* Redirect Link */}
          <p className="text-sm text-gray-500 text-center mt-4">
            {registerFlag
              ? "Already have an account?"
              : "Don't have an account?"}
            <span
              onClick={() => navigate(registerFlag ? "/login" : "/register")}
              className="ml-1 text-blue-500 cursor-pointer font-semibold border-b"
            >
              {registerFlag ? "Sign in" : "Register"}
            </span>
          </p>
        </motion.form>
      </div>
    </div>
  );
};
