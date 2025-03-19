// src/components/atoms/CustomGoogleLoginButton.jsx
"use client";

import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import { useSocialLoginMutation } from "@/features/auth/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/features/auth/authSlice";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const CustomGoogleLoginButton = ({
  onSuccess,
  isPage = true,
  className = "",
}) => {
  const [socialLogin, { isLoading }] = useSocialLoginMutation();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleGoogleSuccess = async (response) => {
    try {
      const { access_token } = response;
      const res = await socialLogin(access_token).unwrap();
      dispatch(
        setCredentials({
          user: {
            name: res.data.name,
            image: res.data.image,
          },
          token: res.data.token ? res.data.token : access_token,
        }),
      );
      toast.success("Logged in with Google successfully!");

      // Call onSuccess if provided
      if (onSuccess) onSuccess(res);

      // Only redirect to home if isPage is true
      if (isPage) {
        router.push("/");
      }
    } catch (error) {
      console.error("Google login failed:", error);
      toast.error("Failed to log in with Google. Please try again.");
    }
  };

  const login = useGoogleLogin({
    onSuccess: handleGoogleSuccess,
    onError: (error) => {
      console.error("Google login error:", error);
      toast.error("Google login failed. Please try again.");
    },
    flow: "implicit",
  });

  return (
    <button
      onClick={() => login()}
      disabled={isLoading}
      className={`flex justify-center items-center ${className} ${
        isLoading ? "opacity-50 cursor-not-allowed" : "hover:opacity-80"
      } transition-opacity duration-200`}
      aria-label="Sign in with Google"
    >
      <FcGoogle size={48} className="aspect-square rounded-full border-2 p-1" />
    </button>
  );
};

export default CustomGoogleLoginButton;
