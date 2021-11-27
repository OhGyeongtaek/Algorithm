function solution(tickets) {
  let roots = [];
  const visited = [];
  const start = "ICN";

  (function dfs(airplane) {
    const items = findTickets(airplane);

    if (items.length === 0) {
      const isFinish =
        visited.filter((visite) => visite).length === tickets.length;

      if (isFinish) {
        roots.push(airplane);
      }

      return isFinish;
    }

    let flag = false;

    items.forEach((root) => {
      if (flag) return;

      const idx = tickets.findIndex((item) => item === root);

      if (visited[idx]) return;

      visited[idx] = true;

      roots.push(root[0]);

      flag = dfs(root[1]);

      if (flag === false) {
        roots.pop();
        visited[idx] = false;
      }
    });

    return flag;
  })(start);

  function findTickets(airplane) {
    return tickets
      .filter((ticket, idx) => !visited[idx] && ticket[0] === airplane)
      .sort(orderByASC);
  }

  return roots;
}

function orderByASC(a, b) {
  if (a < b) return -1;
  if (a > b) return 1;
  if (a === b) return 0;
  else return -1;
}

// console.log(
//   solution([
//     ["ICN", "JFK"],
//     ["HND", "IAD"],
//     ["JFK", "HND"],
//   ])
// );

// console.log(
//   solution([
//     ["ICN", "SFO"],
//     ["ICN", "ATL"],
//     ["SFO", "ATL"],
//     ["ATL", "ICN"],
//     ["ATL", "SFO"],
//   ])
// );

// console.log(
//   solution([
//     ["ICN", "BOO"],
//     ["ICN", "COO"],
//     ["COO", "DOO"],
//     ["DOO", "COO"],
//     ["BOO", "DOO"],
//     ["DOO", "BOO"],
//     ["BOO", "ICN"],
//     ["COO", "BOO"],
//   ])
// );
// console.log(["ICN", "BOO", "DOO", "BOO", "ICN", "COO", "DOO", "COO", "BOO"]);
