function solution(n, k) {
  let answer = 0;

  const num = n.toString(k);

  num.split("0").forEach((val) => {
    if (val === "") return;

    if (isPrime(Number(val))) {
      answer++;
    }
  });
  return answer;
}

function isPrime(num) {
  if (num <= 1) {
    return false;
  }

  if (num % 2 === 0) {
    return num === 2 ? true : false;
  }

  const sqrt = parseInt(Math.sqrt(num));

  for (let divider = 3; divider <= sqrt; divider += 2) {
    if (num % divider === 0) {
      return false;
    }
  }

  return true;
}
