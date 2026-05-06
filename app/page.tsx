import DATA from "@/data/data";
import FileList from "@/components/FileList/FileList";
import { sortItems } from "@/lib/sort";

type SearchParams = Promise<{ sort?: string }>;

export default async function Home({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { sort } = await searchParams;
  const displayItems = sortItems(DATA.FILES, sort);

  return (
    <div>
      <FileList fileItems={displayItems} />
    </div>
  );
}
