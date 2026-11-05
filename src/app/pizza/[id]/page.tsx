import { Suspense } from "react";
import PizzaDetail from "@/components/PizzaDetail";

// The detail UI is a Client Component that reads the id with useParams().
// Cache Components asks us to put runtime data behind a Suspense boundary.
export default function PizzaDetailPage() {
  return (
    <Suspense fallback={<p className="py-16 text-center text-lg">Memuat pizza…</p>}>
      <PizzaDetail />
    </Suspense>
  );
}
