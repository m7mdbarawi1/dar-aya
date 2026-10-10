"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    ArrowLeft,
    UserPlus,
    UserRound,
    Mail,
    LockKeyhole,
    ShieldCheck,
    CheckCircle2,
} from "lucide-react";

export default function CreateUserPage() {
    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("User");
    const [status, setStatus] = useState("Active");
    const [error, setError] = useState("");

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError(
            "The form is ready. Connect your backend API to save the new user."
        );
    }

    const inputClass =
        "w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-black outline-none transition placeholder:text-gray-400 focus:border-[#C9A227] focus:ring-2 focus:ring-[#C9A227]/20";

    const labelClass = "mb-2 block text-sm font-medium text-black";

    return (
        <div className="min-h-screen bg-white p-5 sm:p-8">
            <div className="mx-auto max-w-4xl">
                {/* Header */}
                <div className="mb-8">
                    <Link
                        href="/admin/users"
                        className="mb-5 inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-[#C9A227]"
                    >
                        <ArrowLeft size={16} />
                        Back to Users
                    </Link>

                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#C9A227]/10 text-[#C9A227]">
                            <UserPlus size={24} />
                        </div>

                        <div>
                            <h1 className="text-2xl font-semibold tracking-tight text-black sm:text-3xl">
                                Create User
                            </h1>
                            <p className="mt-1 text-sm text-gray-500">
                                Add a new user to your admin system.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
                >
                    <div className="border-b border-gray-100 p-6 sm:p-8">
                        <div className="mb-6">
                            <h2 className="text-base font-semibold text-black">
                                Personal Information
                            </h2>
                            <p className="mt-1 text-sm text-gray-500">
                                Enter the user&apos;s basic account details.
                            </p>
                        </div>

                        <div className="grid gap-6 sm:grid-cols-2">
                            {/* Full Name */}
                            <div>
                                <label htmlFor="name" className={labelClass}>
                                    Full Name <span className="text-[#C9A227]">*</span>
                                </label>
                                <div className="relative">
                                    <UserRound
                                        size={18}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                    />
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        autoComplete="name"
                                        placeholder="Enter full name"
                                        value={name}
                                        onChange={(event) => setName(event.target.value)}
                                        className={`${inputClass} pl - 10`}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <label htmlFor="email" className={labelClass}>
                                    Email Address <span className="text-[#C9A227]">*</span>
                                </label>
                                <div className="relative">
                                    <Mail
                                        size={18}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                    />
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        placeholder="user@example.com"
                                        value={email}
                                        onChange={(event) => setEmail(event.target.value)}
                                        className={`${inputClass} pl - 10`}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="sm:col-span-2">
                                <label htmlFor="password" className={labelClass}>
                                    Password <span className="text-[#C9A227]">*</span>
                                </label>
                                <div className="relative">
                                    <LockKeyhole
                                        size={18}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                    />
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="new-password"
                                        placeholder="Enter a password"
                                        value={password}
                                        onChange={(event) => setPassword(event.target.value)}
                                        className={`${inputClass} pl - 10`}
                                        minLength={8}
                                        required
                                    />
                                </div>
                                <p className="mt-2 text-xs text-gray-500">
                                    Use at least 8 characters.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Access Settings */}
                    <div className="p-6 sm:p-8">
                        <div className="mb-6">
                            <h2 className="text-base font-semibold text-black">
                                Access Settings
                            </h2>
                            <p className="mt-1 text-sm text-gray-500">
                                Choose the user&apos;s role and account status.
                            </p>
                        </div>

                        <div className="grid gap-6 sm:grid-cols-2">
                            {/* Role */}
                            <div>
                                <label htmlFor="role" className={labelClass}>
                                    User Role
                                </label>
                                <div className="relative">
                                    <ShieldCheck
                                        size={18}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                    />
                                    <select
                                        id="role"
                                        name="role"
                                        value={role}
                                        onChange={(event) => setRole(event.target.value)}
                                        className={`${inputClass} appearance - none pl - 10`}
                                    >
                                        <option value="User">User</option>
                                        <option value="Admin">Admin</option>
                                    </select>
                                </div>
                                <p className="mt-2 text-xs text-gray-500">
                                    You can connect this field to your Roles page later.
                                </p>
                            </div>

                            {/* Status */}
                            <div>
                                <label htmlFor="status" className={labelClass}>
                                    Account Status
                                </label>
                                <select
                                    id="status"
                                    name="status"
                                    value={status}
                                    onChange={(event) => setStatus(event.target.value)}
                                    className={inputClass}
                                >
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                                <p className="mt-2 text-xs text-gray-500">
                                    Set whether the account should be active.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Backend Notice */}
                    {error && (
                        <div
                            role="status"
                            className="mx-6 mb-2 flex items-start gap-3 rounded-lg border border-[#C9A227]/30 bg-[#C9A227]/10 p-4 text-sm text-black sm:mx-8"
                        >
                            <CheckCircle2
                                size={18}
                                className="mt-0.5 shrink-0 text-[#C9A227]"
                            />
                            <p>{error}</p>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex flex-col-reverse gap-3 border-t border-gray-100 bg-gray-50/70 p-6 sm:flex-row sm:justify-end sm:px-8">
                        <button
                            type="button"
                            onClick={() => router.push("/admin/users")}
                            className="rounded-lg border border-gray-200 bg-white px-5 py-3 text-sm font-medium text-black transition hover:border-[#C9A227] hover:text-[#C9A227]"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#C9A227] px-5 py-3 text-sm font-semibold text-black transition hover:bg-[#b38f1f]"
                        >
                            <UserPlus size={17} />
                            Create User
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
