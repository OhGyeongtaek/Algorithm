function solution(info, edges) {
  let answer = 0;

  const createTree = (idx) => ({
    idx: idx,
    value: info[idx],
    children: edges
      .filter((arr) => arr[0] === idx)
      .map((child) => createTree(child[1])),
  });

  const tree = createTree(0);

  const dfs = (counter, children, visited) => {
    answer = Math.max(answer, counter[0]);

    children.forEach((child) => {
      const newCounter = [...counter];

      if (!visited[child.idx]) {
        newCounter[child.value]++;
      }

      if (newCounter[0] > newCounter[1]) {
        const newVisited = [...visited];
        newVisited[child.idx] = true;

        const newChildren = !visited[child.idx]
          ? [...tree.children, ...child.children]
          : child.children;

        dfs(newCounter, newChildren, newVisited);
      }
    });
  };

  dfs([1, 0], tree.children, [true]);

  return answer;
}

console.log(
  solution(
    [0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1],
    [
      [0, 1],
      [1, 2],
      [1, 4],
      [0, 8],
      [8, 7],
      [9, 10],
      [9, 11],
      [4, 3],
      [6, 5],
      [4, 6],
      [8, 9],
    ]
  )
);
