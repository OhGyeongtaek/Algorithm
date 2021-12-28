function solution(str1, str2) {
  const obj1 = {};
  const obj2 = {};

  function slice(str, obj) {
    for (let i = 0; i < str.length - 1; i++) {
      const piece = str.slice(i, i + 2).toLowerCase();

      if (/[a-z]{2}/.test(piece)) {
        obj[piece] = obj[piece] ? obj[piece] + 1 : 1;
      }
    }
  }

  slice(str1, obj1);
  slice(str2, obj2);

  let intersection = 0;
  let union = 0;

  // 교집합 구하기
  Object.keys(obj1).forEach((key) => {
    if (obj2[key]) {
      union += Math.max(obj2[key], obj1[key]);
      intersection += Math.min(obj2[key], obj1[key]);
      return;
    }

    union += obj1[key];
  });

  Object.keys(obj2).forEach((key) => {
    if (!obj1[key]) {
      union += obj2[key];
    }
  });

  if (intersection === 0 && union === 0) {
    return 65536;
  }

  return Math.floor((intersection / union) * 65536);
}

console.log(solution("E=M*C^2", "e=m*c^2"));
// console.log(solution("Handshake", "shake hands"));

//
