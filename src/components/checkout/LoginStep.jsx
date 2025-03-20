import SignIn from "@/components/molecules/SignIn";
import SignUp from "@/components/molecules/SignUp";
import TapWrap from "@/components/molecules/TapWrap";

export default function LoginStep({ onSuccess }) {
  return (
    <>
      <div className="hidden lg:grid grid-cols-2 gap-4 w-full">
        <SignIn onSuccess={onSuccess} isPage={false} />
        <SignUp onSuccess={onSuccess} isPage={false} />
      </div>
      <TapWrap onSuccess={onSuccess} isPage={false} />
    </>
  );
}
