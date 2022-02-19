function solution(play_time, adv_time, logs) {
  if (play_time === adv_time) {
    return "00:00:00";
  }

  const play_second = toSeconds(play_time);
  const adv_second = toSeconds(adv_time);

  const acc = Array.from({ length: play_second + 1 }, () => 0);

  logs.forEach((log) => {
    const [start, end] = log.split("-");

    acc[toSeconds(start)]++;
    acc[toSeconds(end)]--;
  });

  let max = {
    idx: 0,
    value: 0,
  };

  for (let i = 1; i <= play_second; i++) acc[i] += acc[i - 1];

  for (let i = 0; i <= adv_second; i++) max.value += acc[i];

  let cur = max.value;

  for (let i = adv_second + 1; i < play_second; i++) {
    cur = cur - acc[i - adv_second] + acc[i];

    if (cur > max.value) {
      max = {
        idx: i - adv_second + 1,
        value: cur,
      };
    }
  }

  return toHHMMSS(max.idx);
}

const toSeconds = (time) => {
  const values = time.split(":");

  return values[0] * 60 * 60 + values[1] * 60 + parseInt(values[2]);
};

const toHHMMSS = (second) => {
  const hh = Math.floor(second / 3600);
  const mm = Math.floor((second % 3600) / 60);
  const ss = second - hh * 3600 - mm * 60;

  return `${hh.toString().padStart(2, "0")}:${mm
    .toString()
    .padStart(2, "0")}:${ss.toString().padStart(2, "0")}`;
};
