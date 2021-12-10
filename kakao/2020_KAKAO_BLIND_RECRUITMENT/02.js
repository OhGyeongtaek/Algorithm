function solution(s) {
  const len = s.length;
  let answer = len;

  //몇개를 기준으로 압 축할 것인지
  for (let i = 1; i <= len; i++) {
    const temp = { str: s, cnt: 1, piece: null };

    for (let j = 0; j < Math.ceil(len / i) + 1; j++) {
      const str = s.substr(i * j, i);

      if (temp.piece === str) {
        temp.cnt++;
        continue;
      }

      if (temp.cnt > 1) {
        const { str, cnt, piece } = temp;

        temp.str = str.replace("".padStart(cnt * i, piece), `${cnt}${piece}`);
      }

      temp.piece = str;
      temp.cnt = 1;
    }

    answer = Math.min(answer, temp.str.length);
  }

  return answer;
}

console.log(solution("aabbaccc"));
