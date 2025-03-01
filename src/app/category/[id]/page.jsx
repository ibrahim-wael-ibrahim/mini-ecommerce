import axios from "axios";
import fixImageUrl from "@/utils/fixImageUrl";
import CategoryDetailsPage from "@/pages/CategoryDetailsPage";

export const revalidate = 360;

export async function generateMetadata({ params, searchParams }) {
  const { id } = await params;
  const { lang } = await searchParams;

  // Using HTTPS endpoint
  const apiUrl = `https://test-ecomerce.xn--hrt-w-ova.de/api/category/find/${id}`;

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        "Accept-Language": lang,
      },
      timeout: 10000, // Increase timeout to 10 seconds
    });

    const category = response.data.data;
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

export default function Page({ params }) {
  return <CategoryDetailsPage params={params} />;
}
