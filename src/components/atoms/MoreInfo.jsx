import Link from "next/link";
import { useTranslations } from "next-intl";
import { HiArrowLongRight } from "react-icons/hi2";

export default function MoreInfo({ link }) {
  const t = useTranslations("molecules");
  return (
    <Link
      href={link}
      className="text-customOrange capitalize flex  items-center gap-4"
    >
      {t("moreInfo")}{" "}
      <span>
        {" "}
        <HiArrowLongRight size={20} className="rtl:rotate-180" />
      </span>
    </Link>
  );
}
