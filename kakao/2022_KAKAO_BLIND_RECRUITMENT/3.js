function solution(fees, records) {
  var inOutList = {};

  records.forEach((record) => {
    const [time, number, type] = record.split(" ");

    if (!inOutList[number]) {
      inOutList[number] = { IN: [], OUT: [] };
    }

    inOutList[number][type].push(toMinute(time));
  });

  return Object.keys(inOutList)
    .sort()
    .map((key) => {
      const data = inOutList[key];
      const inTimes = data["IN"].sort((a, b) => a - b);
      const outTimes = data["OUT"].sort();

      let acc = 0;

      inTimes.forEach((time, idx) => {
        const out = outTimes[idx] ? outTimes[idx] : toMinute("23:59");
        acc += out - time;
      });

      if (acc <= fees[0]) {
        return fees[1];
      }

      return fees[1] + Math.ceil((acc - fees[0]) / fees[2]) * fees[3];
    });
}

function toMinute(time) {
  const [hh, mm] = time.split(":");

  return Number(hh) * 60 + Number(mm);
}

console.log(
  solution(
    [180, 5000, 10, 600],
    [
      "05:34 5961 IN",
      "06:00 0000 IN",
      "06:34 0000 OUT",
      "07:59 5961 OUT",
      "07:59 0148 IN",
      "18:59 0000 IN",
      "19:09 0148 OUT",
      "22:59 5961 IN",
      "23:00 5961 OUT",
    ]
  )
);
