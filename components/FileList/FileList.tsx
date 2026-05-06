import FileItem from "../FileItem/FileItem";

type FileType = {
  type: string;
  name: string;
  added: string;
  folder_files?: FileType[];
};

type FileListProps = {
  fileItems: FileType[];
  currentPath?: string;
};

export default function FileList({
  fileItems,
  currentPath = "",
}: FileListProps) {
  return (
    <div className="flex flex-col gap-2 pt-4 pl-4">
      {fileItems.map((file, i) => {
        return (
          <FileItem
            key={i}
            name={file.name}
            type={file.type}
            added={file.added}
            currentPath={currentPath}
          />
        );
      })}
    </div>
  );
}
