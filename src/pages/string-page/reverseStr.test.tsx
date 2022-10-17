import reverseStr from "./reverseStr";

describe("string", () => {
  test("string with even characters", async () => {
    const arr = await reverseStr("test");
    expect(arr).toEqual(["t", "s", "e", "t"]);
  });

  test("string with odd characters", async () => {
    const arr = await reverseStr("testing");
    expect(arr).toEqual(["g", "n", "i", "t", "s", "e", "t"]);
  });

  test("string with one character", async () => {
    const arr = await reverseStr("t");
    expect(arr).toEqual(["t"]);
  });

  test("string with non character", async () => {
    const arr = await reverseStr("");
    expect(arr).toEqual([]);
  });
});
