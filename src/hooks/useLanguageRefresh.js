// src/hooks/useLanguageRefresh.js
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

/**
 * Hook to refresh the route when the current language differs from the desired locale.
 *
 * @param {string} currentLang - The current language from search params.
 * @param {string} locale - The desired locale.
 * @param {string|number} id - The dynamic id for the route.
 * @param {(id: string|number, locale: string) => string} [linkTemplate] - Optional function to generate a custom URL.
 * @returns {boolean} True if the route refresh is in progress, false otherwise.
 */
export function useLanguageRefresh(currentLang, locale, id, linkTemplate) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const dynamicLink = linkTemplate
    ? linkTemplate(id, locale)
    : `/category/${id}?lang=${locale}`;

  const refreshRoute = useCallback(() => {
    router.replace(dynamicLink);
    router.refresh();
  }, [router, dynamicLink]);

  useEffect(() => {
    if (currentLang !== locale) {
      refreshRoute();
    } else {
      setLoading(false);
    }
  }, [currentLang, locale, refreshRoute]);

  return loading;
}
