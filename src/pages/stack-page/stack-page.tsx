import React, { ChangeEvent, FormEvent, useState } from "react";
import { Button } from "../../components/ui/button/button";
import { Circle } from "../../components/ui/circle/circle";
import { Input } from "../../components/ui/input/input";
import { SolutionLayout } from "../../components/ui/solution-layout/solution-layout";
import { ElementStates } from "../../types/element-states";
import styles from "./stack-page.module.css";

export const StackPage: React.FC = () => {
  const [value, setValue] = useState("");
  const [arr, setArr] = useState<string[]>(["123"]);
  const [currentIdx, setCurrentIdx] = useState<Number[]>([]);
  const [sortedIdx, setSortedIdx] = useState<Number[]>([]);
  const [pending, setPending] = useState(false);

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const submitEvent = evt.nativeEvent as SubmitEvent;

    console.log(submitEvent.submitter?.getAttribute("value"));
  };

  const onChangeInput = (evt: ChangeEvent<HTMLInputElement>) => {
    setValue(evt.target.value);
  };

  return (
    <SolutionLayout title="Стек">
      <div className={styles.container}>
        <form className={styles.inputWrap} onSubmit={handleSubmit}>
          <Input extraClass={styles.input} isLimitText={true} maxLength={4} value={value} onChange={onChangeInput} disabled={pending} />
          <Button extraClass={styles.btn} type="submit" value="add" text="Добавить" disabled={pending} isLoader={pending} />
          <Button extraClass={styles.btn} type="submit" value="remove" text="Удалить" disabled={pending} isLoader={pending} />
        </form>
        <Button extraClass={styles.btn} type="button" text="Отчистить" disabled={pending} />
      </div>
      <div className={styles.circleWrap}>
        {arr.map((item, index) => (
          <Circle
            extraClass={styles.circle}
            key={index}
            letter={item}
            head={"head"}
            tail={"tail"}
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
