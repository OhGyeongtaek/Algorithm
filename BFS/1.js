const DIRECTIONS = [
  [-1, 0], // 상
  [1, 0], // 하
  [0, -1], //좌
  [0, 1], //우
];

const INF = 9876543210;

function solution(maps) {
  let answer = INF;

  const N = maps.length;
  const M = maps[0].length;

  const endPoint = [N - 1, M - 1];

  const visited = new Array(N).fill().map(() => []);
  const Q = [[0, 0, 1]];

  while (Q.length > 0) {
    const [r, c, cnt] = Q.shift();

    if (r === endPoint[0] && c === endPoint[1]) {
      answer = Math.min(answer, cnt);
      continue;
    }

    DIRECTIONS.forEach((D) => {
      const nr = r + D[0];
      const nc = c + D[1];

      if (nr < 0 || nc < 0 || nr >= N || nc >= M || visited[nr][nc]) {
        return;
      }

      if (maps[nr][nc] === 0) {
        return;
      }

      Q.push([nr, nc, cnt + 1]);

      visited[r][c] = true;
    });
  }

  return answer === INF ? -1 : answer;
}
