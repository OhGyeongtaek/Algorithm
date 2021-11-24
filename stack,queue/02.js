function solution(priorities, location) {
  const items = priorities.map((priotiy, idx) => {
    return { value: priotiy, idx };
  });

  let checkIndex = 0;

  while (checkIndex < priorities.length) {
    const item = items[checkIndex];
    const idx = items.findIndex((find, idx) => {
      return (
        item !== find && //
        item.value < find.value &&
        checkIndex < idx
      );
    });

    if (idx > -1) {
      items.push(item);
      items.splice(checkIndex, 1);
    } else {
      checkIndex++;
    }
  }

  return items.findIndex((item) => item.idx === location) + 1;
}

// console.log(solution([2, 1, 3, 2], 2) === 1);
