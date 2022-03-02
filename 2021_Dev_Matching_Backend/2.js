const CENTER_NAME = "-";

function solution(enroll, referral, seller, amount) {
  const tree = {};
  const wallet = {};
  const stack = [[CENTER_NAME, null]];
  const visited = {};

  [...enroll, CENTER_NAME].forEach((name) => {
    tree[name] = [];
    wallet[name] = [];
  });

  referral.forEach((name, idx) => {
    tree[name].push(enroll[idx]);
  });

  seller.forEach((name, idx) => {
    const cost = amount[idx] * 100;

    wallet[name].push(cost);
  });

  while (stack.length > 0) {
    const [cur, parent] = stack.pop();

    if (visited[cur]) {
      if (cur !== CENTER_NAME) {
        wallet[cur].forEach((cost, idx) => {
          const tax = Math.floor(cost * 0.1);
          wallet[cur][idx] -= tax;
          wallet[parent].push(tax);
        });
      }

      continue;
    }

    stack.push([cur, parent]);
    visited[cur] = true;

    for (const child of tree[cur]) {
      if (!visited[child]) {
        stack.push([child, cur]);
      }
    }
  }

  return enroll.map((name) => {
    return wallet[name].reduce((acc, cost) => acc + cost, 0);
  });
}

console.log(
  solution(
    ["john", "mary", "edward", "sam", "emily", "jaimie", "tod", "young"],
    ["-", "-", "mary", "edward", "mary", "mary", "jaimie", "edward"],
    ["young", "john", "tod", "emily", "mary"],
    [12, 4, 2, 5, 10]
  )
);
