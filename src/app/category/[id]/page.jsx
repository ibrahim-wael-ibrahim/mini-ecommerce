import fixImageUrl from "@/utils/fixImageUrl";
import CategoryDetailsPage from "@/components/organisms/CategoryDetailsPage";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

export const revalidate = 360;

export async function generateStaticParams() {
  const apiUrl = `${process.env.API_BASE_URL}/category/get`;
  try {
    const res = await fetch(apiUrl, {
      headers: {
        "Accept-Language": "en",
        Accept: "application/json",
        "User-Type": "personal",
      },
    });
    if (!res.ok) throw new Error(`Failed to fetch categories: ${res.status}`);
    const json = await res.json();
    const categories = json.data || [];
    return categories.map((category) => ({
      id: category.id.toString(),
    }));
  } catch (error) {
    console.error("Error in generateStaticParams:", error);
    return [{ id: "5" }, { id: "6" }, { id: "7" }];
  }
}

export async function generateMetadata({ params, searchParams }) {
  const { id } = await params; // Await params
  const { lang } = await searchParams; // Await searchParams

  const apiUrl = `${process.env.API_BASE_URL}/category/find/${id}`;
  try {
    const res = await fetch(apiUrl, {
      headers: {
        "Accept-Language": lang || "en",
      },
    });
    if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
    const json = await res.json();
    const category = json.data;
    const ogImageUrl = fixImageUrl(category.image);

    return {
      title: category.title,
      description: category.description,
      openGraph: {
        title: category.title,
        description: category.description,
        images: [ogImageUrl],
      },
      twitter: {
        card: "summary_large_image",
        title: category.title,
        description: category.description,
        images: [ogImageUrl],
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Category",
      description: "Default category description",
    };
  }
}

export async function getCategoryData(id, locale) {
  const apiUrl = `${process.env.API_BASE_URL}/category/find/${id}`;
  try {
    const res = await fetch(apiUrl, {
      headers: {
        "Accept-Language": locale || "en",
        Accept: "application/json",
        "User-Type": "personal",
      },
    });
    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error(`Failed to fetch category: ${res.status}`);
    }
    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error("Error fetching category data:", error);
    return null;
  }
}

export default async function Page({ params, searchParams }) {
  const { id } = await params; // Await params
  const { lang } = await searchParams; // Await searchParams
  const category = await getCategoryData(id, lang);

  if (!category) {
    return { notFound: true };
  }

  return <CategoryDetailsPage params={{ id }} initialCategory={category} />;
}
