import fixImageUrl from "@/utils/fixImageUrl";
import ProductDetailsPage from "@/pages/ProductDetailsPage";

export const revalidate = 360;

export async function generateMetadata({ params, searchParams }) {
  const { id } = await params;
  const { lang } = await searchParams;

  // Use HTTPS if supported and fetch the product details.
  const apiUrl = `https://test-ecomerce.xn--hrt-w-ova.de/api/product/find/${id}`;

  try {
    const res = await fetch(apiUrl, {
      headers: {
        "Accept-Language": lang,
      },
    });

    const json = await res.json();
    const product = json.data;

    // Use the first product image (if available) for Open Graph/Twitter image.
    const ogImageUrl =
      product.productimage && product.productimage.length > 0
        ? fixImageUrl(product.productimage[0].link)
        : "";

    // Create a keywords array based on the product title and other generic keywords.
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
      keywords: keywords,
      openGraph: {
        type: "website", // Changed from "product" to "website"
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

export default function Page({ params }) {
  return <ProductDetailsPage params={params} />;
}
