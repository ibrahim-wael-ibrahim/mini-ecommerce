// src/features_OLD/locale/localeSlice.js
import { createSlice } from "@reduxjs/toolkit";
import rtlDetect from "rtl-detect";

// src/features_OLD/locale/localeSlice.js
const getInitialLocale = () => {
  if (typeof document !== "undefined") {
    const cookies = document.cookie.split("; ");
    const localeCookie = cookies.find((row) =>
      row.startsWith("NEXTAPP_LOCALE="),
    );
    return localeCookie ? localeCookie.split("=")[1] : "en";
  }
  return "en";
};

const initialState = {
  locale: getInitialLocale(),
  direction: getLangDir(getInitialLocale()),
};

const localeSlice = createSlice({
  name: "locale",
  initialState,
  reducers: {
    setLocale: (state, action) => {
      state.locale = action.payload.locale;
      state.direction = action.payload.direction;
    },
  },
});

export const { setLocale } = localeSlice.actions;
export const selectLocale = (state) => state.locale.locale;
export const selectDirection = (state) => state.locale.direction;

export default localeSlice.reducer;
