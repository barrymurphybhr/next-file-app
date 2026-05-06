import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FileItem from "./FileItem";

const mockPush = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

jest.mock("@brighthr/icons", () => ({
  FolderIcon: () => <svg data-testid="icon-folder" />,
  FilePdfIcon: () => <svg data-testid="icon-pdf" />,
  FileDocumentIcon: () => <svg data-testid="icon-doc" />,
  FileMovieIcon: () => <svg data-testid="icon-mov" />,
  FileSpreadsheetIcon: () => <svg data-testid="icon-csv" />,
}));

describe("FileItem", () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  it("renders a folder with a folder icon and no file extension", () => {
    render(<FileItem name="Expenses" type="folder" added="2016-10-06" />);
    expect(screen.getByText("Expenses")).toBeInTheDocument();
    expect(screen.getByTestId("icon-folder")).toBeInTheDocument();
  });

  it("renders a file with its extension appended to the name", () => {
    render(<FileItem name="Employee Handbook" type="pdf" added="2017-01-06" />);
    expect(screen.getByText("Employee Handbook.pdf")).toBeInTheDocument();
    expect(screen.getByTestId("icon-pdf")).toBeInTheDocument();
  });

  it("renders the added date", () => {
    render(<FileItem name="Expenses" type="folder" added="2016-10-06" />);
    expect(screen.getByText("2016-10-06")).toBeInTheDocument();
  });

  it("navigates to the folder path on double-click", async () => {
    const user = userEvent.setup();
    render(
      <FileItem
        name="Expenses"
        type="folder"
        added="2016-10-06"
        currentPath=""
      />,
    );
    await user.dblClick(screen.getByRole("article"));
    expect(mockPush).toHaveBeenCalledWith("/Expenses");
  });

  it("does not navigate on double-click for non-folder items", async () => {
    const user = userEvent.setup();
    render(
      <FileItem
        name="Employee Handbook"
        type="pdf"
        added="2017-01-06"
        currentPath=""
      />,
    );
    await user.dblClick(screen.getByRole("article"));
    expect(mockPush).not.toHaveBeenCalled();
  });

  it("appends to the currentPath when navigating into a nested folder", async () => {
    const user = userEvent.setup();
    render(
      <FileItem
        name="Receipts"
        type="folder"
        added="2017-01-01"
        currentPath="/Expenses"
      />,
    );
    await user.dblClick(screen.getByRole("article"));
    expect(mockPush).toHaveBeenCalledWith("/Expenses/Receipts");
  });

  it("uses a doc icon for doc type", () => {
    render(<FileItem name="Form" type="doc" added="2017-01-01" />);
    expect(screen.getByTestId("icon-doc")).toBeInTheDocument();
  });

  it("uses a movie icon for mov type", () => {
    render(<FileItem name="Video" type="mov" added="2017-01-01" />);
    expect(screen.getByTestId("icon-mov")).toBeInTheDocument();
  });

  it("uses a spreadsheet icon for csv type", () => {
    render(<FileItem name="Data" type="csv" added="2017-01-01" />);
    expect(screen.getByTestId("icon-csv")).toBeInTheDocument();
  });
});
