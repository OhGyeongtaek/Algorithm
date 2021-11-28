function solution(numbers) {
  let answer = 0;

  const cards = numbers.split("").map((num) => ({ num }));

  cards.forEach((card) => {
    const num1 = card.num;

    if (num1 === "0") return;

    if (isCount(num1)) {
      countValues.push(num1);
      answer++;
    }

    const cards2 = filterDuplicationNumber(cards, card);

    cards2.forEach((card2) => {
      const num2 = `${num1}${card2.num}`;
      const cards3 = filterDuplicationNumber(cards2, card2);

      if (isCount(num2)) {
        countValues.push(num2);
        answer++;
      }

      cards3.forEach((card3) => {
        const num3 = `${num2}${card3.num}`;

        if (isCount(num3)) {
          countValues.push(num3);
          answer++;
        }
      });
    });
  });

  return answer;
}

const countValues = [];

const filterDuplicationNumber = (objs, checkObj) =>
  objs.filter((obj) => obj !== checkObj);

const isCount = (number) => {
  return isPrime(number) && countValues.indexOf(number) === -1;
};

const isPrime = (number) => {
  if (number < 2) return false;

  for (let i = 2; i <= Math.sqrt(number); i++) {
    if (number % i == 0) return false;
  }

  return true;
};

console.log(solution("011") === 2);
