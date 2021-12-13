const DIRECTIONS = [
  [-1, 0], // 상
  [1, 0], // 하
  [0, -1], //좌
  [0, 1], //우
];

function solution(key, lock) {
  const keyRotates = [key];

  const N = lock.length;

  for (let k = 0; k < 4; k++) {
    const key = keyRotates.pop();
    const start = N * -1 + 1;
    const Q = [{ r: start, c: start }];
    const visited = {};

    while (Q.length > 0) {
      const { r, c } = Q.shift();

      if (visited[r] && visited[r][c]) continue;

      if (isMatch(key, { r, c })) {
        return true;
      }

      if (!visited[r]) {
        visited[r] = {};
      }

      visited[r][c] = true;

      DIRECTIONS.forEach((D) => {
        const nr = r + D[0];
        const nc = c + D[1];

        if (nr + N <= 0 || nc + N <= 0 || nr >= N || nc >= N) {
          return;
        }

        Q.push({ r: nr, c: nc });
      });
    }

    keyRotates.push(rotate(key));
  }

  function isMatch(key, { r, c }) {
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        const value = key[i + r] && key[i + r][j + c] ? key[i + r][j + c] : 0;

        if (lock[i][j] + value != 1) {
          return false;
        }
      }
    }

    return true;
  }

  return false;
}

// 시계방향으로 회전
function rotate(arr) {
  const len = arr.length;
  const newArray = [...new Array(len).fill().map(() => [])];

  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len; j++) {
      newArray[i][j] = arr[len - j - 1][i];
    }
  }

  return newArray;
}

console.log(
  solution(
    [
      [0, 0, 0],
      [1, 0, 0],
      [0, 1, 1],
    ],
    [
      [1, 1, 1],
      [1, 1, 0],
      [1, 0, 1],
    ]
  )
);
