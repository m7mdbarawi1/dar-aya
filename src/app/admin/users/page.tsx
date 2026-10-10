
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
    Search,
    Plus,
    Eye,
    Pencil,
    Trash2,
    Users,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

type User = {
    id: string;
    name: string;
    email: string;
    role: string;
    status: "Active" | "Inactive";
    lastLogin: string;
    joined: string;
};

const initialUsers: User[] = [
    {
        id: "USR-1001",
        name: "Mohammad Al Barawi",
        email: "admin@daraya.com",
        role: "Super Admin",
        status: "Active",
        lastLogin: "Oct 10, 2026",
        joined: "Jan 12, 2026",
    },
    {
        id: "USR-1002",
        name: "Sarah Ahmed",
        email: "sarah@daraya.com",
        role: "Administrator",
        status: "Active",
        lastLogin: "Oct 09, 2026",
        joined: "Feb 18, 2026",
    },
    {
        id: "USR-1003",
        name: "Lina Khaled",
        email: "lina@daraya.com",
        role: "Product Manager",
        status: "Active",
        lastLogin: "Oct 08, 2026",
        joined: "Mar 05, 2026",
    },
    {
        id: "USR-1004",
        name: "Noor Hassan",
        email: "noor@daraya.com",
        role: "Order Manager",
        status: "Inactive",
        lastLogin: "Oct 01, 2026",
        joined: "Apr 21, 2026",
    },
    {
        id: "USR-1005",
        name: "Maya Omar",
        email: "maya@daraya.com",
        role: "Administrator",
        status: "Active",
        lastLogin: "Oct 10, 2026",
        joined: "May 14, 2026",
    },
];

const pageSize = 5;

export default function UsersPage() {
    const [users, setUsers] = useState(initialUsers);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    const filteredUsers = useMemo(() => {
        const query = search.trim().toLowerCase();

        return users.filter((user) =>
            [
                user.id,
                user.name,
                user.email,
                user.role,
                user.status,
            ]
                .join(" ")
                .toLowerCase()
                .includes(query)
        );
    }, [users, search]);

    const totalPages = Math.max(
        1,
        Math.ceil(filteredUsers.length / pageSize)
    );

    const currentPage = Math.min(page, totalPages);

    const paginatedUsers = filteredUsers.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    function deleteUser(id: string) {
        const user = users.find((item) => item.id === id);

        if (!user) return;

        if (
            !window.confirm(
                `Are you sure you want to delete the user "${user.name}"?`
            )
        ) {
            return;
        }

        setUsers((current) => current.filter((item) => item.id !== id));
    }

    return (
        <div className="min-h-screen bg-[#F8F8F6] p-5 text-black sm:p-8 lg:p-10">
            {/* Page heading */}
            <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                <div>
                    <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#A88418]">
                        Workspace / Users
                    </p>

                    <h1 className="mt-3 text-2xl font-light tracking-wide sm:text-3xl">
                        Users
                    </h1>

                    <p className="mt-2 text-sm text-black/50">
                        Manage dashboard users and their access roles.
                    </p>
                </div>

                <Link
                    href="/admin/users/new"
                    className="inline-flex items-center justify-center gap-2 bg-black px-5 py-3 text-xs font-medium uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#C9A227] hover:text-black"
                >
                    <Plus size={16} />
                    Create User
                </Link>
            </section>

            {/* Summary cards */}
            <section className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <article className="border border-black/[0.07] bg-white p-5">
                    <div className="flex items-center justify-between">
                        <p className="text-xs text-black/50">Total Users</p>
                        <Users size={19} className="text-[#B18B20]" />
                    </div>
                    <p className="mt-4 text-2xl font-medium">{users.length}</p>
                </article>

                <article className="border border-black/[0.07] bg-white p-5">
                    <p className="text-xs text-black/50">Active Users</p>
                    <p className="mt-4 text-2xl font-medium">
                        {users.filter((user) => user.status === "Active").length}
                    </p>
                </article>

                <article className="border border-black/[0.07] bg-white p-5">
                    <p className="text-xs text-black/50">Inactive Users</p>
                    <p className="mt-4 text-2xl font-medium">
                        {users.filter((user) => user.status === "Inactive").length}
                    </p>
                </article>
            </section>

            {/* Users table */}
            <section className="mt-8 border border-black/[0.07] bg-white">
                <div className="flex flex-col justify-between gap-4 border-b border-black/[0.07] p-5 sm:flex-row sm:items-center sm:px-7 sm:py-6">
                    <div>
                        <h2 className="text-sm font-medium">All Users</h2>
                        <p className="mt-2 text-xs text-black/45">
                            {filteredUsers.length}{" "}
                            {filteredUsers.length === 1 ? "user" : "users"} found
                        </p>
                    </div>

                    <label className="flex h-10 w-full items-center gap-2 border border-black/10 px-3 transition-colors focus-within:border-[#C9A227] sm:max-w-xs">
                        <Search size={16} className="shrink-0 text-black/40" />
                        <input
                            type="search"
                            value={search}
                            onChange={(event) => {
                                setSearch(event.target.value);
                                setPage(1);
                            }}
                            placeholder="Search users..."
                            aria-label="Search users"
                            className="w-full bg-transparent text-xs outline-none placeholder:text-black/35"
                        />
                    </label>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[850px] text-left">
                        <thead>
                            <tr className="border-b border-black/[0.07] bg-[#FAFAF8]">
                                {[
                                    "User",
                                    "Role",
                                    "Status",
                                    "Last Login",
                                    "Date Created",
                                    "Actions",
                                ].map((heading) => (
                                    <th
                                        key={heading}
                                        className="px-5 py-4 text-[10px] font-medium uppercase tracking-[0.12em] text-black/45 sm:px-6"
                                    >
                                        {heading}
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        <tbody>
                            {paginatedUsers.map((user) => (
                                <tr
                                    key={user.id}
                                    className="border-b border-black/[0.05] last:border-0 transition-colors hover:bg-[#FCFCFA]"
                                >
                                    <td className="px-5 py-4 sm:px-6">
                                        <div className="flex items-center gap-3">
                                            <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#F5F5F2] text-xs font-medium text-[#8A742F]">
                                                {user.name
                                                    .split(" ")
                                                    .map((part) => part[0])
                                                    .slice(0, 2)
                                                    .join("")
                                                    .toUpperCase()}
                                            </span>

                                            <div>
                                                <p className="text-xs font-medium">
                                                    {user.name}
                                                </p>
                                                <p className="mt-1 text-[11px] text-black/45">
                                                    {user.email}
                                                </p>
                                                <p className="mt-1 text-[10px] text-black/35">
                                                    {user.id}
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-5 py-4 sm:px-6">
                                        <span className="inline-flex border border-black/10 px-2.5 py-1 text-[10px]">
                                            {user.role}
                                        </span>
                                    </td>

                                    <td className="px-5 py-4 sm:px-6">
                                        <span
                                            className={`inline-flex items-center border px-2.5 py-1 text-[10px] ${user.status === "Active"
                                                    ? "border-[#C9A227]/40 bg-[#C9A227]/10 text-black"
                                                    : "border-black/10 bg-black/[0.03] text-black/50"
                                                }`}
                                        >
                                            {user.status}
                                        </span>
                                    </td>

                                    <td className="px-5 py-4 text-xs text-black/50 sm:px-6">
                                        {user.lastLogin}
                                    </td>

                                    <td className="px-5 py-4 text-xs text-black/50 sm:px-6">
                                        {user.joined}
                                    </td>

                                    <td className="px-5 py-4 sm:px-6">
                                        <div className="flex items-center gap-1">
                                            <Link
                                                href={`/admin/users/${user.id}`}
                                                title="View user"
                                                aria-label={`View ${user.name}`}
                                                className="flex h-8 w-8 items-center justify-center text-black/50 transition-colors hover:bg-[#C9A227]/10 hover:text-black"
                                            >
                                                <Eye size={15} />
                                            </Link>

                                            <Link
                                                href={`/admin/users/${user.id}/edit`}
                                                title="Edit user"
                                                aria-label={`Edit ${user.name}`}
                                                className="flex h-8 w-8 items-center justify-center text-black/50 transition-colors hover:bg-[#C9A227]/10 hover:text-black"
                                            >
                                                <Pencil size={15} />
                                            </Link>

                                            <button
                                                type="button"
                                                title="Delete user"
                                                aria-label={`Delete ${user.name}`}
                                                onClick={() => deleteUser(user.id)}
                                                className="flex h-8 w-8 items-center justify-center text-black/40 transition-colors hover:bg-red-50 hover:text-red-700"
                                            >
                                                <Trash2 size={15} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}

                            {paginatedUsers.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="px-6 py-16 text-center"
                                    >
                                        <Users
                                            size={28}
                                            className="mx-auto text-black/20"
                                        />
                                        <p className="mt-3 text-sm font-medium">
                                            No users found
                                        </p>
                                        <p className="mt-1 text-xs text-black/45">
                                            Try another search term.
                                        </p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex flex-col justify-between gap-4 border-t border-black/[0.07] px-5 py-4 sm:flex-row sm:items-center sm:px-7">
                    <p className="text-xs text-black/45">
                        {filteredUsers.length === 0
                            ? "Showing 0 users"
                            : `Showing ${(currentPage - 1) * pageSize + 1
                            }–${Math.min(
                                currentPage * pageSize,
                                filteredUsers.length
                            )} of ${filteredUsers.length} users`}
                    </p>

                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            disabled={currentPage === 1}
                            onClick={() =>
                                setPage((current) => Math.max(1, current - 1))
                            }
                            aria-label="Previous page"
                            className="flex h-9 w-9 items-center justify-center border border-black/10 transition-colors hover:border-[#C9A227] disabled:cursor-not-allowed disabled:opacity-30"
                        >
                            <ChevronLeft size={16} />
                        </button>

                        <span className="px-2 text-xs">
                            Page {currentPage} of {totalPages}
                        </span>

                        <button
                            type="button"
                            disabled={currentPage >= totalPages}
                            onClick={() =>
                                setPage((current) =>
                                    Math.min(totalPages, current + 1)
                                )
                            }
                            aria-label="Next page"
                            className="flex h-9 w-9 items-center justify-center border border-black/10 transition-colors hover:border-[#C9A227] disabled:cursor-not-allowed disabled:opacity-30"
                        >
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
