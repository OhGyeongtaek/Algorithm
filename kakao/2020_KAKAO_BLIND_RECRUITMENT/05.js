const BO = 1;
const GIDUNG = 0;

const CREATE = 1;
const DELETE = 0;

function solution(n, build_frame) {
  const board = new Array(n + 2)
    .fill()
    .map(() => [...new Array(n + 2).fill().map(() => [false, false])]);

  function checkGidung(x, y) {
    if (y === 0 || board[x][y - 1][GIDUNG]) {
      return true;
    }

    if ((x > 0 && board[x - 1][y][BO]) || board[x][y][BO]) {
      return true;
    }

    return false;
  }

  function checkBo(x, y) {
    // 해당 보 기준으로 양옆 둘중에 기둥이 1개가 있는지
    if (board[x][y - 1][GIDUNG] || board[x + 1][y - 1][GIDUNG]) {
      return true;
    }

    if (x > 0 && board[x - 1][y][BO] && board[x + 1][y][BO]) {
      return true;
    }

    return false;
  }

  function canRemove(x, y) {
    for (let i = Math.max(x - 1, 0); i <= x + 1; i++) {
      for (let j = y; j <= y + 1; j++) {
        if (board[i][j][BO] && checkBo(i, j) === false) return false;
        if (board[i][j][GIDUNG] && checkGidung(i, j) === false) return false;
      }
    }

    return true;
  }

  build_frame.forEach(([x, y, type, action]) => {
    if (action === CREATE) {
      if (type === GIDUNG) {
        if (checkGidung(x, y)) {
          board[x][y][type] = true;
        }
      } else {
        if (checkBo(x, y)) {
          board[x][y][type] = true;
        }
      }

      return;
    }

    // 삭제
    board[x][y][type] = false;

    if (canRemove(x, y) === false) {
      board[x][y][type] = true;
    }
  });

  var answer = [];

  for (let i = 0; i <= n; i++) {
    for (let j = 0; j <= n; j++) {
      const target = board[i][j];

      if (target[GIDUNG]) {
        answer.push([i, j, GIDUNG]);
      }

      if (target[BO]) {
        answer.push([i, j, BO]);
      }
    }
  }

  return answer;
}

console.log(
  solution(5, [
    [1, 0, 0, 1],
    [1, 1, 1, 1],
    [2, 1, 0, 1],
    [2, 2, 1, 1],
    [5, 0, 0, 1],
    [5, 1, 0, 1],
    [4, 2, 1, 1],
    [3, 2, 1, 1],
  ])
);

console.log(
  solution(5, [
    [0, 0, 0, 1],
    [2, 0, 0, 1],
    [4, 0, 0, 1],
    [0, 1, 1, 1],
    [1, 1, 1, 1],
    [2, 1, 1, 1],
    [3, 1, 1, 1],
    [2, 0, 0, 0],
    [1, 1, 1, 0],
    [2, 2, 0, 1],
  ])
);
