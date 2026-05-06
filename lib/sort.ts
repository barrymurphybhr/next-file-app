export type SortOption = "name_asc" | "name_desc" | "added_asc" | "added_desc";

type Item = { name: string; added: string };

export function sortItems<T extends Item>(items: T[], sort?: string): T[] {
  const copy = [...items];
  switch (sort as SortOption) {
    case "name_asc":
      return copy.sort((a, b) => a.name.localeCompare(b.name));
    case "name_desc":
      return copy.sort((a, b) => b.name.localeCompare(a.name));
    case "added_asc":
      return copy.sort(
        (a, b) => new Date(a.added).getTime() - new Date(b.added).getTime(),
      );
    case "added_desc":
      return copy.sort(
        (a, b) => new Date(b.added).getTime() - new Date(a.added).getTime(),
      );
    default:
      return copy;
  }
}
