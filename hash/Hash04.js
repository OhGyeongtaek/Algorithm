const solution = (genres, plays) => {
  const answer = [];

  const initValues = init(genres, plays);

  sorting(initValues).forEach((value) => {
    if (value.items[0] !== undefined) {
      answer.push(value.items[0].idx);
    }

    if (value.items[1] !== undefined) {
      answer.push(value.items[1].idx);
    }
  });

  return answer;
};

const sorting = (categories) => {
  const values = Object.values(categories).sort((a, b) => b.total - a.total);

  values.forEach((category) => {
    values.items = categories[category.type].items.sort((a, b) => {
      const result = b.value - a.value;

      if (result === 0) {
        return a.idx - b.idx;
      }

      return result;
    });
  });

  return values;
};

const init = (genres, plays) => {
  return genres.reduce((acc, cur, idx) => {
    if (!acc[cur]) {
      acc[cur] = {
        type: cur,
        items: [],
        total: 0,
      };
    }

    acc[cur].total += plays[idx];
    acc[cur].items.push({ value: plays[idx], idx });

    return acc;
  }, {});
};

const cases = [
  [
    ["classic", "pop", "classic", "classic", "pop"],
    [500, 600, 150, 800, 2500],
    "4,1,3,0",
  ],
  [["classic", "classic", "classic", "pop"], [500, 150, 800, 2500], "3,2,0"],
  [
    ["classic", "pop", "classic", "classic", "pop"],
    [500, 600, 501, 800, 900],
    "3,2,4,1",
  ],
];

cases.forEach((c) => {
  const result = solution(c[0], c[1]);
  console.log(result.toString() === c[2]);
});
