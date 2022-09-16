import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Button } from "../../components/ui/button/button";
import { Circle } from "../../components/ui/circle/circle";
import { ArrowIcon } from "../../components/ui/icons/arrow-icon";
import { Input } from "../../components/ui/input/input";
import { SolutionLayout } from "../../components/ui/solution-layout/solution-layout";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../utils/funcs";
import linkedList from "../../utils/linked-list";
import styles from "./list-page.module.css";

export const ListPage: React.FC = () => {
  const [value, setValue] = useState("");
  const [indexValue, setIndexValue] = useState<number | "">("");
  const [arr, setArr] = useState<unknown[]>([]);
  const [pendingAll, setPendingAll] = useState(false);
  const [pendingAddInHead, setPendingAddInHead] = useState(false);
  const [pendingAddInTail, setPendingAddInTail] = useState(false);
  const [pendingDelInHead, setPendingDelInHead] = useState(false);
  const [pendingDelInTail, setPendingDelInTail] = useState(false);
  const [pendingAddByIndex, setPendingAddByIndex] = useState(false);
  const [pendingDelByIndex, setPendingDelByIndex] = useState(false);
  const [modified, setModified] = useState(false);
  const [newIndex, setNewIndex] = useState<number | null>(null);
  const [currentIdx, setCurrentIdx] = useState<number[]>([]);

  const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const submitEvent = evt.nativeEvent as SubmitEvent;

    if (submitEvent.submitter?.getAttribute("value") === "addInHead") {
      setPendingAll(true);
      setPendingAddInHead(true);
      await linkedList.prepend(value);
      setArr([...linkedList.toArray()]);
      setValue("");
      setPendingAll(false);
      setPendingAddInHead(false);

      // Подсветка зеленым
      setNewIndex(0);
      setModified(true);
      await delay(500);
      setModified(false);
      setNewIndex(null);
    }
    if (submitEvent.submitter?.getAttribute("value") === "addInTail") {
      setPendingAll(true);
      setPendingAddInTail(true);
      await linkedList.append(value);
      setArr([...linkedList.toArray()]);
      setValue("");
      setPendingAll(false);
      setPendingAddInTail(false);

      // Подсветка зеленым
      setNewIndex(arr.length);
      setModified(true);
      await delay(500);
      setModified(false);
      setNewIndex(null);
    }
    if (submitEvent.submitter?.getAttribute("value") === "removeHead") {
      setPendingAll(true);
      setPendingDelInHead(true);
      await linkedList.deleteHead();
      setArr([...linkedList.toArray()]);
      setPendingAll(false);
      setPendingDelInHead(false);
    }
    if (submitEvent.submitter?.getAttribute("value") === "removeTail") {
      setPendingAll(true);
      setPendingDelInTail(true);
      await linkedList.deleteTail();
      setArr([...linkedList.toArray()]);
      setPendingAll(false);
      setPendingDelInTail(false);
    }
    if (submitEvent.submitter?.getAttribute("value") === "addByIndex") {
      setPendingAll(true);
      setPendingAddByIndex(true);

      for (let i = 0; i <= indexValue; i++) {
        setNewIndex(i);
        setCurrentIdx([...currentIdx, i]);
        await delay(500);
      }

      if (indexValue !== "") linkedList.addByIndex(indexValue, value);
      setArr([...linkedList.toArray()]);
      setPendingAll(false);
      setPendingAddByIndex(false);

      // Подсветка зеленым
      setModified(true);
      await delay(500);
      setModified(false);
      setNewIndex(null);

      setValue("");
      setIndexValue("");
      setCurrentIdx([]);
    }
    if (submitEvent.submitter?.getAttribute("value") === "removeByIndex") {
      setPendingAll(true);
      setPendingDelByIndex(true);

      for (let i = 0; i <= indexValue; i++) {
        setCurrentIdx([...currentIdx, i]);
        await delay(500);
        if (i === indexValue) setNewIndex(i);
      }

      await delay(500);
      if (indexValue !== "") linkedList.deleteByIndex(indexValue);
      setArr([...linkedList.toArray()]);
      setPendingAll(false);
      setPendingDelByIndex(false);

      setNewIndex(null);
      setCurrentIdx([]);
    }
  };

  const onChangeInputValue = (evt: ChangeEvent<HTMLInputElement>) => {
    setValue(evt.target.value);
  };

  const onChangeInputIndexValue = (evt: ChangeEvent<HTMLInputElement>) => {
    setIndexValue(Number(evt.target.value));
  };

  useEffect(() => {
    setArr([...linkedList.toArray()]);
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
            disabled={pendingAll}
          />
          <Button
            extraClass={styles.btnSmall}
            type="submit"
            value="addInHead"
            text="Добавить в head"
            disabled={value === "" || pendingAll}
            isLoader={pendingAddInHead}
          />
          <Button
            extraClass={styles.btnSmall}
            type="submit"
            value="addInTail"
            text="Добавить в tail"
            disabled={value === "" || pendingAll}
            isLoader={pendingAddInTail}
          />
          <Button
            extraClass={styles.btnSmall}
            type="submit"
            value="removeHead"
            text="Удалить из head"
            disabled={arr.length === 0 || pendingAll}
            isLoader={pendingDelInHead}
          />
          <Button
            extraClass={styles.btnSmall}
            type="submit"
            value="removeTail"
            text="Удалить из tail"
            disabled={arr.length === 0 || pendingAll}
            isLoader={pendingDelInTail}
          />
        </div>
        <div className={styles.inputWrap}>
          <Input
            extraClass={styles.input}
            placeholder="Введите индекс"
            type="number"
            value={indexValue}
            onChange={onChangeInputIndexValue}
            disabled={pendingAll}
          ></Input>
          <Button
            extraClass={styles.btnBig}
            type="submit"
            value="addByIndex"
            text="Добавить по индексу"
            disabled={value === "" || indexValue === "" || pendingAll}
            isLoader={pendingAddByIndex}
          />
          <Button
            extraClass={styles.btnBig}
            type="submit"
            value="removeByIndex"
            text="Удалить по индексу"
            disabled={arr.length === 0 || pendingAll}
            isLoader={pendingDelByIndex}
          />
        </div>
      </form>
      <div className={styles.circleWrap}>
        {arr.map((item, index) => (
          <div className={styles.circleItem} key={index}>
            <Circle
              extraClass={styles.circle}
              letter={
                (pendingDelInHead && index === 0) ||
                (pendingDelInTail && index === arr.length - 1) ||
                (pendingDelByIndex && index === newIndex)
                  ? ""
                  : String(item)
              }
              head={
                (pendingAddInHead && index === 0) ||
                (pendingAddInTail && index === arr.length - 1) ||
                (pendingAddByIndex && index === newIndex) ? (
                  <Circle letter={value} isSmall={true} state={ElementStates.Changing} />
                ) : index === 0 ? (
                  "head"
                ) : (
                  ""
                )
              }
              index={index}
              tail={
                (pendingDelInHead && index === 0) ||
                (pendingDelInTail && index === arr.length - 1) ||
                (pendingDelByIndex && index === newIndex) ? (
                  <Circle
                    letter={
                      pendingDelInHead
                        ? String(arr[0])
                        : pendingDelInTail
                        ? String(arr[arr.length - 1])
                        : pendingDelByIndex
                        ? String(arr[indexValue as number])
                        : ""
                    }
                    isSmall={true}
                    state={ElementStates.Changing}
                  />
                ) : index === arr.length - 1 ? (
                  "tail"
                ) : (
                  ""
                )
              }
              state={
                modified && index === newIndex
                  ? ElementStates.Modified
                  : (currentIdx.includes(index + 1) && pendingAddByIndex) || (currentIdx.includes(index) && pendingDelByIndex)
                  ? ElementStates.Changing
                  : ElementStates.Default
              }
            />
            {index < arr.length - 1 && <ArrowIcon />}
          </div>
        ))}
      </div>
    </SolutionLayout>
  );
};
