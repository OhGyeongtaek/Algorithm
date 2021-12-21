function solution(nodeinfo) {
  let answer = [[], []];

  const nodes = nodeinfo.map(([x, y], idx) => ({
    id: idx + 1,
    x,
    y,
    left: null,
    right: null,
  }));

  // 정렬
  nodes.sort((a, b) => {
    const yGap = b.y - a.y;

    if (yGap === 0) {
      return a.x - b.x;
    }

    return yGap;
  });

  nodes.forEach((node, idx) => {
    if (idx === 0) return;

    lookup(node, 0);
  });

  function lookup(node, idx) {
    if (idx === -1) return;

    const target = nodes[idx];
    const direction = node.x > target.x ? "right" : "left";

    if (target[direction] === null) {
      nodes[idx][direction] = node;
    } else {
      lookup(node, nodes.indexOf(target[direction]));
    }
  }

  function preorder(node) {
    if (node) {
      answer[0].push(node.id);
      preorder(node.left);
      preorder(node.right);
    }
  }

  function postorder(node) {
    if (node) {
      postorder(node.left);
      postorder(node.right);
      answer[1].push(node.id);
    }
  }

  preorder(nodes[0]);
  postorder(nodes[0]);

  return answer;
}

console.log(
  solution([
    [5, 3],
    [11, 5],
    [13, 3],
    [3, 5],
    [6, 1],
    [1, 3],
    [8, 6],
    [7, 2],
    [2, 2],
  ])
);
