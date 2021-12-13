const OPEN = "(";
const CLOSE = ")";

function solution(p) {
  if (!p) return "";

  const len = p.length;

  const pos = getPosition(p);

  const u = p.substr(0, pos);
  const v = p.substr(pos, len);

  if (isOK(u)) {
    return u + solution(v);
  }

  let answer = `(${solution(v)})`;

  for (let i = 1; i < u.length - 1; i++) {
    answer += u[i] === OPEN ? CLOSE : OPEN;
  }

  return answer;
}

function getPosition(str) {
  let cnt = 0;

  for (let i = 0; i < str.length; i++) {
    str[i] === OPEN ? cnt++ : cnt--;

    if (cnt === 0) {
      return i + 1;
    }
  }

  return str.length;
}

function isOK(str) {
  let cnt = 0;

  for (let i = 0; i < str.length; i++) {
    str[i] === OPEN ? cnt++ : cnt--;

    if (cnt < 0) {
      return false;
    }
  }

  return true;
}

console.log(solution("()))((()"));
