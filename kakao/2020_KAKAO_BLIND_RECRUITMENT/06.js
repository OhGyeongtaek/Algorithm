const INF = 987654321;

function solution(n, weaks, dists) {
  const len = weaks.length;
  let answer = INF;
  let points = [...weaks];

  dists.sort((a, b) => b - a);

  (function lookup(idx, points, cnt) {
    if (points.length <= 0) {
      answer = Math.min(answer, cnt);
      return;
    }
    if (idx >= dists.length) {
      return;
    }

    const dist = dists[idx];

    for (let j = 0; j < points.length; j++) {
      const point = points[j];
      const temp = [...points];

      for (let i = 0; i <= dist; i++) {
        const idx = temp.indexOf((point + i) % n);

        if (idx > -1) {
          temp.splice(idx, 1);
        }
      }

      lookup(idx + 1, temp, cnt + 1);
    }
  })(0, points, 0);

  return answer === INF ? -1 : answer;
}

console.log(solution(200, [0, 100], [1, 1]));
console.log(solution(12, [1, 3, 4, 9, 10], [3, 5, 7]));
