"use client";
import { FaRegCircle } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import { useTranslations } from "next-intl";

export default function ProgressIndicator({ currentStep }) {
  const t = useTranslations("checkout.progressIndicator.steps");

  const steps = [
    { step: 1, title: t("login") },
    { step: 2, title: t("data") },
    { step: 3, title: t("payment") },
    { step: 4, title: t("review") },
  ];

  return (
    <div className="flex justify-center items-center mb-6 mx-2 w-full">
      {steps.map(({ step, title }) => (
        <button
          key={step}
          className="flex items-center transition-all duration-500 ease-in-out"
          disabled={currentStep < step}
        >
          <div
            className={`max-w-[194px] md:p-1 rounded-full flex justify-between items-center gap-2 ${
              currentStep > step ? "bg-customGreenW md:gap-8" : ""
            }`}
          >
            <span>
              {currentStep > step ? (
                <FaCircleCheck className="text-customGreenS lg:text-2xl" />
              ) : (
                <FaRegCircle className="text-customBlue lg:text-2xl " />
              )}
            </span>
            <span
              className={`uppercase text-sm lg:text-2xl font-extrabold mx-1 ${
                currentStep > step
                  ? "text-black"
                  : currentStep === step
                    ? ""
                    : "opacity-60"
              }`}
            >
              {title}
            </span>
          </div>
          {step < 4 && (
            <div
              className={`h-px lg:min-w-[173px] min-w-[32px] ${
                currentStep >= step ? "bg-customGreenW" : "bg-customControlBg"
              }`}
            ></div>
          )}
        </button>
      ))}
    </div>
  );
}
