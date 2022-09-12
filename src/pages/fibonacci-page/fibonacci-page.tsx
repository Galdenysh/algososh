import React, { ChangeEvent, FormEvent, useState } from "react";
import { Button } from "../../components/ui/button/button";
import { Circle } from "../../components/ui/circle/circle";
import { Input } from "../../components/ui/input/input";
import { SolutionLayout } from "../../components/ui/solution-layout/solution-layout";
import { delay } from "../../utils/funcs";
import styles from "./fibonacci-page.module.css";

export const FibonacciPage: React.FC = () => {
  const [value, setValue] = useState<number>(0);
  const [arrFib, setArrFib] = useState<number[]>([]);
  const [, setStep] = useState(0);
  const [pending, setPending] = useState(false);

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    setArrFib([]);
    setPending(true);
    fibonacci(value);
  };

  const onChangeInput = (evt: ChangeEvent<HTMLInputElement>) => {
    setValue(Number(evt.target.value));
  };

  async function fibonacci(num: number) {
    if (num < 0 && num > 19) {
      setPending(false);
      return;
    }

    const arr = [0, 1];

    switch (num) {
      case 0:
        setArrFib([0]);
        setPending(false);
        return [0];
      case 1:
        setArrFib([0]);
        await delay(500);
        setArrFib([0, 1]);
        setPending(false);
        return [0, 1];
      default:
        setArrFib([0]);
        await delay(500);
        setArrFib(arr);
        for (let i = 2; i <= num; i++) {
          await delay(500);
          arr.push(arr[i - 1] + arr[i - 2]);
          setArrFib(arr);
          setStep(i); // стейт, чтобы вызвать рендер
        }
        setPending(false);
        return arr;
    }
  }

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={styles.inputWrap} onSubmit={handleSubmit}>
        <Input
          extraClass={styles.input}
          type="number"
          isLimitText={true}
          max={19}
          value={String(value)}
          onChange={onChangeInput}
          disabled={pending}
        />
        <Button extraClass={styles.btn} type="submit" text="Рассчитать" disabled={pending || value < 0 || value > 19} isLoader={pending} />
      </form>
      <div className={styles.circleWrap}>
        {arrFib.map((item, index) => (
          <Circle extraClass={styles.circle} key={index} letter={String(item)} tail={String(index)} />
        ))}
      </div>
    </SolutionLayout>
  );
};
