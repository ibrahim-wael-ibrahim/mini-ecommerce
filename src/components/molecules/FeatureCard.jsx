import Image from "next/image";
import { useTranslations } from "next-intl";

export default function FeatureCard({ image, id, title, description }) {
  const t = useTranslations("home");
  return (
    <article
      className="relative w-[370px] h-[506px] flex justify-center items-end "
      id={id}
    >
      <Image
        src={image}
        alt={t(title)}
        className="absolute z-10"
        width={370}
        height={476}
        style={{ height: "auto", width: "auto" }}
      />
      <Image
        src={image}
        alt={title}
        className="absolute bottom-0 left-0 right-0 mx-auto -z-0 blur-3xl opacity-60"
        width={300}
        height={380}
        style={{ height: "auto", width: "auto" }}
      />
      <div className="w-[334px] h-[239px] relative flex flex-col justify-center items-center my-4 z-10">
        <div className="relative">
          <div className="absolute -bottom-0 -left-24 h-1.5 w-24 rounded-br-lg bg-transparent shadow-[0.5rem_0_0_0] shadow-white/70 backdrop-blur-sm "></div>
          <div className="z-10 bg-white/70 backdrop-blur-sm  w-[78px] h-[39px] rounded-[39px_39px_0_0] relative"></div>
          <div className="absolute -bottom-0 -right-24 h-1.5 w-24 rounded-bl-lg shadow-[-0.5rem_0_0_0] shadow-white/70 backdrop-blur-sm"></div>
        </div>
        <div className="relative flex flex-col items-center justify-center w-full h-full bg-white/70 rounded-2xl backdrop-blur-sm p-4 text-black">
          <h2 className="text-2xl font-extrabold">{t(title)}</h2>
          <p className="mt-2 text-base text-center">{t(description)}</p>
        </div>
      </div>
    </article>
  );
}
