"use client";
import { useState, useEffect } from "react";
import { useCusLocale } from "@/hooks/useCusLocale";
import Image from "next/image";

export default function LocaleSwitch() {
  const [mounted, setMounted] = useState(false);
  const { locale, updateLocale } = useCusLocale();

  // Ensure hydration is complete before rendering
  useEffect(() => setMounted(true), []);
  if (!mounted) {
    return (
      <div className="h-8 bg-gray-200 dark:bg-gray-700 w-12 rounded-lg"></div>
    );
  }

  // Toggle between 'ar' and 'en'
  const targetLocale = locale === "ar" ? "en" : "ar";
  const iconPath = `/images/${targetLocale.toUpperCase()}_ICON.svg`;

  return (
    <button
      onClick={() => updateLocale(targetLocale)}
      className="hidden md:flex items-center gap-2 p-2 rounded"
    >
      <Image
        src={iconPath}
        alt={`${targetLocale.toUpperCase()} Language`}
        width={24}
        height={24}
      />
      <span>{targetLocale.toUpperCase()}</span>
    </button>
  );
}
