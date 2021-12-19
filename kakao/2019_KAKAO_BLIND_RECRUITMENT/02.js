function solution(N, stages) {
  var answer = [];

  for (let i = 1; i <= N; i++) {
    // 도착은 했으나 클리어 하지 못한사람
    const val1 = stages.filter((val) => val === i).length;
    const val2 = stages.filter((val) => val > i).length;

    answer.push({ stage: i, val: val1 / val2 });
  }

  return answer.sort((a, b) => b.val - a.val).map((val) => val.stage);
}

console.log(solution(5, [2, 1, 2, 6, 2, 4, 3, 3]));
