import { notFound } from "next/navigation";
import fileData from "@/data/files.json";
import FileList from "@/components/FileList/FileList";
import { sortItems } from "@/lib/sort";

type FolderItem = {
  type: string;
  name: string;
  added: string;
  folder_files?: FolderItem[];
};

function findFolderByPath(
  items: FolderItem[],
  segments: string[],
): FolderItem | undefined {
  let current = items;
  let folder: FolderItem | undefined;

  for (const segment of segments) {
    folder = current.find(
      (item) => item.type === "folder" && item.name === segment,
    );
    if (!folder) return undefined;
    current = folder.folder_files ?? [];
  }

  return folder;
}

type Props = {
  params: Promise<{ path: string[] }>;
  searchParams: Promise<{ sort?: string }>;
};

export default async function FolderPage({ params, searchParams }: Props) {
  const { path } = await params;
  const { sort } = await searchParams;
  const segments = path.map(decodeURIComponent);

  const folder = findFolderByPath(fileData.files as FolderItem[], segments);

  if (!folder) {
    notFound();
  }

  const currentPath = `/${path.map(encodeURIComponent).join("/")}`;
  const displayItems = sortItems(folder.folder_files ?? [], sort);

  return (
    <div>
      {displayItems.length > 0 ? (
        <FileList fileItems={displayItems} currentPath={currentPath} />
      ) : (
        <p>This folder is empty.</p>
      )}
    </div>
  );
}
