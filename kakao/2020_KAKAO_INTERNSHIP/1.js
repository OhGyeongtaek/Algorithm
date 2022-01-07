const keypad = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  ["*", 0, "#"],
];

const leftKeys = [1, 4, 7, "*"];
const rightKeys = [3, 6, 9, "#"];

// 상 하 좌 우 순서
const DIRECTIONS = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

const INF = 987654321;

function solution(numbers, hand) {
  var answer = "";

  // [row, col]
  const pointer = {
    left: [3, 0],
    right: [3, 2],
  };

  function find([row, col], target) {
    const Q = [[row, col, 0]];
    const visited = [...new Array(4).fill().map(() => [false, false, false])];

    visited[row][col] = true;

    let movePointer = null;
    let moveCount = INF;

    while (Q.length > 0) {
      const [r, c, cnt] = Q.shift();

      visited[r][c] = true;

      if (keypad[r][c] === target) {
        movePointer = [r, c];
        moveCount = Math.min(moveCount, cnt);
      }

      DIRECTIONS.forEach((D) => {
        const nr = r + D[0];
        const nc = c + D[1];

        if (nr > 3 || nc > 2 || nr < 0 || nc < 0) {
          return;
        }

        if (visited[nr][nc]) {
          return;
        }

        Q.push([nr, nc, cnt + 1]);
      });
    }

    return [movePointer, moveCount];
  }

  return numbers
    .map((num) => {
      if (leftKeys.includes(num)) {
        const [point] = find(pointer.left, num);
        pointer.left = point;

        return "L";
      }

      if (rightKeys.includes(num)) {
        const [point] = find(pointer.right, num);
        pointer.right = point;

        return "R";
      }

      const [lPoint, lCnt] = find(pointer.left, num);
      const [rPoint, rCnt] = find(pointer.right, num);

      if (lCnt === rCnt) {
        if (hand === "left") {
          pointer.left = lPoint;
          return "L";
        }

        pointer.right = rPoint;

        return "R";
      }

      if (lCnt < rCnt) {
        pointer.left = lPoint;
        return "L";
      }

      pointer.right = rPoint;
      return "R";
    })
    .join("");
}

const result = solution([7, 0, 8, 2, 8, 3, 1, 5, 7, 6, 2], "left");
console.log(result, result === "LRLLRRLLLRR");
