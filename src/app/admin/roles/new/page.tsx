"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    ArrowLeft,
    Check,
    ShieldCheck,
    LayoutDashboard,
    Package,
    ShoppingCart,
    Users,
    UserRound,
    BarChart3,
    Settings,
    LockKeyhole,
    Save,
} from "lucide-react";

type PermissionGroup = {
    name: string;
    icon: React.ElementType;
    permissions: string[];
};

const permissionGroups: PermissionGroup[] = [
    {
        name: "Dashboard",
        icon: LayoutDashboard,
        permissions: ["View Dashboard"],
    },
    {
        name: "Products",
        icon: Package,
        permissions: [
            "View Products",
            "Create Products",
            "Edit Products",
            "Delete Products",
        ],
    },
    {
        name: "Orders",
        icon: ShoppingCart,
        permissions: [
            "View Orders",
            "Create Orders",
            "Edit Orders",
            "Delete Orders",
        ],
    },
    {
        name: "Users",
        icon: Users,
        permissions: [
            "View Users",
            "Create Users",
            "Edit Users",
            "Delete Users",
        ],
    },
    {
        name: "Roles",
        icon: ShieldCheck,
        permissions: [
            "View Roles",
            "Create Roles",
            "Edit Roles",
            "Delete Roles",
        ],
    },
    {
        name: "Customers",
        icon: UserRound,
        permissions: [
            "View Customers",
            "Create Customers",
            "Edit Customers",
            "Delete Customers",
        ],
    },
    {
        name: "Analytics",
        icon: BarChart3,
        permissions: ["View Analytics", "Export Reports"],
    },
    {
        name: "Settings",
        icon: Settings,
        permissions: ["View Settings", "Edit Settings"],
    },
];

export default function CreateRolePage() {
    const router = useRouter();

    const [roleName, setRoleName] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState<"Active" | "Inactive">("Active");
    const [selectedPermissions, setSelectedPermissions] = useState<string[]>(
        [],
    );
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [submitError, setSubmitError] = useState("");

    const togglePermission = (permission: string) => {
        setSelectedPermissions((current) =>
            current.includes(permission)
                ? current.filter((item) => item !== permission)
                : [...current, permission],
        );
    };

    const toggleGroup = (group: PermissionGroup) => {
        const allSelected = group.permissions.every((permission) =>
            selectedPermissions.includes(permission),
        );

        setSelectedPermissions((current) =>
            allSelected
                ? current.filter(
                    (permission) => !group.permissions.includes(permission),
                )
                : [
                    ...new Set([
                        ...current,
                        ...group.permissions,
                    ]),
                ],
        );
    };

    const validateForm = () => {
        const nextErrors: Record<string, string> = {};

        if (!roleName.trim()) {
            nextErrors.roleName = "Role name is required.";
        } else if (roleName.trim().length < 3) {
            nextErrors.roleName = "Role name must contain at least 3 characters.";
        }

        if (!description.trim()) {
            nextErrors.description = "Description is required.";
        }

        if (selectedPermissions.length === 0) {
            nextErrors.permissions = "Select at least one permission.";
        }

        setErrors(nextErrors);
        return Object.keys(nextErrors).length === 0;
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSubmitError("");

        if (!validateForm()) return;

        // Connect this handler to your backend API to persist the role.
        setSubmitError(
            "The form is valid, but saving is not connected yet. Connect your roles API before creating roles.",
        );
    };

    return (
        <main className="min-h-screen bg-white p-4 text-black sm:p-6 lg:p-8">
            <div className="mx-auto max-w-6xl">
                {/* Header */}
                <div className="mb-8">
                    <Link
                        href="/admin/roles"
                        className="mb-5 inline-flex items-center gap-2 text-sm text-black/60 transition hover:text-[#C9A227]"
                    >
                        <ArrowLeft size={16} />
                        Back to Roles
                    </Link>

                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                        <div>
                            <div className="mb-2 flex items-center gap-2">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#C9A227]/10 text-[#C9A227]">
                                    <ShieldCheck size={21} />
                                </div>
                                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A227]">
                                    Access Management
                                </span>
                            </div>

                            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                                Create Role
                            </h1>
                            <p className="mt-2 text-sm text-black/55">
                                Define a role and assign the permissions it needs.
                            </p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                    {/* Role details */}
                    <section className="rounded-2xl border border-black/10 bg-white p-5 sm:p-7">
                        <div className="mb-6 border-b border-black/10 pb-5">
                            <h2 className="text-base font-semibold">Role Information</h2>
                            <p className="mt-1 text-sm text-black/50">
                                Enter the basic information for this role.
                            </p>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                            <div>
                                <label
                                    htmlFor="roleName"
                                    className="mb-2 block text-sm font-medium"
                                >
                                    Role Name <span className="text-[#C9A227]">*</span>
                                </label>

                                <input
                                    id="roleName"
                                    value={roleName}
                                    onChange={(event) => {
                                        setRoleName(event.target.value);
                                        setErrors((current) => ({
                                            ...current,
                                            roleName: "",
                                        }));
                                    }}
                                    placeholder="e.g. Product Manager"
                                    aria-invalid={Boolean(errors.roleName)}
                                    className="w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-black/35 focus:border-[#C9A227] focus:ring-2 focus:ring-[#C9A227]/15"
                                />

                                {errors.roleName && (
                                    <p className="mt-2 text-xs text-red-600">
                                        {errors.roleName}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="status"
                                    className="mb-2 block text-sm font-medium"
                                >
                                    Status
                                </label>

                                <select
                                    id="status"
                                    value={status}
                                    onChange={(event) =>
                                        setStatus(event.target.value as "Active" | "Inactive")
                                    }
                                    className="w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#C9A227] focus:ring-2 focus:ring-[#C9A227]/15"
                                >
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>

                            <div className="md:col-span-2">
                                <label
                                    htmlFor="description"
                                    className="mb-2 block text-sm font-medium"
                                >
                                    Description <span className="text-[#C9A227]">*</span>
                                </label>

                                <textarea
                                    id="description"
                                    rows={3}
                                    value={description}
                                    onChange={(event) => {
                                        setDescription(event.target.value);
                                        setErrors((current) => ({
                                            ...current,
                                            description: "",
                                        }));
                                    }}
                                    placeholder="Describe this role and its responsibilities..."
                                    aria-invalid={Boolean(errors.description)}
                                    className="w-full resize-y rounded-xl border border-black/15 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-black/35 focus:border-[#C9A227] focus:ring-2 focus:ring-[#C9A227]/15"
                                />

                                {errors.description && (
                                    <p className="mt-2 text-xs text-red-600">
                                        {errors.description}
                                    </p>
                                )}
                            </div>
                        </div>
                    </section>

                    {/* Permissions */}
                    <section className="rounded-2xl border border-black/10 bg-white p-5 sm:p-7">
                        <div className="mb-6 flex flex-col justify-between gap-3 border-b border-black/10 pb-5 sm:flex-row sm:items-center">
                            <div>
                                <div className="flex items-center gap-2">
                                    <LockKeyhole size={18} className="text-[#C9A227]" />
                                    <h2 className="text-base font-semibold">
                                        Permissions
                                    </h2>
                                </div>
                                <p className="mt-1 text-sm text-black/50">
                                    Choose which actions this role can perform.
                                </p>
                            </div>

                            <span className="w-fit rounded-full bg-[#C9A227]/10 px-3 py-1.5 text-xs font-semibold text-[#9B7910]">
                                {selectedPermissions.length} selected
                            </span>
                        </div>

                        {errors.permissions && (
                            <p className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                                {errors.permissions}
                            </p>
                        )}

                        <div className="grid gap-4 lg:grid-cols-2">
                            {permissionGroups.map((group) => {
                                const GroupIcon = group.icon;
                                const allSelected = group.permissions.every((permission) =>
                                    selectedPermissions.includes(permission),
                                );

                                return (
                                    <div
                                        key={group.name}
                                        className="overflow-hidden rounded-xl border border-black/10"
                                    >
                                        <div className="flex items-center justify-between gap-3 border-b border-black/10 bg-black/[0.02] px-4 py-3">
                                            <div className="flex items-center gap-2.5">
                                                <GroupIcon
                                                    size={17}
                                                    className="text-[#C9A227]"
                                                />
                                                <h3 className="text-sm font-semibold">
                                                    {group.name}
                                                </h3>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() => toggleGroup(group)}
                                                className="text-xs font-medium text-black/55 transition hover:text-[#C9A227]"
                                            >
                                                {allSelected ? "Deselect all" : "Select all"}
                                            </button>
                                        </div>

                                        <div className="grid gap-3 p-4 sm:grid-cols-2">
                                            {group.permissions.map((permission) => {
                                                const checked =
                                                    selectedPermissions.includes(permission);

                                                return (
                                                    <label
                                                        key={permission}
                                                        className="flex cursor-pointer items-center gap-2.5 text-sm text-black/75"
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            checked={checked}
                                                            onChange={() => togglePermission(permission)}
                                                            className="peer sr-only"
                                                        />

                                                        <span
                                                            className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition ${checked
                                                                    ? "border-[#C9A227] bg-[#C9A227] text-white"
                                                                    : "border-black/25 bg-white"
                                                                }`}
                                                        >
                                                            {checked && <Check size={11} strokeWidth={3} />}
                                                        </span>

                                                        <span>{permission}</span>
                                                    </label>
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-black/10 pt-5">
                            <p className="text-xs text-black/50">
                                {selectedPermissions.length} of{" "}
                                {permissionGroups.reduce(
                                    (total, group) => total + group.permissions.length,
                                    0,
                                )}{" "}
                                permissions selected
                            </p>

                            <button
                                type="button"
                                onClick={() => {
                                    setSelectedPermissions([]);
                                    setErrors((current) => ({
                                        ...current,
                                        permissions: "",
                                    }));
                                }}
                                className="text-xs font-medium text-black/60 transition hover:text-[#C9A227]"
                            >
                                Clear permissions
                            </button>
                        </div>
                    </section>

                    {/* Actions */}
                    {submitError && (
                        <div
                            role="alert"
                            className="rounded-xl border border-[#C9A227]/40 bg-[#C9A227]/10 p-4 text-sm text-black"
                        >
                            {submitError}
                        </div>
                    )}

                    <div className="flex flex-col-reverse justify-end gap-3 sm:flex-row">
                        <Link
                            href="/admin/roles"
                            className="inline-flex items-center justify-center rounded-xl border border-black/15 px-5 py-3 text-sm font-medium transition hover:bg-black/[0.03]"
                        >
                            Cancel
                        </Link>

                        <button
                            type="submit"
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#C9A227] px-5 py-3 text-sm font-semibold text-black transition hover:bg-[#B18D1D] focus:outline-none focus:ring-2 focus:ring-[#C9A227] focus:ring-offset-2"
                        >
                            <Save size={16} />
                            Create Role
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}