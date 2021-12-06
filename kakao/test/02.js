function solution(n, a, cards) {
  // Write your code here

  let answer = 0;
  const cardArray = cards.split("");

  // 조르디가 부전승을 할 경우
  if (a === n - 1 && a % 2 === 1) {
    const winCard = getWinner(cards[a - 2], cards[a - 1]);
    const firtCard = getWinCard(winCard);
    cardArray.splice(a, 0, firtCard);
  } else {
    const firtCard = getWinCard(cards[a % 2 === 1 ? a - 1 : a]);
    cardArray.splice(a, 0, firtCard);
  }

  /**
   *
   * @param {String} str : cards
   * @param {Number} point : 조르디의 위치
   */
  (function tournament(str, point) {
    const len = str.length;

    if (len === 1) return;

    let result = "";
    let nextPoint = null;

    for (let i = 0; i < len; i += 2) {
      // 조르디가 있는 경기인경우
      if (i === point || i + 1 === point) {
        const winCard = getWinCard(str[i === point ? i + 1 : i]);

        result += winCard;
        nextPoint = result.length - 1;

        if (winCard !== str[point]) {
          answer++;
        }
        continue;
      }

      result += getWinner(str[i], str[i + 1]);
    }
    tournament(result, nextPoint);
  })(cardArray.join(""), a);

  function getWinCard(targetCard) {
    switch (targetCard) {
      case "P":
        return "S";
      case "S":
        return "R";
      case "R":
        return "P";
      default:
        break;
    }
  }

  function getWinner(a, b) {
    if (a === b) return "";

    if (b === undefined) return a;

    switch (a) {
      case "P":
        return b === "R" ? a : b;
      case "S":
        return b === "P" ? a : b;
      case "R":
        return b === "S" ? a : b;
      default:
        break;
    }
  }

  return answer;
}

console.log(solution(6, 2, "PPSRP"));
