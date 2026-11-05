import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, expect, test, vi } from "vitest";
import MenuToolbar from "@/components/MenuToolbar";

afterEach(cleanup);

test("reports search text and category clicks", async () => {
  const onQueryChange = vi.fn();
  const onCategoryChange = vi.fn();
  render(
    <MenuToolbar
      query=""
      category="All"
      onQueryChange={onQueryChange}
      onCategoryChange={onCategoryChange}
    />,
  );

  await userEvent.type(screen.getByLabelText("Cari pizza"), "h");
  expect(onQueryChange).toHaveBeenCalledWith("h");

  await userEvent.click(screen.getByRole("button", { name: "Veggie" }));
  expect(onCategoryChange).toHaveBeenCalledWith("Veggie");
});

test("marks the active category", () => {
  render(
    <MenuToolbar
      query=""
      category="Supreme"
      onQueryChange={() => {}}
      onCategoryChange={() => {}}
    />,
  );
  expect(
    screen.getByRole("button", { name: "Supreme" }).getAttribute("aria-pressed"),
  ).toBe("true");
});
