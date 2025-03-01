export default function ProductCard({ product }) {
  console.log(product);
  return (
    <article className="relative w-[268px] h-[441px] flex items-center justify-center flex-col rounded-2xl  ">
      <div className="min-h-[220px] min-w-full bg-customLightBg dark:bg-customOrangeBg rounded-t-3xl"></div>
      <div></div>
    </article>
  );
}
