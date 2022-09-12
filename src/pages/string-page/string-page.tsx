import React, { ChangeEvent, FormEvent, useState } from "react";
import { Button } from "../../components/ui/button/button";
import { Circle } from "../../components/ui/circle/circle";
import { Input } from "../../components/ui/input/input";
import { SolutionLayout } from "../../components/ui/solution-layout/solution-layout";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../utils/funcs";
import styles from "./string-page.module.css";

export const StringComponent: React.FC = () => {
  const [value, setValue] = useState("");
  const [arr, setArr] = useState<string[]>([]);
  const [currentIdx, setCurrentIdx] = useState<Number[]>([]);
  const [sortedIdx, setSortedIdx] = useState<Number[]>([]);
  const [pending, setPending] = useState(false);

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    setCurrentIdx([]);
    setSortedIdx([]);
    setArr(value.split(""));
    setPending(true);
    reverseStr(value);
  };

  const onChangeInput = (evt: ChangeEvent<HTMLInputElement>) => {
    setValue(evt.target.value);
  };

  async function reverseStr(str: string) {
    const arr = str.split("");
    const sorted: Number[] = [];

    for (let i = 0; i < arr.length / 2; i++) {
      setCurrentIdx([i, arr.length - 1 - i]);
      [arr[i], arr[arr.length - 1 - i]] = [arr[arr.length - 1 - i], arr[i]];
      await delay(1000);
      sorted.push(i, arr.length - 1 - i);
      setSortedIdx(sorted);
      setArr(arr);
    }

    setPending(false);
    return arr;
  }

  return (
    <SolutionLayout title="Строка">
      <form className={styles.inputWrap} onSubmit={handleSubmit}>
        <Input extraClass={styles.input} isLimitText={true} maxLength={11} value={value} onChange={onChangeInput} disabled={pending} />
        <Button extraClass={styles.btn} type="submit" text="Развернуть" disabled={pending} isLoader={pending} />
      </form>
      <div className={styles.circleWrap}>
        {arr.map((item, index) => (
          <Circle
            extraClass={styles.circle}
            key={index}
            letter={item}
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
