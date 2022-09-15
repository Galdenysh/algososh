import React, { useEffect, useState } from "react";
import { Button } from "../../components/ui/button/button";
import { Circle } from "../../components/ui/circle/circle";
import { ArrowIcon } from "../../components/ui/icons/arrow-icon";
import { Input } from "../../components/ui/input/input";
import { SolutionLayout } from "../../components/ui/solution-layout/solution-layout";
import { ElementStates } from "../../types/element-states";
import linkedList from "../../utils/linked-list";
import styles from "./list-page.module.css";

export const ListPage: React.FC = () => {
  const [arr, setArr] = useState<unknown[]>([]);

  const handleSubmit = () => {};

  useEffect(() => {
    setArr(linkedList.elements());
  }, []);

  return (
    <SolutionLayout title="Связный список">
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputWrap}>
          <Input extraClass={styles.input} placeholder="Введите значение" isLimitText={true} maxLength={4}></Input>
          <Button extraClass={styles.btnSmall} text="Добавить в head" />
          <Button extraClass={styles.btnSmall} text="Добавить в tail" />
          <Button extraClass={styles.btnSmall} text="Удалить из head" />
          <Button extraClass={styles.btnSmall} text="Удалить из tail" />
        </div>
        <div className={styles.inputWrap}>
          <Input extraClass={styles.input} placeholder="Введите индекс" type="number"></Input>
          <Button extraClass={styles.btnBig} text="Добавить по индексу" />
          <Button extraClass={styles.btnBig} text="Удалить по индексу" />
        </div>
      </form>
      <div className={styles.circleWrap}>
        {arr.map((item, index) => (
          <div className={styles.circleItem}>
            <Circle
              extraClass={styles.circle}
              key={index}
              letter={String(item)}
              head={"head"}
              index={index}
              tail={"tail"}
              state={ElementStates.Default}
            />
            {index < arr.length - 1 && <ArrowIcon />}
          </div>
        ))}
      </div>
    </SolutionLayout>
  );
};
