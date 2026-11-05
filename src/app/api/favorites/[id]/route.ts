import { pizzaExists, toggleFavorite } from "@/lib/data";
import { shouldFail, simulateLatency } from "@/lib/demo";

export async function POST(
  _req: Request,
  ctx: RouteContext<"/api/favorites/[id]">,
) {
  const { id } = await ctx.params;
  await simulateLatency("write");
  if (await shouldFail()) {
    return Response.json({ error: "Server sedang bermasalah" }, { status: 500 });
  }
  if (!(await pizzaExists(id))) {
    return Response.json({ error: "Pizza not found" }, { status: 404 });
  }
  const isFavorite = await toggleFavorite(id);
  return Response.json({ id, isFavorite });
}
