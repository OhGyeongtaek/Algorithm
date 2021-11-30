const INF = 4000000;

function solution(n, s, a, b, fares) {
  const dist = [...new Array(n).fill().map(() => [])];

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      dist[i][j] = i === j ? 0 : INF;
    }
  }

  fares.forEach((fare) => {
    dist[fare[0] - 1][fare[1] - 1] = fare[2];
    dist[fare[1] - 1][fare[0] - 1] = fare[2];
  });

  // 경유지
  for (let k = 0; k < n; k++) {
    // 시작점
    for (let i = 0; i < n; i++) {
      // 도작점
      for (let j = 0; j < n; j++) {
        if (dist[i][j] > dist[i][k] + dist[k][j])
          dist[i][j] = dist[i][k] + dist[k][j];
      }
    }
  }

  s--;
  a--;
  b--;

  let answer = INF;

  for (let i = 0; i < n; i++) {
    answer = Math.min(answer, dist[s][i] + dist[i][a] + dist[i][b]);
  }

  return answer;
}

console.log(
  solution(6, 4, 6, 2, [
    [4, 1, 10],
    [3, 5, 24],
    [5, 6, 2],
    [3, 1, 41],
    [5, 1, 24],
    [4, 6, 50],
    [2, 4, 66],
    [2, 3, 22],
    [1, 6, 25],
  ])
);
