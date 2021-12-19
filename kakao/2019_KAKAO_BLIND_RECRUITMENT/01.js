function solution(records) {
  var answer = [];

  const user = {};

  records.forEach((record) => {
    const [action, id, nick] = record.split(" ");

    if (action === "Enter" || action === "Leave") {
      answer.push(record);
    }

    if (action === "Enter" || action === "Change") {
      user[id] = nick;
    }
  });

  return answer.map((record) => {
    const [action, id] = record.split(" ");

    switch (action) {
      case "Enter":
        return `${user[id]}님이 들어왔습니다.`;
      case "Leave":
        return `${user[id]}님이 나갔습니다.`;
      default:
        break;
    }
  });
}
