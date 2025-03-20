import fixImageUrl from "@/utils/fixImageUrl";
import ProductDetailsPage from "@/components/organisms/ProductDetailsPage";

export const revalidate = 360;

export async function generateStaticParams() {
  return [{ id: "3" }, { id: "4" }]; // Hardcoded; replace with API if available
}

export async function generateMetadata({ params, searchParams }) {
  const { id } = await params; // Await params
  const { lang } = await searchParams; // Await searchParams

  const apiUrl = `${process.env.API_BASE_URL}/product/find/${id}`;
  try {
    const res = await fetch(apiUrl, {
      headers: {
        "Accept-Language": lang || "en",
      },
    });
    const json = await res.json();
    const product = json.data;
    const ogImageUrl = product.productimage?.[0]?.link
      ? fixImageUrl(product.productimage[0].link)
      : "";

    const keywords = [
      product.title,
      "ecommerce",
      "buy online",
      "product",
      "sale",
    ];
    return {
      title: product.title,
      description: product.description,
      keywords,
      openGraph: {
        type: "website",
        title: product.title,
        description: product.description,
        images: [ogImageUrl],
      },
      twitter: {
        card: "summary_large_image",
        title: product.title,
        description: product.description,
        images: [ogImageUrl],
      },
      additionalMetaTags: [
        { name: "product:price:amount", content: product.price },
        { name: "product:price:currency", content: "EUR" },
      ],
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Product",
      description: "Default product description",
      keywords: ["product", "ecommerce"],
    };
  }
}

export async function getProductData(id, locale) {
  const apiUrl = `${process.env.API_BASE_URL}/product/find/${id}`;
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
      throw new Error(`Failed to fetch product: ${res.status}`);
    }
    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error("Error fetching product data:", error);
    return null;
  }
}

export default async function Page({ params, searchParams }) {
  const { id } = await params; // Await params
  const { lang } = await searchParams; // Await searchParams
  const product = await getProductData(id, lang);

  if (!product) {
    return { notFound: true };
  }

  return <ProductDetailsPage params={{ id }} initialProduct={product} />;
}
