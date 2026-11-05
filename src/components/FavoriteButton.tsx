"use client";

export default function FavoriteButton({
  pizzaName,
  isFavorite,
  onToggle,
}: {
  pizzaName: string;
  isFavorite: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={isFavorite}
      aria-label={`${isFavorite ? "Hapus" : "Tambah"} ${pizzaName} ${isFavorite ? "dari" : "ke"} favorit`}
      className="shrink-0 text-2xl leading-none text-brand"
    >
      {isFavorite ? "♥" : "♡"}
    </button>
  );
}
