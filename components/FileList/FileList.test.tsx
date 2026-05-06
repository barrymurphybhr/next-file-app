import { render, screen } from "@testing-library/react";
import FileList from "./FileList";

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

jest.mock("@brighthr/icons", () => ({
  FolderIcon: () => <svg data-testid="icon-folder" />,
  FilePdfIcon: () => <svg data-testid="icon-pdf" />,
  FileDocumentIcon: () => <svg data-testid="icon-doc" />,
  FileMovieIcon: () => <svg data-testid="icon-mov" />,
  FileSpreadsheetIcon: () => <svg data-testid="icon-csv" />,
}));

const sampleFiles = [
  { name: "Employee Handbook", type: "pdf", added: "2017-01-06" },
  { name: "Expenses", type: "folder", added: "2016-10-06" },
];

describe("FileList", () => {
  it("renders all provided file items", () => {
    render(<FileList fileItems={sampleFiles} />);
    expect(screen.getByText("Employee Handbook.pdf")).toBeInTheDocument();
    expect(screen.getByText("Expenses")).toBeInTheDocument();
  });

  it("renders nothing when the list is empty", () => {
    const { container } = render(<FileList fileItems={[]} />);
    expect(container.querySelectorAll("article")).toHaveLength(0);
  });

  it("passes currentPath down to each FileItem", () => {
    render(<FileList fileItems={sampleFiles} currentPath="/some/path" />);
    expect(screen.getAllByRole("article")).toHaveLength(2);
  });
});
