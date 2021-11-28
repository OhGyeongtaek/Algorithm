const stringNumber = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

function solution(s) {
  let answer = s;

  stringNumber.forEach((str, idx) => {
    while (answer.indexOf(str) > -1) {
      answer = answer.replace(str, idx);
    }
  });

  return isNaN(parseInt(answer)) ? 0 : parseInt(answer);
}
