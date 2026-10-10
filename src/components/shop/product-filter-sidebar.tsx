"use client";

type ProductFilterSidebarProps = {
    categories: string[];
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
    sortOrder: string;
    onSortChange: (sort: string) => void;
};

export default function ProductFilterSidebar({
    categories,
    selectedCategory,
    onCategoryChange,
    sortOrder,
    onSortChange,
}: ProductFilterSidebarProps) {
    return (<aside className="w-full shrink-0 lg:w-60"> <div className="border-b border-black/10 pb-5"> <h2 className="text-sm font-medium uppercase tracking-[0.2em]">
        Filters </h2> <p className="mt-2 text-xs leading-6 text-black/50">
            Find something special for your occasion. </p> </div>
        {/* Categories */}
        <div className="border-b border-black/10 py-7">
            <h3 className="mb-5 text-xs font-medium uppercase tracking-[0.15em]">
                Categories
            </h3>

            <div className="space-y-4">
                {categories.map((category) => (
                    <button
                        key={category}
                        type="button"
                        onClick={() => onCategoryChange(category)}
                        className={`flex w-full items-center justify-between text-left text-sm transition-colors ${selectedCategory === category
                            ? "font-medium text-[#C9A227]"
                            : "text-black/60 hover:text-black"
                            }`}
                    >
                        <span>{category}</span>
                        {selectedCategory === category && (
                            <span className="text-[#C9A227]">✓</span>
                        )}
                    </button>
                ))}
            </div>
        </div>

        {/* Sorting */}
        <div className="border-b border-black/10 py-7">
            <h3 className="mb-4 text-xs font-medium uppercase tracking-[0.15em]">
                Sort By
            </h3>

            <select
                value={sortOrder}
                onChange={(event) => onSortChange(event.target.value)}
                className="h-11 w-full border border-black/20 bg-white px-3 text-xs text-black outline-none transition-colors focus:border-[#C9A227]"
            >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest</option>
            </select>
        </div>

        {/* Reset */}
        <button
            type="button"
            onClick={() => {
                onCategoryChange("All Products");
                onSortChange("featured");
            }}
            className="mt-6 text-xs uppercase tracking-[0.15em] text-black/60 transition-colors hover:text-[#C9A227]"
        >
            Reset Filters
        </button>
    </aside>
    );
}
