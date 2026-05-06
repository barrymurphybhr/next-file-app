"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function Sorting() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get("sort") ?? "default";

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    if (e.target.value === "default") {
      params.delete("sort");
    } else {
      params.set("sort", e.target.value);
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      <div>
        <label htmlFor="sort-select">Sort by:</label>
        <select id="sort-select" value={currentSort} onChange={handleChange}>
          <option value="default">None</option>
          <option value="name_asc">Name (A–Z)</option>
          <option value="name_desc">Name (Z–A)</option>
          <option value="added_asc">Date added (oldest first)</option>
          <option value="added_desc">Date added (newest first)</option>
        </select>
      </div>
    </>
  );
}
