//[ROW, COL]
const DIRECTIONS = [
  [-1, 0], //위
  [1, 0], // 아래
  [0, 1], // 오른쪽
  [0, -1], //왼쪽
];

const INF = 9999999;

function solution(board, r, c) {
  function permutate(now) {
    let result = INF;

    for (let i = 1; i <= 6; i++) {
      const targets = [];

      for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
          if (board[r][c] === i) {
            targets.push({ r, c, cnt: 0 });
          }
        }
      }

      if (targets.length === 0) continue;

      const case1 = bfs(now, targets[0]) + bfs(targets[0], targets[1]) + 2;
      const case2 = bfs(now, targets[1]) + bfs(targets[1], targets[0]) + 2;

      targets.forEach((target) => {
        board[target.r][target.c] = 0;
      });

      result = Math.min(result, case1 + permutate(targets[1]));
      result = Math.min(result, case2 + permutate(targets[0]));

      targets.forEach((target) => {
        board[target.r][target.c] = i;
      });
    }

    if (result === INF) return 0;

    return result;
  }

  function bfs(now, dist) {
    let result = INF;

    const visited = [...new Array(4).fill().map(() => [])];
    const Q = [now];

    while (Q.length > 0) {
      const pointer = Q.shift();

      if (pointer.r == dist.r && pointer.c === dist.c) {
        return pointer.cnt;
      }

      visited[pointer.r][pointer.c];

      DIRECTIONS.forEach((D) => {
        let nr = pointer.r + D[0];
        let nc = pointer.c + D[1];

        if (nr < 0 || nc < 0 || nr > 3 || nc > 3) {
          return;
        }

        if (visited[nr][nc]) {
          return;
        }

        Q.push({ r: nr, c: nc, cnt: pointer.cnt + 1 });

        for (let i = 0; i < 3; i++) {
          if (
            nr + D[0] < 0 ||
            nc + D[1] < 0 ||
            nr + D[0] > 3 ||
            nc + D[1] > 3
          ) {
            break;
          }

          if (board[nr][nc] !== 0) {
            break;
          }

          nr += D[0];
          nc += D[1];
        }

        if (visited[nr][nc]) {
          return;
        }

        Q.push({ r: nr, c: nc, cnt: pointer.cnt + 1 });
      });
    }

    return result;
  }

  return permutate({ r, c, cnt: 0 });
}

console.log(
  solution(
    [
      [1, 0, 0, 3],
      [2, 0, 0, 0],
      [0, 0, 0, 2],
      [3, 0, 1, 0],
    ],
    1,
    0
  )
);
