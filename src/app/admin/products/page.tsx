"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
    Search,
    Plus,
    Eye,
    Pencil,
    Trash2,
    Package,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

type Product = {
    id: string;
    name: string;
    category: string;
    price: number;
    stock: number;
    status: "Active" | "Inactive";
    created: string;
};

const initialProducts: Product[] = [
    {
        id: "PRD-1001",
        name: "Belgian Wedding Chocolates",
        category: "Chocolates",
        price: 25,
        stock: 120,
        status: "Active",
        created: "Oct 10, 2026",
    },
    {
        id: "PRD-1002",
        name: "Luxury Wedding Perfume",
        category: "Perfumes",
        price: 35,
        stock: 45,
        status: "Active",
        created: "Oct 08, 2026",
    },
    {
        id: "PRD-1003",
        name: "Premium Wedding Gift Box",
        category: "Gift Boxes",
        price: 20,
        stock: 0,
        status: "Inactive",
        created: "Oct 05, 2026",
    },
    {
        id: "PRD-1004",
        name: "Gold Wedding Favors",
        category: "Wedding Favors",
        price: 15,
        stock: 8,
        status: "Active",
        created: "Sep 28, 2026",
    },
    {
        id: "PRD-1005",
        name: "Luxury Chocolate Box",
        category: "Chocolates",
        price: 40,
        stock: 32,
        status: "Active",
        created: "Sep 20, 2026",
    },
];

const pageSize = 5;

export default function ProductsPage() {
    const [products, setProducts] = useState(initialProducts);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [category, setCategory] = useState("All Categories");
    const [status, setStatus] = useState("All Statuses");

    const categories = [
        "All Categories",
        ...Array.from(new Set(products.map((product) => product.category))),
    ];

    const filteredProducts = useMemo(() => {
        const query = search.trim().toLowerCase();

        return products.filter((product) => {
            const matchesSearch = [
                product.id,
                product.name,
                product.category,
                product.status,
            ]
                .join(" ")
                .toLowerCase()
                .includes(query);

            const matchesCategory =
                category === "All Categories" ||
                product.category === category;

            const matchesStatus =
                status === "All Statuses" || product.status === status;

            return matchesSearch && matchesCategory && matchesStatus;
        });
    }, [products, search, category, status]);

    const totalPages = Math.max(
        1,
        Math.ceil(filteredProducts.length / pageSize)
    );

    const currentPage = Math.min(page, totalPages);

    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    function deleteProduct(id: string) {
        const product = products.find((item) => item.id === id);

        if (!product) return;

        if (
            !window.confirm(
                `Are you sure you want to delete "${product.name}" ? `
            )
        ) {
            return;
        }

        setProducts((current) =>
            current.filter((item) => item.id !== id)
        );
    }

    return (
        <div className="min-h-screen bg-[#F8F8F6] p-5 text-black sm:p-8 lg:p-10">
            {/* Page heading */}
            <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                <div>
                    <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#A88418]">
                        Workspace / Products
                    </p>

                    <h1 className="mt-3 text-2xl font-light tracking-wide sm:text-3xl">
                        Products
                    </h1>

                    <p className="mt-2 text-sm text-black/50">
                        Manage your store products and inventory.
                    </p>
                </div>

                <Link
                    href="/admin/products/new"
                    className="inline-flex items-center justify-center gap-2 bg-black px-5 py-3 text-xs font-medium uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#C9A227] hover:text-black"
                >
                    <Plus size={16} />
                    Create Product
                </Link>
            </section>

            {/* Summary cards */}
            <section className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <article className="border border-black/[0.07] bg-white p-5">
                    <div className="flex items-center justify-between">
                        <p className="text-xs text-black/50">
                            Total Products
                        </p>
                        <Package size={19} className="text-[#B18B20]" />
                    </div>

                    <p className="mt-4 text-2xl font-medium">
                        {products.length}
                    </p>
                </article>

                <article className="border border-black/[0.07] bg-white p-5">
                    <p className="text-xs text-black/50">
                        Active Products
                    </p>

                    <p className="mt-4 text-2xl font-medium">
                        {products.filter((product) => product.status === "Active").length}
                    </p>
                </article>

                <article className="border border-black/[0.07] bg-white p-5">
                    <p className="text-xs text-black/50">
                        Out of Stock
                    </p>

                    <p className="mt-4 text-2xl font-medium">
                        {products.filter((product) => product.stock === 0).length}
                    </p>
                </article>
            </section>

            {/* Products table */}
            <section className="mt-8 border border-black/[0.07] bg-white">
                <div className="flex flex-col justify-between gap-4 border-b border-black/[0.07] p-5 sm:px-7 sm:py-6">
                    <div>
                        <h2 className="text-sm font-medium">
                            All Products
                        </h2>

                        <p className="mt-2 text-xs text-black/45">
                            {filteredProducts.length}{" "}
                            {filteredProducts.length === 1
                                ? "product"
                                : "products"}{" "}
                            found
                        </p>
                    </div>

                    {/* Search and filters */}
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                        <label className="flex h-10 items-center gap-2 border border-black/10 px-3 transition-colors focus-within:border-[#C9A227] sm:col-span-1">
                            <Search
                                size={16}
                                className="shrink-0 text-black/40"
                            />

                            <input
                                type="search"
                                value={search}
                                onChange={(event) => {
                                    setSearch(event.target.value);
                                    setPage(1);
                                }}
                                placeholder="Search products..."
                                aria-label="Search products"
                                className="w-full bg-transparent text-xs outline-none placeholder:text-black/35"
                            />
                        </label>

                        <select
                            value={category}
                            onChange={(event) => {
                                setCategory(event.target.value);
                                setPage(1);
                            }}
                            aria-label="Filter by category"
                            className="h-10 border border-black/10 bg-white px-3 text-xs outline-none transition-colors focus:border-[#C9A227]"
                        >
                            {categories.map((item) => (
                                <option key={item} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>

                        <select
                            value={status}
                            onChange={(event) => {
                                setStatus(event.target.value);
                                setPage(1);
                            }}
                            aria-label="Filter by status"
                            className="h-10 border border-black/10 bg-white px-3 text-xs outline-none transition-colors focus:border-[#C9A227]"
                        >
                            <option value="All Statuses">All Statuses</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[850px] text-left">
                        <thead>
                            <tr className="border-b border-black/[0.07] bg-[#FAFAF8]">
                                {[
                                    "Product",
                                    "Category",
                                    "Price",
                                    "Stock",
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
                            {paginatedProducts.map((product) => (
                                <tr
                                    key={product.id}
                                    className="border-b border-black/[0.05] transition-colors last:border-0 hover:bg-[#FCFCFA]"
                                >
                                    <td className="px-5 py-4 sm:px-6">
                                        <div className="flex items-center gap-3">
                                            <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#F5F5F2] text-[#8A742F]">
                                                <Package size={18} />
                                            </span>

                                            <div>
                                                <p className="text-xs font-medium">
                                                    {product.name}
                                                </p>

                                                <p className="mt-1 text-[10px] text-black/35">
                                                    {product.id}
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-5 py-4 text-xs text-black/55 sm:px-6">
                                        {product.category}
                                    </td>

                                    <td className="px-5 py-4 text-xs font-medium sm:px-6">
                                        {product.price.toFixed(2)} JD
                                    </td>

                                    <td className="px-5 py-4 sm:px-6">
                                        <span
                                            className={`text - xs ${product.stock === 0
                                                ? "font-medium text-red-600"
                                                : product.stock < 10
                                                    ? "font-medium text-[#A88418]"
                                                    : "text-black/55"
                                                } `}
                                        >
                                            {product.stock}
                                        </span>
                                    </td>

                                    <td className="px-5 py-4 sm:px-6">
                                        <span
                                            className={`inline - flex border px - 2.5 py - 1 text - [10px] ${product.status === "Active"
                                                ? "border-[#C9A227]/40 bg-[#C9A227]/10 text-black"
                                                : "border-black/10 bg-black/[0.03] text-black/50"
                                                } `}
                                        >
                                            {product.status}
                                        </span>
                                    </td>

                                    <td className="px-5 py-4 text-xs text-black/50 sm:px-6">
                                        {product.created}
                                    </td>

                                    <td className="px-5 py-4 sm:px-6">
                                        <div className="flex items-center gap-1">
                                            <Link
                                                href={`/ admin / products / ${product.id} `}
                                                title="View product"
                                                aria-label={`View ${product.name} `}
                                                className="flex h-8 w-8 items-center justify-center text-black/50 transition-colors hover:bg-[#C9A227]/10 hover:text-black"
                                            >
                                                <Eye size={15} />
                                            </Link>

                                            <Link
                                                href={`/ admin / products / ${product.id}/edit`}
                                                title="Edit product"
                                                aria-label={`Edit ${product.name}`}
                                                className="flex h-8 w-8 items-center justify-center text-black/50 transition-colors hover:bg-[#C9A227]/10 hover:text-black"
                                            >
                                                <Pencil size={15} />
                                            </Link >

                                            <button
                                                type="button"
                                                title="Delete product"
                                                aria-label={`Delete ${product.name}`}
                                                onClick={() => deleteProduct(product.id)}
                                                className="flex h-8 w-8 items-center justify-center text-black/40 transition-colors hover:bg-red-50 hover:text-red-700"
                                            >
                                                <Trash2 size={15} />
                                            </button>
                                        </div >
                                    </td >
                                </tr >
                            ))}

                            {
                                paginatedProducts.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={7}
                                            className="px-6 py-16 text-center"
                                        >
                                            <Package
                                                size={28}
                                                className="mx-auto text-black/20"
                                            />

                                            <p className="mt-3 text-sm font-medium">
                                                No products found
                                            </p>

                                            <p className="mt-1 text-xs text-black/45">
                                                Try another search or filter.
                                            </p>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody >
                    </table >
                </div >

                {/* Pagination */}
                < div className="flex flex-col justify-between gap-4 border-t border-black/[0.07] px-5 py-4 sm:flex-row sm:items-center sm:px-7" >
                    <p className="text-xs text-black/45">
                        {filteredProducts.length === 0
                            ? "Showing 0 products"
                            : `Showing ${(currentPage - 1) * pageSize + 1}–${Math.min(
                                currentPage * pageSize,
                                filteredProducts.length
                            )} of ${filteredProducts.length} products`}
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
                </div >
            </section >
        </div >
    );
}