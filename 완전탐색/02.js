function solution(numbers) {
  const N = numbers.length;
  const judged = {}; // 중복해서 세지 않도록 소수라고 판별한 숫자를 저장
  const isUsed = [...Array(N)].map(() => 0);
  let ans = 0;

  // 계획 2 - 소수 판별하기
  const isPrime = (number) => {
    if (number <= 1) return false;

    const sqrt = Math.sqrt(number);

    for (let i = 2; i <= sqrt; i++) {
      if (number % i == 0) return false;
    }

    return true;
  };

  // 계획 1 - 모든 숫자의 순열을 만듭니다.
  (function f(depth, number) {
    // 깊이가 0보다 클 때 숫자 순열이 만들어집니다.
    if (depth > 0) {
      const parseNumber = Number(number);

      if (!judged[parseNumber] && isPrime(parseNumber)) {
        ans++;
        judged[parseNumber] = 1;
      }
    }

    if (depth == N) return;

    for (let i = 0; i < N; i++) {
      if (isUsed[i]) continue;

      isUsed[i] = 1;
      f(depth + 1, number + numbers[i]);
      isUsed[i] = 0;
    }
  })(0, "");

  return ans;
}
