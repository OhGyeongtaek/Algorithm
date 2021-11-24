function solution(progresses, speeds) {
  let max = 0;

  return progresses.reduce((acc, value, idx) => {
    const finishDay = Math.ceil((100 - value) / speeds[idx]);

    if (finishDay > max) {
      max = finishDay;
      acc.push(1);
    } else {
      acc[acc.length - 1]++;
    }

    return acc;
  }, []);
}

// const result = solution([93, 30, 55], [1, 30, 5]).toString();
// console.log(result === "2,1");
