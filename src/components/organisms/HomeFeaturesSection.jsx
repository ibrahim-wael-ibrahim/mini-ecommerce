import FeatureCard from "@/components/molecules/FeatureCard";
import BlobShape from "@/components/atoms/BlobShape";
import { useTranslations } from "next-intl";

const features = [
  {
    id: 1,
    title: "homeFeaturesSection.items.extensiveCatalog.title",
    description: "homeFeaturesSection.items.extensiveCatalog.description",
    image: "/images/feature/FEATURE_ONE.png",
  },
  {
    id: 2,
    title: "homeFeaturesSection.items.detailedProductDescriptions.title",
    description:
      "homeFeaturesSection.items.detailedProductDescriptions.description",
    image: "/images/feature/FEATURE_TWO.png",
  },
  {
    id: 3,
    title: "homeFeaturesSection.items.roomPlanner.title",
    description: "homeFeaturesSection.items.roomPlanner.description",
    image: "/images/feature/FEATURE_THREE.png",
  },
];

export default function HomeFeaturesSection() {
  const t = useTranslations("home");
  return (
    <section className="relative min-h-[70dvh]  w-full flex flex-col  justify-center items-center gap-8 py-20 mt-60 mb-80 bg-customLightBg dark:bg-customOrangeBg">
      <BlobShape
        PathSvg="/images/blob/BLOB_3.svg"
        dirX="left"
        dirY="bottom-0"
      />
      <BlobShape PathSvg="/images/blob/BLOB_2.svg" dirX="right" dirY="top-18" />
      <span className="uppercase text-customOrange text-xl">
        {t("homeFeaturesSection.subtitle")}
      </span>
      <h1 className="capitalize text-5xl font-extrabold">
        {t("homeFeaturesSection.title")}
      </h1>
      <div className="relative flex flex-wrap justify-center items-center mt-5 gap-32">
        {features.map((feature) => (
          <FeatureCard
            key={feature.id}
            image={feature.image}
            title={feature.title}
            description={feature.description}
            link={feature.link}
          />
        ))}
      </div>
    </section>
  );
}
