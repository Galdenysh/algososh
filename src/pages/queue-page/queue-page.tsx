import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { SolutionLayout } from "../../components/ui/solution-layout/solution-layout";
import { Button } from "../../components/ui/button/button";
import { Circle } from "../../components/ui/circle/circle";
import { Input } from "../../components/ui/input/input";
import { ElementStates } from "../../types/element-states";
import { getNextTail } from "../../utils/funcs";
import styles from "./queue-page.module.css";
import queue from "../../utils/queue";

export const QueuePage: React.FC = () => {
  const [value, setValue] = useState("");
  const [arr, setArr] = useState<unknown[]>([]);
  const [enqueuePending, setEnqueuePending] = useState(false);
  const [dequeuePending, setDequeuePending] = useState(false);
  const nextTail = getNextTail(queue.tail());

  const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const submitEvent = evt.nativeEvent as SubmitEvent;

    if (submitEvent.submitter?.getAttribute("value") === "add") {
      try {
        setEnqueuePending(true);
        await queue.enqueue(value);
        setArr([...queue.elements()]);
        setValue("");
        setEnqueuePending(false);
      } catch (err) {
        setEnqueuePending(false);
        console.error(err);
      }
    }
    if (submitEvent.submitter?.getAttribute("value") === "remove") {
      try {
        setDequeuePending(true);
        await queue.dequeue();
        setArr([...queue.elements()]);
        setDequeuePending(false);
      } catch (err) {
        setDequeuePending(false);
        console.error(err);
      }
    }
  };

  const onChangeInput = (evt: ChangeEvent<HTMLInputElement>) => {
    setValue(evt.target.value);
  };

  const handleRemoveBtn = () => {
    queue.clear();
    setArr([...queue.elements()]);
  };

  useEffect(() => {
    setArr(queue.elements());
  }, []);

  return (
    <SolutionLayout title="Очередь">
      <div className={styles.container}>
        <form className={styles.inputWrap} onSubmit={handleSubmit}>
          <Input
            extraClass={styles.input}
            placeholder="Введите значение"
            isLimitText={true}
            maxLength={4}
            value={value}
            onChange={onChangeInput}
          />
          <Button extraClass={styles.btn} type="submit" value="add" text="Добавить" disabled={value === "" || enqueuePending} />
          <Button
            extraClass={styles.btn}
            type="submit"
            value="remove"
            text="Удалить"
            disabled={enqueuePending || dequeuePending || queue.head() === null || queue.tail() === null}
          />
        </form>
        <Button
          extraClass={styles.btn}
          type="button"
          text="Отчистить"
          onClick={handleRemoveBtn}
          disabled={enqueuePending || dequeuePending || (queue.head() === null && queue.tail() === null)}
        />
      </div>
      <div className={styles.circleWrap}>
        {arr.map((item, index) => (
          <Circle
            extraClass={styles.circle}
            key={index}
            letter={String(item)}
            head={index === queue.head() ? "head" : ""}
            index={index}
            tail={index === queue.tail() ? "tail" : ""}
            state={
              (index === nextTail && enqueuePending) || (index === queue.head() && dequeuePending)
                ? ElementStates.Changing
                : ElementStates.Default
            }
          />
        ))}
      </div>
    </SolutionLayout>
  );
};
