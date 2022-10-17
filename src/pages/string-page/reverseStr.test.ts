import reverseStr from "./reverseStr";

describe("reverseStr", () => {
  test("reverseStr with even characters", async () => {
    const arr = await reverseStr("test");
    expect(arr).toEqual(["t", "s", "e", "t"]);
  });

  test("reverseStr with odd characters", async () => {
    const arr = await reverseStr("testing");
    expect(arr).toEqual(["g", "n", "i", "t", "s", "e", "t"]);
  });

  test("reverseStr with one character", async () => {
    const arr = await reverseStr("t");
    expect(arr).toEqual(["t"]);
  });

  test("reverseStr with non character", async () => {
    const arr = await reverseStr("");
    expect(arr).toEqual([]);
  });
});
