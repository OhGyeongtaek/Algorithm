const values = [
  // languges
  ["cpp", "java", "python", "-"],
  //jobs
  ["backend", "frontend", "-"],
  // careers
  ["junior", "senior", "-"],
  // foods
  ["chicken", "pizza", "-"],
];

function solution(infos, queries) {
  const answer = [];
  const list = {};

  (function createList(map, depth) {
    if (depth === 3) {
      values[depth].forEach((value) => {
        map[value] = [];
      });
      return;
    }

    values[depth].forEach((value) => {
      map[value] = {};
      createList(map[value], depth + 1);
    });
  })(list, 0);

  function DFS(info, idx, map) {
    if (idx === 3) {
      const score = Number(info[4]);

      map[info[idx]].push(score);
      map["-"].push(score);

      return;
    }

    DFS(info, idx + 1, map[info[idx]]);
    DFS(info, idx + 1, map["-"]);
  }

  infos.forEach((info) => {
    DFS(info.split(" "), 0, list);
  });

  queries.forEach((query) => {
    const datas = query.split(" ");

    const target = list[datas[0]][datas[2]][datas[4]][datas[6]];

    let cnt = 0;

    for (let i = 0; i < target.length; i++) {
      if (Number(datas[7]) <= target[i]) {
        cnt++;
      }
    }

    answer.push(cnt);
  });

  return answer;
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
