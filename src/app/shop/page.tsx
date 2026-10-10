"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import ProductFilterSidebar from "@/components/shop/product-filter-sidebar";

const products = [
    {
        id: 1,
        name: "Luxury Wedding Chocolate",
        category: "Chocolates",
        price: "25 JOD",
        image: "/products/chocolate.jpg",
    },
    {
        id: 2,
        name: "Personalized Perfume",
        category: "Perfumes",
        price: "35 JOD",
        image: "/products/perfume.jpg",
    },
    {
        id: 3,
        name: "Elegant Wedding Favor",
        category: "Wedding Favors",
        price: "18 JOD",
        image: "/products/favor.jpg",
    },
    {
        id: 4,
        name: "Luxury Gift Box",
        category: "Gift Boxes",
        price: "45 JOD",
        image: "/products/gift-box.jpg",
    },
    {
        id: 5,
        name: "Personalized Chocolate Box",
        category: "Chocolates",
        price: "30 JOD",
        image: "/products/chocolate-box.jpg",
    },
    {
        id: 6,
        name: "Signature Perfume Set",
        category: "Perfumes",
        price: "55 JOD",
        image: "/products/perfume-set.jpg",
    },
];

const categories = [
    "All Products",
    "Chocolates",
    "Perfumes",
    "Wedding Favors",
    "Gift Boxes",
];

export default function ShopPage() {
    const [selectedCategory, setSelectedCategory] =
        useState("All Products");


    const [sortOrder, setSortOrder] = useState("featured");

    const filteredProducts = useMemo(() => {
        const filtered = products.filter(
            (product) =>
                selectedCategory === "All Products" ||
                product.category === selectedCategory
        );

        switch (sortOrder) {
            case "price-low":
                return [...filtered].sort(
                    (a, b) =>
                        Number.parseFloat(a.price) -
                        Number.parseFloat(b.price)
                );

            case "price-high":
                return [...filtered].sort(
                    (a, b) =>
                        Number.parseFloat(b.price) -
                        Number.parseFloat(a.price)
                );

            case "newest":
                return [...filtered].sort((a, b) => b.id - a.id);

            default:
                return filtered;
        }
    }, [selectedCategory, sortOrder]);

    return (
        <main className="bg-white text-black">
            {/* Header */}
            <section className="border-b border-black/10 px-6 py-20">
                <div className="mx-auto max-w-7xl text-center">
                    <span className="text-xs font-medium uppercase tracking-[0.4em] text-[#C9A227]">
                        Dar Aya Collection
                    </span>

                    <h1 className="mt-5 text-4xl font-light tracking-[0.12em] sm:text-5xl">
                        SHOP
                    </h1>

                    <div className="mx-auto mt-6 h-px w-12 bg-[#C9A227]" />

                    <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-black/60">
                        Discover our collection of elegant gifts, wedding
                        favors, perfumes, chocolates, and personalized details.
                    </p>
                </div>
            </section>

            {/* Shop Content */}
            <section className="px-6 py-16">
                <div className="mx-auto flex max-w-7xl flex-col gap-10 lg:flex-row lg:gap-12">
                    {/* Sidebar */}
                    <ProductFilterSidebar
                        categories={categories}
                        selectedCategory={selectedCategory}
                        onCategoryChange={setSelectedCategory}
                        sortOrder={sortOrder}
                        onSortChange={setSortOrder}
                    />

                    {/* Products */}
                    <div className="min-w-0 flex-1">
                        <div className="mb-8 flex items-center justify-between border-b border-black/10 pb-5">
                            <p className="text-xs uppercase tracking-[0.15em] text-black/50">
                                {filteredProducts.length}{" "}
                                {filteredProducts.length === 1
                                    ? "Product"
                                    : "Products"}
                            </p>

                            {selectedCategory !== "All Products" && (
                                <button
                                    type="button"
                                    onClick={() =>
                                        setSelectedCategory("All Products")
                                    }
                                    className="text-xs uppercase tracking-wider text-black/60 transition-colors hover:text-[#C9A227]"
                                >
                                    Clear Category ×
                                </button>
                            )}
                        </div>

                        {filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 xl:grid-cols-3">
                                {filteredProducts.map((product) => (
                                    <Link
                                        key={product.id}
                                        href={`/shop/${product.id}`}
                                        className="group block"
                                    >
                                        {/* Product Image */}
                                        <div className="relative aspect-square overflow-hidden bg-black/5">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />

                                            <span className="absolute left-4 top-4 bg-white px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.15em] text-black">
                                                {product.category}
                                            </span>
                                        </div>

                                        {/* Product Information */}
                                        <div className="pt-5">
                                            <h2 className="text-sm font-medium tracking-wide text-black transition-colors group-hover:text-[#C9A227]">
                                                {product.name}
                                            </h2>

                                            <div className="mt-2 flex items-center justify-between">
                                                <p className="text-sm text-black/60">
                                                    {product.price}
                                                </p>

                                                <span className="text-xs font-medium uppercase tracking-[0.12em] text-black transition-colors group-hover:text-[#C9A227]">
                                                    View Details →
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="py-20 text-center">
                                <h2 className="text-lg font-light tracking-wide">
                                    No Products Found
                                </h2>
                                <p className="mt-3 text-sm text-black/50">
                                    Try selecting another category.
                                </p>
                                <button
                                    type="button"
                                    onClick={() =>
                                        setSelectedCategory("All Products")
                                    }
                                    className="mt-6 border border-black bg-black px-6 py-3 text-xs uppercase tracking-widest text-white transition-colors hover:bg-[#C9A227]"
                                >
                                    View All Products
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
}
