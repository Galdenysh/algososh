export default async function bubbleSort(
  arr: number[],
  monotonic: "ascending" | "descending",
  setCurrentIdx?: (value: React.SetStateAction<Number[]>) => void,
  setSortedIdx?: (value: React.SetStateAction<Number[]>) => void,
  setArr?: (value: React.SetStateAction<number[]>) => void,
  setPending?: (value: React.SetStateAction<boolean>) => void,
  delay?: (ms: number) => Promise<unknown>
) {
  const sorted: Number[] = [];

  for (let i = 0; i <= arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (setCurrentIdx) setCurrentIdx([j, j + 1]);
      if (delay) await delay(500);

      if (monotonic === "ascending") {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          if (setArr) setArr([...arr]);
        }
      } else {
        if (arr[j] < arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          if (setArr) setArr([...arr]);
        }
      }
    }

    sorted.push(arr.length - i - 1);
    if (setSortedIdx) setSortedIdx(sorted);
  }

  if (setPending) setPending(false);
  return arr;
}
