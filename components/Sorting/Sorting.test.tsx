import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Sorting from "./Sorting";

const mockReplace = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ replace: mockReplace }),
  usePathname: jest.fn(() => "/"),
  useSearchParams: jest.fn(() => new URLSearchParams()),
}));

import { useSearchParams, usePathname } from "next/navigation";
const mockUseSearchParams = useSearchParams as jest.Mock;
const mockUsePathname = usePathname as jest.Mock;

describe("Sorting", () => {
  beforeEach(() => {
    mockReplace.mockClear();
    mockUseSearchParams.mockReturnValue(new URLSearchParams());
    mockUsePathname.mockReturnValue("/");
  });

  it("renders the sort label and select", () => {
    render(<Sorting />);
    expect(screen.getByLabelText("Sort by:")).toBeInTheDocument();
  });

  it("renders all sort options", () => {
    render(<Sorting />);
    const select = screen.getByLabelText("Sort by:") as HTMLSelectElement;
    const optionValues = Array.from(select.options).map((o) => o.value);
    expect(optionValues).toEqual([
      "default",
      "name_asc",
      "name_desc",
      "added_asc",
      "added_desc",
    ]);
  });

  it("defaults to 'default' when no sort param is set", () => {
    render(<Sorting />);
    const select = screen.getByLabelText("Sort by:") as HTMLSelectElement;
    expect(select.value).toBe("default");
  });

  it("reflects the current sort param in the select value", () => {
    mockUseSearchParams.mockReturnValue(new URLSearchParams("sort=name_asc"));
    render(<Sorting />);
    const select = screen.getByLabelText("Sort by:") as HTMLSelectElement;
    expect(select.value).toBe("name_asc");
  });

  it("calls router.replace with the sort param when a sort option is selected", async () => {
    const user = userEvent.setup();
    render(<Sorting />);
    await user.selectOptions(screen.getByLabelText("Sort by:"), "name_asc");
    expect(mockReplace).toHaveBeenCalledWith("/?sort=name_asc");
  });

  it("removes the sort param when 'default' is selected", async () => {
    const user = userEvent.setup();
    mockUseSearchParams.mockReturnValue(new URLSearchParams("sort=name_asc"));
    render(<Sorting />);
    await user.selectOptions(screen.getByLabelText("Sort by:"), "default");
    expect(mockReplace).toHaveBeenCalledWith("/?");
  });
});
