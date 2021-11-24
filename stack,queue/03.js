function solution(bridge_length, weight, truck_weights) {
  const queue = [];

  let time = 0;
  let idx = 0;

  while (true) {
    time++;

    // 경과시간 초과시 트럭 제거
    if (queue[0] && time - queue[0].time >= bridge_length) {
      queue.splice(0, 1);
    }

    const totalWeight = queue.reduce((acc, cur) => acc + cur.weight, 0);

    // 현재 queue에 있는 무게 + 다음 트럭의 무게
    if (truck_weights[idx] && totalWeight + truck_weights[idx] <= weight) {
      // 최대 트럭의 갯수보다 초과할 경우
      if (bridge_length <= queue.length) {
        continue;
      }
      queue.push({ time, weight: truck_weights[idx] });
      idx++;
    }

    if (queue.length === 0) {
      break;
    }
  }

  return time;
}

// [
//   [2, 10, [7, 4, 5, 6], 8],
//   [100, 100, [10], 101],
//   [100, 100, [10, 10, 10, 10, 10, 10, 10, 10, 10, 10], 110],
// ].forEach((c) => {
//   const result = solution(c[0], c[1], c[2]);
//   console.log(result, result === c[3]);
// });
