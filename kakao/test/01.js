function solution(startHeight, descentRate) {
  let answer = 0;
  const len = startHeight.length;

  let targets = startHeight.map((height, idx) => ({
    height: height,
    rate: descentRate[idx],
  }));

  for (let i = 0; i < len; i++) {
    targets = targets
      .filter(({ height, rate }) => {
        // 현재 격추 가능한 항공이 필터링
        return height - rate * i > 0;
      })
      .sort((a, b) => {
        const heightA = a.height - a.rate * i;
        const heightB = b.height - b.rate * i;

        return heightA - heightB;
      });

    // 격추할 항공기가 없는 경우
    if (targets.length === 0) break;

    targets.splice(0, 1);

    answer++;
  }

  return answer;
}

// console.log(solution([1, 3, 5, 4, 8], [1, 2, 2, 1, 2]));

// console.log(solution([4, 3, 1], [3, 2, 1]));

console.log(
  solution(
    [
      4, 410, 540, 217, 60, 66, 320, 80, 372, 300, 216, 72, 160, 135, 310, 50,
      246, 196, 236, 180, 120, 316, 124, 92, 86, 98, 488, 120, 138, 14, 135,
      488, 24, 630, 88, 468, 108, 141, 180, 162, 58, 174, 76, 100, 432, 210, 48,
      224, 24, 114, 276, 371, 490, 252, 340, 140, 504, 51, 160, 118, 186, 414,
      196, 365, 112, 74, 50, 729, 96, 112, 4, 136, 80, 448, 84, 234, 120, 348,
      32, 210, 15, 132, 44, 38, 250,
    ],
    [
      2, 5, 6, 7, 3, 2, 5, 2, 6, 3, 4, 2, 4, 3, 5, 2, 6, 7, 4, 2, 2, 4, 2, 4, 2,
      2, 8, 4, 2, 2, 9, 8, 6, 7, 8, 9, 4, 3, 4, 9, 2, 2, 2, 2, 9, 6, 4, 7, 4, 2,
      4, 7, 5, 6, 4, 2, 7, 3, 2, 2, 3, 9, 2, 5, 2, 2, 5, 9, 3, 2, 4, 4, 10, 7,
      6, 6, 3, 6, 2, 3, 3, 3, 2, 2, 5,
    ]
  )
);
