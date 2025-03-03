// app/providers.jsx
"use client";

import { ThemeProvider } from "next-themes";
import { useRef, useEffect, useState } from "react";
import { Provider } from "react-redux";
import { makeStore } from "@/store";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "sonner";

export function Providers({ children }) {
  const storeRef = useRef(undefined);
  const [mounted, setMounted] = useState(false);
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }
  useEffect(() => setMounted(true), []);
  if (!mounted) return null; // Prevent SSR mismatch

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Provider store={storeRef.current}>
        <GoogleOAuthProvider
          authorizationParams={{
            redirect_uri: "https://test-ecomerce.hrt-wü.de/api/auth/callback",
            audience: "https://test-ecomerce.hrt-wü.de/api/v2/",
          }}
          clientId="939457397098-af0i8monehvqgrhr4rad4cvrk93kq1k7.apps.googleusercontent.com"
        >
          {children}
        </GoogleOAuthProvider>
        <Toaster position="top-right" richColors />
      </Provider>
    </ThemeProvider>
  );
}
