function solution(infos, queries) {
  const board = {};

  infos.forEach((info) => {
    const [len, job, career, food, point] = info.split(" ");

    pushData([len, job, career, food], Number(point), 0);
  });

  function pushData(data, point, idx) {
    const key = data.join("");

    if (board[key]) {
      board[key].push(point);
    } else {
      board[key] = [point];
    }

    for (let i = idx; i < data.length; i++) {
      const temp = [...data];
      temp[i] = "-";
      pushData(temp, point, i + 1);
    }
  }

  for (const key in board) {
    board[key] = board[key].sort((a, b) => a - b);
  }

  return queries.map((query) => {
    const [len, , job, , career, , food, point] = query.split(" ");
    const score = Number(point);
    const key = `${len}${job}${career}${food}`;

    if (board[key]) {
      let start = 0;
      let end = board[key].length;
      while (start < end) {
        const mid = Math.floor((start + end) / 2);

        if (board[key][mid] >= score) {
          end = mid;
        } else if (board[key][mid] < score) {
          start = mid + 1;
        }
      }

      return board[key].length - start;
    }

    return 0;
  });
}

console.log(
  solution(
    [
      "java backend junior pizza 150",
      "python frontend senior chicken 210",
      "python frontend senior chicken 150",
      "cpp backend senior pizza 260",
      "java backend junior chicken 80",
      "python backend senior chicken 50",
    ],
    [
      "java and backend and junior and pizza 100",
      "python and frontend and senior and chicken 200",
      "cpp and - and senior and pizza 250",
      "- and backend and senior and - 150",
      "- and - and - and chicken 100",
      "- and - and - and - 150",
    ]
  )
);
