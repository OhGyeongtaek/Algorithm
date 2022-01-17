function solution(id_list, reports, k) {
  const answer = {};

  const reportCounter = {};

  id_list.forEach((id) => {
    answer[id] = new Set();
    reportCounter[id] = new Set();
  });

  reports.forEach((report) => {
    const [id, target] = report.split(" ");
    answer[id].add(target);
    reportCounter[target].add(id);
  });

  return id_list.map((id) => {
    const targets = answer[id];
    let cnt = 0;

    targets.forEach((target) => {
      if (reportCounter[target].size >= k) {
        cnt++;
      }
    });

    return cnt;
  });
}
