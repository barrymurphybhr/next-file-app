import DATA from "@/data/data";
import FileList from "@/components/FileList/FileList";

export default function Home() {
  const data = DATA.FILES;
  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      <FileList fileItems={data} />
    </div>
  );
}
