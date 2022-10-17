import React, { FormEvent, useEffect, useState } from "react";
import { Button } from "../../components/ui/button/button";
import { Column } from "../../components/ui/column/column";
import { RadioInput } from "../../components/ui/radio-input/radio-input";
import { SolutionLayout } from "../../components/ui/solution-layout/solution-layout";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { delay, randomArr } from "../../utils/funcs";
import bubbleSort from "./bubbleSort";
import selectionSort from "./selectionSort";
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
      selectionSort(arr, monotonic, setCurrentIdx, setSortedIdx, setArr, setPending, delay);
    } else {
      bubbleSort(arr, monotonic, setCurrentIdx, setSortedIdx, setArr, setPending, delay);
    }
  };

  const handleGetArr = () => {
    setCurrentIdx([]);
    setSortedIdx([]);
    setArr(randomArr(3, 17, 0, 100));
  };

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
