"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function SuccessStep({ sessionUrl }) {
  const t = useTranslations("checkout");
  const [count, setCount] = useState(5); // Countdown starts at 5 seconds

  useEffect(() => {
    if (!sessionUrl) return; // Do nothing if sessionUrl is missing

    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev <= 1) {
          clearInterval(timer); // Stop the timer
          window.location.href = sessionUrl; // Redirect to the session URL
          return 0;
        }
        return prev - 1; // Decrease countdown
      });
    }, 1000); // Decrease every second

    return () => clearInterval(timer); // Cleanup on component unmount
  }, [sessionUrl]);

  if (!sessionUrl) {
    return (
      <div className="max-w-md mx-auto flex flex-col justify-center items-center gap-6">
        <p className="text-red-500 font-bold">
          {t("successStep.errorSessionUrl")}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto flex flex-col justify-center items-center gap-6">
      <div>
        <h2 className="text-4xl font-bold mb-4">{t("successStep.title")}</h2>
        <p className="text-center">{t("successStep.message")}</p>
        <p className="text-center mt-2">
          {t("successStep.redirecting", { count })} {/* Display countdown */}
        </p>
      </div>
      <Image
        src={"/images/SUCCESS.svg"}
        alt={"success order"}
        width={264}
        height={395}
        className="object-contain object-center"
      />
      <Link
        href={"/"}
        className="bg-customOrange text-white font-extrabold capitalize px-12 py-4 rounded-full mt-4"
      >
        {t("successStep.goToHome")}
      </Link>
    </div>
  );
}
