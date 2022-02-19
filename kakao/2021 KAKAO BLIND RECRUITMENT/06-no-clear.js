const languges = ["cpp", "java", "python"];
const jobs = ["backend", "frontend"];
const careers = ["junior", "senior"];
const foods = ["chicken", "pizza"];

function solution(infos, queries) {
  const candidates = infos.map((info) => {
    const [languge, job, career, food, score] = info.split(" ");

    return { languge, job, career, food, score };
  });

  return queries.map((query, idx) => {
    const datas = query.split(" ").filter((data) => data !== "and");

    return candidates.filter((candidate) => {
      if (datas[0] !== candidate["languge"] && datas[0] !== "-") {
        return false;
      }

      if (datas[1] !== candidate["job"] && datas[1] !== "-") {
        return false;
      }

      if (datas[2] !== candidate["career"] && datas[2] !== "-") {
        return false;
      }

      if (datas[3] !== candidate["food"] && datas[3] !== "-") {
        return false;
      }

      return Number(datas[4]) <= Number(candidate["score"]);
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
