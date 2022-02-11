function solution(board, skill) {
  var answer = 0;
  const N = board.length;
  const M = board[0].length;

  const tempBoard = [
    ...new Array(board.length + 1)
      .fill()
      .map(() => [...new Array(board.length + 1).fill(0)]),
  ];

  skill.forEach(([type, sr, sc, er, ec, val]) => {
    const actionValue = val * (type === 1 ? -1 : 1);

    tempBoard[sr][sc] += actionValue;
    tempBoard[er + 1][ec + 1] += actionValue;
    tempBoard[sr][ec + 1] -= actionValue;
    tempBoard[er + 1][sc] -= actionValue;
  });
  console.log(tempBoard);

  for (let c = 0; c < M; c++) {
    for (let r = 1; r < N; r++) {
      tempBoard[r][c] += tempBoard[r - 1][c];
    }
  }

  console.log(tempBoard);

  for (let r = 0; r < N; r++) {
    for (let c = 1; c < M; c++) {
      tempBoard[r][c] += tempBoard[r][c - 1];
    }
  }

  board.forEach((cols, r) => {
    cols.forEach((col, c) => {
      if (col + tempBoard[r][c] > 0) answer++;
    });
  });

  return answer;
}

console.log(
  solution(
    [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ],
    [
      [1, 1, 1, 2, 2, 4],
      [1, 0, 0, 1, 1, 2],
      [2, 2, 0, 2, 0, 100],
    ]
  )
);
