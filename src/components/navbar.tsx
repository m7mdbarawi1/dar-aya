
"use client";

import { useEffect, useSyncExternalStore } from "react";
import Link from "next/link";
import { Sun, Moon, Languages } from "lucide-react";

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
    const savedLanguage = localStorage.getItem("dar-aya-language");
    return savedLanguage === "ar" ? "ar" : "en";
}

function getSavedTheme(): boolean {
    return localStorage.getItem("dar-aya-theme") === "dark";
}

function savePreference(key: string, value: string) {
    localStorage.setItem(key, value);
    window.dispatchEvent(new Event(PREFERENCES_EVENT));
}

export function Navbar() {
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
    // Synchronize preferences with the document.
    useEffect(() => {
        document.documentElement.lang = language;
        document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
        document.documentElement.classList.toggle("dark", darkMode);
    }, [language, darkMode]);

    const isArabic = language === "ar";

    return (
        <header
            className={`sticky top-0 z-50 border-b transition-colors ${darkMode
                ? "border-white/10 bg-black text-white"
                : "border-black/10 bg-white text-black"
                }`}
        >
            <nav
                className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-6 lg:px-8"
                dir={isArabic ? "rtl" : "ltr"}
            >
                <Link
                    href="/"
                    className="shrink-0 text-xl font-medium tracking-[0.2em] transition-colors hover:text-[#C9A227]"
                >
                    DAR AYA
                </Link>

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

                <div className="flex shrink-0 items-center gap-3 sm:gap-5">
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

                    <button
                        type="button"
                        onClick={() =>
                            savePreference("dar-aya-theme", darkMode ? "light" : "dark")
                        }
                        aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                        className="flex h-9 w-9 items-center justify-center transition-colors hover:text-[#C9A227]"
                    >
                        {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                    </button>
                    <Link
                        href="/login"
                        className="hidden text-xs font-medium uppercase tracking-[0.15em] transition-colors hover:text-[#C9A227] sm:block"
                    >
                        {isArabic ? "تسجيل الدخول" : "Login"}
                    </Link>
                    <button
                        type="button"
                        aria-label={isArabic ? "فتح القائمة" : "Open menu"}
                        className="text-xs font-medium transition-colors hover:text-[#C9A227] md:hidden"
                    >
                        {isArabic ? "القائمة" : "Menu"}
                    </button>
                </div>
            </nav>
        </header>
    );
}