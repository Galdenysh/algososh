import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Button } from "../../components/ui/button/button";
import { Circle } from "../../components/ui/circle/circle";
import { ArrowIcon } from "../../components/ui/icons/arrow-icon";
import { Input } from "../../components/ui/input/input";
import { SolutionLayout } from "../../components/ui/solution-layout/solution-layout";
import { ElementStates } from "../../types/element-states";
import linkedList from "../../utils/linked-list";
import styles from "./list-page.module.css";

export const ListPage: React.FC = () => {
  const [value, setValue] = useState("");
  const [indexValue, setIndexValue] = useState<number | "">("");
  const [arr, setArr] = useState<unknown[]>([]);

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const submitEvent = evt.nativeEvent as SubmitEvent;

    if (submitEvent.submitter?.getAttribute("value") === "addInHead") {
      linkedList.prepend(value);
      setArr([...linkedList.elements()]);
      setValue("");
    }
    if (submitEvent.submitter?.getAttribute("value") === "addInTail") {
      linkedList.append(value);
      setArr([...linkedList.elements()]);
      setValue("");
    }
    if (submitEvent.submitter?.getAttribute("value") === "removeHead") {
      linkedList.deleteHead();
      setArr([...linkedList.elements()]);
    }
    if (submitEvent.submitter?.getAttribute("value") === "removeTail") {
      linkedList.deleteTail();
      setArr([...linkedList.elements()]);
    }
    if (submitEvent.submitter?.getAttribute("value") === "addByIndex") {
      if (indexValue !== "") linkedList.addByIndex(indexValue, value);
      setArr([...linkedList.elements()]);
      setValue("");
      setIndexValue("");
    }
    if (submitEvent.submitter?.getAttribute("value") === "removeByIndex") {
      if (indexValue !== "") linkedList.deleteByIndex(indexValue);
      setArr([...linkedList.elements()]);
    }
  };

  const onChangeInputValue = (evt: ChangeEvent<HTMLInputElement>) => {
    setValue(evt.target.value);
  };

  const onChangeInputIndexValue = (evt: ChangeEvent<HTMLInputElement>) => {
    setIndexValue(Number(evt.target.value));
  };

  useEffect(() => {
    linkedList.clear();
    linkedList.append("0");
    linkedList.append("34");
    linkedList.append("8");
    linkedList.append("1");
    setArr([...linkedList.elements()]);
  }, []);

  return (
    <SolutionLayout title="Связный список">
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputWrap}>
          <Input
            extraClass={styles.input}
            placeholder="Введите значение"
            isLimitText={true}
            maxLength={4}
            value={value}
            onChange={onChangeInputValue}
          />
          <Button extraClass={styles.btnSmall} type="submit" value="addInHead" text="Добавить в head" disabled={value === ""} />
          <Button extraClass={styles.btnSmall} type="submit" value="addInTail" text="Добавить в tail" disabled={value === ""} />
          <Button extraClass={styles.btnSmall} type="submit" value="removeHead" text="Удалить из head" disabled={arr.length === 0} />
          <Button extraClass={styles.btnSmall} type="submit" value="removeTail" text="Удалить из tail" disabled={arr.length === 0} />
        </div>
        <div className={styles.inputWrap}>
          <Input
            extraClass={styles.input}
            placeholder="Введите индекс"
            type="number"
            value={indexValue}
            onChange={onChangeInputIndexValue}
          ></Input>
          <Button
            extraClass={styles.btnBig}
            type="submit"
            value="addByIndex"
            text="Добавить по индексу"
            disabled={value === "" || indexValue === ""}
          />
          <Button extraClass={styles.btnBig} type="submit" value="removeByIndex" text="Удалить по индексу" disabled={arr.length === 0} />
        </div>
      </form>
      <div className={styles.circleWrap}>
        {arr.map((item, index) => (
          <div className={styles.circleItem} key={index}>
            <Circle
              extraClass={styles.circle}
              letter={String(item)}
              head={index === 0 ? "head" : ""}
              index={index}
              tail={index === arr.length - 1 ? "tail" : ""}
              state={ElementStates.Default}
            />
            {index < arr.length - 1 && <ArrowIcon />}
          </div>
        ))}
      </div>
    </SolutionLayout>
  );
};
