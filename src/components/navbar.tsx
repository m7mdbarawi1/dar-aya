
"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { Sun, Moon, Languages, Menu, X } from "lucide-react";

const navigation = {
    en: [
        { label: "Shop", href: "/shop" },
        { label: "About", href: "/about" },
        { label: "Contact", href: "/contact" },
    ],
    ar: [
        { label: "المتجر", href: "/shop" },
        { label: "من نحن", href: "/about" },
        { label: "اتصل بنا", href: "/contact" },
    ],
};

type Language = "en" | "ar";

const PREFERENCES_EVENT = "dar-aya-preferences-change";

function subscribeToPreferences(callback: () => void) {
    window.addEventListener("storage", callback);
    window.addEventListener(PREFERENCES_EVENT, callback);

    return () => {
        window.removeEventListener("storage", callback);
        window.removeEventListener(PREFERENCES_EVENT, callback);
    };
}

function getSavedLanguage(): Language {
    return localStorage.getItem("dar-aya-language") === "ar" ? "ar" : "en";
}

function getSavedTheme(): boolean {
    return localStorage.getItem("dar-aya-theme") === "dark";
}

function savePreference(key: string, value: string) {
    localStorage.setItem(key, value);
    window.dispatchEvent(new Event(PREFERENCES_EVENT));
}

export function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const language = useSyncExternalStore<Language>(
        subscribeToPreferences,
        getSavedLanguage,
        () => "en"
    );

    const darkMode = useSyncExternalStore<boolean>(
        subscribeToPreferences,
        getSavedTheme,
        () => false
    );

    useEffect(() => {
        document.documentElement.lang = language;
        document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
        document.documentElement.classList.toggle("dark", darkMode);
    }, [language, darkMode]);

    // Close the mobile menu when the viewport reaches desktop size.
    useEffect(() => {
        const mediaQuery = window.matchMedia("(min-width: 768px)");

        const handleChange = () => {
            if (mediaQuery.matches) setMenuOpen(false);
        };

        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);

    const isArabic = language === "ar";
    const headerStyle = darkMode
        ? "border-white/10 bg-black text-white"
        : "border-black/10 bg-white text-black";

    return (
        <header className={`sticky top-0 z-50 border-b transition-colors ${headerStyle}`}>
            <nav
                className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
                dir={isArabic ? "rtl" : "ltr"}
            >
                <Link
                    href="/"
                    onClick={() => setMenuOpen(false)}
                    className="shrink-0 text-xl font-medium tracking-[0.2em] transition-colors hover:text-[#C9A227]"
                >
                    DAR AYA
                </Link>

                {/* Desktop navigation */}
                <div className="hidden items-center gap-8 md:flex">
                    {navigation[language].map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="text-xs font-medium uppercase tracking-[0.15em] transition-colors hover:text-[#C9A227]"
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>

                <div className="flex shrink-0 items-center gap-2 sm:gap-5">
                    {/* Language switcher */}
                    <button
                        type="button"
                        onClick={() =>
                            savePreference(
                                "dar-aya-language",
                                language === "en" ? "ar" : "en"
                            )
                        }
                        aria-label={isArabic ? "Switch to English" : "التغيير إلى العربية"}
                        className="flex items-center gap-1.5 text-xs font-medium transition-colors hover:text-[#C9A227]"
                    >
                        <Languages size={17} />
                        {isArabic ? "EN" : "AR"}
                    </button>

                    {/* Theme switcher */}
                    <button
                        type="button"
                        onClick={() =>
                            savePreference(
                                "dar-aya-theme",
                                darkMode ? "light" : "dark"
                            )
                        }
                        aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                        className="flex h-9 w-9 items-center justify-center transition-colors hover:text-[#C9A227]"
                    >
                        {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                    </button>

                    {/* Desktop login */}
                    <Link
                        href="/login"
                        className="hidden text-xs font-medium uppercase tracking-[0.15em] transition-colors hover:text-[#C9A227] sm:block"
                    >
                        {isArabic ? "تسجيل الدخول" : "Login"}
                    </Link>

                    {/* Mobile menu toggle */}
                    <button
                        type="button"
                        onClick={() => setMenuOpen((open) => !open)}
                        aria-label={menuOpen
                            ? (isArabic ? "إغلاق القائمة" : "Close menu")
                            : (isArabic ? "فتح القائمة" : "Open menu")}
                        aria-expanded={menuOpen}
                        aria-controls="mobile-navigation"
                        className="flex h-10 w-10 items-center justify-center rounded-md transition-colors hover:bg-[#C9A227]/10 hover:text-[#C9A227] md:hidden"
                    >
                        {menuOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </nav>

            {/* Mobile dropdown */}
            {menuOpen && (
                <div
                    id="mobile-navigation"
                    dir={isArabic ? "rtl" : "ltr"}
                    className={`absolute inset-x-0 top-full z-50 border-b shadow-lg md:hidden ${headerStyle} ${darkMode ? "border-t-white/10" : "border-t-black/10"
                        }`}
                >
                    <div className="mx-auto flex max-w-7xl flex-col px-5 py-3">
                        {navigation[language].map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setMenuOpen(false)}
                                className="border-b border-[#C9A227]/15 py-4 text-sm font-medium transition-colors last:border-b-0 hover:text-[#C9A227]"
                            >
                                {item.label}
                            </Link>
                        ))}

                        <Link
                            href="/login"
                            onClick={() => setMenuOpen(false)}
                            className="py-4 text-sm font-medium transition-colors hover:text-[#C9A227]"
                        >
                            {isArabic ? "تسجيل الدخول" : "Login"}
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}
