const ORDERS = [
  ["+", "-", "*"],
  ["+", "*", "-"],
  ["*", "-", "+"],
  ["*", "+", "-"],
  ["-", "*", "+"],
  ["-", "+", "*"],
];

function solution(expression) {
  var answer = 0;

  const numbers = expression.match(/[0-9]{1,3}/g).map((value) => Number(value));
  const modifiers = expression.match(/[-,+,*]/g);

  ORDERS.forEach((order) => {
    acc(order, [...numbers], [...modifiers]);
  });

  function acc(order, values, commands) {
    order.forEach((command, idx) => {
      for (let i = commands.indexOf(command); i > -1; ) {
        const val1 = values[i];
        const val2 = values[i + 1];

        let value = 0;

        switch (command) {
          case "+":
            value = val1 + val2;
            break;
          case "-":
            value = val1 - val2;
            break;
          case "*":
            value = val1 * val2;
            break;
          default:
            break;
        }
        values[i] = value;
        values.splice(i + 1, 1);
        commands.splice(i, 1);

        i = commands.indexOf(command);
      }

      if (idx === 2) {
        answer = Math.max(Math.abs(values), answer);
      }
    });
  }

  return answer;
}

console.log(solution("100-200*300-500+20") === 60420);
