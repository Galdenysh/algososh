import React from "react";
import { Button } from "../../components/ui/button/button";
import { Input } from "../../components/ui/input/input";
import { SolutionLayout } from "../../components/ui/solution-layout/solution-layout";
import styles from "./list-page.module.css";

export const ListPage: React.FC = () => {
  const handleSubmit = () => {};

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
    </SolutionLayout>
  );
};
