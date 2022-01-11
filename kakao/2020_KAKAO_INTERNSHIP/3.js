// 탐색 알고리즘
// 탐색으로 풀었을 경우 효율성 테스트를 통과하지 못함.
function solution(gems) {
  const kinds = new Set(gems);
  const size = kinds.size;

  let answer = null;

  function setAnswer(now) {
    if (answer === null) {
      answer = now;
      return;
    }

    const gap1 = answer[1] - answer[0];
    const gap2 = now[1] - now[0];

    if (gap1 > gap2) {
      answer = now;
    }
  }

  const finish = gems.length - size + 1;

  for (let i = 0; i < finish; i++) {
    if (answer) {
      const gap = answer[1] - answer[0];
      if (gap <= size - 1) break;
    }

    const set = new Set();

    for (let j = i; j <= gems.length; j++) {
      if (set.size === size) {
        setAnswer([i + 1, j]);
        break;
      }

      if (!gems[j]) break;

      set.add(gems[j]);
    }
  }

  return answer;
}

console.log(
  solution(["DIA", "RUBY", "RUBY", "DIA", "DIA", "EMERALD", "SAPPHIRE", "DIA"])
);
