function solution(n, computers) {
  let answer = 0;
  let visited = [];

  for (let i = 0; i < n; i++) {
    if (!visited[i]) {
      visite(i);
      answer++;
    }
  }

  function visite(i) {
    visited[i] = true;

    for (let j = 0; j < n; j++) {
      if (i !== j && computers[i][j] === 1 && !visited[j]) {
        visite(j);
      }
    }
  }

  return answer;
}

solution(8, []);
