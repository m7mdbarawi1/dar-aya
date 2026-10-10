
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    LayoutDashboard,
    ShoppingBag,
    ClipboardList,
    Users,
    ShieldCheck,
    ChartNoAxesCombined,
    Search,
    LogOut,
    UserRound,
    Bell,
    Menu,
    X,
    ArrowUpRight,
    ArrowDownRight,
    Package,
    TrendingUp,
    ChevronDown,
    Plus,
    Eye,
    PanelLeftClose,
    PanelLeftOpen,
    Store,
} from "lucide-react";

const navigation = [
    { label: "Overview", href: "/admin", icon: LayoutDashboard },
    { label: "Products", href: "/admin/products", icon: ShoppingBag },
    { label: "Orders", href: "/admin/orders", icon: ClipboardList },
    { label: "Users", href: "/admin/users", icon: Users },
    { label: "Roles", href: "/admin/roles", icon: ShieldCheck },
    { label: "Categories", href: "/admin/categories", icon: Package },
];

const initialOrders = [
    {
        id: "#DA-1048",
        customer: "Sarah Ahmed",
        product: "Luxury Wedding Chocolate",
        date: "Oct 10, 2026",
        amount: 125,
        status: "Processing",
    },
    {
        id: "#DA-1047",
        customer: "Lina Khaled",
        product: "Personalized Perfume",
        date: "Oct 10, 2026",
        amount: 70,
        status: "Delivered",
    },
    {
        id: "#DA-1046",
        customer: "Noor Hassan",
        product: "Luxury Gift Box",
        date: "Oct 09, 2026",
        amount: 180,
        status: "Pending",
    },
    {
        id: "#DA-1045",
        customer: "Maya Omar",
        product: "Personalized Chocolate Box",
        date: "Oct 09, 2026",
        amount: 60,
        status: "Delivered",
    },
    {
        id: "#DA-1044",
        customer: "Dana Ali",
        product: "Signature Perfume Set",
        date: "Oct 08, 2026",
        amount: 110,
        status: "Cancelled",
    },
];

const popularProducts = [
    {
        name: "Luxury Wedding Chocolate",
        category: "Chocolates",
        price: 25,
        sold: 48,
        stock: 120,
        image: "/products/chocolate.jpg",
    },
    {
        name: "Personalized Perfume",
        category: "Perfumes",
        price: 35,
        sold: 36,
        stock: 8,
        image: "/products/perfume.jpg",
    },
    {
        name: "Luxury Gift Box",
        category: "Gift Boxes",
        price: 45,
        sold: 29,
        stock: 64,
        image: "/products/gift-box.jpg",
    },
];

const salesData = [
    { day: "Mon", value: 42 },
    { day: "Tue", value: 65 },
    { day: "Wed", value: 48 },
    { day: "Thu", value: 82 },
    { day: "Fri", value: 57 },
    { day: "Sat", value: 95 },
    { day: "Sun", value: 72 },
];

function formatJod(amount: number) {
    return new Intl.NumberFormat("en-JO", {
        style: "currency",
        currency: "JOD",
        maximumFractionDigits: 2,
    }).format(amount);
}

export default function AdminDashboardPage() {
    const router = useRouter();
    const pathname = usePathname();

    const [accountMenuOpen, setAccountMenuOpen] = useState(false);
    const accountMenuRef = useRef<HTMLDivElement>(null);

    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [orders, setOrders] = useState(initialOrders);
    const [period, setPeriod] = useState("7 days");

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                accountMenuRef.current &&
                !accountMenuRef.current.contains(event.target as Node)
            ) {
                setAccountMenuOpen(false);
            }
        }

        function handleEscape(event: KeyboardEvent) {
            if (event.key === "Escape") {
                setAccountMenuOpen(false);
                setSidebarOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscape);
        };
    }, []);

    const visibleOrders = orders.filter((order) =>
        `${order.id} ${order.customer} ${order.product}`
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    const stats = [
        {
            label: "Total Revenue",
            value: formatJod(8240),
            change: "+12.8%",
            positive: true,
            icon: TrendingUp,
        },
        {
            label: "Total Orders",
            value: "186",
            change: "+8.2%",
            positive: true,
            icon: ClipboardList,
        },
        {
            label: "Total Products",
            value: "42",
            change: "+4 new",
            positive: true,
            icon: Package,
        },
        {
            label: "Total Customers",
            value: "124",
            change: "-2.4%",
            positive: false,
            icon: Users,
        },
    ];

    return (
        <main className="min-h-screen bg-[#F8F8F6] text-black">
            {/* Mobile overlay */}
            {sidebarOpen && (
                <button
                    type="button"
                    aria-label="Close navigation overlay"
                    onClick={() => setSidebarOpen(false)}
                    className="fixed inset-0 z-40 bg-black/40 lg:hidden"
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-black/10 bg-white transition-all duration-300 ${sidebarCollapsed ? "lg:w-20" : "lg:w-64"
                    } ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                    } lg:translate-x-0`}
            >
                {/* Sidebar header */}
                <div
                    className={`flex h-20 shrink-0 items-center border-b border-black/10 px-4 ${sidebarCollapsed
                        ? "justify-between lg:justify-center"
                        : "justify-between"
                        }`}
                >
                    <Link
                        href="/admin"
                        onClick={() => setSidebarOpen(false)}
                        aria-label="Dar Aya dashboard"
                        className="flex min-w-0 flex-col"
                    >
                        <span
                            className={`text-xl font-medium tracking-[0.2em] ${sidebarCollapsed ? "lg:hidden" : ""
                                }`}
                        >
                            DAR AYA
                        </span>

                        <span
                            className={`mt-1 text-[9px] uppercase tracking-[0.3em] text-[#C9A227] ${sidebarCollapsed ? "lg:hidden" : ""
                                }`}
                        >
                            Administration
                        </span>

                        <span
                            className={`hidden text-lg font-semibold tracking-wide ${sidebarCollapsed ? "lg:block" : ""
                                }`}
                        >
                            DA
                        </span>
                    </Link>

                    <div className="flex items-center gap-1">
                        <button
                            type="button"
                            aria-label={
                                sidebarCollapsed
                                    ? "Expand sidebar"
                                    : "Collapse sidebar"
                            }
                            aria-pressed={sidebarCollapsed}
                            onClick={() =>
                                setSidebarCollapsed((collapsed) => !collapsed)
                            }
                            className="hidden h-9 w-9 items-center justify-center text-black/60 transition-colors hover:bg-[#C9A227]/10 hover:text-black lg:flex"
                        >
                            {sidebarCollapsed ? (
                                <PanelLeftOpen size={19} />
                            ) : (
                                <PanelLeftClose size={19} />
                            )}
                        </button>

                        <button
                            type="button"
                            aria-label="Close sidebar"
                            onClick={() => setSidebarOpen(false)}
                            className="flex h-9 w-9 items-center justify-center text-black/60 hover:bg-black/5 lg:hidden"
                        >
                            <X size={20} />
                        </button>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto px-3 py-6">
                    <p
                        className={`mb-4 px-3 text-[10px] font-medium uppercase tracking-[0.2em] text-black/35 ${sidebarCollapsed ? "lg:hidden" : ""
                            }`}
                    >
                        Workspace
                    </p>

                    <div className="space-y-1">
                        {navigation.map((item) => {
                            const Icon = item.icon;
                            const active =
                                item.href === "/admin"
                                    ? pathname === "/admin"
                                    : pathname === item.href ||
                                    pathname.startsWith(`${item.href}/`);

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    title={
                                        sidebarCollapsed ? item.label : undefined
                                    }
                                    aria-current={active ? "page" : undefined}
                                    onClick={() => setSidebarOpen(false)}
                                    className={`flex h-11 items-center gap-3 border-l-2 px-3 text-sm transition-colors ${sidebarCollapsed
                                        ? "lg:justify-center lg:px-0"
                                        : ""
                                        } ${active
                                            ? "border-[#C9A227] bg-[#C9A227]/10 font-medium text-black"
                                            : "border-transparent text-black/55 hover:bg-black/[0.03] hover:text-black"
                                        }`}
                                >
                                    <Icon
                                        size={18}
                                        strokeWidth={1.7}
                                        className="shrink-0"
                                    />

                                    <span
                                        className={
                                            sidebarCollapsed ? "lg:hidden" : ""
                                        }
                                    >
                                        {item.label}
                                    </span>

                                    {item.label === "Orders" && (
                                        <span
                                            className={`ml-auto flex h-5 min-w-5 items-center justify-center bg-[#C9A227] px-1 text-[10px] font-medium text-black ${sidebarCollapsed
                                                ? "lg:hidden"
                                                : ""
                                                }`}
                                        >
                                            8
                                        </span>
                                    )}
                                </Link>
                            );
                        })}
                    </div>
                </nav>

                {/* Sidebar footer */}
                <div className="shrink-0 border-t border-black/10 p-3">
                    <div
                        className={`flex items-center gap-3 px-2 py-3 ${sidebarCollapsed ? "lg:justify-center" : ""
                            }`}
                    >
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-black text-xs font-medium text-white">
                            DA
                        </span>

                        <div
                            className={`min-w-0 ${sidebarCollapsed ? "lg:hidden" : ""
                                }`}
                        >
                            <p className="truncate text-xs font-medium">
                                Store Admin
                            </p>
                            <p className="mt-1 truncate text-[10px] text-black/40">
                                admin@daraya.com
                            </p>
                        </div>
                    </div>

                    <Link
                        href="/"
                        title={
                            sidebarCollapsed ? "Back to storefront" : undefined
                        }
                        className={`flex h-10 items-center gap-3 px-3 text-xs text-black/55 transition-colors hover:bg-[#C9A227]/10 hover:text-black ${sidebarCollapsed
                            ? "lg:justify-center lg:px-0"
                            : ""
                            }`}
                    >
                        <Store size={17} className="shrink-0" />
                        <span
                            className={sidebarCollapsed ? "lg:hidden" : ""}
                        >
                            Back to storefront
                        </span>
                    </Link>
                </div>
            </aside>

            {/* Main content */}
            <div
                className={`min-h-screen transition-[margin] duration-300 ${sidebarCollapsed ? "lg:ml-20" : "lg:ml-64"
                    }`}
            >
                {/* Top bar */}
                <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-black/10 bg-white/95 px-5 backdrop-blur sm:px-8 lg:px-10">
                    <div className="flex items-center gap-4">
                        <button
                            type="button"
                            aria-label="Open navigation"
                            aria-expanded={sidebarOpen}
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden"
                        >
                            <Menu size={22} />
                        </button>

                        <div>
                            <p className="text-xs text-black/45">
                                Workspace / Overview
                            </p>
                            <h1 className="mt-1 text-lg font-medium">
                                Dashboard
                            </h1>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 sm:gap-5">
                        <label className="hidden h-10 items-center gap-2 border border-black/10 bg-white px-3 sm:flex">
                            <Search size={16} className="text-black/40" />
                            <input
                                value={search}
                                onChange={(event) =>
                                    setSearch(event.target.value)
                                }
                                placeholder="Search orders..."
                                aria-label="Search orders"
                                className="w-36 bg-transparent text-xs outline-none placeholder:text-black/35 lg:w-48"
                            />
                        </label>

                        <button
                            type="button"
                            aria-label="Notifications"
                            className="relative flex h-10 w-10 items-center justify-center border border-black/10 transition-colors hover:border-[#C9A227]"
                        >
                            <Bell size={18} />
                            <span className="absolute right-2 top-2 h-2 w-2 bg-[#C9A227]" />
                        </button>

                        <div
                            className="relative hidden sm:block"
                            ref={accountMenuRef}
                        >
                            <button
                                type="button"
                                aria-label="Open account menu"
                                aria-haspopup="menu"
                                aria-expanded={accountMenuOpen}
                                onClick={() =>
                                    setAccountMenuOpen((open) => !open)
                                }
                                className="flex h-10 items-center gap-2 border border-transparent p-1 transition-colors hover:border-[#C9A227]"
                            >
                                <span className="flex h-8 w-8 items-center justify-center bg-black text-xs text-white">
                                    DA
                                </span>
                                <ChevronDown
                                    size={15}
                                    className={`transition-transform ${accountMenuOpen ? "rotate-180" : ""
                                        }`}
                                />
                            </button>

                            {accountMenuOpen && (
                                <div
                                    role="menu"
                                    className="absolute right-0 top-full z-50 mt-3 w-56 border border-black/10 bg-white py-2 shadow-lg"
                                >
                                    <div className="border-b border-black/10 px-4 py-3">
                                        <p className="text-sm font-medium">
                                            Store Admin
                                        </p>
                                        <p className="mt-1 text-xs text-black/45">
                                            admin@daraya.com
                                        </p>
                                    </div>

                                    <button
                                        type="button"
                                        role="menuitem"
                                        onClick={() => {
                                            setAccountMenuOpen(false);
                                            router.push("/admin/account");
                                        }}
                                        className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-black/70 transition-colors hover:bg-[#C9A227]/10 hover:text-black"
                                    >
                                        <UserRound size={16} />
                                        My Account
                                    </button>

                                    <button
                                        type="button"
                                        role="menuitem"
                                        onClick={() => {
                                            setAccountMenuOpen(false);
                                            router.push("/");
                                        }}
                                        className="flex w-full items-center gap-3 border-t border-black/10 px-4 py-3 text-left text-sm text-red-700 transition-colors hover:bg-black/[0.03]"
                                    >
                                        <LogOut size={16} />
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                <div className="space-y-8 p-5 sm:p-8 lg:p-10">
                    {/* Welcome */}
                    <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                        <div>
                            <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#A88418]">
                                Saturday, October 10, 2026
                            </p>
                            <h2 className="mt-3 text-2xl font-light tracking-wide sm:text-3xl">
                                Welcome back, Admin
                            </h2>
                            <p className="mt-2 text-sm text-black/50">
                                Here is what&apos;s happening with your store
                                today.
                            </p>
                        </div>

                        <Link
                            href="/admin/products"
                            className="inline-flex items-center justify-center gap-2 bg-black px-5 py-3 text-xs font-medium uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#C9A227] hover:text-black"
                        >
                            <Plus size={16} />
                            Add Product
                        </Link>
                    </section>

                    {/* Stats */}
                    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                        {stats.map((stat) => {
                            const Icon = stat.icon;
                            const ChangeIcon = stat.positive
                                ? ArrowUpRight
                                : ArrowDownRight;

                            return (
                                <article
                                    key={stat.label}
                                    className="border border-black/[0.07] bg-white p-5 sm:p-6"
                                >
                                    <div className="flex items-center justify-between">
                                        <p className="text-xs text-black/50">
                                            {stat.label}
                                        </p>
                                        <Icon
                                            size={19}
                                            strokeWidth={1.5}
                                            className="text-[#B18B20]"
                                        />
                                    </div>

                                    <p className="mt-5 text-2xl font-medium tracking-tight sm:text-3xl">
                                        {stat.value}
                                    </p>

                                    <div className="mt-4 flex items-center gap-1.5">
                                        <ChangeIcon
                                            size={14}
                                            className={
                                                stat.positive
                                                    ? "text-[#8A742F]"
                                                    : "text-black/45"
                                            }
                                        />
                                        <span className="text-xs text-black/55">
                                            {stat.change}
                                        </span>
                                        <span className="text-xs text-black/35">
                                            vs last period
                                        </span>
                                    </div>
                                </article>
                            );
                        })}
                    </section>

                    {/* Sales chart and order summary */}
                    <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                        <article className="border border-black/[0.07] bg-white p-5 sm:p-7 xl:col-span-2">
                            <div className="flex flex-wrap items-start justify-between gap-4">
                                <div>
                                    <h2 className="text-sm font-medium">
                                        Sales Overview
                                    </h2>
                                    <p className="mt-2 text-xs text-black/45">
                                        Revenue performance
                                    </p>
                                </div>

                                <label className="flex items-center gap-2 border border-black/10 px-3 py-2">
                                    <select
                                        value={period}
                                        onChange={(event) =>
                                            setPeriod(event.target.value)
                                        }
                                        aria-label="Sales period"
                                        className="bg-transparent text-xs outline-none"
                                    >
                                        <option>7 days</option>
                                        <option>30 days</option>
                                        <option>90 days</option>
                                    </select>
                                    <ChevronDown
                                        size={14}
                                        className="text-black/45"
                                    />
                                </label>
                            </div>

                            <div className="mt-8 flex items-end gap-2 sm:gap-4">
                                <p className="text-3xl font-light sm:text-4xl">
                                    {formatJod(3240)}
                                </p>
                                <span className="mb-1 text-xs text-[#8A742F]">
                                    +12.8%
                                </span>
                            </div>

                            <div className="mt-8 flex h-48 items-end justify-between gap-2 border-b border-black/10 sm:gap-4">
                                {salesData.map((item) => (
                                    <div
                                        key={item.day}
                                        className="flex h-full flex-1 flex-col items-center justify-end gap-3"
                                    >
                                        <div
                                            title={`${item.value}% relative sales`}
                                            className="w-full max-w-10 bg-[#C9A227]/75 transition-colors hover:bg-[#C9A227]"
                                            style={{
                                                height: `${item.value}%`,
                                            }}
                                        />
                                        <span className="pb-3 text-[10px] text-black/45">
                                            {item.day}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <p className="mt-4 text-[11px] text-black/40">
                                Illustrative sales data · {period}
                            </p>
                        </article>

                        <article className="border border-black/[0.07] bg-white p-5 sm:p-7">
                            <h2 className="text-sm font-medium">
                                Order Summary
                            </h2>
                            <p className="mt-2 text-xs text-black/45">
                                Current order statuses
                            </p>

                            <div className="mt-8 space-y-6">
                                {[
                                    {
                                        label: "Pending",
                                        count: 8,
                                        width: "32%",
                                    },
                                    {
                                        label: "Processing",
                                        count: 12,
                                        width: "48%",
                                    },
                                    {
                                        label: "Delivered",
                                        count: 24,
                                        width: "88%",
                                    },
                                    {
                                        label: "Cancelled",
                                        count: 3,
                                        width: "16%",
                                    },
                                ].map((item) => (
                                    <div key={item.label}>
                                        <div className="mb-2 flex items-center justify-between">
                                            <span className="text-xs text-black/60">
                                                {item.label}
                                            </span>
                                            <span className="text-xs font-medium">
                                                {item.count}
                                            </span>
                                        </div>
                                        <div className="h-1.5 bg-black/[0.05]">
                                            <div
                                                className="h-full bg-[#C9A227]"
                                                style={{
                                                    width: item.width,
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <Link
                                href="/admin/orders"
                                className="mt-8 flex items-center justify-center gap-2 border border-black/15 px-4 py-3 text-xs uppercase tracking-wider transition-colors hover:border-[#C9A227] hover:text-[#A88418]"
                            >
                                View All Orders
                                <ArrowUpRight size={14} />
                            </Link>
                        </article>
                    </section>

                    {/* Recent orders */}
                    <section className="border border-black/[0.07] bg-white">
                        <div className="flex flex-col justify-between gap-4 border-b border-black/[0.07] p-5 sm:flex-row sm:items-center sm:px-7 sm:py-6">
                            <div>
                                <h2 className="text-sm font-medium">
                                    Recent Orders
                                </h2>
                                <p className="mt-2 text-xs text-black/45">
                                    Track and manage customer purchases.
                                </p>
                            </div>

                            <Link
                                href="/admin/orders"
                                className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider transition-colors hover:text-[#A88418]"
                            >
                                View All
                                <ArrowUpRight size={14} />
                            </Link>
                        </div>

                        {/* Search on mobile */}
                        <div className="border-b border-black/[0.07] p-4 sm:hidden">
                            <div className="flex items-center gap-2 border border-black/10 px-3 py-2">
                                <Search
                                    size={15}
                                    className="text-black/40"
                                />
                                <input
                                    value={search}
                                    onChange={(event) =>
                                        setSearch(event.target.value)
                                    }
                                    placeholder="Search orders..."
                                    aria-label="Search orders"
                                    className="w-full bg-transparent text-xs outline-none"
                                />
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[760px] text-left">
                                <thead>
                                    <tr className="border-b border-black/[0.07] bg-[#FAFAF8]">
                                        {[
                                            "Order",
                                            "Customer",
                                            "Product",
                                            "Date",
                                            "Amount",
                                            "Status",
                                        ].map((heading) => (
                                            <th
                                                key={heading}
                                                className="px-5 py-4 text-[10px] font-medium uppercase tracking-[0.12em] text-black/45 sm:px-7"
                                            >
                                                {heading}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>

                                <tbody>
                                    {visibleOrders.map((order) => (
                                        <tr
                                            key={order.id}
                                            className="border-b border-black/[0.05] last:border-0 hover:bg-[#FCFCFA]"
                                        >
                                            <td className="px-5 py-5 text-xs font-medium sm:px-7">
                                                {order.id}
                                            </td>
                                            <td className="px-5 py-5 text-xs">
                                                {order.customer}
                                            </td>
                                            <td className="px-5 py-5 text-xs text-black/55">
                                                {order.product}
                                            </td>
                                            <td className="px-5 py-5 text-xs text-black/55">
                                                {order.date}
                                            </td>
                                            <td className="px-5 py-5 text-xs font-medium">
                                                {formatJod(order.amount)}
                                            </td>
                                            <td className="px-5 py-4">
                                                <select
                                                    aria-label={`Status for order ${order.id}`}
                                                    value={order.status}
                                                    onChange={(event) => {
                                                        const status =
                                                            event.target.value;

                                                        setOrders((current) =>
                                                            current.map(
                                                                (item) =>
                                                                    item.id ===
                                                                        order.id
                                                                        ? {
                                                                            ...item,
                                                                            status,
                                                                        }
                                                                        : item
                                                            )
                                                        );
                                                    }}
                                                    className={`border px-2 py-1.5 text-[10px] outline-none ${order.status ===
                                                        "Delivered"
                                                        ? "border-[#C9A227]/40 bg-[#C9A227]/10"
                                                        : "border-black/10 bg-white"
                                                        }`}
                                                >
                                                    <option>Pending</option>
                                                    <option>Processing</option>
                                                    <option>Delivered</option>
                                                    <option>Cancelled</option>
                                                </select>
                                            </td>
                                        </tr>
                                    ))}

                                    {visibleOrders.length === 0 && (
                                        <tr>
                                            <td
                                                colSpan={6}
                                                className="px-6 py-12 text-center text-sm text-black/45"
                                            >
                                                No orders match your search.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* Popular products */}
                    <section className="border border-black/[0.07] bg-white">
                        <div className="flex items-center justify-between border-b border-black/[0.07] p-5 sm:px-7 sm:py-6">
                            <div>
                                <h2 className="text-sm font-medium">
                                    Popular Products
                                </h2>
                                <p className="mt-2 text-xs text-black/45">
                                    Your featured store products.
                                </p>
                            </div>

                            <Link
                                href="/admin/products"
                                className="text-xs font-medium uppercase tracking-wider transition-colors hover:text-[#A88418]"
                            >
                                Manage
                            </Link>
                        </div>

                        <div className="divide-y divide-black/[0.06]">
                            {popularProducts.map((product) => (
                                <div
                                    key={product.name}
                                    className="flex flex-wrap items-center gap-4 p-5 sm:px-7"
                                >
                                    <div className="h-16 w-16 shrink-0 overflow-hidden bg-[#F5F5F2]">
                                        {/* Replace with next/image when configuring image dimensions */}
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <p className="text-sm font-medium">
                                            {product.name}
                                        </p>
                                        <p className="mt-1 text-xs text-black/45">
                                            {product.category} · {product.sold}{" "}
                                            sold
                                        </p>
                                    </div>

                                    <div className="text-right">
                                        <p className="text-sm font-medium">
                                            {formatJod(product.price)}
                                        </p>
                                        <p
                                            className={`mt-1 text-xs ${product.stock < 10
                                                ? "text-[#A88418]"
                                                : "text-black/40"
                                                }`}
                                        >
                                            {product.stock} in stock
                                        </p>
                                    </div>

                                    <Link
                                        href="/admin/products"
                                        aria-label={`Manage ${product.name}`}
                                        className="flex h-9 w-9 items-center justify-center border border-black/10 transition-colors hover:border-[#C9A227] hover:text-[#A88418]"
                                    >
                                        <Eye size={16} />
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </section>

                    <footer className="pb-3 text-center text-[10px] uppercase tracking-[0.15em] text-black/35">
                        Dar Aya Administration · 2026
                    </footer>
                </div>
            </div>
        </main>
    );
}
