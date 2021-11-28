// https://programmers.co.kr/learn/courses/30/lessons/68644
function solution(numbers) {
    const answer = [];
    let startIndex = 0;
    
    numbers.forEach((num, idx) => {
        numbers.forEach((tempNum, sIdx) => {
            if (sIdx > startIndex) {
                const result = num + tempNum;

                if (answer.indexOf(result) === -1) {
                    answer.push(result);
                }
            }
        });
        startIndex++;
    });
    
   return answer.sort((a,b) => a-b);
}
