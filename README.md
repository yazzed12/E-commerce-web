<<<<<<< HEAD
# Yazzed E-Commerce Project

## Overview
A modern, scalable E-Commerce web application built to cover core E-Commerce features matching industry standards. Based on Next.js 14 App Router, it provides a seamless shopping experience.

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Forms**: React Hook Form with Yup Validation
- **API**: Axios with Interceptors
- **Notifications**: React Hot Toast
- **Icons**: Lucide React

## Project Structure
- **/src/app**: Next.js App Router pages (Home, Auth, Products, Cart, Checkout, Wishlist, Orders, Categories, Brands).
- **/src/components**: Reusable UI components (Button, Input, Card) and Layout elements.
- **/src/services**: Axios API configuration and service functions (auth, products, etc.).
- **/src/store**: Zustand stores for Cart, Wishlist, and Authentication.
- **/src/types**: TypeScript interfaces matching the API objects.

## Features Implemented
- **Authentication System**: Register, Login, Token handling via Cookies.
- **Modern Homepage**: Dynamic hero banner, featured products, categories slider.
- **Products Module**: Comprehensive listing with filters, detailed product view, image gallery.
- **Cart System**: Global state, increment/decrement, remove items, clear cart computations.
- **Wishlist**: Save favorite items, quick move to cart.
- **Payment & Checkout**: Collect delivery address, Cash on Delivery (COD) & Online Payment stubs.
- **Orders History**: Summarized list of previous orders.

## Getting Started

1. Install Dependencies
```bash
npm install
```

2. Start the Development Server
```bash
npm run dev
```

3. Build for Production
```bash
npm run build
npm start
```

## Note
Ensure the backend API (Route E-Commerce API) is operational, or update the baseURL in `src/services/api.ts` if deployed on another domain.
=======
# E-commerce-web
Yazzed Shop Mart is a production-ready, high-performance e-commerce storefront. Engineered with a focus on elite UI/UX design, search engine visibility, and robust data architecture, this platform provides a seamless end-to-end shopping journey.
>>>>>>> 40328bb2de794ef9f99b08281210f971de2a1de2
