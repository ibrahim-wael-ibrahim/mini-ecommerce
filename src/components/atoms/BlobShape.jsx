import Image from "next/image";

export default function BlobShape({
  PathSvg,
  dirY = "top-20",
  dirX = "left",
  className,
}) {
  return (
    <div
      className={`absolute ${dirY} ${dirX}-0 xl:w-[330px] w-[100px] ${className} -z-[1]`}
    >
      <Image
        src={PathSvg}
        width={0}
        height={0}
        style={{ width: "auto", height: "auto" }}
        alt="BlobShape"
        className={`absolute -z-0 opacity-60 top-0 bottom-0 my-auto ${dirX}-0 scale-110`}
      />
      <Image
        src={PathSvg}
        width={0}
        height={0}
        style={{ width: "auto", height: "auto" }}
        alt="BlobShape"
        className={`absolute top-0 bottom-0 my-auto ${dirX}-0`}
      />
    </div>
  );
}
