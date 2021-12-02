function solution(orders, course) {
  const answer = [];
  const orderList = [];
  const maxCount = [];

  const sortOrders = orders.map((order) => order.split("").sort().join(""));

  course.forEach((len) => {
    orderList[len] = {};
    maxCount[len] = 0;
  });

  sortOrders.forEach((order) => {
    course.forEach((len) => {
      combination(len, order, "", 0);
    });
  });

  function combination(n, order, str, start) {
    if (str.length === n) {
      const len = str.length;

      if (!orderList[len][str]) {
        orderList[len][str] = 0;
      }

      orderList[len][str] += 1;

      maxCount[len] = Math.max(maxCount[len], orderList[len][str]);

      return;
    }

    for (let i = start; i < order.length; i++) {
      combination(n, order, str + order[i], i + 1);
    }
  }

  course.forEach((len) => {
    if (orderList[len]) {
      const max = maxCount[len];

      Object.keys(orderList[len]).forEach((key) => {
        if (max < 2) return;

        if (orderList[len][key] === max) {
          answer.push(key);
        }
      });
    }
  });

  return answer.sort();
}

// console.log(
//   solution(["ABCFG", "AC", "CDE", "ACDE", "BCFG", "ACDEH"], [2, 3, 4])
// );

// console.log(solution(["XYZ", "XWY", "WXA"], [2, 3, 4]));

console.log(solution(["ABCD", "ABCD", "ABCD"], [2, 3, 4]));

console.log([
  "AB",
  "ABC",
  "ABCD",
  "ABD",
  "AC",
  "ACD",
  "AD",
  "BC",
  "BCD",
  "BD",
  "CD",
]);
