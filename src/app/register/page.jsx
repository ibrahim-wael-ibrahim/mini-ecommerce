import SignIn from "@/components/molecules/SignIn";
import SignUp from "@/components/molecules/SignUp";

export default function Register() {
  return (
    <section className="min-h-[80dvh] p-8 my-32 flex flex-col justify-center items-center container mx-auto">
      <article className="flex flex-col justify-center items-center gap-4 mb-10">
        <h1 className="text-6xl capitalize font-extrabold">
          Welcome to Our Store
        </h1>
        <p className="capitalize text-lg opacity-60">
          Bringing Your Style Home
        </p>
      </article>
      <section className="grid grid-cols-2 gap-4 w-full h-full">
        <SignIn />
        {/*<article className="bg-red-400 h-full w-full">s</article>*/}
        <SignUp />
      </section>
    </section>
  );
}
