import { render, screen } from "@testing-library/react";
import Breadcrumb from "./Breadcrumb";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

import { usePathname } from "next/navigation";
const mockUsePathname = usePathname as jest.Mock;

describe("Breadcrumb", () => {
  const defaultProps = {
    homeElement: "Home",
    separator: <span>/</span>,
    containerClasses: "flex",
    listClasses: "item",
    activeClasses: "active",
    capitalizeLinks: false,
  };

  it("renders the home element", () => {
    mockUsePathname.mockReturnValue("/");
    render(<Breadcrumb {...defaultProps} />);
    expect(screen.getByText("Home")).toBeInTheDocument();
  });

  it("renders no extra breadcrumb segments at root path", () => {
    mockUsePathname.mockReturnValue("/");
    render(<Breadcrumb {...defaultProps} />);
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(1);
  });

  it("renders a breadcrumb segment for each path part", () => {
    mockUsePathname.mockReturnValue("/Expenses/Receipts");
    render(<Breadcrumb {...defaultProps} />);
    expect(screen.getByText("Expenses")).toBeInTheDocument();
    expect(screen.getByText("Receipts")).toBeInTheDocument();
  });

  it("applies activeClasses to the last segment", () => {
    mockUsePathname.mockReturnValue("/Expenses");
    render(<Breadcrumb {...defaultProps} />);
    const activeLink = screen.getByText("Expenses").closest("li");
    expect(activeLink).toHaveClass("active");
  });

  it("capitalizes links when capitalizeLinks is true", () => {
    mockUsePathname.mockReturnValue("/expenses");
    render(<Breadcrumb {...defaultProps} capitalizeLinks />);
    expect(screen.getByText("Expenses")).toBeInTheDocument();
  });

  it("does not capitalize links when capitalizeLinks is false", () => {
    mockUsePathname.mockReturnValue("/expenses");
    render(<Breadcrumb {...defaultProps} capitalizeLinks={false} />);
    expect(screen.getByText("expenses")).toBeInTheDocument();
  });
});
