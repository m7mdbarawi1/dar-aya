
"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Mail, LockKeyhole } from "lucide-react";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        // Connect to your password-reset API here.
        setSubmitted(true);
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-white px-4 py-12 text-black">
            <div className="w-full max-w-md">
                <Link
                    href="/login"
                    className="mb-8 inline-flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-[#C9A227]"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Login
                </Link>

                <div className="mb-8 text-center">
                    <Link
                        href="/home"
                        className="text-3xl font-semibold tracking-[0.2em] text-black"
                    >
                        DAR <span className="text-[#C9A227]">AYA</span>
                    </Link>

                    <div className="mx-auto mb-5 mt-8 flex h-16 w-16 items-center justify-center rounded-full bg-[#C9A227]/10">
                        <LockKeyhole className="h-7 w-7 text-[#C9A227]" />
                    </div>

                    <h1 className="text-2xl font-semibold">
                        Forgot your password?
                    </h1>

                    <p className="mt-3 text-sm leading-6 text-gray-500">
                        No worries. Enter the email address associated with
                        your account and we’ll help you reset your password.
                    </p>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
                    {submitted ? (
                        <div className="text-center">
                            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#C9A227]/10">
                                <Mail className="h-6 w-6 text-[#C9A227]" />
                            </div>

                            <h2 className="text-lg font-semibold">
                                Check your email
                            </h2>

                            <p className="mt-3 text-sm leading-6 text-gray-500">
                                If an account exists for{" "}
                                <span className="font-medium text-black">
                                    {email}
                                </span>
                                , you’ll receive instructions to reset your password.
                            </p>

                            <button
                                type="button"
                                onClick={() => setSubmitted(false)}
                                className="mt-6 text-sm font-medium text-[#A78316] hover:underline"
                            >
                                Try another email
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label
                                    htmlFor="email"
                                    className="mb-2 block text-sm font-medium"
                                >
                                    Email Address
                                </label>

                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        placeholder="you@example.com"
                                        value={email}
                                        onChange={(event) => setEmail(event.target.value)}
                                        required
                                        className="w-full rounded-md border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[#C9A227] focus:ring-2 focus:ring-[#C9A227]/20"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full rounded-md bg-[#C9A227] px-4 py-3 text-sm font-semibold text-black transition-colors hover:bg-[#B18D1F]"
                            >
                                Send Reset Instructions
                            </button>
                        </form>
                    )}
                </div>

                <p className="mt-6 text-center text-sm text-gray-500">
                    Remember your password?{" "}
                    <Link
                        href="/login"
                        className="font-medium text-[#A78316] hover:underline"
                    >
                        Sign in
                    </Link>
                </p>
            </div>
        </main>
    );
}