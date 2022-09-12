import React, { FormEvent, useEffect, useState } from "react";
import { Button } from "../../components/ui/button/button";
import { Column } from "../../components/ui/column/column";
import { RadioInput } from "../../components/ui/radio-input/radio-input";
import { SolutionLayout } from "../../components/ui/solution-layout/solution-layout";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { delay, randomArr } from "../../utils/funcs";
import styles from "./sorting-page.module.css";

export const SortingPage: React.FC = () => {
  const [arr, setArr] = useState<number[]>([]);
  const [sort, setSort] = useState<"selection" | "bubble">("selection");
  const [monotonic, setMonotonic] = useState<"ascending" | "descending">("ascending");
  const [currentIdx, setCurrentIdx] = useState<Number[]>([]);
  const [sortedIdx, setSortedIdx] = useState<Number[]>([]);
  const [pending, setPending] = useState(false);

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    setCurrentIdx([]);
    setSortedIdx([]);
    setPending(true);

    if (sort === "selection") {
      selectionSort(arr, monotonic);
    } else {
      bubbleSort(arr, monotonic);
    }
  };

  const handleGetArr = () => {
    setCurrentIdx([]);
    setSortedIdx([]);
    setArr(randomArr(3, 17, 0, 100));
  };

  async function selectionSort(arr: number[], monotonic: "ascending" | "descending") {
    const sorted: Number[] = [];

    for (let i = 0; i < arr.length; i++) {
      let indexMin = i;
      for (let j = i + 1; j < arr.length; j++) {
        setCurrentIdx([i, j]);
        await delay(500);

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
      setSortedIdx(sorted);

      if (indexMin !== i) {
        [arr[i], arr[indexMin]] = [arr[indexMin], arr[i]];
        setArr(arr);
      }
    }

    setPending(false);
    return arr;
  }

  async function bubbleSort(arr: number[], monotonic: "ascending" | "descending") {
    const sorted: Number[] = [];

    for (let i = 0; i <= arr.length - 1; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        setCurrentIdx([j, j + 1]);
        await delay(500);

        if (monotonic === "ascending") {
          if (arr[j] > arr[j + 1]) {
            [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            setArr(arr);
          }
        } else {
          if (arr[j] < arr[j + 1]) {
            [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            setArr(arr);
          }
        }
      }

      sorted.push(arr.length - i - 1);
      setSortedIdx(sorted);
    }

    setPending(false);
    return arr;
  }

  useEffect(() => {
    handleGetArr();
  }, []);

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.container}>
        <form className={styles.inputWrap} onSubmit={handleSubmit}>
          <RadioInput
            extraClass={styles.radioBtn}
            value={"selection"}
            label="Выбор"
            checked={sort === "selection"}
            disabled={pending}
            onChange={() => setSort("selection")}
          />
          <RadioInput
            extraClass={styles.radioBtn}
            value={"bubble"}
            label="Пузырёк"
            checked={sort === "bubble"}
            disabled={pending}
            onChange={() => setSort("bubble")}
          />
          <Button
            extraClass={styles.btn}
            type="submit"
            text="По возрастанию"
            sorting={Direction.Ascending}
            disabled={pending}
            isLoader={pending && monotonic === "ascending"}
            onClick={() => setMonotonic("ascending")}
          />
          <Button
            extraClass={styles.btn}
            type="submit"
            text="По убыванию"
            sorting={Direction.Descending}
            disabled={pending}
            isLoader={pending && monotonic === "descending"}
            onClick={() => setMonotonic("descending")}
          />
        </form>
        <Button extraClass={styles.btn} type="button" text="Новый массив" onClick={handleGetArr} disabled={pending} />
      </div>
      <div className={styles.columnWrap}>
        {arr.map((item, index) => (
          <Column
            extraClass={styles.column}
            key={index}
            index={item}
            state={
              sortedIdx.includes(index)
                ? ElementStates.Modified
                : currentIdx.includes(index)
                ? ElementStates.Changing
                : ElementStates.Default
            }
          />
        ))}
      </div>
    </SolutionLayout>
  );
};
