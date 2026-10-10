
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function NewProductPage() {
    const router = useRouter();
    const [saving, setSaving] = useState(false);

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setSaving(true);

        // Connect this form to your backend API to save products.
        // No product is persisted until that API is implemented.
        setSaving(false);
    }

    return (
        <main className="min-h-screen bg-white p-6 text-black md:p-10">
            <div className="mx-auto max-w-3xl">
                <Link
                    href="/admin/products"
                    className="mb-6 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-[#C9A227]"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Products
                </Link>

                <div className="mb-8">
                    <h1 className="text-3xl font-semibold">Create Product</h1>
                    <p className="mt-2 text-sm text-gray-500">
                        Add a new product to your store.
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6 rounded-xl border border-gray-200 p-6"
                >
                    <div className="space-y-2">
                        <Label htmlFor="name">Product Name</Label>
                        <Input id="name" name="name" required placeholder="e.g. Luxury Wedding Chocolate" />
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="price">Price (JOD)</Label>
                            <Input
                                id="price"
                                name="price"
                                type="number"
                                min="0"
                                step="0.01"
                                required
                                placeholder="25.00"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="category">Category</Label>
                            <Input
                                id="category"
                                name="category"
                                required
                                placeholder="e.g. Chocolates"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="image">Image URL</Label>
                        <Input
                            id="image"
                            name="image"
                            type="url"
                            placeholder="https://example.com/product.jpg"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="stock">Stock Quantity</Label>
                        <Input
                            id="stock"
                            name="stock"
                            type="number"
                            min="0"
                            step="1"
                            required
                            placeholder="10"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            name="description"
                            rows={4}
                            placeholder="Describe your product..."
                        />
                    </div>

                    <div className="flex justify-end gap-3 border-t border-gray-200 pt-5">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => router.push("/admin/products")}
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            disabled={saving}
                            className="bg-[#C9A227] text-black hover:bg-[#B18D1F]"
                        >
                            {saving ? "Saving..." : "Save Product"}
                        </Button>
                    </div>
                </form>
            </div>
        </main>
    );
}