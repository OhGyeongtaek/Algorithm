const values = [
  // languges
  ["cpp", "java", "python"],
  //jobs
  ["backend", "frontend"],
  // careers
  ["junior", "senior"],
  // foods
  ["chicken", "pizza"],
];

function solution(infos, queries) {
  const list = {};

  function DFS(info, idx, map) {
    if (idx === 3) {
      if (!map["-"]) map["-"] = [];
      if (!map[info[idx]]) map[info[idx]] = [];

      map[info[idx]].push(info[4]);
      map["-"].push(info[4]);

      return;
    }

    if (!map[info[idx]]) {
      map[info[idx]] = {};
    }

    if (!map["-"]) {
      map["-"] = {};
    }

    DFS(info, idx + 1, map[info[idx]]);
    DFS(info, idx + 1, map["-"]);
  }

  infos.forEach((info) => {
    DFS(info.split(" "), 0, list);
  });

  return queries.map((query, idx) => {
    const datas = query.split(" ").filter((data) => data !== "and");

    return list[datas[0]][datas[1]][datas[2]][datas[3]].filter((score) => {
      return Number(datas[4]) <= Number(score);
    }).length;
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
