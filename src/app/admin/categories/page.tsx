"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
    Search,
    Plus,
    Eye,
    Pencil,
    Trash2,
    ChevronLeft,
    ChevronRight,
    Tag,
    Gift,
    Package,
    Sparkles,
    Flower2,
    ShoppingBag,
    SlidersHorizontal,
    X,
    type LucideIcon,
} from "lucide-react";

type CategoryStatus = "Active" | "Inactive";

type Category = {
    id: number;
    name: string;
    slug: string;
    description: string;
    products: number;
    status: CategoryStatus;
    createdAt: string;
    icon: LucideIcon;
};

const initialCategories: Category[] = [
    {
        id: 1,
        name: "Wedding Chocolates",
        slug: "wedding-chocolates",
        description: "Premium chocolates for weddings and special occasions.",
        products: 24,
        status: "Active",
        createdAt: "Oct 01, 2026",
        icon: Gift,
    },
    {
        id: 2,
        name: "Perfumes",
        slug: "perfumes",
        description: "Luxury fragrances and perfume gift sets.",
        products: 18,
        status: "Active",
        createdAt: "Sep 24, 2026",
        icon: Sparkles,
    },
    {
        id: 3,
        name: "Wedding Favors",
        slug: "wedding-favors",
        description: "Elegant favors and giveaways for wedding guests.",
        products: 32,
        status: "Active",
        createdAt: "Sep 18, 2026",
        icon: Flower2,
    },
    {
        id: 4,
        name: "Gift Sets",
        slug: "gift-sets",
        description: "Curated gift boxes and luxury hampers.",
        products: 15,
        status: "Active",
        createdAt: "Sep 12, 2026",
        icon: Package,
    },
    {
        id: 5,
        name: "Wedding Accessories",
        slug: "wedding-accessories",
        description: "Accessories for weddings and celebrations.",
        products: 9,
        status: "Inactive",
        createdAt: "Sep 08, 2026",
        icon: ShoppingBag,
    },
    {
        id: 6,
        name: "Special Occasion Gifts",
        slug: "special-occasion-gifts",
        description: "Thoughtful gifts for memorable occasions.",
        products: 21,
        status: "Active",
        createdAt: "Sep 02, 2026",
        icon: Tag,
    },
];

const PAGE_SIZE = 5;

export default function CategoriesPage() {
    const [categories, setCategories] =
        useState<Category[]>(initialCategories);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [page, setPage] = useState(1);
    const [deleteTarget, setDeleteTarget] = useState<Category | null>(
        null,
    );

    const filteredCategories = useMemo(() => {
        const query = search.trim().toLowerCase();

        return categories.filter((category) => {
            const matchesSearch =
                category.name.toLowerCase().includes(query) ||
                category.slug.toLowerCase().includes(query) ||
                category.description.toLowerCase().includes(query);

            const matchesStatus =
                statusFilter === "All" || category.status === statusFilter;

            return matchesSearch && matchesStatus;
        });
    }, [categories, search, statusFilter]);

    const totalPages = Math.max(
        1,
        Math.ceil(filteredCategories.length / PAGE_SIZE),
    );
    const currentPage = Math.min(page, totalPages);

    const paginatedCategories = filteredCategories.slice(
        (currentPage - 1) * PAGE_SIZE,
        currentPage * PAGE_SIZE,
    );

    const totalProducts = categories.reduce(
        (total, category) => total + category.products,
        0,
    );

    const activeCategories = categories.filter(
        (category) => category.status === "Active",
    ).length;

    const handleDelete = () => {
        if (!deleteTarget) return;

        setCategories((current) =>
            current.filter((category) => category.id !== deleteTarget.id),
        );
        setDeleteTarget(null);
    };

    const changeSearch = (value: string) => {
        setSearch(value);
        setPage(1);
    };

    const changeStatus = (value: string) => {
        setStatusFilter(value);
        setPage(1);
    };

    return (
        <main className="min-h-screen bg-white p-4 text-black sm:p-6 lg:p-8">
            <div className="mx-auto max-w-7xl space-y-7">
                {/* Page header */}
                <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                    <div>
                        <div className="mb-2 flex items-center gap-2">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#C9A227]/10 text-[#C9A227]">
                                <Tag size={21} />
                            </div>

                            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9B7910]">
                                Catalog Management
                            </span>
                        </div>

                        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                            Product Categories
                        </h1>

                        <p className="mt-2 text-sm text-black/55">
                            Organize your products and manage your store categories.
                        </p>
                    </div>

                    <Link
                        href="/admin/categories/new"
                        className="inline-flex items-center justify-center gap-2 self-start rounded-xl bg-[#C9A227] px-5 py-3 text-sm font-semibold text-black transition hover:bg-[#B18D1D] sm:self-center"
                    >
                        <Plus size={17} />
                        Add Category
                    </Link>
                </div>

                {/* Summary cards */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <SummaryCard
                        title="Total Categories"
                        value={categories.length}
                        description="All store categories"
                        icon={Tag}
                    />

                    <SummaryCard
                        title="Active Categories"
                        value={activeCategories}
                        description="Currently available"
                        icon={Sparkles}
                    />

                    <SummaryCard
                        title="Inactive Categories"
                        value={categories.length - activeCategories}
                        description="Currently disabled"
                        icon={SlidersHorizontal}
                    />

                    <SummaryCard
                        title="Products Assigned"
                        value={totalProducts}
                        description="Across all categories"
                        icon={Package}
                    />
                </div>

                {/* Categories table */}
                <section className="overflow-hidden rounded-2xl border border-black/10 bg-white">
                    <div className="flex flex-col justify-between gap-4 border-b border-black/10 p-5 sm:p-6 lg:flex-row lg:items-center">
                        <div>
                            <h2 className="text-base font-semibold">
                                All Categories
                            </h2>
                            <p className="mt-1 text-sm text-black/50">
                                {filteredCategories.length}{" "}
                                {filteredCategories.length === 1
                                    ? "category"
                                    : "categories"}{" "}
                                found
                            </p>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row">
                            <div className="relative sm:min-w-64">
                                <Search
                                    size={17}
                                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-black/40"
                                />

                                <input
                                    type="search"
                                    value={search}
                                    onChange={(event) => changeSearch(event.target.value)}
                                    placeholder="Search categories..."
                                    aria-label="Search categories"
                                    className="w-full rounded-xl border border-black/15 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition placeholder:text-black/40 focus:border-[#C9A227] focus:ring-2 focus:ring-[#C9A227]/15"
                                />
                            </div>

                            <select
                                value={statusFilter}
                                onChange={(event) => changeStatus(event.target.value)}
                                aria-label="Filter categories by status"
                                className="rounded-xl border border-black/15 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-[#C9A227] focus:ring-2 focus:ring-[#C9A227]/15"
                            >
                                <option value="All">All statuses</option>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[850px] text-left">
                            <thead className="bg-black/[0.025]">
                                <tr className="border-b border-black/10">
                                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-black/50">
                                        Category
                                    </th>
                                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-black/50">
                                        Products
                                    </th>
                                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-black/50">
                                        Status
                                    </th>
                                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-black/50">
                                        Date Created
                                    </th>
                                    <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-black/50">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-black/[0.06]">
                                {paginatedCategories.map((category) => {
                                    const CategoryIcon = category.icon;

                                    return (
                                        <tr
                                            key={category.id}
                                            className="transition hover:bg-black/[0.015]"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#C9A227]/20 bg-[#C9A227]/10 text-[#9B7910]">
                                                        <CategoryIcon size={20} />
                                                    </div>

                                                    <div className="min-w-0">
                                                        <p className="font-medium">
                                                            {category.name}
                                                        </p>
                                                        <p className="mt-1 text-xs text-black/45">
                                                            /{category.slug}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-6 py-4">
                                                <span className="inline-flex min-w-9 items-center justify-center rounded-lg bg-black/[0.04] px-2.5 py-1.5 text-sm font-medium">
                                                    {category.products}
                                                </span>
                                            </td>

                                            <td className="px-6 py-4">
                                                <span
                                                    className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium ${category.status === "Active"
                                                            ? "bg-[#C9A227]/10 text-[#80620B]"
                                                            : "bg-black/[0.05] text-black/55"
                                                        }`}
                                                >
                                                    <span
                                                        className={`h-1.5 w-1.5 rounded-full ${category.status === "Active"
                                                                ? "bg-[#C9A227]"
                                                                : "bg-black/35"
                                                            }`}
                                                    />
                                                    {category.status}
                                                </span>
                                            </td>

                                            <td className="px-6 py-4 text-sm text-black/60">
                                                {category.createdAt}
                                            </td>

                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-end gap-1.5">
                                                    <Link
                                                        href={`/admin/categories/${category.id}`}
                                                        title="View category"
                                                        aria-label={`View ${category.name}`}
                                                        className="flex h-9 w-9 items-center justify-center rounded-lg text-black/55 transition hover:bg-[#C9A227]/10 hover:text-[#9B7910]"
                                                    >
                                                        <Eye size={16} />
                                                    </Link>

                                                    <Link
                                                        href={`/admin/categories/${category.id}/edit`}
                                                        title="Edit category"
                                                        aria-label={`Edit ${category.name}`}
                                                        className="flex h-9 w-9 items-center justify-center rounded-lg text-black/55 transition hover:bg-[#C9A227]/10 hover:text-[#9B7910]"
                                                    >
                                                        <Pencil size={16} />
                                                    </Link>

                                                    <button
                                                        type="button"
                                                        title="Delete category"
                                                        aria-label={`Delete ${category.name}`}
                                                        onClick={() => setDeleteTarget(category)}
                                                        className="flex h-9 w-9 items-center justify-center rounded-lg text-black/45 transition hover:bg-red-50 hover:text-red-600"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}

                                {paginatedCategories.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-16 text-center">
                                            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-black/[0.04] text-black/40">
                                                <Tag size={22} />
                                            </div>

                                            <p className="mt-4 text-sm font-semibold">
                                                No categories found
                                            </p>

                                            <p className="mt-1 text-sm text-black/50">
                                                Try another search or change the status filter.
                                            </p>

                                            {(search || statusFilter !== "All") && (
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        changeSearch("");
                                                        changeStatus("All");
                                                    }}
                                                    className="mt-4 text-sm font-medium text-[#9B7910] hover:underline"
                                                >
                                                    Clear filters
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex flex-col gap-4 border-t border-black/10 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                        <p className="text-sm text-black/50">
                            Showing{" "}
                            {filteredCategories.length === 0
                                ? 0
                                : (currentPage - 1) * PAGE_SIZE + 1}
                            {"–"}
                            {Math.min(currentPage * PAGE_SIZE, filteredCategories.length)}{" "}
                            of {filteredCategories.length} categories
                        </p>

                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={() =>
                                    setPage((current) => Math.max(1, current - 1))
                                }
                                disabled={currentPage === 1}
                                aria-label="Previous page"
                                className="flex h-9 w-9 items-center justify-center rounded-lg border border-black/10 transition hover:border-[#C9A227] hover:bg-[#C9A227]/5 disabled:cursor-not-allowed disabled:opacity-35"
                            >
                                <ChevronLeft size={17} />
                            </button>

                            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                                (pageNumber) => (
                                    <button
                                        key={pageNumber}
                                        type="button"
                                        onClick={() => setPage(pageNumber)}
                                        aria-label={`Page ${pageNumber}`}
                                        aria-current={
                                            currentPage === pageNumber ? "page" : undefined
                                        }
                                        className={`h-9 min-w-9 rounded-lg px-2 text-sm font-medium transition ${currentPage === pageNumber
                                                ? "bg-[#C9A227] text-black"
                                                : "border border-black/10 hover:border-[#C9A227] hover:bg-[#C9A227]/5"
                                            }`}
                                    >
                                        {pageNumber}
                                    </button>
                                ),
                            )}

                            <button
                                type="button"
                                onClick={() =>
                                    setPage((current) =>
                                        Math.min(totalPages, current + 1),
                                    )
                                }
                                disabled={currentPage === totalPages}
                                aria-label="Next page"
                                className="flex h-9 w-9 items-center justify-center rounded-lg border border-black/10 transition hover:border-[#C9A227] hover:bg-[#C9A227]/5 disabled:cursor-not-allowed disabled:opacity-35"
                            >
                                <ChevronRight size={17} />
                            </button>
                        </div>
                    </div>
                </section>
            </div>

            {/* Delete confirmation dialog */}
            {deleteTarget && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
                    onClick={(event) => {
                        if (event.target === event.currentTarget) {
                            setDeleteTarget(null);
                        }
                    }}
                >
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="delete-title"
                        className="w-full max-w-md rounded-2xl border border-black/10 bg-white p-6 shadow-xl"
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600">
                                <Trash2 size={20} />
                            </div>

                            <button
                                type="button"
                                onClick={() => setDeleteTarget(null)}
                                aria-label="Close dialog"
                                className="rounded-lg p-2 text-black/45 transition hover:bg-black/[0.04] hover:text-black"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <h2
                            id="delete-title"
                            className="mt-5 text-lg font-semibold"
                        >
                            Delete category?
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-black/60">
                            Are you sure you want to delete{" "}
                            <span className="font-semibold text-black">
                                {deleteTarget.name}
                            </span>
                            ? This removes it from the current sample list.
                        </p>

                        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                            <button
                                type="button"
                                onClick={() => setDeleteTarget(null)}
                                className="rounded-xl border border-black/15 px-4 py-2.5 text-sm font-medium transition hover:bg-black/[0.03]"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={handleDelete}
                                className="rounded-xl bg-black px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-black/80"
                            >
                                Delete Category
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}

function SummaryCard({
    title,
    value,
    description,
    icon: Icon,
}: {
    title: string;
    value: number;
    description: string;
    icon: LucideIcon;
}) {
    return (
        <div className="rounded-2xl border border-black/10 bg-white p-5 transition hover:border-[#C9A227]/50">
            <div className="flex items-start justify-between gap-3">
                <div>
                    <p className="text-sm text-black/55">{title}</p>
                    <p className="mt-3 text-3xl font-semibold tracking-tight">
                        {value}
                    </p>
                    <p className="mt-2 text-xs text-black/45">{description}</p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#C9A227]/10 text-[#9B7910]">
                    <Icon size={19} />
                </div>
            </div>
        </div>
    );
}