"use client";

export const CATEGORIES = ["All", "Chicken", "Classic", "Supreme", "Veggie"];

export default function MenuToolbar({
  query,
  category,
  onQueryChange,
  onCategoryChange,
}: {
  query: string;
  category: string;
  onQueryChange: (query: string) => void;
  onCategoryChange: (category: string) => void;
}) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <input
        type="search"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        placeholder="Cari pizza atau topping…"
        aria-label="Cari pizza"
        className="w-full rounded-xl border border-black/10 bg-white px-4 py-2 sm:max-w-xs"
      />
      <div className="flex flex-wrap gap-2" role="group" aria-label="Kategori">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => onCategoryChange(c)}
            aria-pressed={c === category}
            className={`rounded-full px-3 py-1 text-sm font-medium ring-1 ring-black/10 ${
              c === category ? "bg-brand text-white" : "bg-white"
            }`}
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}
