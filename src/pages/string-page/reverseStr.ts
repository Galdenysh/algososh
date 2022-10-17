export default async function reverseStr(
  str: string,
  setCurrentIdx?: (value: React.SetStateAction<Number[]>) => void,
  setSortedIdx?: (value: React.SetStateAction<Number[]>) => void,
  setArr?: (value: React.SetStateAction<string[]>) => void,
  setPending?: (value: React.SetStateAction<boolean>) => void,
  delay?: (ms: number) => Promise<unknown>
) {
  const arr = str.split("");
  const sorted: Number[] = [];

  for (let i = 0; i < arr.length / 2; i++) {
    if (setCurrentIdx) setCurrentIdx([i, arr.length - 1 - i]);
    [arr[i], arr[arr.length - 1 - i]] = [arr[arr.length - 1 - i], arr[i]];
    if (delay) await delay(1000);
    sorted.push(i, arr.length - 1 - i);
    if (setSortedIdx) setSortedIdx(sorted);
    if (setArr) setArr([...arr]);
  }

  if (setPending) setPending(false);
  return arr;
}
