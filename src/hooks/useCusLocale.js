import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { setLocale } from "@/store/Slices/localeSlice";
import { getLangDir } from "rtl-detect";

export function useCusLocale() {
  const dispatch = useDispatch();
  const locale = useSelector((state) => state.locale.locale);
  const router = useRouter();
  const direction = getLangDir(locale);

  // Update locale in Redux and cookie, then refresh the page
  const updateLocale = (newLocale) => {
    dispatch(setLocale(newLocale));
    document.cookie = `NEXTAPP_LOCALE=${newLocale}; path=/;`;
    router.refresh();
  };

  // On mount, initialize locale from cookie or browser settings
  useEffect(() => {
    const cookieLocale = document.cookie
      .split("; ")
      .find((row) => row.startsWith("NEXTAPP_LOCALE="))
      ?.split("=")[1];
    if (cookieLocale) {
      dispatch(setLocale(cookieLocale));
    } else {
      const browserLocale = navigator.language.slice(0, 2);
      document.cookie = `NEXTAPP_LOCALE=${browserLocale}; path=/;`;
      dispatch(setLocale(browserLocale));
    }
  }, [dispatch]);

  return { locale, direction, updateLocale };
}
