Below is a well-structured `README.md` file tailored to your Next.js e-commerce project. It includes an overview, setup
instructions, features, technologies, file structure, and some code snippets to highlight key aspects of your
implementation. The style aligns with industry standards, is developer-friendly, and preserves your coding approach as
seen in the provided files.

---

# Mini E-Commerce Web Application

A modern, responsive e-commerce platform built with Next.js 15, featuring product listings, a shopping cart,
authentication, localization, and theming. This project demonstrates clean code practices, scalability, and a
user-friendly UI based on a provided Figma design.

Hosted live at: [Your Vercel URL] (replace with your deployed URL)

GitHub Repository: [https://github.com/ibrahim-wael-ibrahim/mini-ecommerce]

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Setup Instructions](#setup-instructions)
5. [File Structure](#file-structure)
6. [Key Code Snippets](#key-code-snippets)
7. [API Integration](#api-integration)
8. [Contributing](#contributing)
9. [License](#license)

---

## Project Overview

This project is a front-end assessment for building a mini e-commerce application. It includes core features like user
authentication (email/password and Google OAuth), dynamic category and product pages, a shopping cart with server/local
storage sync, and a multi-step checkout process. The app supports light/dark themes and English/Arabic localization,
optimized for SEO and performance.

---

## Features

- **Authentication**: Email/password login/signup and Google OAuth via Auth0.
- **Home Page**: Static design with dynamic category listings fetched from the server.
- **Category Details**: Displays category info and related products, SEO-optimized with server-side rendering.
- **Product Details**: Detailed product view with "Add to Cart" functionality and SEO metadata.
- **Shopping Cart**: Supports authenticated (server-synced) and guest (local storage) modes with
  increment/decrement/remove actions.
- **Checkout Process**: Multi-step flow (login, address, payment, review, success) with order creation.
- **Theming**: Light and dark modes using `next-themes`.
- **Localization**: English and Arabic support with RTL detection via `next-intl` and `rtl-detect`.
- **Responsive Design**: Fully responsive UI built with TailwindCSS.

---

## Technologies Used

- **Framework**: Next.js 15.1.7 (React 19)
- **Styling**: TailwindCSS 3.4.1
- **State Management**: Redux Toolkit 2.6.0, React-Redux 9.2.0
- **Form Handling**: React Hook Form 7.54.2
- **Localization**: Next-Intl 3.26.5
- **Icons**: React-Icons 5.5.0
- **Theming**: Next-Themes 0.4.4
- **Authentication**: Auth0 React 2.3.0, React OAuth Google 0.12.1
- **API Requests**: Axios 1.8.1, RTK Query
- **Utilities**: JWT-Decode 4.0.0, RTL-Detect 1.1.2, Sonner 2.0.1 (toasts)
- **Dev Tools**: ESLint 9, Prettier 3.5.2, PostCSS 8

---

## Setup Instructions

### Prerequisites

- Node.js 18+ installed
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Create a `.env.local` file in the root directory and add:
   ```
   NEXT_PUBLIC_GOOGLE_CLIENT_ID=939457397098-af0i8monehvqgrhr4rad4cvrk93kq1k7.apps.googleusercontent.com
   NEXT_PUBLIC_API_BASE_URL=https://test-ecomerce.xn--hrt-w-ova.de/api
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

5. Build for production:
   ```bash
   npm run build
   npm run start
   ```

---

## File Structure

```
src/
├── app/                    # Next.js app directory (pages and layouts)
│   ├── layout.js          # Root layout with providers and metadata
│   ├── page.js            # Home page
│   ├── cart/              # Cart page
│   ├── category/[id]/     # Dynamic category details
│   ├── checkout/          # Checkout page
│   ├── product/[id]/      # Dynamic product details
│   ├── register/          # Sign-in/signup page
│   └── Providers.jsx      # Client-side providers (Redux, Theme, Google OAuth)
├── components/            # Reusable UI components
│   ├── atoms/             # Small, reusable UI elements
│   ├── molecules/         # Composed UI components
│   ├── organisms/         # Complex page sections
│   └── checkout/          # Checkout-specific components
├── features/              # Redux Toolkit slices and API endpoints
│   ├── auth/              # Authentication logic
│   ├── cart/              # Cart management
│   ├── categories/        # Category data
│   ├── order/             # Order handling
│   └── products/          # Product data
├── hooks/                 # Custom React hooks
├── i18n/                  # Localization setup and translation files
├── store/                 # Redux store configuration
└── utils/                 # Utility functions
```

---

## Key Code Snippets

### 1. Root Layout with Localization and Theming

`src/app/layout.js`

```jsx
import {Providers} from "@/app/Providers";
import {NextIntlClientProvider} from "next-intl";
import {getMessages, getLocale} from "next-intl/server";
import {getLangDir} from "rtl-detect";

export default async function RootLayout({children}) {
    const messages = await getMessages();
    const locale = await getLocale();
    const direction = await getLangDir(locale);
    return (
        <html lang={locale} dir={direction} suppressHydrationWarning>
        <body className="font-gilroy antialiased overflow-x-hidden">
        <Providers>
            <NextIntlClientProvider messages={messages}>
                <Navbar/>
                <main className="relative min-h-dvh w-full">{children}</main>
                <Footer/>
            </NextIntlClientProvider>
        </Providers>
        </body>
        </html>
    );
}
```

### 2. Shopping Cart Page

`src/app/cart/page.jsx`

```jsx
"use client";
import {useSelector} from "react-redux";
import {useGetCartItemsQuery} from "@/features/cart/cartApi";
import CartItems from "@/components/molecules/CartItems";
import {useTranslations} from "next-intl";

export default function CartPage() {
    const t = useTranslations("cart");
    const {token} = useSelector((state) => state.auth);
    const localCart = useSelector((state) => state.cart.items);
    const {data: serverCart = []} = useGetCartItemsQuery(undefined, {skip: !token});
    const cartItems = token ? serverCart : localCart;

    return (
        <section className="min-h-[80dvh] p-8 my-40 flex flex-col justify-start items-center container mx-auto">
            <h1 className="text-5xl capitalize font-extrabold">{t("title")}</h1>
            <span className="font-extrabold capitalize text-2xl">
        {t("itemsCount", {count: cartItems.length})}
      </span>
            <article className="max-w-[787px] w-full max-h-[727px] overflow-scroll">
                {cartItems.map((cartItem) => (
                    <CartItems item={cartItem} key={cartItem.id}/>
                ))}
            </article>
        </section>
    );
}
```

### 3. Product Details with Add to Cart

`src/components/organisms/ProductDetailsPage.jsx`

```jsx
"use client";
import {useAddItemToCartMutation} from "@/features/cart/cartApi";
import {addItem} from "@/features/cart/cartSlice";
import {useDispatch, useSelector} from "react-redux";

function ProductDetailsPage({initialProduct}) {
    const dispatch = useDispatch();
    const {token} = useSelector((state) => state.auth);
    const [addItemToCart, {isLoading: isAdding}] = useAddItemToCartMutation();

    const handleAddToCart = async () => {
        try {
            if (token) {
                await addItemToCart({item_id: initialProduct.id, qty: quantity}).unwrap();
            } else {
                dispatch(addItem({id: initialProduct.id, name: initialProduct.title, qty: quantity}));
            }
        } catch (error) {
            console.error("Failed to add to cart:", error);
        }
    };

    return (
        <button
            className="w-full py-6 capitalize font-extrabold text-3xl rounded-full bg-customOrange"
            onClick={handleAddToCart}
            disabled={isAdding}
        >
            {isAdding ? "Adding..." : "Add to Cart"}
        </button>
    );
}
```

---

## API Integration

The app integrates with a backend API at `https://test-ecomerce.xn--hrt-w-ova.de/api`. Key endpoints include:

- **Auth**: `/login`, `/register`, `/sociallogin`, `/out`
- **Categories**: `/category/get`, `/category/find/{id}`
- **Products**: `/product/find/{id}`, `/product/category`
- **Cart**: `/cart/items`, `/cart/add-item`, `/cart/increase-item`, etc.
- **Orders**: `/order/order-price`, `/order/create`

See the [Postman Collection](#) (replace with your link) for full details.

---

## Contributing

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-feature`.
3. Commit changes: `git commit -m "Add your feature"`.
4. Push to the branch: `git push origin feature/your-feature`.
5. Open a pull request.

Please follow the existing coding style, use ESLint/Prettier, and adhere to clean code principles.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

This README provides a clear, concise guide to your project while showcasing its structure and key implementations. Let
me know if you'd like to adjust anything or add more details!