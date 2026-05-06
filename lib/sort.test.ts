import { sortItems } from "./sort";

const items = [
  { name: "Banana", added: "2020-03-01" },
  { name: "Apple", added: "2021-07-15" },
  { name: "Cherry", added: "2019-11-20" },
];

describe("sortItems", () => {
  it("returns a copy without mutating the original array", () => {
    const original = [...items];
    sortItems(items, "name_asc");
    expect(items).toEqual(original);
  });

  it("sorts by name ascending (name_asc)", () => {
    const result = sortItems(items, "name_asc");
    expect(result.map((i) => i.name)).toEqual(["Apple", "Banana", "Cherry"]);
  });

  it("sorts by name descending (name_desc)", () => {
    const result = sortItems(items, "name_desc");
    expect(result.map((i) => i.name)).toEqual(["Cherry", "Banana", "Apple"]);
  });

  it("sorts by date added ascending (added_asc)", () => {
    const result = sortItems(items, "added_asc");
    expect(result.map((i) => i.name)).toEqual(["Cherry", "Banana", "Apple"]);
  });

  it("sorts by date added descending (added_desc)", () => {
    const result = sortItems(items, "added_desc");
    expect(result.map((i) => i.name)).toEqual(["Apple", "Banana", "Cherry"]);
  });

  it("returns items in original order when sort is undefined", () => {
    const result = sortItems(items);
    expect(result.map((i) => i.name)).toEqual(["Banana", "Apple", "Cherry"]);
  });

  it("returns items in original order for an unknown sort value", () => {
    const result = sortItems(items, "unknown_sort");
    expect(result.map((i) => i.name)).toEqual(["Banana", "Apple", "Cherry"]);
  });

  it("returns an empty array when given an empty array", () => {
    expect(sortItems([], "name_asc")).toEqual([]);
  });

  it("works with extra properties on items", () => {
    const extended = [
      { name: "Z File", added: "2022-01-01", type: "pdf" },
      { name: "A File", added: "2021-01-01", type: "folder" },
    ];
    const result = sortItems(extended, "name_asc");
    expect(result[0].name).toBe("A File");
    expect(result[0].type).toBe("folder");
  });
});
