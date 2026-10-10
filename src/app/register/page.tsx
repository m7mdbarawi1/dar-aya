import Link from "next/link";

export default function RegisterPage() {
    return (
        <main className="flex min-h-[calc(100vh-5rem)] items-center justify-center bg-white px-6 py-16">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="mb-10 text-center">
                    <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-[#C9A227]">
                        Join Dar Aya
                    </p>

                    <h1 className="text-3xl font-light tracking-[0.15em] text-black">
                        CREATE ACCOUNT
                    </h1>

                    <div className="mx-auto mt-5 h-px w-12 bg-[#C9A227]" />

                    <p className="mt-5 text-sm text-black/60">
                        Create your account and discover Dar Aya
                    </p>
                </div>

                {/* Form */}
                <form className="space-y-5">
                    {/* Full Name */}
                    <div>
                        <label
                            htmlFor="name"
                            className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-black"
                        >
                            Full Name
                        </label>

                        <input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Enter your full name"
                            className="h-12 w-full border border-black/20 bg-white px-4 text-sm text-black outline-none transition-colors placeholder:text-black/40 focus:border-[#C9A227]"
                        />
                    </div>

                    {/* Email */}
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
                            className="h-12 w-full border border-black/20 bg-white px-4 text-sm text-black outline-none transition-colors placeholder:text-black/40 focus:border-[#C9A227]"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label
                            htmlFor="password"
                            className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-black"
                        >
                            Password
                        </label>

                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Create a password"
                            className="h-12 w-full border border-black/20 bg-white px-4 text-sm text-black outline-none transition-colors placeholder:text-black/40 focus:border-[#C9A227]"
                        />
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label
                            htmlFor="confirmPassword"
                            className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-black"
                        >
                            Confirm Password
                        </label>

                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            placeholder="Confirm your password"
                            className="h-12 w-full border border-black/20 bg-white px-4 text-sm text-black outline-none transition-colors placeholder:text-black/40 focus:border-[#C9A227]"
                        />
                    </div>

                    {/* Terms */}
                    <div className="flex items-start gap-3 pt-1">
                        <input
                            id="terms"
                            name="terms"
                            type="checkbox"
                            className="mt-0.5 h-4 w-4 accent-[#C9A227]"
                        />

                        <label
                            htmlFor="terms"
                            className="text-xs leading-5 text-black/60"
                        >
                            I agree to the{" "}
                            <Link
                                href="/terms"
                                className="text-black underline underline-offset-4 transition-colors hover:text-[#C9A227]"
                            >
                                Terms & Conditions
                            </Link>{" "}
                            and{" "}
                            <Link
                                href="/privacy"
                                className="text-black underline underline-offset-4 transition-colors hover:text-[#C9A227]"
                            >
                                Privacy Policy
                            </Link>
                        </label>
                    </div>

                    {/* Register button */}
                    <button
                        type="submit"
                        className="h-12 w-full bg-black text-xs font-medium uppercase tracking-[0.2em] text-white transition-colors hover:bg-[#C9A227] hover:text-black"
                    >
                        Create Account
                    </button>
                </form>

                {/* Login */}
                <div className="mt-8 text-center">
                    <p className="text-sm text-black/60">
                        Already have an account?{" "}
                        <Link
                            href="/login"
                            className="font-medium text-black underline underline-offset-4 transition-colors hover:text-[#C9A227]"
                        >
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    );
}