import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, expect, test } from "vitest";
import SizePicker from "@/components/SizePicker";

afterEach(cleanup);

test("starts at Medium and updates the price", async () => {
  render(<SizePicker sizes={{ S: 9.75, M: 12.5, L: 15.25 }} />);
  expect(screen.getByTestId("price").textContent).toBe("$12.50");

  await userEvent.click(screen.getByRole("radio", { name: "Large" }));
  expect(screen.getByTestId("price").textContent).toBe("$15.25");
});
