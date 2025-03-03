import axios from "axios";
import fixImageUrl from "@/utils/fixImageUrl";
import CategoryDetailsPage from "@/pages/CategoryDetailsPage";

export const revalidate = 360;

export async function generateMetadata({params, searchParams}) {
    const {id} = await params; // params is already an object; no need for await here
    const {lang} = await searchParams;

    // Use HTTPS if supported
    const apiUrl = `https://test-ecomerce.xn--hrt-w-ova.de/api/category/find/${id}`;

    try {
        const res = await fetch(apiUrl, {
            headers: {
                "Accept-Language": lang,
            },
            // Optionally, you can set a timeout using AbortController if needed
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch: ${res.status}`);
        }

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

export default function Page({params}) {
    return <CategoryDetailsPage params={params}/>;
}
