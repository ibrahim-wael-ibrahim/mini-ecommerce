import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export default getRequestConfig(async () => {
  const cookie = await cookies();
  const locale = cookie.get("NEXTAPP_LOCALE")?.value || "en";

  // Import translations with fallback
  const [home, molecules, categories] = await Promise.all([
    import(`./locales/${locale}/home.json`).catch(() => ({ default: {} })),
    import(`./locales/${locale}/molecules.json`).catch(() => ({ default: {} })),
    import(`./locales/${locale}/categories.json`).catch(() => ({
      default: {},
    })),
  ]);

  return {
    locale,
    messages: {
      home: home.default,
      molecules: molecules.default,
      categories: categories.default,
    },
  };
});
