const DIRECTIONS = {
  top: [-1, 0], // 위
  bottom: [1, 0], // 아래
  right: [0, 1], // 오른쪽
  left: [0, -1], // 왼쪽
};

const LEFT = "left";
const RIGHT = "right";
const BOTTOM = "bottom";

const INF = 987654321;

function solution(board) {
  let answer = INF;

  const finish = board.length - 1;
  (function lookup() {
    // [ROW, COL, ACC, DIRECTION, visited]
    const len = board.length;
    const Q = [
      [
        0,
        0,
        0,
        null,
        [...new Array(len).fill().map(() => new Array(len).fill())],
      ],
    ];

    while (Q.length) {
      const [row, col, acc, beforeKey, visited] = Q.shift();

      visited[row][col] = true;

      if (row === finish && col === finish) {
        answer = Math.min(answer, acc);
        continue;
      }

      Object.keys(DIRECTIONS).forEach((key) => {
        const D = DIRECTIONS[key];
        const nr = row + D[0];
        const nc = col + D[1];

        if (nr < 0 || nc < 0 || nr > finish || nc > finish) {
          return;
        }

        if (visited[nr][nc] || board[nr][nc] === 1) {
          return;
        }

        let nacc = acc + 100;

        if (beforeKey !== null && key !== beforeKey) {
          nacc += 500;
        }

        const nvisited = [...visited.map((arr) => [...arr])];

        Q.push([nr, nc, nacc, key, nvisited]);
      });
    }
  })();

  return answer;
}

console.log(
  solution([
    [0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 1],
    [0, 0, 1, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 1, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0],
  ])
);
