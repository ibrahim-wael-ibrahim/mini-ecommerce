// src/components/molecules/CategoryCard.jsx
import Image from "next/image";
import MoreInfo from "@/components/atoms/MoreInfo";
import fixImageUrl from "@/utils/fixImageUrl";

export default function CategoryCard({ image, title, description, id, link }) {
  return (
    <article
      id={id}
      className="flex flex-col justify-between items-start w-[284px] h-[478px] "
    >
      <div className="w-[277px] h-[267px] overflow-hidden rounded-2xl">
        <Image
          src={fixImageUrl(image)}
          alt={title}
          width={277}
          height={267}
          style={{ width: "100%", height: "100%" }}
          quality="100"
          priority
        />
      </div>
      <h2 className="mt-4 text-2xl font-bold">{title}</h2>
      <p className="mb-auto mt-8 max-h-[3ch] flex justify-start items-start opacity-40 line-clamp-3">
        {description}
      </p>
      <MoreInfo link={link} />
    </article>
  );
}
