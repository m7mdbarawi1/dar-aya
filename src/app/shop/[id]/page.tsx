"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

const products = [
    {
        id: 1,
        name: "Luxury Wedding Chocolate",
        category: "Chocolates",
        price: 25,
        image: "/products/chocolate.jpg",
        description:
            "Discover our luxury wedding chocolates, beautifully presented for weddings, engagements, and special celebrations. An elegant detail that makes every occasion memorable.",
        details: [
            "Premium chocolate selection",
            "Elegant wedding presentation",
            "Customization available upon request",
        ],
    },
    {
        id: 2,
        name: "Personalized Perfume",
        category: "Perfumes",
        price: 35,
        image: "/products/perfume.jpg",
        description:
            "A sophisticated perfume gift with a personalized touch. Perfect for wedding favors, special occasions, and thoughtful gifts.",
        details: [
            "Elegant perfume presentation",
            "Personalization available",
            "Ideal for weddings and gifts",
        ],
    },
    {
        id: 3,
        name: "Elegant Wedding Favor",
        category: "Wedding Favors",
        price: 18,
        image: "/products/favor.jpg",
        description:
            "Add a refined finishing touch to your celebration with an elegant wedding favor designed to delight your guests.",
        details: [
            "Elegant presentation",
            "Suitable for weddings and engagements",
            "Customization available upon request",
        ],
    },
    {
        id: 4,
        name: "Luxury Gift Box",
        category: "Gift Boxes",
        price: 45,
        image: "/products/gift-box.jpg",
        description:
            "A luxurious gift box designed to turn every gift into a memorable experience, with an elegant presentation suitable for special occasions.",
        details: [
            "Premium gift presentation",
            "Suitable for special occasions",
            "Personalization available upon request",
        ],
    },
    {
        id: 5,
        name: "Personalized Chocolate Box",
        category: "Chocolates",
        price: 30,
        image: "/products/chocolate-box.jpg",
        description:
            "Make your celebration sweeter with a personalized chocolate box, carefully presented for weddings, engagements, and meaningful gifts.",
        details: [
            "Beautiful chocolate arrangement",
            "Personalized presentation",
            "Ideal for wedding gifts",
        ],
    },
    {
        id: 6,
        name: "Signature Perfume Set",
        category: "Perfumes",
        price: 55,
        image: "/products/perfume-set.jpg",
        description:
            "Discover our signature perfume set, an elegant choice for gifting and celebrating life's most special moments.",
        details: [
            "Coordinated perfume gift set",
            "Luxury-inspired presentation",
            "Suitable for special occasions",
        ],
    },
];

export default function ProductDetailsPage() {
    const params = useParams<{ id: string }>();
    const product = products.find(
        (item) => item.id === Number(params.id)
    );
    const [quantity, setQuantity] = useState(1);
    const [added, setAdded] = useState(false);

    if (!product) {
        return (
            <main className="flex min-h-[70vh] flex-col items-center justify-center bg-white px-6 text-black">
                <h1 className="text-2xl font-light tracking-widest">
                    PRODUCT NOT FOUND
                </h1>
                <p className="mt-4 text-sm text-black/60">
                    The product you are looking for does not exist.
                </p>
                <Link
                    href="/shop"
                    className="mt-8 border border-black bg-black px-6 py-3 text-xs uppercase tracking-widest text-white transition-colors hover:bg-[#C9A227]"
                >
                    Back to Shop
                </Link>
            </main>
        );
    }

    function handleAddToCart() {
        setAdded(true);
    }

    return (
        <main className="min-h-screen bg-white text-black">
            <div className="border-b border-black/10 px-6 py-5">
                <div className="mx-auto max-w-7xl text-xs tracking-wide text-black/50">
                    <Link
                        href="/"
                        className="transition-colors hover:text-[#C9A227]"
                    >
                        Home
                    </Link>
                    <span className="mx-3">/</span>
                    <Link
                        href="/shop"
                        className="transition-colors hover:text-[#C9A227]"
                    >
                        Shop
                    </Link>
                    <span className="mx-3">/</span>
                    <span className="text-black">
                        {product.name}
                    </span>
                </div>
            </div>

            {/* Product Details */}
            <section className="px-6 py-12 sm:py-20">
                <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
                    {/* Product Image */}
                    <div className="relative aspect-square overflow-hidden bg-black/5">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-cover"
                        />

                        <span className="absolute left-5 top-5 bg-white px-4 py-2 text-[10px] font-medium uppercase tracking-[0.2em]">
                            {product.category}
                        </span>
                    </div>

                    {/* Product Information */}
                    <div className="flex flex-col justify-center">
                        <span className="text-xs font-medium uppercase tracking-[0.35em] text-[#C9A227]">
                            Dar Aya Collection
                        </span>

                        <h1 className="mt-5 text-3xl font-light leading-relaxed tracking-wide sm:text-4xl">
                            {product.name}
                        </h1>

                        <div className="mt-6 h-px w-16 bg-[#C9A227]" />

                        <p className="mt-6 text-2xl font-medium">
                            {product.price.toFixed(2)} JOD
                        </p>

                        <p className="mt-6 text-sm leading-8 text-black/60">
                            {product.description}
                        </p>

                        <div className="mt-8 border-y border-black/10 py-6">
                            <h2 className="text-xs font-medium uppercase tracking-[0.2em]">
                                Product Details
                            </h2>

                            <ul className="mt-5 space-y-4">
                                {product.details.map((detail) => (
                                    <li
                                        key={detail}
                                        className="flex items-start gap-3 text-sm text-black/70"
                                    >
                                        <span className="mt-1 text-[#C9A227]">
                                            ✦
                                        </span>
                                        {detail}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Quantity */}
                        <div className="mt-8">
                            <label className="text-xs font-medium uppercase tracking-[0.15em]">
                                Quantity
                            </label>

                            <div className="mt-3 flex h-12 w-36 items-center border border-black/20">
                                <button
                                    type="button"
                                    aria-label="Decrease quantity"
                                    onClick={() =>
                                        setQuantity((q) => Math.max(1, q - 1))
                                    }
                                    className="h-full flex-1 text-lg transition-colors hover:text-[#C9A227]"
                                >
                                    −
                                </button>

                                <span className="w-12 text-center text-sm">
                                    {quantity}
                                </span>

                                <button
                                    type="button"
                                    aria-label="Increase quantity"
                                    onClick={() =>
                                        setQuantity((q) => q + 1)
                                    }
                                    className="h-full flex-1 text-lg transition-colors hover:text-[#C9A227]"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Price Total */}
                        <div className="mt-6 flex items-center justify-between border-b border-black/10 pb-6">
                            <span className="text-xs uppercase tracking-widest text-black/50">
                                Subtotal
                            </span>
                            <span className="text-sm font-medium">
                                {(product.price * quantity).toFixed(2)} JOD
                            </span>
                        </div>

                        {/* Add to Cart */}
                        <button
                            type="button"
                            onClick={handleAddToCart}
                            className="mt-8 w-full bg-black px-8 py-4 text-xs font-medium uppercase tracking-[0.2em] text-white transition-colors hover:bg-[#C9A227]"
                        >
                            {added ? "Added to Cart ✓" : "Add to Cart"}
                        </button>

                        {added && (
                            <p
                                role="status"
                                className="mt-4 text-center text-sm text-black/60"
                            >
                                Added {quantity} item(s) to your selection.
                            </p>
                        )}

                        <p className="mt-5 text-center text-xs tracking-wide text-black/40">
                            A thoughtful detail for your special moments.
                        </p>

                        <Link
                            href="/shop"
                            className="mt-8 self-start text-xs uppercase tracking-[0.15em] text-black/60 transition-colors hover:text-[#C9A227]"
                        >
                            ← Continue Shopping
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
