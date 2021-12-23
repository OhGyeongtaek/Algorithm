function solution(board) {
  const N = board.length;

  var answer = 0;

  function lookup() {
    for (let i = 0; i < N - 1; i++) {
      for (let j = 0; j < N - 1; j++) {
        if (j < N - 2) {
          const result = lookup1(i, j);
          if (result) {
            answer++;
            change1(i, j);
            return true;
          }
        }
        if (i < N - 2) {
          const result = lookup2(i, j);
          if (result) {
            answer++;
            change2(i, j);
            return true;
          }
        }
      }
    }

    return false;
  }

  while (true) {
    const result = lookup();
    if (result === false) break;
  }

  function lookup1(i, j) {
    const counter = new Array(201).fill(0);

    for (let k = i; k < i + 2; k++) {
      for (let z = j; z < j + 3; z++) {
        if (board[k][z] === 0 && !checkBlock(k, z)) {
          return false;
        }

        counter[board[k][z]]++;
      }
    }
    return counter[0] === 2 && counter.includes(4);
  }

  function change1(i, j) {
    for (let k = i; k < i + 2; k++) {
      for (let z = j; z < j + 3; z++) {
        board[k][z] = 0;
      }
    }
  }

  function lookup2(i, j) {
    const counter = new Array(201).fill(0);

    for (let k = i; k < i + 3; k++) {
      for (let z = j; z < j + 2; z++) {
        if (board[k][z] === 0 && !checkBlock(k, z)) {
          return false;
        }

        counter[board[k][z]]++;
      }
    }

    return counter[0] === 2 && counter.includes(4);
  }

  function change2(i, j) {
    for (let k = i; k < i + 3; k++) {
      for (let z = j; z < j + 2; z++) {
        board[k][z] = 0;
      }
    }
  }

  function checkBlock(row, col) {
    for (let i = row; i >= 0; i--) {
      const value = board[i][col];

      if (value > 0) return false;
    }

    return true;
  }

  return answer;
}

// console.log(
//   solution([
//     [0, 0, 0, 0, 0],
//     [1, 0, 0, 2, 0],
//     [1, 2, 2, 2, 0],
//     [1, 1, 0, 0, 0],
//     [0, 0, 0, 0, 0],
//   ])
// );
console.log(
  solution([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 4, 0, 0, 0],
    [0, 0, 0, 0, 0, 4, 4, 0, 0, 0],
    [0, 0, 0, 0, 3, 0, 4, 0, 0, 0],
    [0, 0, 0, 2, 3, 0, 0, 0, 5, 5],
    [1, 2, 2, 2, 3, 3, 0, 0, 0, 5],
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 5],
  ])
);
