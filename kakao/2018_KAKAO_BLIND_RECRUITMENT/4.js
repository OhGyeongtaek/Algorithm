function solution(lines) {
  var answer = 0;

  const len = lines.length;

  const progresses = [];
  const starts = [];
  const ends = [];

  lines.forEach((line) => {
    const ps = getProcessingTime(line);
    const ms = getMilisecond(line);

    starts.push(ms - ps < 0 ? 0 : ms - ps + 1);
    progresses.push(ms - ps < 0 ? 0 : ms - ps + 1);

    ends.push(ms);
    progresses.push(ms);
  });

  progresses.sort();

  progresses.forEach((progress) => {
    let cnt = 0;

    for (let i = 0; i < len; i++) {
      if (progress + 999 >= starts[i] && progress <= ends[i]) {
        cnt++;
      }
    }

    answer = Math.max(answer, cnt);
  });

  return answer;
}

function getMilisecond(line) {
  const hhmmsssss = line.split(" ")[1];

  const [hhmmss, sss] = hhmmsssss.split(".");

  const [hh, mm, ss] = hhmmss.split(":");

  return (
    Number(sss) + //
    ss * 1000 +
    mm * 60 * 1000 +
    hh * 60 * 60 * 1000
  );
}

function getProcessingTime(line) {
  const sss = line.split(" ")[2];

  const [ss, ms] = sss.replace("s", "").split(".");

  return Number(ss) * 1000 + (ms ? Number(ms.padEnd(3, "0")) : 0);
}

// console.log(
//   solution(["2016-09-15 01:00:04.001 2.0s", "2016-09-15 01:00:07.000 2s"])
// );

// console.log(
//   solution(["2016-09-15 01:00:04.002 2.0s", "2016-09-15 01:00:07.000 2s"])
// );
console.log(solution(["2016-09-15 00:00:00.000 2.0s"]));
