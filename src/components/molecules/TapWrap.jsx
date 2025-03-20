"use client";
import { useState, memo } from "react";
import SignIn from "@/components/molecules/SignIn";
import SignUp from "@/components/molecules/SignUp";
import { useTranslations } from "next-intl";
import clsx from "clsx";

function TapWrap({ onSuccess, isPage }) {
  const t = useTranslations("molecules"); // Assuming translations are in molecules.json
  const [activeTab, setActiveTab] = useState("signin");

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
  };

  return (
    <section className="lg:hidden w-full max-w-md mx-auto">
      {/* Tab Buttons */}
      <div className="flex justify-center items-center w-full mb-6">
        <button
          type="button"
          onClick={() => handleTabSwitch("signin")}
          className={clsx(
            "text-2xl font-normal p-2  w-full",
            activeTab === "signin"
              ? "border-b-2  border-customOrange dark:bg-customOrangeBg bg-customOrange text-customOrange"
              : "bg-customControlBg text-black",
          )}
          aria-label={t("signinTabLabel", { defaultMessage: "Sign In" })}
          aria-selected={activeTab === "signin"}
        >
          {t("signinTabLabel", { defaultMessage: "Sign In" })}
        </button>
        <button
          type="button"
          onClick={() => handleTabSwitch("signup")}
          aria-label={t("signupTabLabel", { defaultMessage: "Sign Up" })}
          className={clsx(
            "text-2xl font-normal p-2  w-full",
            activeTab === "signup"
              ? "border-b-2  border-customOrange dark:bg-customOrangeBg bg-customOrange text-customOrange"
              : "bg-customControlBg text-black",
          )}
          aria-selected={activeTab === "signup"}
        >
          {t("signupTabLabel", { defaultMessage: "Sign Up" })}
        </button>
      </div>

      <div>
        {activeTab === "signin" ? (
          <SignIn onSuccess={onSuccess} isPage={isPage} />
        ) : (
          <SignUp onSuccess={onSuccess} isPage={isPage} />
        )}
      </div>
    </section>
  );
}

export default memo(TapWrap);
