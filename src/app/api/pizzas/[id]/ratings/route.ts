import { addRating, getRatingSummary, pizzaExists } from "@/lib/data";
import { shouldFail, simulateLatency } from "@/lib/demo";
import { parseStars } from "@/lib/format";

export async function GET(
  _req: Request,
  ctx: RouteContext<"/api/pizzas/[id]/ratings">,
) {
  const { id } = await ctx.params;
  return Response.json(await getRatingSummary(id));
}

export async function POST(
  req: Request,
  ctx: RouteContext<"/api/pizzas/[id]/ratings">,
) {
  const { id } = await ctx.params;
  await simulateLatency("write");
  if (await shouldFail()) {
    return Response.json({ error: "Server sedang bermasalah" }, { status: 500 });
  }
  const body = (await req.json()) as { stars?: unknown };
  const stars = parseStars(body.stars);
  if (stars === null || !(await pizzaExists(id))) {
    return Response.json({ error: "Rating tidak valid" }, { status: 400 });
  }
  await addRating(id, stars);
  return Response.json(await getRatingSummary(id));
}
