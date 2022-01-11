// 투포인터 알고리즘
// 탐색으로 풀었을 경우 효율성 테스트를 통과하지 못함.
function solution(gems) {
  const kinds = new Set(gems);
  const size = kinds.size;

  let answer = [1, gems.length];

  function setAnswer(now) {
    if (answer[1] - answer[0] > now[1] - now[0]) {
      answer = now;
    }
  }

  const map = new Map();

  function getMinObject() {
    let min = null;

    [...map.keys()].forEach((key) => {
      const value = map.get(key);

      if (!min || value < min[1]) {
        min = [key, value];
      }
    });

    return min;
  }

  gems.forEach((gem, idx) => {
    map.delete(gem);
    map.set(gem, idx);

    if (map.size === size) {
      const [key, value] = getMinObject();

      map.delete(key);

      setAnswer([value + 1, idx + 1]);
    }
  });

  return answer;
}

console.log(
  solution(["DIA", "RUBY", "RUBY", "DIA", "DIA", "EMERALD", "SAPPHIRE", "DIA"])
);
