"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
    ArrowLeft,
    Tag,
    ImagePlus,
    X,
    Check,
    Save,
    FolderTree,
    FileText,
    Eye,
} from "lucide-react";

type CategoryStatus = "Active" | "Inactive";

type CategoryForm = {
    name: string;
    slug: string;
    description: string;
    parentId: string;
    status: CategoryStatus;
};

const existingCategories = [
    { id: "1", name: "Wedding Chocolates" },
    { id: "2", name: "Perfumes" },
    { id: "3", name: "Wedding Favors" },
    { id: "4", name: "Gift Sets" },
    { id: "5", name: "Wedding Accessories" },
    { id: "6", name: "Special Occasion Gifts" },
];

const slugify = (value: string) =>
    value
        .toLowerCase()
        .trim()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

export default function CreateCategoryPage() {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [form, setForm] = useState<CategoryForm>({
        name: "",
        slug: "",
        description: "",
        parentId: "",
        status: "Active",
    });

    const [slugEdited, setSlugEdited] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState("");
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [successMessage, setSuccessMessage] = useState("");
    const [savedCategory, setSavedCategory] = useState<CategoryForm | null>(
        null,
    );

    const updateField = <K extends keyof CategoryForm>(
        field: K,
        value: CategoryForm[K],
    ) => {
        setForm((current) => ({
            ...current,
            [field]: value,
        }));

        setErrors((current) => ({
            ...current,
            [field]: "",
        }));

        setSuccessMessage("");
        setSavedCategory(null);
    };

    const handleNameChange = (value: string) => {
        setForm((current) => ({
            ...current,
            name: value,
            slug: slugEdited ? current.slug : slugify(value),
        }));

        setErrors((current) => ({
            ...current,
            name: "",
            slug: "",
        }));

        setSuccessMessage("");
        setSavedCategory(null);
    };

    const handleImageChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const file = event.target.files?.[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            setErrors((current) => ({
                ...current,
                image: "Please select a valid image file.",
            }));
            event.target.value = "";
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            setErrors((current) => ({
                ...current,
                image: "The image must be smaller than 5 MB.",
            }));
            event.target.value = "";
            return;
        }

        if (imagePreview) {
            URL.revokeObjectURL(imagePreview);
        }

        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));

        setErrors((current) => ({
            ...current,
            image: "",
        }));

        setSuccessMessage("");
        setSavedCategory(null);
    };

    const removeImage = () => {
        if (imagePreview) {
            URL.revokeObjectURL(imagePreview);
        }

        setImageFile(null);
        setImagePreview("");

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }

        setErrors((current) => ({
            ...current,
            image: "",
        }));
    };

    const validateForm = () => {
        const nextErrors: Record<string, string> = {};

        if (!form.name.trim()) {
            nextErrors.name = "Category name is required.";
        } else if (form.name.trim().length < 2) {
            nextErrors.name = "Category name must contain at least 2 characters.";
        }

        if (!form.slug.trim()) {
            nextErrors.slug = "Category slug is required.";
        } else if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(form.slug)) {
            nextErrors.slug =
                "Use lowercase letters, numbers, and hyphens only.";
        }

        if (form.description.length > 500) {
            nextErrors.description =
                "Description must not exceed 500 characters.";
        }

        setErrors(nextErrors);
        return Object.keys(nextErrors).length === 0;
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!validateForm()) {
            setSuccessMessage("");
            return;
        }

        // Frontend demonstration only: this does not persist after refresh.
        const categoryToSave = {
            ...form,
            name: form.name.trim(),
            slug: form.slug.trim(),
            description: form.description.trim(),
        };

        setSavedCategory(categoryToSave);
        setSuccessMessage(
            "Category validated successfully. Connect your categories API to save it permanently.",
        );
    };

    const handleReset = () => {
        removeImage();

        setForm({
            name: "",
            slug: "",
            description: "",
            parentId: "",
            status: "Active",
        });

        setSlugEdited(false);
        setErrors({});
        setSuccessMessage("");
        setSavedCategory(null);
    };

    return (
        <main className="min-h-screen bg-white p-4 text-black sm:p-6 lg:p-8">
            <div className="mx-auto max-w-6xl">
                {/* Header */}
                <div className="mb-8">
                    <Link
                        href="/admin/categories"
                        className="mb-5 inline-flex items-center gap-2 text-sm text-black/60 transition hover:text-[#9B7910]"
                    >
                        <ArrowLeft size={16} />
                        Back to Categories
                    </Link>

                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                        <div>
                            <div className="mb-2 flex items-center gap-2">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#C9A227]/10 text-[#9B7910]">
                                    <Tag size={21} />
                                </div>

                                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9B7910]">
                                    Catalog Management
                                </span>
                            </div>

                            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                                Create Category
                            </h1>

                            <p className="mt-2 text-sm text-black/55">
                                Add a new category to organize your store products.
                            </p>
                        </div>

                        <div className="flex items-center gap-2 self-start rounded-full border border-black/10 px-3 py-2 text-xs text-black/55 sm:self-center">
                            <span className="h-2 w-2 rounded-full bg-[#C9A227]" />
                            New Category
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                    {/* Basic information */}
                    <section className="rounded-2xl border border-black/10 bg-white p-5 sm:p-7">
                        <div className="mb-6 flex items-start gap-3 border-b border-black/10 pb-5">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#C9A227]/10 text-[#9B7910]">
                                <FileText size={19} />
                            </div>

                            <div>
                                <h2 className="text-base font-semibold">
                                    Basic Information
                                </h2>
                                <p className="mt-1 text-sm text-black/50">
                                    Set the category name and details.
                                </p>
                            </div>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                            <div>
                                <label
                                    htmlFor="name"
                                    className="mb-2 block text-sm font-medium"
                                >
                                    Category Name <span className="text-[#C9A227]">*</span>
                                </label>

                                <input
                                    id="name"
                                    value={form.name}
                                    onChange={(event) =>
                                        handleNameChange(event.target.value)
                                    }
                                    placeholder="e.g. Wedding Chocolates"
                                    aria-invalid={Boolean(errors.name)}
                                    className="w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-black/35 focus:border-[#C9A227] focus:ring-2 focus:ring-[#C9A227]/15"
                                />

                                {errors.name && (
                                    <p className="mt-2 text-xs text-red-600">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="slug"
                                    className="mb-2 block text-sm font-medium"
                                >
                                    URL Slug <span className="text-[#C9A227]">*</span>
                                </label>

                                <div className="flex overflow-hidden rounded-xl border border-black/15 focus-within:border-[#C9A227] focus-within:ring-2 focus-within:ring-[#C9A227]/15">
                                    <span className="flex items-center border-r border-black/10 bg-black/[0.025] px-3 text-sm text-black/40">
                                        /
                                    </span>

                                    <input
                                        id="slug"
                                        value={form.slug}
                                        onChange={(event) => {
                                            setSlugEdited(true);
                                            updateField("slug", slugify(event.target.value));
                                        }}
                                        placeholder="wedding-chocolates"
                                        aria-invalid={Boolean(errors.slug)}
                                        className="min-w-0 flex-1 bg-white px-3 py-3 text-sm outline-none"
                                    />
                                </div>

                                {errors.slug && (
                                    <p className="mt-2 text-xs text-red-600">
                                        {errors.slug}
                                    </p>
                                )}

                                <p className="mt-2 text-xs text-black/45">
                                    Generated from the category name. You can edit it.
                                </p>
                            </div>

                            <div className="md:col-span-2">
                                <label
                                    htmlFor="description"
                                    className="mb-2 block text-sm font-medium"
                                >
                                    Description{" "}
                                    <span className="text-xs font-normal text-black/40">
                                        (Optional)
                                    </span>
                                </label>

                                <textarea
                                    id="description"
                                    rows={4}
                                    maxLength={500}
                                    value={form.description}
                                    onChange={(event) =>
                                        updateField("description", event.target.value)
                                    }
                                    placeholder="Describe this category and the products it contains..."
                                    aria-invalid={Boolean(errors.description)}
                                    className="w-full resize-y rounded-xl border border-black/15 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-black/35 focus:border-[#C9A227] focus:ring-2 focus:ring-[#C9A227]/15"
                                />

                                <div className="mt-2 flex items-center justify-between gap-3">
                                    {errors.description ? (
                                        <p className="text-xs text-red-600">
                                            {errors.description}
                                        </p>
                                    ) : (
                                        <p className="text-xs text-black/45">
                                            A short description helps customers understand the category.
                                        </p>
                                    )}

                                    <span className="shrink-0 text-xs text-black/40">
                                        {form.description.length}/500
                                    </span>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Category image */}
                    <section className="rounded-2xl border border-black/10 bg-white p-5 sm:p-7">
                        <div className="mb-6 flex items-start gap-3 border-b border-black/10 pb-5">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#C9A227]/10 text-[#9B7910]">
                                <ImagePlus size={19} />
                            </div>

                            <div>
                                <h2 className="text-base font-semibold">
                                    Category Image
                                </h2>
                                <p className="mt-1 text-sm text-black/50">
                                    Upload an image to represent this category.
                                </p>
                            </div>
                        </div>

                        {imagePreview ? (
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                                <div className="relative h-36 w-36 overflow-hidden rounded-xl border border-black/10 bg-black/[0.025]">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={imagePreview}
                                        alt="Category preview"
                                        className="h-full w-full object-cover"
                                    />
                                </div>

                                <div className="min-w-0 flex-1">
                                    <p className="break-all text-sm font-medium">
                                        {imageFile?.name}
                                    </p>
                                    <p className="mt-1 text-xs text-black/45">
                                        {((imageFile?.size ?? 0) / 1024 / 1024).toFixed(2)} MB
                                    </p>

                                    <button
                                        type="button"
                                        onClick={removeImage}
                                        className="mt-4 inline-flex items-center gap-2 rounded-lg border border-black/15 px-3 py-2 text-xs font-medium transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                                    >
                                        <X size={14} />
                                        Remove image
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="flex w-full flex-col items-center justify-center rounded-xl border border-dashed border-black/20 bg-black/[0.015] px-5 py-10 text-center transition hover:border-[#C9A227] hover:bg-[#C9A227]/[0.04]"
                            >
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#C9A227]/10 text-[#9B7910]">
                                    <ImagePlus size={23} />
                                </div>

                                <p className="mt-4 text-sm font-semibold">
                                    Click to upload an image
                                </p>

                                <p className="mt-2 text-xs text-black/45">
                                    PNG, JPG, GIF or WebP · Maximum 5 MB
                                </p>
                            </button>
                        )}

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                            aria-label="Upload category image"
                        />

                        {errors.image && (
                            <p className="mt-3 text-xs text-red-600">{errors.image}</p>
                        )}

                        <p className="mt-4 text-xs text-black/45">
                            The image is only previewed locally. Upload storage is not
                            connected yet.
                        </p>
                    </section>

                    {/* Organization and status */}
                    <section className="rounded-2xl border border-black/10 bg-white p-5 sm:p-7">
                        <div className="mb-6 flex items-start gap-3 border-b border-black/10 pb-5">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#C9A227]/10 text-[#9B7910]">
                                <FolderTree size={19} />
                            </div>

                            <div>
                                <h2 className="text-base font-semibold">
                                    Organization & Visibility
                                </h2>
                                <p className="mt-1 text-sm text-black/50">
                                    Choose a parent category and visibility status.
                                </p>
                            </div>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                            <div>
                                <label
                                    htmlFor="parentId"
                                    className="mb-2 block text-sm font-medium"
                                >
                                    Parent Category
                                </label>

                                <select
                                    id="parentId"
                                    value={form.parentId}
                                    onChange={(event) =>
                                        updateField("parentId", event.target.value)
                                    }
                                    className="w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#C9A227] focus:ring-2 focus:ring-[#C9A227]/15"
                                >
                                    <option value="">None — Top-level category</option>

                                    {existingCategories.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>

                                <p className="mt-2 text-xs text-black/45">
                                    Optional. Use this to create a subcategory.
                                </p>
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
                                    value={form.status}
                                    onChange={(event) =>
                                        updateField(
                                            "status",
                                            event.target.value as CategoryStatus,
                                        )
                                    }
                                    className="w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#C9A227] focus:ring-2 focus:ring-[#C9A227]/15"
                                >
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>

                                <p className="mt-2 text-xs text-black/45">
                                    {form.status === "Active"
                                        ? "This category is marked as active."
                                        : "This category is marked as inactive."}
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Preview */}
                    {(form.name.trim() || form.description.trim()) && (
                        <section className="rounded-2xl border border-[#C9A227]/30 bg-[#C9A227]/[0.04] p-5 sm:p-6">
                            <div className="mb-4 flex items-center gap-2">
                                <Eye size={17} className="text-[#9B7910]" />
                                <h2 className="text-sm font-semibold">Category Preview</h2>
                            </div>

                            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                                {imagePreview && (
                                    <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-black/10">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={imagePreview}
                                            alt=""
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                )}

                                <div className="min-w-0 flex-1">
                                    <h3 className="break-words text-lg font-semibold">
                                        {form.name.trim() || "Category name"}
                                    </h3>

                                    <p className="mt-1 break-all text-xs text-black/45">
                                        /{form.slug || "category-slug"}
                                    </p>

                                    <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-black/60">
                                        {form.description || "No description provided."}
                                    </p>

                                    <div className="mt-3 flex flex-wrap items-center gap-2">
                                        <span
                                            className={`rounded-full px-3 py-1 text-xs font-medium ${form.status === "Active"
                                                    ? "bg-[#C9A227]/15 text-[#80620B]"
                                                    : "bg-black/[0.06] text-black/55"
                                                }`}
                                        >
                                            {form.status}
                                        </span>

                                        {form.parentId && (
                                            <span className="rounded-full border border-black/10 px-3 py-1 text-xs text-black/60">
                                                Parent:{" "}
                                                {
                                                    existingCategories.find(
                                                        (category) => category.id === form.parentId,
                                                    )?.name
                                                }
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* Feedback */}
                    {successMessage && (
                        <div
                            role="status"
                            className="rounded-xl border border-[#C9A227]/40 bg-[#C9A227]/10 p-4"
                        >
                            <div className="flex items-start gap-3">
                                <Check
                                    size={18}
                                    className="mt-0.5 shrink-0 text-[#80620B]"
                                />
                                <div>
                                    <p className="text-sm font-semibold">
                                        Validation successful
                                    </p>
                                    <p className="mt-1 text-sm text-black/65">
                                        {successMessage}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex flex-col-reverse justify-between gap-3 border-t border-black/10 pt-5 sm:flex-row sm:items-center">
                        <button
                            type="button"
                            onClick={handleReset}
                            className="rounded-xl px-4 py-3 text-sm font-medium text-black/60 transition hover:bg-black/[0.04] hover:text-black"
                        >
                            Reset Form
                        </button>

                        <div className="flex flex-col-reverse gap-3 sm:flex-row">
                            <Link
                                href="/admin/categories"
                                className="inline-flex items-center justify-center rounded-xl border border-black/15 px-5 py-3 text-sm font-medium transition hover:bg-black/[0.03]"
                            >
                                Cancel
                            </Link>

                            <button
                                type="submit"
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#C9A227] px-5 py-3 text-sm font-semibold text-black transition hover:bg-[#B18D1D] focus:outline-none focus:ring-2 focus:ring-[#C9A227] focus:ring-offset-2"
                            >
                                <Save size={16} />
                                Create Category
                            </button>
                        </div>
                    </div>
                </form>

                {savedCategory && (
                    <div className="mt-6 rounded-xl border border-black/10 p-5">
                        <h2 className="text-sm font-semibold">
                            Validated category data
                        </h2>
                        <pre className="mt-3 overflow-x-auto rounded-lg bg-black/[0.03] p-4 text-xs leading-6 text-black/70">
                            {JSON.stringify(savedCategory, null, 2)}
                        </pre>
                        <p className="mt-3 text-xs text-black/50">
                            This is an in-memory preview, not a saved database record.
                        </p>
                    </div>
                )}
            </div>
        </main>
    );
}