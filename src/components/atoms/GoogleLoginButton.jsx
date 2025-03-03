// src/components/atoms/GoogleLoginButton.jsx
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

export default function GoogleLoginButton({ onSuccess }) {
  return (
    <GoogleLogin
      onSuccess={(credentialResponse) => {
        const decoded = jwtDecode(credentialResponse.credential);
        onSuccess({
          token: credentialResponse.credential,
          email: decoded.email,
          firstName: decoded.given_name,
          lastName: decoded.family_name,
        });
      }}
      onError={() => console.log("Login Failed")}
      useOneTap
    />
  );
}
