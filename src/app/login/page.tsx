"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();

    function handleLogin(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        // Redirect to the admin dashboard
        router.push("/admin");
    }

    return (
        <main className="flex min-h-[calc(100vh-5rem)] items-center justify-center bg-white px-6 py-16">
            <div className="w-full max-w-md">
                <div className="mb-10 text-center">
                    <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-[#C9A227]">
                        Welcome Back
                    </p>

                    <h1 className="text-3xl font-light tracking-[0.15em] text-black">
                        LOGIN
                    </h1>

                    <div className="mx-auto mt-5 h-px w-12 bg-[#C9A227]" />

                    <p className="mt-5 text-sm text-black/60">
                        Sign in to your Dar Aya account
                    </p>
                </div>

                <form className="space-y-6" onSubmit={handleLogin}>
                    <div>
                        <label
                            htmlFor="email"
                            className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-black"
                        >
                            Email
                        </label>

                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            required
                            className="h-12 w-full border border-black/20 bg-white px-4 text-sm text-black outline-none transition-colors placeholder:text-black/40 focus:border-[#C9A227]"
                        />
                    </div>

                    <div>
                        <div className="mb-2 flex items-center justify-between">
                            <label
                                htmlFor="password"
                                className="block text-xs font-medium uppercase tracking-[0.15em] text-black"
                            >
                                Password
                            </label>

                            <Link
                                href="/forgot-password"
                                className="text-xs text-black/60 transition-colors hover:text-[#C9A227]"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                            required
                            className="h-12 w-full border border-black/20 bg-white px-4 text-sm text-black outline-none transition-colors placeholder:text-black/40 focus:border-[#C9A227]"
                        />
                    </div>

                    <button
                        type="submit"
                        className="h-12 w-full bg-black text-xs font-medium uppercase tracking-[0.2em] text-white transition-colors hover:bg-[#C9A227] hover:text-black"
                    >
                        Login
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-sm text-black/60">
                        Don&apos;t have an account?                        <Link
                            href="/register"
                            className="font-medium text-black underline underline-offset-4 transition-colors hover:text-[#C9A227]"
                        >
                            Create an account
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    );
}