export function delay(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function getRandomIntInclusive(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomArr(minLength: number, maxLength: number, minValue: number, maxValue: number) {
  const arr = [];
  const length = getRandomIntInclusive(minLength, maxLength);
  for (let i = 0; i < length; i++) {
    arr.push(getRandomIntInclusive(minValue, maxValue));
  }

  return arr;
}
