// src/components/molecules/Register.jsx
"use client";
import { useForm } from "react-hook-form";
import {
  useRegisterMutation,
  useSocialLoginMutation,
} from "@/features/auth/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/features/auth/authSlice";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { IoIosAt } from "react-icons/io";
import { CiLock } from "react-icons/ci";
import { RiUser4Line } from "react-icons/ri";
import CustomGoogleLoginButton from "@/components/atoms/CustomGoogleLoginButton";
import {toast} from "sonner";
// import GoogleLoginButton from "@/components/atoms/GoogleLoginButton";

export default function SignUp({ isPage = true }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [registerUser, { isLoading }] = useRegisterMutation();
  const [socialLogin] = useSocialLoginMutation();

  const dispatch = useDispatch();
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      const res = await registerUser(data).unwrap();
      if(res.code === 422){
        return toast.error("it's already registered");
      }
      dispatch(
        setCredentials({
          user: {
            name : res.data.name,
            image : res.data.image,
          },
          token: res.data.token,
        }),
      );
      isPage && router.push("/");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };


  return (
    <article className="bg-customLightBg dark:bg-customOrangeBg rounded-3xl min-h-[772px] w-full flex flex-col justify-start items-center gap-8 p-8">
      <h1 className="uppercase font-extrabold text-3xl">Create Account</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full space-y-6 flex flex-col justify-between items-center gap-8 h-full"
      >
        <div className="space-y-4 w-full h-full">
          {/* First Name */}
          <div className="flex items-center gap-2 w-full">
            <RiUser4Line className="text-gray-400" />
            <input
              {...register("name", { required: "First name is required" })}
              placeholder="First Name"
              className="flex-1 bg-transparent border-b-[1px] outline-none"
            />
          </div>
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name.message}</span>
          )}

          {/* Last Name */}
          <div className="flex items-center gap-2 w-full">
            <RiUser4Line className="text-gray-400" />
            <input
              {...register("lastname", { required: "Last name is required" })}
              placeholder="Last Name"
              className="flex-1 bg-transparent border-b-[1px] outline-none"
            />
          </div>
          {errors.lastname && (
            <span className="text-red-500 text-sm">
              {errors.lastname.message}
            </span>
          )}

          {/* Email */}
          <div className="flex items-center gap-2 w-full">
            <IoIosAt className="text-gray-400" />
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              placeholder="Email"
              className="flex-1 bg-transparent border-b-[1px] outline-none"
            />
          </div>
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}

          {/* Password */}
          <div className="flex items-center gap-2 w-full">
            <CiLock className="text-gray-400" />
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              type="password"
              placeholder="Password"
              className="flex-1 bg-transparent border-b-[1px] outline-none"
            />
          </div>
          {errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password.message}
            </span>
          )}
        </div>

        <div className="w-full flex flex-col justify-end items-center gap-4 ">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-customOrange text-white rounded-full font-bold hover:bg-orange-600 transition-colors"
          >
            {isLoading ? "Creating Account..." : "Sign Up"}
          </button>
          <div className="w-full flex items-center gap-4">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="text-gray-500">OR</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          <CustomGoogleLoginButton
              isPage={isPage}
              onSuccess={(response) => {
                console.log("Login response:");
              }}
          />
        </div>
      </form>
    </article>
  );
}
