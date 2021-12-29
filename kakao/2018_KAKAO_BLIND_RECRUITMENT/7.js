const MOVES = [
  [0, 0],
  [1, 0],
  [0, 1],
  [1, 1],
];

const EMPTY = 0;

function solution(rowSize, colSize, board) {
  let answer = 0;

  const tempBoard = board.map((blocks) => blocks.split(""));

  while (true) {
    if (lookup()) {
      break;
    }
  }

  function lookup() {
    const deleteArr = [];

    for (let r = 0; r < rowSize - 1; r++) {
      for (let c = 0; c < colSize - 1; c++) {
        const isDelete = isMatch(r, c);

        if (isDelete) {
          MOVES.forEach((M) => {
            deleteArr.push([r + M[0], c + M[1]]);
          });
        }
      }
    }

    if (deleteArr.length === 0) return true;

    clearBoard(deleteArr);
  }

  function clearBoard(deletePoints) {
    deletePoints.forEach(([r, c]) => {
      if (tempBoard[r][c] !== EMPTY) {
        answer++;
        tempBoard[r][c] = EMPTY;
      }
    });

    for (let r = rowSize - 1; r > -1; r--) {
      for (let c = 0; c < colSize; c++) {
        if (tempBoard[r][c] === EMPTY) {
          const point = findNextValuePoint(r, c);

          if (point) {
            const [nr, nc] = point;
            tempBoard[r][c] = tempBoard[nr][nc];
            tempBoard[nr][nc] = EMPTY;
          }
        }
      }
    }
  }

  function findNextValuePoint(i, j) {
    for (let row = i; row > -1; row--) {
      if (tempBoard[row][j] !== EMPTY) {
        return [row, j];
      }
    }
  }

  function isMatch(r, c) {
    const checkBoard = {};

    MOVES.forEach((M) => {
      const nr = r + M[0];
      const nc = c + M[1];

      if (!tempBoard[nr] || !tempBoard[nr][nc]) return;

      const key = tempBoard[nr][nc];

      if (key === EMPTY) return;

      checkBoard[key] = checkBoard[key] ? checkBoard[key] + 1 : 1;
    });

    return Object.values(checkBoard).includes(4);
  }

  return answer;
}

console.log(solution(4, 5, ["CCBDE", "AAADE", "AAABF", "CCBBF"]));
