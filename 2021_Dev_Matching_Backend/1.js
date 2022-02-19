const R = 0;
const C = 1;
function solution(rows, columns, queries) {
  var answer = [];
  const board = new Array(rows)
    .fill()
    .map((_, idx) =>
      new Array(columns).fill().map((__, idx2) => idx * columns + (idx2 + 1))
    );

  function lookup([r1, c1, r2, c2]) {
    let pointer = [r1 - 1, c1 - 1];
    const changeValues = [];

    while (pointer[C] < c2 - 1) {
      const [r, c] = pointer;

      const value = board[r][c];

      board[r][c] = changeValues[changeValues.length - 1];

      pointer[C] = c + 1;

      changeValues.push(value);
    }

    while (pointer[R] < r2 - 1) {
      const [r, c] = pointer;

      const value = board[r][c];

      board[r][c] = changeValues[changeValues.length - 1];

      pointer[R] = r + 1;

      changeValues.push(value);
    }

    while (pointer[C] > c1 - 1) {
      const [r, c] = pointer;

      const value = board[r][c];

      board[r][c] = changeValues[changeValues.length - 1];

      pointer[C] = c - 1;

      changeValues.push(value);
    }

    while (pointer[R] >= r1 - 1) {
      const [r, c] = pointer;

      const value = board[r][c];

      board[r][c] = changeValues[changeValues.length - 1];

      pointer[R] = r - 1;

      changeValues.push(value);
    }

    changeValues.sort((a, b) => a - b);

    answer.push(changeValues[0]);
  }

  queries.forEach(lookup);

  return answer;
}
console.log(
  solution(6, 6, [
    [2, 2, 5, 4],
    [3, 3, 6, 6],
    [5, 1, 6, 3],
  ])
);
