function solution(answers) {
  const counters = [
    { no: 1, count: 0, pattern: [1, 2, 3, 4, 5] },
    { no: 2, count: 0, pattern: [2, 1, 2, 3, 2, 4, 2, 5] },
    { no: 3, count: 0, pattern: [3, 3, 1, 1, 2, 2, 4, 4, 5, 5] },
  ];

  answers.forEach((answer, idx) => {
    counters.forEach((counter) => {
      const { pattern } = counter;

      if (pattern[idx % pattern.length] === answer) {
        counter.count++;
      }

      counter;
    });
  });

  counters.sort((a, b) => {
    const result = b.count - a.count;

    if (result === 0) {
      return a.no - b.no;
    }

    return result;
  });

  const maxCount = counters[0].count;

  return counters //
    .filter(({ count }) => count === maxCount)
    .map(({ no }) => no);
}
