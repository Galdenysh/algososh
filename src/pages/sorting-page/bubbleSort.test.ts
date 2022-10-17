import bubbleSort from "./bubbleSort";

describe("bubbleSort", () => {
  test("bubbleSort with non number", async () => {
    const arrAsc = await bubbleSort([], "ascending");
    const arrDesc = await bubbleSort([], "descending");
    expect(arrAsc).toEqual([]);
    expect(arrDesc).toEqual([]);
  });

  test("bubbleSort with one number", async () => {
    const arrAsc = await bubbleSort([1], "ascending");
    const arrDesc = await bubbleSort([1], "descending");
    expect(arrAsc).toEqual([1]);
    expect(arrDesc).toEqual([1]);
  });

  test("bubbleSort with some numbers", async () => {
    const arrAsc = await bubbleSort([2, 3, 1, 4], "ascending");
    const arrDesc = await bubbleSort([2, 3, 1, 4], "descending");
    expect(arrAsc).toEqual([1, 2, 3, 4]);
    expect(arrDesc).toEqual([4, 3, 2, 1]);
  });
});
