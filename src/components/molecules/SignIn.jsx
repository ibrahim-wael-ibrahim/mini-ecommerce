// src/components/molecules/SignIn.jsx
"use client";
import { IoIosAt } from "react-icons/io";
import { CiLock } from "react-icons/ci";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "@/features/auth/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/features/auth/authSlice";
import { useRouter } from "next/navigation";

export default function SignIn({ isPage = true }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      const res = await login(data).unwrap();
      dispatch(
        setCredentials({
          user: res.data.user,
          token: res.data.token,
        }),
      );
      // if (localCart.length > 0) {
      //   await dispatch(syncCart(localCart));
      //   dispatch(clearCart());
      // }
      isPage && router.push("/");
    } catch (error) {
      console.error("SignIn failed:", error);
    }
  };

  return (
    <article className="bg-customLightBg dark:bg-customOrangeBg rounded-3xl min-h-[772px] w-full flex flex-col justify-start items-center gap-8 p-8">
      <h1 className="uppercase font-extrabold text-3xl">
        I am already a customer
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-between items-center  gap-8 p-4 mt-8 h-full w-full"
      >
        <div className="w-full space-y-4">
          <div className="flex items-center gap-2 w-full">
            <IoIosAt size={24} />
            <input
              {...register("email", { required: "Email is required" })}
              placeholder="Email"
              className="text-lg bg-transparent border-b-[1px] outline-0 w-full"
            />
          </div>
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}

          <div className="flex items-center gap-2 w-full">
            <CiLock size={24} />
            <input
              {...register("password", { required: "Password is required" })}
              type="password"
              placeholder="Password"
              className="text-lg bg-transparent border-b-[1px] outline-0 w-full"
            />
          </div>
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-4 bg-customOrange text-white rounded-full font-bold hover:bg-orange-600 transition-colors"
        >
          {isLoading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </article>
  );
}
