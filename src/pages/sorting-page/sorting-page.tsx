import React, { FormEvent, useState } from "react";
import { Button } from "../../components/ui/button/button";
import { Column } from "../../components/ui/column/column";
import { RadioInput } from "../../components/ui/radio-input/radio-input";
import { SolutionLayout } from "../../components/ui/solution-layout/solution-layout";
import { Direction } from "../../types/direction";
import { randomArr } from "../../utils/funcs";
import styles from "./sorting-page.module.css";

export const SortingPage: React.FC = () => {
  const [arr, setArr] = useState<number[]>([]);
  const [selectSort, setSelectSort] = useState(true);
  const [pending, setPending] = useState(false);

  const handleSelect = () => {
    setSelectSort(!selectSort);
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
  };

  const handleGetArr = () => {
    setArr(randomArr(3, 17, 0, 100));
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.container}>
        <form className={styles.inputWrap} onSubmit={handleSubmit}>
          <RadioInput extraClass={styles.radioBtn} label="Выбор" checked={selectSort} onChange={handleSelect} />
          <RadioInput extraClass={styles.radioBtn} label="Пузырёк" checked={!selectSort} onChange={handleSelect} />
          <Button
            extraClass={styles.btn}
            type="submit"
            text="По возрастанию"
            sorting={Direction.Ascending}
            disabled={pending}
            isLoader={pending}
          />
          <Button
            extraClass={styles.btn}
            type="submit"
            text="По убыванию"
            sorting={Direction.Descending}
            disabled={pending}
            isLoader={pending}
          />
        </form>
        <Button extraClass={styles.btn} type="button" text="Новый массив" onClick={handleGetArr} disabled={pending} isLoader={pending} />
      </div>
      <div className={styles.columnWrap}>
        {arr.map((item, index) => (
          <Column extraClass={styles.column} key={index} index={item} />
        ))}
      </div>
    </SolutionLayout>
  );
};
