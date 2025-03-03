Here's a professional README.md for your project with code snippets:

```markdown
# Chairy E-Commerce Platform

A modern furniture e-commerce web application built with Next.js featuring seamless authentication, localized content,
and responsive design.

![App Screenshot](/public/images/screenshot.png)

## Features

- **Auth System**
    - Email/password authentication
    - Google OAuth integration
    - JWT token management
  ```javascript
  // Example authSlice.js
  const authSlice = createSlice({
    name: "auth",
    initialState: loadAuthState(),
    reducers: {
      setCredentials: (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("token", action.payload.token);
      },
      // ...
    },
  });
  ```

- **Product Management**
    - Category-based browsing
    - Product details with SEO optimization
    - Image optimization with Next.js

- **Shopping Cart**
    - Guest cart (local storage)
    - Authenticated cart (server sync)
    - Quantity adjustments
  ```javascript
  // cartSlice.js
  const cartSlice = createSlice({
    name: "cart",
    initialState: { items: loadCart() },
    reducers: {
      addItem: (state, action) => {
        const existingItem = state.items.find(item => item.id === action.payload.id);
        if (existingItem) {
          existingItem.qty += action.payload.qty;
        } else {
          state.items.push({ ...action.payload });
        }
        localStorage.setItem("cart", JSON.stringify(state.items));
      },
      // ...
    },
  });
  ```

- **Checkout System**
    - Multi-step process (login -> address -> payment -> review)
    - Order summary with price calculations
    - Payment gateway integration

- **Localization**
    - English/Arabic support
    - RTL layout switching
    - Dynamic content reloading
  ```javascript
  // useCusLocale.js
  const updateLocale = (newLocale) => {
    dispatch(setLocale(newLocale));
    document.cookie = `NEXTAPP_LOCALE=${newLocale}; path=/;`;
    router.refresh();
  };
  ```

- **Theming**
    - Dark/light mode toggle
    - System preference detection
    - Smooth transitions

## Tech Stack

- **Frontend**: Next.js 15, TailwindCSS
- **State Management**: Redux Toolkit, RTK Query
- **Internationalization**: next-intl
- **Auth**: Auth0, Google OAuth
- **Form Handling**: react-hook-form
- **Icons**: react-icons
- **Styling**: CSS Modules, PostCSS

## Getting Started

### Prerequisites

- Node.js v18+
- npm v9+

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/chairy-ecommerce.git
   cd chairy-ecommerce
   ```
2. Install dependencies
   ```bash
   npm install
   ```
3. Environment setup
   ```bash
   cp .env.example .env.local
   ```
4. Configure environment variables
   ```env
   NEXT_PUBLIC_API_BASE_URL=https://test-ecomerce.xn--hrt-w-ova.de
   NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
   NEXT_PUBLIC_AUTH0_DOMAIN=your_auth0_domain
   ```

### Running the App

```bash
npm run dev
```

## API Reference

[View Postman Collection](postman_json_test_api.txt)

## Project Structure

```
src/
├── app/               # App router directory
├── components/        # Reusable components
├── features/          # RTK API slices
├── hooks/             # Custom hooks
├── i18n/              # Localization files
├── store/             # Redux store
└── utils/             # Helper functions
```
