import { render, screen } from "@testing-library/react";
import Options from "./Options";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(() => "/"),
  useRouter: () => ({ replace: jest.fn() }),
  useSearchParams: jest.fn(() => new URLSearchParams()),
}));

import { usePathname } from "next/navigation";
const mockUsePathname = usePathname as jest.Mock;

jest.mock("@brighthr/icons", () => ({
  ChevronThinRightIcon: () => <svg data-testid="separator-icon" />,
}));

describe("Options", () => {
  it("renders the breadcrumb Home link", () => {
    render(<Options />);
    expect(screen.getByText("Home")).toBeInTheDocument();
  });

  it("renders the sort select dropdown", () => {
    render(<Options />);
    expect(screen.getByLabelText("Sort by:")).toBeInTheDocument();
  });

  it("renders the separator icon when path has segments", () => {
    mockUsePathname.mockReturnValue("/Expenses");
    render(<Options />);
    expect(screen.getByTestId("separator-icon")).toBeInTheDocument();
  });
});
