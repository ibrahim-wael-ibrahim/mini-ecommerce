// app/providers.jsx
"use client";

import { ThemeProvider } from "next-themes";
import { useRef, useEffect, useState } from "react";
import { Provider } from "react-redux";
import { makeStore } from "@/store";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "sonner";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

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
            redirect_uri: `${process.env.API_BASE_URL}/auth/callback`,
            audience: `${process.env.API_BASE_URL}/v2/`,
          }}
          clientId={process.env.GOOGLE_CLIENT_ID}
        >
          {children}
        </GoogleOAuthProvider>
        <Toaster position="bottom-right" richColors />
      </Provider>
    </ThemeProvider>
  );
}
