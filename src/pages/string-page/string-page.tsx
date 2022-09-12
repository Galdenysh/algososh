import React, { ChangeEvent, FormEvent, useState } from "react";
import { Button } from "../../components/ui/button/button";
import { Circle } from "../../components/ui/circle/circle";
import { Input } from "../../components/ui/input/input";
import { SolutionLayout } from "../../components/ui/solution-layout/solution-layout";
import styles from "./string-page.module.css";

export const StringComponent: React.FC = () => {
  const [value, setValue] = useState("");
  const [arr, setArr] = useState<string[]>([]);

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    setArr(value.split(""));
  };

  const onChangeInput = (evt: ChangeEvent<HTMLInputElement>) => {
    setValue(evt.target.value);
  };

  return (
    <SolutionLayout title="Строка">
      <form className={styles.inputWrap} onSubmit={handleSubmit}>
        <Input extraClass={styles.input} isLimitText={true} maxLength={11} value={value} onChange={onChangeInput} />
        <Button type="submit" text="Развернуть" />
      </form>
      <div className={styles.circleWrap}>
        {arr.map((item, index) => (
          <Circle extraClass={styles.circle} key={index} letter={item} />
        ))}
      </div>
    </SolutionLayout>
  );
};
