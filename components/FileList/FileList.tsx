"use client";

import { useState } from "react";
import FileItem from "../FileItem/FileItem";

type FileItemType = {
  type: string;
  name: string;
  added: string;
};

type FileType = {
  type: string;
  name: string;
  added: string;
  folder_files?: FileItemType[];
};

type FileListProps = {
  fileItems: FileType[];
};

export default function FileList({ fileItems }: FileListProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div>
      {fileItems.map((file, i) => {
        return (
          <FileItem
            key={i}
            name={file.name}
            type={file.type}
            added={file.added}
            folderFiles={file.folder_files}
          />
        );
      })}
    </div>
  );
}
