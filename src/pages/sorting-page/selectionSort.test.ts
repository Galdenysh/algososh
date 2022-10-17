import selectionSort from "./selectionSort";

describe("selectionSort", () => {
  test("selectionSort with non number", async () => {
    const arrAsc = await selectionSort([], "ascending");
    const arrDesc = await selectionSort([], "descending");
    expect(arrAsc).toEqual([]);
    expect(arrDesc).toEqual([]);
  });

  test("selectionSort with one number", async () => {
    const arrAsc = await selectionSort([1], "ascending");
    const arrDesc = await selectionSort([1], "descending");
    expect(arrAsc).toEqual([1]);
    expect(arrDesc).toEqual([1]);
  });

  test("selectionSort with some numbers", async () => {
    const arrAsc = await selectionSort([2, 3, 1, 4], "ascending");
    const arrDesc = await selectionSort([2, 3, 1, 4], "descending");
    expect(arrAsc).toEqual([1, 2, 3, 4]);
    expect(arrDesc).toEqual([4, 3, 2, 1]);
  });
});
