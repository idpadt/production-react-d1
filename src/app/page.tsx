import { Suspense } from "react";
import MenuExplorer from "@/components/MenuExplorer";
import { getFavoriteIds, getPizzas } from "@/lib/data";

export default function MenuPage() {
  return (
    <section>
      <h1 className="mb-6 text-3xl font-black">Menu</h1>
      <Suspense fallback={<p className="py-16 text-center text-lg">Memuat menu…</p>}>
        <Menu />
      </Suspense>
    </section>
  );
}

// Runs only on the server: reads the database directly, no API round trip
async function Menu() {
  const [pizzas, favoriteIds] = await Promise.all([
    getPizzas(),
    getFavoriteIds(),
  ]);
  return <MenuExplorer pizzas={pizzas} initialFavoriteIds={favoriteIds} />;
}