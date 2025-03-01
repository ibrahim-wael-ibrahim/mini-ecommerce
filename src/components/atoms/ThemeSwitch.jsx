// ThemeSwitch.js
"use client";
import { IoSunny, IoMoon } from "react-icons/io5";
import { useThemeSwitch } from "@/hooks/useThemeSwitch";
import Image from "next/image";

export default function ThemeSwitch() {
  const { isMounted, resolvedTheme, toggleTheme } = useThemeSwitch();

  // Loading state while waiting for hydration
  if (!isMounted) {
    return (
      <div className="h-8 bg-gray-200  dark:bg-gray-700 w-8 rounded-lg"></div>
    );
  }

  // Render the appropriate icon based on the current theme
  if (resolvedTheme === "dark") {
    return (
      <IoSunny
        size={24}
        className="text-customOrange hidden md:block cursor-pointer"
        onClick={toggleTheme}
        title="Switch to Light Mode"
      />
    );
  }

  if (resolvedTheme === "light") {
    return (
      <IoMoon
        size={24}
        className="hidden md:block cursor-pointer"
        onClick={toggleTheme}
        title="Switch to Dark Mode"
      />
    );
  }

  return null; // Fallback in case resolvedTheme is undefined
}
