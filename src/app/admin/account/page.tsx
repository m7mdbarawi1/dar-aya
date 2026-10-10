"use client";

import { useState } from "react";
import Link from "next/link";
import {
    ArrowLeft,
    Camera,
    Check,
    LockKeyhole,
    Mail,
    Phone,
    ShieldCheck,
    UserRound,
} from "lucide-react";

export default function AccountPage() {
    const [name, setName] = useState("Store Admin");
    const [email, setEmail] = useState("[admin@daraya.com](mailto:admin@daraya.com)");
    const [phone, setPhone] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");

    function handleProfileSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setMessage("Profile changes saved in this session.");
    }

    function handlePasswordSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (!currentPassword || !newPassword || !confirmPassword) {
            setMessage("Please complete all password fields.");
            return;
        }

        if (newPassword.length < 8) {
            setMessage("Your new password must contain at least 8 characters.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setMessage("The new passwords do not match.");
            return;
        }

        setMessage(
            "Password validation passed. Connect an authentication backend to update your password."
        );
    }

    return (<div className="min-h-screen bg-white px-4 py-8 text-black sm:px-6 lg:px-10"> <div className="mx-auto max-w-5xl"> <Link
        href="/admin"
        className="mb-8 inline-flex items-center gap-2 text-sm text-black/60 transition-colors hover:text-[#C9A227]"
    > <ArrowLeft size={16} />
        Back to Dashboard </Link>
        < div className="mb-8 border-b border-black/10 pb-7" >
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#C9A227]">
                Dar Aya Administration
            </p>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                My Account
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-black/55">
                Manage your administrator profile and account security.
            </p>
        </div>

        {message && (
            <div
                role="status"
                className="mb-6 flex items-start gap-3 border border-[#C9A227]/40 bg-[#C9A227]/10 p-4 text-sm"
            >
                <Check size={18} className="mt-0.5 shrink-0 text-[#9A7610]" />
                <span>{message}</span>
                <button
                    type="button"
                    onClick={() => setMessage("")}
                    className="ml-auto text-black/50 hover:text-black"
                    aria-label="Dismiss message"
                >
                    ×
                </button>
            </div>
        )
        }

        <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
            <aside className="h-fit border border-black/10 bg-white">
                <div className="flex flex-col items-center px-6 py-8 text-center">
                    <div className="relative mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-black text-2xl font-medium text-white">
                        DA
                        <span className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#C9A227] text-black">
                            <Camera size={14} />
                        </span>
                    </div>
                    <h2 className="text-lg font-semibold">{name || "Store Admin"}</h2>
                    <p className="mt-1 break-all text-sm text-black/50">{email}</p>
                    <span className="mt-4 inline-flex items-center gap-2 border border-[#C9A227]/40 px-3 py-1.5 text-xs font-medium">
                        <ShieldCheck size={14} className="text-[#9A7610]" />
                        Administrator
                    </span>
                </div>

                <div className="border-t border-black/10 p-5">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-black/40">
                        Account overview
                    </p>
                    <div className="flex items-center gap-3 py-2 text-sm text-black/65">
                        <UserRound size={16} />
                        Personal information
                    </div>
                    <div className="flex items-center gap-3 py-2 text-sm text-black/65">
                        <LockKeyhole size={16} />
                        Security settings
                    </div>
                </div>
            </aside>

            <div className="space-y-6">
                <section className="border border-black/10 bg-white">
                    <div className="border-b border-black/10 px-5 py-5 sm:px-7">
                        <h2 className="font-semibold">Personal Information</h2>
                        <p className="mt-1 text-sm text-black/50">
                            Update the details associated with your administrator account.
                        </p>
                    </div>

                    <form
                        onSubmit={handleProfileSubmit}
                        className="space-y-5 px-5 py-6 sm:px-7"
                    >
                        <div>
                            <label htmlFor="name" className="mb-2 block text-sm font-medium">
                                Full Name
                            </label>
                            <div className="relative">
                                <UserRound
                                    size={17}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-black/40"
                                />
                                <input
                                    id="name"
                                    required
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                    className="w-full border border-black/15 py-3 pl-10 pr-4 text-sm outline-none transition-colors focus:border-[#C9A227]"
                                    placeholder="Enter your full name"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="mb-2 block text-sm font-medium">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail
                                    size={17}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-black/40"
                                />
                                <input
                                    id="email"
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    className="w-full border border-black/15 py-3 pl-10 pr-4 text-sm outline-none transition-colors focus:border-[#C9A227]"
                                    placeholder="admin@example.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="phone" className="mb-2 block text-sm font-medium">
                                Phone Number
                            </label>
                            <div className="relative">
                                <Phone
                                    size={17}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-black/40"
                                />
                                <input
                                    id="phone"
                                    type="tel"
                                    value={phone}
                                    onChange={(event) => setPhone(event.target.value)}
                                    className="w-full border border-black/15 py-3 pl-10 pr-4 text-sm outline-none transition-colors focus:border-[#C9A227]"
                                    placeholder="+962 7X XXX XXXX"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end border-t border-black/10 pt-5">
                            <button
                                type="submit"
                                className="inline-flex items-center justify-center gap-2 bg-black px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#C9A227] hover:text-black"
                            >
                                <Check size={16} />
                                Save Changes
                            </button>
                        </div>
                    </form>
                </section>

                <section className="border border-black/10 bg-white">
                    <div className="border-b border-black/10 px-5 py-5 sm:px-7">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center bg-[#C9A227]/15">
                                <LockKeyhole size={19} />
                            </div>
                            <div>
                                <h2 className="font-semibold">Change Password</h2>
                                <p className="mt-1 text-sm text-black/50">
                                    Keep your administrator account secure.
                                </p>
                            </div>
                        </div>
                    </div>

                    <form
                        onSubmit={handlePasswordSubmit}
                        className="space-y-5 px-5 py-6 sm:px-7"
                    >
                        <div>
                            <label
                                htmlFor="currentPassword"
                                className="mb-2 block text-sm font-medium"
                            >
                                Current Password
                            </label>
                            <input
                                id="currentPassword"
                                type="password"
                                autoComplete="current-password"
                                value={currentPassword}
                                onChange={(event) => setCurrentPassword(event.target.value)}
                                className="w-full border border-black/15 px-4 py-3 text-sm outline-none transition-colors focus:border-[#C9A227]"
                                placeholder="Enter current password"
                                required
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="newPassword"
                                className="mb-2 block text-sm font-medium"
                            >
                                New Password
                            </label>
                            <input
                                id="newPassword"
                                type="password"
                                autoComplete="new-password"
                                minLength={8}
                                value={newPassword}
                                onChange={(event) => setNewPassword(event.target.value)}
                                className="w-full border border-black/15 px-4 py-3 text-sm outline-none transition-colors focus:border-[#C9A227]"
                                placeholder="At least 8 characters"
                                required
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="confirmPassword"
                                className="mb-2 block text-sm font-medium"
                            >
                                Confirm New Password
                            </label>
                            <input
                                id="confirmPassword"
                                type="password"
                                autoComplete="new-password"
                                minLength={8}
                                value={confirmPassword}
                                onChange={(event) => setConfirmPassword(event.target.value)}
                                className="w-full border border-black/15 px-4 py-3 text-sm outline-none transition-colors focus:border-[#C9A227]"
                                placeholder="Confirm your new password"
                                required
                            />
                        </div>

                        <div className="flex justify-end border-t border-black/10 pt-5">
                            <button
                                type="submit"
                                className="bg-black px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#C9A227] hover:text-black"
                            >
                                Update Password
                            </button>
                        </div>
                    </form>
                </section>
            </div>
        </div>

        <p className="mt-8 text-center text-xs text-black/40">
            DAR AYA · ADMINISTRATION
        </p>
    </div >
    </div >

    );
}