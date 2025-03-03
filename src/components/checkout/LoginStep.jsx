import SignIn from "@/components/molecules/SignIn";
import SignUp from "@/components/molecules/SignUp";

export default function LoginStep({ onSuccess }) {
  return (
    <div className="grid md:grid-cols-2 gap-4 w-full">
      <SignIn onSuccess={onSuccess} isPage={false} />
      <SignUp onSuccess={onSuccess} isPage={false} />
    </div>
  );
}
