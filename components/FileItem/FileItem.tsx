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

  const handleClick = () => {
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
      className="flex flex-col items-center text-center justify-center hover:bg-gray-100 shadow-xl active:border-2 w-44 h-44 lg:h-64 lg:w-64 p-2 border rounded-xl gap-2 cursor-pointer"
      onClick={handleClick}
    >
      <Icon className="lg:h-18 lg:w-18 h-10 w-10" />
      {type === "folder" ? (
        <p className="font-semibold">{name}</p>
      ) : (
        <p>{`${name}.${type}`}</p>
      )}

      <p>{added}</p>
    </article>
  );
}
