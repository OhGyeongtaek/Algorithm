let answer = 0;
let nums = null;
let target = 0;

const solution = (numbers, t) => {
  nums = numbers;
  target = t;
  calc(0, 0);
  return answer;
};

const calc = (val, idx) => {
  if (idx > nums.length) return;

  if (idx === nums.length) {
    val === target && answer++;
    return;
  }

  calc(val + nums[idx], idx + 1);
  calc(val - nums[idx], idx + 1);
};
