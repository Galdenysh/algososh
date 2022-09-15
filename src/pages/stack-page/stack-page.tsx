import React, { ChangeEvent, FormEvent, useState } from "react";
import { Button } from "../../components/ui/button/button";
import { Circle } from "../../components/ui/circle/circle";
import { Input } from "../../components/ui/input/input";
import { SolutionLayout } from "../../components/ui/solution-layout/solution-layout";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../utils/funcs";
import stack from "../../utils/stack";
import styles from "./stack-page.module.css";

export const StackPage: React.FC = () => {
  const [value, setValue] = useState("");
  const [arr, setArr] = useState<unknown[]>([]);
  const [pending, setPending] = useState(false);

  const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const submitEvent = evt.nativeEvent as SubmitEvent;

    setPending(true);

    if (submitEvent.submitter?.getAttribute("value") === "add") {
      stack.push(value);
      setArr([...stack.elements()]);
      setValue("");
    }
    if (submitEvent.submitter?.getAttribute("value") === "remove") {
      stack.pop();
      setArr([...stack.elements()]);
    }

    await delay(500);
    setPending(false);
  };

  const onChangeInput = (evt: ChangeEvent<HTMLInputElement>) => {
    setValue(evt.target.value);
  };

  const handleRemoveBtn = () => {
    stack.clear();
    setArr([...stack.elements()]);
  };

  return (
    <SolutionLayout title="Стек">
      <div className={styles.container}>
        <form className={styles.inputWrap} onSubmit={handleSubmit}>
          <Input extraClass={styles.input} isLimitText={true} maxLength={4} value={value} onChange={onChangeInput} />
          <Button extraClass={styles.btn} type="submit" value="add" text="Добавить" disabled={value === ""} />
          <Button extraClass={styles.btn} type="submit" value="remove" text="Удалить" disabled={stack.size() === 0} />
        </form>
        <Button extraClass={styles.btn} type="button" text="Отчистить" onClick={handleRemoveBtn} disabled={stack.size() === 0} />
      </div>
      <div className={styles.circleWrap}>
        {arr.map((item, index) => (
          <Circle
            extraClass={styles.circle}
            key={index}
            letter={String(item)}
            head={index === stack.size() - 1 ? "top" : ""}
            index={index}
            state={index === stack.size() - 1 && pending ? ElementStates.Changing : ElementStates.Default}
          />
        ))}
      </div>
    </SolutionLayout>
  );
};
