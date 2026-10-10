"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
    Search,
    Plus,
    Eye,
    Pencil,
    Trash2,
    ShieldCheck,
    ChevronLeft,
    ChevronRight,
    KeyRound,
} from "lucide-react";

type Role = {
    id: string;
    name: string;
    description: string;
    users: number;
    permissions: number;
    status: "Active" | "Inactive";
    created: string;
};

const initialRoles: Role[] = [
    {
        id: "ROL-1001",
        name: "Super Admin",
        description: "Full access to all dashboard features.",
        users: 1,
        permissions: 24,
        status: "Active",
        created: "Jan 12, 2026",
    },
    {
        id: "ROL-1002",
        name: "Administrator",
        description: "Manage products, orders, and users.",
        users: 2,
        permissions: 20,
        status: "Active",
        created: "Feb 18, 2026",
    },
    {
        id: "ROL-1003",
        name: "Product Manager",
        description: "Manage product catalog and inventory.",
        users: 1,
        permissions: 8,
        status: "Active",
        created: "Mar 05, 2026",
    },
    {
        id: "ROL-1004",
        name: "Order Manager",
        description: "Manage customer orders and fulfillment.",
        users: 1,
        permissions: 6,
        status: "Active",
        created: "Apr 21, 2026",
    },
    {
        id: "ROL-1005",
        name: "Content Manager",
        description: "Manage store content and promotions.",
        users: 0,
        permissions: 5,
        status: "Inactive",
        created: "May 14, 2026",
    },
];

const pageSize = 5;

export default function RolesPage() {
    const [roles, setRoles] = useState(initialRoles);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    const filteredRoles = useMemo(() => {
        const query = search.trim().toLowerCase();

        return roles.filter((role) =>
            [
                role.id,
                role.name,
                role.description,
                role.status,
            ]
                .join(" ")
                .toLowerCase()
                .includes(query)
        );
    }, [roles, search]);

    const totalPages = Math.max(
        1,
        Math.ceil(filteredRoles.length / pageSize)
    );

    const currentPage = Math.min(page, totalPages);

    const paginatedRoles = filteredRoles.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    function deleteRole(id: string) {
        const role = roles.find((item) => item.id === id);

        if (!role) return;

        if (role.name === "Super Admin") {
            window.alert("The Super Admin role cannot be deleted.");
            return;
        }

        if (role.users > 0) {
            window.alert(
                "This role is assigned to users. Reassign those users before deleting it."
            );
            return;
        }

        if (
            !window.confirm(
                `Are you sure you want to delete the "${role.name}" role?`
            )
        ) {
            return;
        }

        setRoles((current) =>
            current.filter((item) => item.id !== id)
        );
    }

    return (
        <div className="min-h-screen bg-[#F8F8F6] p-5 text-black sm:p-8 lg:p-10">
            {/* Heading */}
            <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                <div>
                    <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#A88418]">
                        Workspace / Roles
                    </p>

                    <h1 className="mt-3 text-2xl font-light tracking-wide sm:text-3xl">
                        Roles
                    </h1>

                    <p className="mt-2 text-sm text-black/50">
                        Manage roles and control dashboard access.
                    </p>
                </div>

                <Link
                    href="/admin/roles/new"
                    className="inline-flex items-center justify-center gap-2 bg-black px-5 py-3 text-xs font-medium uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#C9A227] hover:text-black"
                >
                    <Plus size={16} />
                    Create Role
                </Link>
            </section>

            {/* Summary cards */}
            <section className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <article className="border border-black/7 bg-white p-5">
                    <div className="flex items-center justify-between">
                        <p className="text-xs text-black/50">Total Roles</p>
                        <ShieldCheck size={19} className="text-[#B18B20]" />
                    </div>

                    <p className="mt-4 text-2xl font-medium">{roles.length}</p>
                </article>

                <article className="border border-black/7 bg-white p-5">
                    <p className="text-xs text-black/50">Active Roles</p>
                    <p className="mt-4 text-2xl font-medium">
                        {roles.filter((role) => role.status === "Active").length}
                    </p>
                </article>

                <article className="border border-black/7 bg-white p-5">
                    <p className="text-xs text-black/50">Assigned Users</p>
                    <p className="mt-4 text-2xl font-medium">
                        {roles.reduce((total, role) => total + role.users, 0)}
                    </p>
                </article>
            </section>

            {/* Roles table */}
            <section className="mt-8 border border-black/7 bg-white">
                <div className="flex flex-col justify-between gap-4 border-b border-black/7 p-5 sm:flex-row sm:items-center sm:px-7 sm:py-6">
                    <div>
                        <h2 className="text-sm font-medium">All Roles</h2>
                        <p className="mt-2 text-xs text-black/45">
                            {filteredRoles.length}{" "}
                            {filteredRoles.length === 1 ? "role" : "roles"} found
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
                            placeholder="Search roles..."
                            aria-label="Search roles"
                            className="w-full bg-transparent text-xs outline-none placeholder:text-black/35"
                        />
                    </label>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-212.5 text-left">
                        <thead>
                            <tr className="border-b border-black/7 bg-[#FAFAF8]">
                                {[
                                    "Role",
                                    "Users",
                                    "Permissions",
                                    "Status",
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
                            {paginatedRoles.map((role) => (
                                <tr
                                    key={role.id}
                                    className="border-b border-black/5 transition-colors last:border-0 hover:bg-[#FCFCFA]"
                                >
                                    <td className="px-5 py-4 sm:px-6">
                                        <div className="flex items-center gap-3">
                                            <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#F5F5F2] text-[#8A742F]">
                                                <ShieldCheck size={18} />
                                            </span>

                                            <div>
                                                <p className="text-xs font-medium">
                                                    {role.name}
                                                </p>
                                                <p className="mt-1 text-[11px] text-black/45">
                                                    {role.description}
                                                </p>
                                                <p className="mt-1 text-[10px] text-black/35">
                                                    {role.id}
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-5 py-4 text-xs text-black/60 sm:px-6">
                                        {role.users}
                                    </td>

                                    <td className="px-5 py-4 sm:px-6">
                                        <span className="inline-flex items-center gap-1.5 text-xs text-black/60">
                                            <KeyRound
                                                size={13}
                                                className="text-[#A88418]"
                                            />
                                            {role.permissions}
                                        </span>
                                    </td>

                                    <td className="px-5 py-4 sm:px-6">
                                        <span
                                            className={`inline-flex border px-2.5 py-1 text-[10px] ${role.status === "Active"
                                                    ? "border-[#C9A227]/40 bg-[#C9A227]/10 text-black"
                                                    : "border-black/10 bg-black/3 text-black/50"
                                                }`}
                                        >
                                            {role.status}
                                        </span>
                                    </td>

                                    <td className="px-5 py-4 text-xs text-black/50 sm:px-6">
                                        {role.created}
                                    </td>

                                    <td className="px-5 py-4 sm:px-6">
                                        <div className="flex items-center gap-1">
                                            <Link
                                                href={`/admin/roles/${role.id}`}
                                                title="View role"
                                                aria-label={`View ${role.name}`}
                                                className="flex h-8 w-8 items-center justify-center text-black/50 transition-colors hover:bg-[#C9A227]/10 hover:text-black"
                                            >
                                                <Eye size={15} />
                                            </Link>

                                            <Link
                                                href={`/admin/roles/${role.id}/edit`}
                                                title="Edit role"
                                                aria-label={`Edit ${role.name}`}
                                                className="flex h-8 w-8 items-center justify-center text-black/50 transition-colors hover:bg-[#C9A227]/10 hover:text-black"
                                            >
                                                <Pencil size={15} />
                                            </Link>

                                            <button
                                                type="button"
                                                title="Delete role"
                                                aria-label={`Delete ${role.name}`}
                                                onClick={() => deleteRole(role.id)}
                                                className="flex h-8 w-8 items-center justify-center text-black/40 transition-colors hover:bg-red-50 hover:text-red-700"
                                            >
                                                <Trash2 size={15} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}

                            {paginatedRoles.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-6 py-16 text-center">
                                        <ShieldCheck
                                            size={28}
                                            className="mx-auto text-black/20"
                                        />
                                        <p className="mt-3 text-sm font-medium">
                                            No roles found
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
                <div className="flex flex-col justify-between gap-4 border-t border-black/7 px-5 py-4 sm:flex-row sm:items-center sm:px-7">
                    <p className="text-xs text-black/45">
                        {filteredRoles.length === 0
                            ? "Showing 0 roles"
                            : `Showing ${(currentPage - 1) * pageSize + 1}–${Math.min(
                                currentPage * pageSize,
                                filteredRoles.length
                            )} of ${filteredRoles.length} roles`}
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