function solution(lottos, win_nums) {
  const board = [6, 6, 5, 4, 3, 2, 1];

  const zeros = lottos.filter((num) => num === 0);
  const zeroCount = zeros.length;

  const win = lottos.filter((num) => win_nums.includes(num));
  const winCount = win.length + zeroCount;

  return [winCount >= 6 ? 1 : board[winCount], board[win.length]];
}
