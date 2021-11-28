const solution = (N, number) => {
  let answer = -1;
  const numbers = [];

  (function calc(i) {
    if (i === 8 || answer > -1) {
      return;
    }

    numbers[i] = [];
    numbers[i].push(Number(String(N).repeat(i + 1)));

    for (let j = 0; j < i; j++) {
      numbers[j].forEach((num1) => {
        numbers[i].push(num1 + N);
        numbers[i].push(num1 * N);

        if (num1 - N > 0) {
          numbers[i].push(num1 - N);
        }

        if (num1 > 0) {
          numbers[i].push(Math.floor(num1 / N));
        }
      });
    }

    if (numbers[i].includes(number)) {
      answer = i + 1;
    }

    calc(i + 1);
  })(0);

  return answer;
};

console.log(solution(8, 5800));
