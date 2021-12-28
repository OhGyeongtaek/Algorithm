function solution(n, t, m, timetable) {
  const start = toMinute("09:00");
  const end = start + (n - 1) * t;

  const minutable = timetable
    .map((time) => toMinute(time))
    .sort((a, b) => a - b);

  let lastIndex = 0;

  // 막차 이전까지 타고간 크루 제거
  for (let i = 0; i < n - 1; i++) {
    let cnt = 0;
    const now = start + i * t;

    for (let j = lastIndex; j < minutable.length; j++) {
      if (now >= minutable[j]) {
        cnt++;
        lastIndex = j + 1;

        if (cnt === m) {
          break;
        }
      } else {
        break;
      }
    }
  }

  let cnt = 0;

  for (let j = lastIndex; j < minutable.length; j++) {
    if (end >= minutable[j]) {
      cnt++;
      lastIndex = j;
      if (cnt === m) {
        return toHHMM(minutable[lastIndex] - 1);
      }
    } else {
      break;
    }
  }

  return toHHMM(end);
}

function toMinute(time) {
  const [hour, minute] = time.split(":");

  return Number(hour) * 60 + Number(minute);
}

function toHHMM(hour) {
  const h = `${Math.floor(hour / 60)}`.padStart(2, "0");
  const m = `${hour % 60}`.padStart(2, "0");

  return `${h}:${m}`;
}

// console.log(solution(1, 1, 5, ["08:03", "08:00", "08:01", "08:02"]));
// console.log(solution(1, 1, 5, ["00:01", "00:01", "00:01", "00:01", "00:01"]));
console.log(solution(2, 10, 2, ["09:10", "09:09", "08:00"]));
