import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative mt-6  w-full bg-customLightBg dark:bg-customOrangeBg flex flex-col flex-wrap justify-between items-center py-10 px-32 gap-12">
      <article className="relative min-h-8/12 w-8/12 flex   justify-between items-center gap-8 py-20 ">
        <div className="flex flex-col justify-center items-start gap-8">
          <h1 className=" font-extrabold text-2xl">LOGO</h1>
          <p className="w-[293px] text-[15px] font-normal">
            The advantage of hiring a workspace with us is that givees you
            comfortable service and all-around facilities.
          </p>
        </div>
        <div className="flex flex-col justify-center items-start gap-4">
          <h1 className="font-bold capitalize text-customOrange">Services</h1>
          <span>Email Marketing</span>
          <span>Campaigns</span>
          <span>Branding</span>
        </div>
        <div className="flex flex-col justify-center items-start gap-4">
          <h1 className="font-bold capitalize text-customOrange">Furniture</h1>
          <span>Beds</span>
          <span>Chair</span>
          <span>All</span>
        </div>
        <div className="flex flex-col justify-center items-start gap-4">
          <h1 className="font-bold capitalize text-customOrange">Follow US</h1>
          <div className="flex items-center gap-4">
            <FaFacebookF />
            <span>Facebook</span>
          </div>
          <div className="flex items-center gap-4">
            <FaTwitter />
            <span>Twitter</span>
          </div>
          <div className="flex items-center gap-4">
            <FaInstagram />
            <span>Instagram</span>
          </div>
        </div>
      </article>
      <article className="relative w-8/12  flex  flex-wrap justify-between items-center gap-8 ">
        <div>Copyright&copy;2021</div>
        <div className="flex  justify-center items-center gap-12">
          <span>terms & Conditions</span> <span>Privacy Policy</span>
        </div>
      </article>
    </footer>
  );
}
