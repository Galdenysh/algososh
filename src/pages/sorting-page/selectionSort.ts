export default async function selectionSort(
  arr: number[],
  monotonic: "ascending" | "descending",
  setCurrentIdx?: (value: React.SetStateAction<Number[]>) => void,
  setSortedIdx?: (value: React.SetStateAction<Number[]>) => void,
  setArr?: (value: React.SetStateAction<number[]>) => void,
  setPending?: (value: React.SetStateAction<boolean>) => void,
  delay?: (ms: number) => Promise<unknown>
) {
  const sorted: Number[] = [];

  for (let i = 0; i < arr.length; i++) {
    let indexMin = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (setCurrentIdx) setCurrentIdx([i, j]);
      if (delay) await delay(500);

      if (monotonic === "ascending") {
        if (arr[indexMin] > arr[j]) {
          indexMin = j;
        }
      } else {
        if (arr[indexMin] < arr[j]) {
          indexMin = j;
        }
      }
    }

    sorted.push(i);
    if (setSortedIdx) setSortedIdx(sorted);

    if (indexMin !== i) {
      [arr[i], arr[indexMin]] = [arr[indexMin], arr[i]];
      if (setArr) setArr([...arr]);
    }
  }

  if (setPending) setPending(false);
  return arr;
}
