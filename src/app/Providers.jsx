// app/providers.tsx
"use client";

import { ThemeProvider } from "next-themes";
import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore } from "@/store";

export function Providers({ children }) {
  const storeRef = useRef(undefined);
  if (!storeRef.current) {
    // Create the store_OLD instance the first time this renders
    storeRef.current = makeStore();
  }
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Provider store={storeRef.current}>{children}</Provider>
    </ThemeProvider>
  );
}
