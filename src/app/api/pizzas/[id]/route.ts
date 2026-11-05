import { getPizza } from "@/lib/data";

export async function GET(_req: Request, ctx: RouteContext<"/api/pizzas/[id]">) {
  const { id } = await ctx.params;
  const pizza = await getPizza(id);
  if (!pizza) {
    return Response.json({ error: "Pizza not found" }, { status: 404 });
  }
  return Response.json(pizza);
}
