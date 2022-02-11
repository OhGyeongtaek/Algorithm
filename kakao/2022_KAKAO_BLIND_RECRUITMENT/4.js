function solution(n, info) {
  let answer = new Array(11).fill(0);

  let nowGap = -1;

  function DFS(scoreA, scoreB, idx, count, board) {
    if (idx > 10) {
      const gap = scoreA - scoreB;
      if (gap > nowGap) {
        board[10] = n - count;
        answer = board;
        nowGap = gap;
      }

      return;
    }

    if (n >= count + info[10 - idx] + 1) {
      const newBoard = [...board];
      newBoard[10 - idx] = info[10 - idx] + 1;
      DFS(scoreA + idx, scoreB, idx + 1, count + info[10 - idx] + 1, newBoard);
    }

    if (info[10 - idx] > 0) {
      DFS(scoreA, scoreB + idx, idx + 1, count, [...board]);
    } else {
      DFS(scoreA, scoreB, idx + 1, count, [...board]);
    }
  }

  DFS(0, 0, 0, 0, answer);

  return nowGap <= 0 ? [-1] : answer;
}

function isMatch(arr) {
  let result = true;

  [0, 2, 2, 2, 1].forEach((val, idx) => {
    if (val != arr[idx]) {
      result = false;
    }
  });

  return result;
}

console.log(
  solution(1, [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
  [0, 2, 2, 0, 1, 0, 0, 0, 0, 0, 0]
);
