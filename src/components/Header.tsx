import Link from "next/link";
import { Suspense } from "react";
import { getFavoriteIds } from "@/lib/data";

function CountPill({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="rounded-full bg-white/15 px-3 py-1 text-sm font-semibold"
      data-testid="favorite-count"
    >
      ♥ {children} favorit
    </span>
  );
}

async function FavoriteCount() {
  const ids = await getFavoriteIds();
  return <CountPill>{ids.length}</CountPill>;
}

// A Server Component now: no useEffect, no custom browser events
export default function Header() {
  return (
    <header className="bg-brand text-white shadow">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-2xl font-black tracking-tight">
          Padre Gino&apos;s
        </Link>
        <Suspense fallback={<CountPill>…</CountPill>}>
          <FavoriteCount />
        </Suspense>
      </nav>
    </header>
  );
}