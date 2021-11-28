const HOMEN = "P";
const TABLE = "O";
const PARTITION = "X";
const PLACE_SIZE = 5;

const DIRECTIONS = [
  [0, -1], // 상
  [0, 1], // 하
  [-1, 0], // 좌
  [1, 0], //우
];

function solution(places) {
  const answer = [];

  places.forEach((plase) => {
    check(plase) ? answer.push(1) : answer.push(0);
  });

  function check(plase) {
    for (let y = 0; y < PLACE_SIZE; y++) {
      for (let x = 0; x < PLACE_SIZE; x++) {
        if (plase[y][x] === HOMEN && BFS(plase, x, y) === false) {
          return false;
        }
      }
    }

    return true;
  }

  function BFS(plase, x, y) {
    const queue = [];
    const visited = [...new Array(5).fill().map(() => [])];

    queue.push({ x, y, dist: 0 });

    visited[x][y] = true;

    while (queue.length > 0) {
      const { x, y, dist } = queue.shift();

      if (dist > 2) {
        continue;
      }

      if (dist > 0 && plase[y][x] === HOMEN) {
        return false;
      }

      for (let i = 0; i < DIRECTIONS.length; i++) {
        const D = DIRECTIONS[i];

        const newX = x + D[0];
        const newY = y + D[1];

        if (newX < 0 || newX > 4 || newY < 0 || newY > 4) {
          continue;
        }

        if (visited[newX][newY]) {
          continue;
        }

        if (plase[newY][newX] === PARTITION) {
          continue;
        }

        visited[newX][newY] = true;

        queue.push({ x: newX, y: newY, dist: dist + 1 });
      }
    }

    return true;
  }

  return answer;
}

console.log(
  solution([
    ["POOOP", "OXXOX", "OPXPX", "OOXOX", "POXXP"],
    ["POOPX", "OXPXP", "PXXXO", "OXXXO", "OOOPP"],
    ["PXOPX", "OXOXP", "OXPOX", "OXXOP", "PXPOX"],
    ["OOOXX", "XOOOX", "OOOXX", "OXOOX", "OOOOO"],
    ["PXPXP", "XPXPX", "PXPXP", "XPXPX", "PXPXP"],
  ])
);
