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
    <div className="flex justify-center items-center mb-6 w-full">
      {steps.map(({ step, title }) => (
        <button
          key={step}
          className="flex items-center transition-all duration-500 ease-in-out"
          disabled={currentStep < step}
        >
          <div
            className={`max-w-[194px] p-1 rounded-full flex justify-between items-center gap-2 ${
              currentStep > step ? "bg-customGreenW gap-8" : ""
            }`}
          >
            <span>
              {currentStep > step ? (
                <FaCircleCheck size={32} className="text-customGreenS" />
              ) : (
                <FaRegCircle size={32} className="text-customBlue" />
              )}
            </span>
            <span
              className={`uppercase font-extrabold mx-1 ${
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
              className={`h-[1px] min-w-[173px] ${
                currentStep >= step ? "bg-customGreenW" : "bg-customControlBg"
              }`}
            ></div>
          )}
        </button>
      ))}
    </div>
  );
}
