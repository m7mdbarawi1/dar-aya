
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
    ArrowLeft,
    ArrowRight,
    Minus,
    Plus,
    ShoppingBag,
    Trash2,
} from "lucide-react";

type CartItem = {
    id: number;
    name: string;
    category: string;
    price: number;
    image: string;
    quantity: number;
};

const initialItems: CartItem[] = [
    {
        id: 1,
        name: "Luxury Wedding Chocolate",
        category: "Chocolates",
        price: 25,
        image: "/products/chocolate.jpg",
        quantity: 1,
    },
    {
        id: 2,
        name: "Personalized Perfume",
        category: "Perfumes",
        price: 35,
        image: "/products/perfume.jpg",
        quantity: 1,
    },
];

const formatPrice = (price: number) =>
    `${price.toFixed(2)} JOD`;

export default function CartPage() {
    const [items, setItems] = useState<CartItem[]>(initialItems);

    const subtotal = useMemo(
        () =>
            items.reduce(
                (total, item) => total + item.price * item.quantity,
                0
            ),
        [items]
    );

    const shipping = subtotal === 0 || subtotal >= 50 ? 0 : 3;
    const total = subtotal + shipping;
    const itemCount = items.reduce(
        (count, item) => count + item.quantity,
        0
    );

    function updateQuantity(id: number, change: number) {
        setItems((current) =>
            current.map((item) =>
                item.id === id
                    ? {
                        ...item,
                        quantity: Math.max(1, item.quantity + change),
                    }
                    : item
            )
        );
    }

    function removeItem(id: number) {
        setItems((current) => current.filter((item) => item.id !== id));
    }

    return (
        <main className="min-h-screen bg-white text-black">
            {/* Page Header */}
            <section className="border-b border-black/10 px-6 py-14 sm:py-20">
                <div className="mx-auto max-w-7xl text-center">
                    <p className="text-xs font-medium uppercase tracking-[0.35em] text-[#C9A227]">
                        Dar Aya Collection
                    </p>

                    <h1 className="mt-5 text-4xl font-light tracking-[0.12em] sm:text-5xl">
                        MY CART
                    </h1>

                    <div className="mx-auto mt-6 h-px w-12 bg-[#C9A227]" />

                    <p className="mt-5 text-sm text-black/50">
                        {itemCount} {itemCount === 1 ? "item" : "items"} in your bag
                    </p>
                </div>
            </section>

            {/* Cart Content */}
            <section className="px-6 py-12 sm:py-16">
                <div className="mx-auto max-w-7xl">
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center py-16 text-center sm:py-24">
                            <ShoppingBag
                                size={42}
                                strokeWidth={1}
                                className="text-[#C9A227]"
                            />

                            <h2 className="mt-6 text-2xl font-light">
                                Your cart is empty
                            </h2>

                            <p className="mt-3 max-w-sm text-sm leading-7 text-black/50">
                                Discover elegant gifts and thoughtful details for your
                                next special occasion.
                            </p>

                            <Link
                                href="/shop"
                                className="mt-8 inline-flex items-center gap-3 bg-black px-7 py-4 text-xs font-medium uppercase tracking-widest text-white transition-colors hover:bg-[#C9A227]"
                            >
                                Explore the Collection
                                <ArrowRight size={16} />
                            </Link>
                        </div>
                    ) : (
                        <div className="grid items-start gap-12 lg:grid-cols-[1fr_360px]">
                            {/* Items */}
                            <div>
                                <div className="hidden grid-cols-[1fr_120px_100px] gap-4 border-b border-black/10 pb-4 text-[10px] uppercase tracking-[0.2em] text-black/50 sm:grid">
                                    <span>Product</span>
                                    <span className="text-center">Quantity</span>
                                    <span className="text-right">Total</span>
                                </div>

                                <div className="divide-y divide-black/10">
                                    {items.map((item) => (
                                        <article
                                            key={item.id}
                                            className="grid gap-5 py-7 sm:grid-cols-[1fr_120px_100px] sm:items-center sm:gap-4"
                                        >
                                            <div className="flex min-w-0 gap-4">
                                                <Link
                                                    href={`/shop/${item.id}`}
                                                    className="h-28 w-24 shrink-0 overflow-hidden bg-black/5 sm:h-32 sm:w-28"
                                                >
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                                                    />
                                                </Link>

                                                <div className="flex min-w-0 flex-col items-start py-1">
                                                    <p className="text-[10px] uppercase tracking-[0.15em] text-[#9B7B16]">
                                                        {item.category}
                                                    </p>

                                                    <Link
                                                        href={`/shop/${item.id}`}
                                                        className="mt-2 text-sm font-medium leading-6 transition-colors hover:text-[#C9A227]"
                                                    >
                                                        {item.name}
                                                    </Link>

                                                    <p className="mt-2 text-sm text-black/60">
                                                        {formatPrice(item.price)}
                                                    </p>

                                                    <button
                                                        type="button"
                                                        onClick={() => removeItem(item.id)}
                                                        className="mt-auto flex items-center gap-1.5 pt-3 text-xs text-black/45 transition-colors hover:text-red-700"
                                                    >
                                                        <Trash2 size={13} />
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between sm:justify-center">
                                                <span className="text-xs text-black/50 sm:hidden">
                                                    Quantity
                                                </span>

                                                <div className="flex h-10 items-center border border-black/15">
                                                    <button
                                                        type="button"
                                                        aria-label={`Decrease ${item.name} quantity`}
                                                        disabled={item.quantity <= 1}
                                                        onClick={() => updateQuantity(item.id, -1)}
                                                        className="flex h-full w-9 items-center justify-center transition-colors hover:bg-[#C9A227]/10 disabled:cursor-not-allowed disabled:opacity-30"
                                                    >
                                                        <Minus size={13} />
                                                    </button>

                                                    <span className="w-8 text-center text-sm tabular-nums">
                                                        {item.quantity}
                                                    </span>

                                                    <button
                                                        type="button"
                                                        aria-label={`Increase ${item.name} quantity`}
                                                        onClick={() => updateQuantity(item.id, 1)}
                                                        className="flex h-full w-9 items-center justify-center transition-colors hover:bg-[#C9A227]/10"
                                                    >
                                                        <Plus size={13} />
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between sm:justify-end">
                                                <span className="text-xs text-black/50 sm:hidden">
                                                    Item total
                                                </span>

                                                <p className="text-sm font-medium tabular-nums">
                                                    {formatPrice(item.price * item.quantity)}
                                                </p>
                                            </div>
                                        </article>
                                    ))}
                                </div>

                                <Link
                                    href="/shop"
                                    className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-black/60 transition-colors hover:text-[#C9A227]"
                                >
                                    <ArrowLeft size={15} />
                                    Continue Shopping
                                </Link>
                            </div>

                            {/* Order Summary */}
                            <aside className="border border-[#C9A227]/30 p-6 sm:p-8">
                                <h2 className="text-lg font-medium tracking-wide">
                                    Order Summary
                                </h2>

                                <div className="mt-7 space-y-5 border-b border-black/10 pb-6">
                                    <div className="flex justify-between gap-4 text-sm">
                                        <span className="text-black/55">
                                            Subtotal
                                        </span>
                                        <span className="tabular-nums">
                                            {formatPrice(subtotal)}
                                        </span>
                                    </div>

                                    <div className="flex justify-between gap-4 text-sm">
                                        <span className="text-black/55">
                                            Shipping
                                        </span>
                                        <span className="text-right">
                                            {shipping === 0 && subtotal > 0
                                                ? "Free"
                                                : formatPrice(shipping)}
                                        </span>
                                    </div>

                                    <p className="text-xs leading-5 text-black/45">
                                        {subtotal >= 50
                                            ? "Your order qualifies for free shipping."
                                            : `Add ${formatPrice(50 - subtotal)} more for free shipping.`}
                                    </p>
                                </div>

                                <div className="flex items-center justify-between gap-4 py-6">
                                    <span className="text-sm font-medium">
                                        Total
                                    </span>
                                    <span className="text-xl font-medium tabular-nums">
                                        {formatPrice(total)}
                                    </span>
                                </div>

                                <button
                                    type="button"
                                    onClick={() =>
                                        alert("Checkout will be available when payment and order processing are connected.")
                                    }
                                    className="flex w-full items-center justify-center gap-3 bg-black px-5 py-4 text-xs font-medium uppercase tracking-[0.15em] text-white transition-colors hover:bg-[#C9A227]"
                                >
                                    Proceed to Checkout
                                    <ArrowRight size={16} />
                                </button>

                                <p className="mt-5 text-center text-xs leading-6 text-black/45">
                                    Shipping and order details will be confirmed at checkout.
                                </p>
                            </aside>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}