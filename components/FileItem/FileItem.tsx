"use client";

import { useRouter } from "next/navigation";
import {
  FolderIcon,
  FilePdfIcon,
  FileDocumentIcon,
  FileMovieIcon,
  FileSpreadsheetIcon,
} from "@brighthr/icons";

type FileItemProps = {
  name: string;
  type: string;
  added: string;
  currentPath?: string;
};

export default function FileItem({
  name,
  added,
  type,
  currentPath = "",
}: FileItemProps) {
  const router = useRouter();

  const handleDoubleClick = () => {
    if (type === "folder") {
      router.push(`${currentPath}/${encodeURIComponent(name)}`);
    }
  };

  let Icon;
  switch (type) {
    case "folder":
      Icon = FolderIcon;
      break;
    case "pdf":
      Icon = FilePdfIcon;
      break;
    case "doc":
      Icon = FileDocumentIcon;
      break;
    case "mov":
      Icon = FileMovieIcon;
      break;
    case "csv":
      Icon = FileSpreadsheetIcon;
      break;
    default:
      Icon = FileDocumentIcon;
  }

  return (
    <article
      className="flex gap-2 cursor-pointer"
      onDoubleClick={handleDoubleClick}
    >
      <Icon className="h-5 w-5" />
      {type === "folder" ? <h3>{name}</h3> : <h3>{`${name}.${type}`}</h3>}
      <div className="flex gap-2">
        <p>{added}</p>
      </div>
    </article>
  );
}
