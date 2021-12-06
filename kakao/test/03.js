const DIRECTIONS = [
  [2, -1], // 상1, 좌2
  [1, -2], // 상2, 좌1
  [-2, -1], // 상1, 우2
  [-1, -2], // 상2, 우1

  [2, 1], // 하1, 좌2
  [1, 2], // 하2, 좌1
  [-2, 1], // 하1, 우2
  [-1, 2], // 하2, 우1
];

function solution(n, startRow, startCol, endRow, endCol) {
  let answer = 2100000000;

  const visited = [...new Array(n).fill().map(() => [])];

  const Q = [[startRow, startCol, 0]];

  while (Q.length > 0) {
    const [row, col, cnt] = Q.shift();

    if (row === endRow && col === endCol) {
      answer = Math.min(answer, cnt);
      continue;
    }

    visited[row][col] = true;

    DIRECTIONS.forEach((D) => {
      const nr = row - D[0];
      const nc = col - D[1];

      if (nr < 0 || nr >= n || nc < 0 || nc >= n) {
        return;
      }

      if (visited[nr][nc]) {
        return;
      }

      Q.push([nr, nc, cnt + 1]);
    });
  }

  return answer;
}

console.log(solution(6, 5, 1, 0, 5));
