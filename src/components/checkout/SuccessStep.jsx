import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function SuccessStep() {
  const t = useTranslations("checkout.successStep");

  return (
    <div className="max-w-md mx-auto flex flex-col justify-center items-center gap-6">
      <div>
        <h2 className="text-4xl font-bold mb-4">{t("title")}</h2>
        <p className="text-center">{t("message")}</p>
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
        {t("goToHome")}
      </Link>
    </div>
  );
}
