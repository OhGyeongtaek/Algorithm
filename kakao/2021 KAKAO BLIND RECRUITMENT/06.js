//[ROW, COL]
const DIRECTIONS = [
  [-1, 0], //위
  [1, 0], // 아래
  [0, 1], // 오른쪽
  [0, -1], //왼쪽
];

function solution(board, r, c) {
  var answer = 9999999;

  const visited = [...new Array(4).fill().map(() => [])];

  const Q = [{ r, c, cnt: 0, newBoard: board, selected: [], visited }];

  while (Q.length > 0) {
    let { r, c, cnt, newBoard, selected, visited } = Q.shift();

    console.log(r, c, cnt);
    const value = board[r][c];

    if (value > 0) {
      // 선택된 카드가 있는 경우
      if (selected.length > 0) {
        if (value === selected.value) {
          newBoard[r][c] = 0;
          newBoard[selected.r][selected.c] = 0;

          cnt++;
          selected = [];

          let isFinish = true;

          for (let i = 0; i < 4 && isFinish; i++) {
            for (let j = 0; j < 4 && isFinish; j++) {
              if (newBoard[i][j] > 0) {
                isFinish = false;
              }
            }
          }

          if (isFinish) {
            answer = Math.min(cnt, answer);
            break;
          }
        }
      } else {
        selected = [r, c, value];
        cnt++;
      }
    }

    visited[r][c] = true;

    DIRECTIONS.forEach((D) => {
      const newR = r + D[0];
      const newC = c + D[1];

      if (newR < 0 || newC < 0 || newR > 3 || newC > 3) {
        return;
      }

      if (visited[newR][newC]) {
        return;
      }

      Q.push({
        r: newR,
        c: newC,
        cnt: cnt + 1,
        selected: [...selected],
        visited: visited.map((obj) => [...obj]),
        newBoard: newBoard.map((obj) => [...obj]),
      });

      const ctrlValue = getCtrlValue(D, r, c, newBoard);

      if (newBoard[newR][newC] === 0 && ctrlValue) {
        Q.push({
          r: ctrlValue.r,
          c: ctrlValue.c,
          cnt: cnt + 1,
          selected: [...selected],
          visited: visited.map((obj) => [...obj]),
          newBoard: newBoard.map((obj) => [...obj]),
        });
      }
    });
  }

  function getCtrlValue(D, r, c, board) {
    let newR = r;
    let newC = c;

    while (true) {
      newR += D[0];
      newC += D[1];

      if (newR < 0 || newC < 0 || newR > 3 || newC > 3) {
        return { r: newR - D[0], c: newC - D[1] };
      }

      if (board[newR][newC] > 0) {
        return { r: newR, c: newC };
      }
    }
  }

  return answer;
}

console.log(
  solution(
    [
      [1, 0, 0, 3],
      [2, 0, 0, 0],
      [0, 0, 0, 2],
      [3, 0, 1, 0],
    ],
    1,
    0
  )
);
