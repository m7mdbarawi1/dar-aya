import Link from "next/link";

export function Footer() {
    return (
        <footer className="border-t border-black bg-black text-white">
            <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
                <div className="grid gap-12 md:grid-cols-4">
                    {/* Brand */}
                    <div className="md:col-span-2">
                        <h2 className="text-2xl font-light tracking-[0.2em]">
                            DAR AYA
                        </h2>

                        <p className="mt-5 max-w-sm text-sm leading-7 text-white/70">
                            Elegant wedding services, thoughtful gifts, and
                            beautifully personalized details for your special moments.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-[#C9A227]">
                            Explore
                        </h3>

                        <div className="mt-5 flex flex-col gap-3">
                            <Link
                                href="/home"
                                className="text-sm text-white/70 transition-colors hover:text-[#C9A227]"
                            >
                                Home
                            </Link>

                            <Link
                                href="/shop"
                                className="text-sm text-white/70 transition-colors hover:text-[#C9A227]"
                            >
                                Shop
                            </Link>

                            <Link
                                href="/services"
                                className="text-sm text-white/70 transition-colors hover:text-[#C9A227]"
                            >
                                Services
                            </Link>

                            <Link
                                href="/about"
                                className="text-sm text-white/70 transition-colors hover:text-[#C9A227]"
                            >
                                About
                            </Link>
                        </div>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-[#C9A227]">
                            Contact
                        </h3>

                        <div className="mt-5 flex flex-col gap-3 text-sm text-white/70">
                            <span>Amman, Jordan</span>
                            <span>dar-aya@gmail.com</span>
                            <span>+962788620069</span>
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-16 flex flex-col gap-4 border-t border-white/20 pt-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
                    <p>© {new Date().getFullYear()} Dar Aya. All rights reserved.</p>

                    <div className="flex gap-5">
                        <Link
                            href="/privacy"
                            className="transition-colors hover:text-[#C9A227]"
                        >
                            Privacy
                        </Link>

                        <Link
                            href="/terms"
                            className="transition-colors hover:text-[#C9A227]"
                        >
                            Terms
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}