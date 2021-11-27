function solution(begin, target, words) {
  let answer = words.length + 1;

  const visited = [];

  for (let i = 0; i < words.length; i++) {
    dfs(begin, i, 0);
  }

  function dfs(word, i, cnt) {
    if (word === target) {
      answer = Math.min(answer, cnt);
      return;
    }

    words.forEach((changeWord, idx) => {
      if (visited[idx]) return;

      if (isChange(word, changeWord)) {
        visited[idx] = true;
        dfs(changeWord, i + 1, cnt + 1);
        visited[idx] = false;
      }
    });
  }

  function isChange(word, changeWord) {
    const len = word.length;

    let sameCount = 0;

    for (let i = 0; i < len; i++) {
      if (word[i] === changeWord[i]) sameCount++;
    }

    return sameCount === len - 1;
  }

  return answer === words.length + 1 ? 0 : answer;
}

console.log(
  solution("hit", "cog", ["hot", "dot", "dog", "lot", "log", "cog"]),
  4
);

console.log(
  solution("1234567000", "1234567899", [
    "1234567800",
    "1234567890",
    "1234567899",
  ]),
  3
);

console.log(solution("hit", "hot", ["hot", "dot", "dog", "lot", "log"]), 1);

console.log(solution("hit", "cog", ["cog", "log", "lot", "dog", "hot"]), 4);
