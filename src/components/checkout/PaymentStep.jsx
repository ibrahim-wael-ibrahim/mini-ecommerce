import Image from "next/image";
import { useTranslations } from "next-intl";

export default function PaymentStep({ method, onMethodChange, onSubmit }) {
  const t = useTranslations("checkout.paymentStep");

  return (
    <div className="mx-auto flex flex-col justify-between items-start container w-full gap-24">
      <h2 className="text-2xl font-bold mb-4 uppercase">{t("title")}</h2>
      <div className="space-y-4 w-full h-full">
        <div className="flex items-center justify-between w-full">
          <label className="flex items-center gap-4 text-lg capitalize">
            <input
              type="radio"
              value="card"
              checked={method === "card"}
              onChange={(e) => onMethodChange(e.target.value)}
              className="w-8 h-8"
            />
            {t("cardPayment")}
          </label>
          <Image
            src="/images/VISA_MASTER.svg"
            alt="VISA_MASTER"
            width={100}
            height={100}
            className="object-cover"
          />
        </div>
        <hr className="h-px my-12 bg-gray-200 border-0 dark:bg-gray-700" />
        <div className="flex items-center justify-between w-full">
          <label className="flex items-center gap-4 text-lg capitalize">
            <input
              type="radio"
              value="paypal"
              checked={method === "paypal"}
              onChange={(e) => onMethodChange(e.target.value)}
              className="w-8 h-8"
            />
            {t("paypal")}
          </label>
          <Image
            src="/images/PAYPAL.svg"
            alt="PAYPAL"
            width={100}
            height={100}
            className="object-cover"
          />
        </div>
      </div>
      <button
        onClick={onSubmit}
        className="bg-customOrange text-white px-4 py-4 mt-18 rounded-3xl font-extrabold w-full"
      >
        {t("continue")}
      </button>
    </div>
  );
}
