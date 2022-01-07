function solution(s) {
  var answer = new Set();

  const values = getValues(s);

  values.forEach((value) => {
    value.forEach((num) => {
      answer.add(num);
    });
  });

  return [...answer];
}

function getValues(s) {
  return s
    .replace(/{/g, "")
    .replace(/}}/g, "")
    .split("},")
    .map((str) => str.split(",").map((value) => Number(value)))
    .sort((a, b) => {
      return a.length - b.length;
    });
}

[
  ["{{2},{2,1},{2,1,3},{2,1,3,4}}", "[2,1,3,4]"],
  ["{{1,2,3},{2,1},{1,2,4,3},{2}}", "[2,1,3,4]"],
  ["{{20,111},{111}}", "[111,20]"],
  ["{{123}}", "[123]"],
  ["{{4,2,3},{3},{2,3,4,1},{2,3}}", "[3,2,4,1]"],
].forEach(([s, result]) => {
  console.log(`[${solution(s)}]` === result);
});
