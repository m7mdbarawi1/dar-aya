
import Link from "next/link";
import {
    Gift,
    Heart,
    Sparkles,
    Flower2,
    ArrowRight,
} from "lucide-react";

const values = [
    {
        icon: Heart,
        title: "Made with Care",
        description:
            "We pay attention to the little details that make every gift feel special.",
    },
    {
        icon: Sparkles,
        title: "Elegant by Design",
        description:
            "Beautiful products and thoughtful presentation for life's finest occasions.",
    },
    {
        icon: Gift,
        title: "Moments That Matter",
        description:
            "From weddings to meaningful gifts, we help you celebrate what matters most.",
    },
];

const offerings = [
    "Wedding favors and guest gifts",
    "Premium chocolates and sweets",
    "Perfumes and thoughtful gifts",
    "Elegant details for special occasions",
];

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-white text-black">
            {/* Hero */}
            <section className="relative overflow-hidden border-b border-[#C9A227]/20">
                <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border border-[#C9A227]/20" />
                <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full border border-[#C9A227]/30" />

                <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 sm:px-10 lg:grid-cols-2 lg:px-16 lg:py-28">
                    <div className="relative z-10">
                        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-[#9B7B16]">
                            Our Story
                        </p>

                        <h1 className="max-w-xl text-4xl font-light leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                            Making every moment
                            <span className="mt-2 block font-medium text-[#C9A227]">
                                unforgettable.
                            </span>
                        </h1>

                        <p className="mt-7 max-w-lg text-base leading-8 text-black/60">
                            At Dar Aya, we believe that the smallest details can create the
                            most beautiful memories. Discover thoughtful gifts and elegant
                            touches for your most meaningful occasions.
                        </p>

                        <Link
                            href="/shop"
                            className="mt-9 inline-flex items-center gap-3 bg-black px-7 py-4 text-sm font-medium text-white transition-colors hover:bg-[#C9A227]"
                        >
                            Explore Our Collection
                            <ArrowRight size={17} />
                        </Link>
                    </div>

                    <div className="relative mx-auto w-full max-w-lg">
                        <div className="absolute -inset-3 border border-[#C9A227]/40" />
                        <div className="relative flex aspect-[4/5] flex-col items-center justify-center bg-[#FAF8F2] px-8 text-center">
                            <Flower2
                                size={54}
                                strokeWidth={0.8}
                                className="mb-8 text-[#C9A227]"
                            />
                            <p className="text-xs uppercase tracking-[0.35em] text-black/50">
                                Dar Aya
                            </p>
                            <p className="mt-5 max-w-sm text-3xl font-light leading-relaxed sm:text-4xl">
                                Elegance in
                                <span className="block italic text-[#C9A227]">
                                    Every Detail
                                </span>
                            </p>
                            <div className="mt-8 h-px w-16 bg-[#C9A227]" />
                            <p className="mt-6 text-xs uppercase tracking-[0.2em] text-black/50">
                                Weddings · Gifts · Special Moments
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Story */}
            <section className="mx-auto max-w-4xl px-6 py-20 text-center sm:px-10 lg:py-24">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#9B7B16]">
                    Who We Are
                </p>
                <h2 className="mt-5 text-3xl font-light tracking-tight sm:text-4xl">
                    Thoughtful gifts. Beautiful memories.
                </h2>
                <p className="mx-auto mt-7 max-w-3xl text-base leading-8 text-black/60">
                    Dar Aya brings together carefully selected gifts and elegant
                    products for weddings, celebrations, and everyday moments worth
                    remembering. Our goal is to make choosing something special feel
                    simple, personal, and inspiring.
                </p>
            </section>

            {/* Values */}
            <section className="bg-[#FAF8F2] px-6 py-20 sm:px-10 lg:py-24">
                <div className="mx-auto max-w-7xl">
                    <div className="mx-auto mb-14 max-w-2xl text-center">
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#9B7B16]">
                            What Makes Us Different
                        </p>
                        <h2 className="mt-5 text-3xl font-light sm:text-4xl">
                            The details make the difference.
                        </h2>
                    </div>

                    <div className="grid gap-6 md:grid-cols-3">
                        {values.map((value) => {
                            const Icon = value.icon;

                            return (
                                <article
                                    key={value.title}
                                    className="border border-[#C9A227]/25 bg-white p-8 text-center transition-colors hover:border-[#C9A227]"
                                >
                                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#C9A227]/40 text-[#9B7B16]">
                                        <Icon size={24} strokeWidth={1.4} />
                                    </div>
                                    <h3 className="mt-6 text-xl font-medium">
                                        {value.title}
                                    </h3>
                                    <p className="mt-4 text-sm leading-7 text-black/60">
                                        {value.description}
                                    </p>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Offerings */}
            <section className="mx-auto grid max-w-7xl gap-12 px-6 py-20 sm:px-10 lg:grid-cols-2 lg:items-center lg:px-16 lg:py-24">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#9B7B16]">
                        Discover Dar Aya
                    </p>
                    <h2 className="mt-5 text-3xl font-light leading-snug sm:text-4xl">
                        Something special for every occasion.
                    </h2>
                    <p className="mt-6 max-w-lg leading-8 text-black/60">
                        Whether you are planning a wedding, preparing a thoughtful gift,
                        or celebrating someone important, explore our collection of
                        carefully selected products.
                    </p>
                </div>

                <div className="border-y border-[#C9A227]/30">
                    {offerings.map((offering, index) => (
                        <div
                            key={offering}
                            className="flex items-center gap-5 border-b border-[#C9A227]/20 py-5 last:border-b-0"
                        >
                            <span className="text-sm tabular-nums text-[#9B7B16]">
                                0{index + 1}
                            </span>
                            <p className="text-sm sm:text-base">{offering}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="bg-black px-6 py-16 text-center text-white sm:px-10 lg:py-20">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#C9A227]">
                    Let&apos;s Celebrate
                </p>
                <h2 className="mx-auto mt-5 max-w-2xl text-3xl font-light leading-snug sm:text-4xl">
                    Make your next special moment unforgettable.
                </h2>
                <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/60">
                    Find thoughtful gifts and elegant details for the occasions that
                    mean the most.
                </p>
                <Link
                    href="/shop"
                    className="mt-8 inline-flex items-center gap-3 border border-[#C9A227] px-7 py-4 text-sm text-[#C9A227] transition-colors hover:bg-[#C9A227] hover:text-black"
                >
                    Shop the Collection
                    <ArrowRight size={17} />
                </Link>
            </section>
        </main>
    );
}