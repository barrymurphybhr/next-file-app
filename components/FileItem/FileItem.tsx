type FileType = {
  name: string;
  type: string;
  added: string;
};

type FileItemProps = {
  name: string;
  type: string;
  added: string;
  folderFiles?: FileType[] | undefined;
};

export default function FileItem({
  name,
  added,
  type,
  folderFiles,
}: FileItemProps) {
  return (
    <article className="flex flex-col">
      {/* <img src={fileIcon} /> */}
      <h3>{name}</h3>
      <p>{added}</p>
      <p>{type}</p>
      {folderFiles?.map((file, i) => {
        return (
          <FileItem
            key={i}
            name={file.name}
            added={file.added}
            type={file.type}
          />
        );
      })}
    </article>
  );
}
