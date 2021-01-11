function solution(n) {
    let answer = [];
    const max = getMax(n);
    const pyramid = [];

    //피라미드 데이터 초기화
    for (let i = 1; i <= n; i++) {
        pyramid[i-1] = [];
        for (let j = 0; j < i; j++) {
            pyramid[i-1][j] = true;
        }
    }
  
    /*
        x = x축 인덱스
        y = y축 인덱스
        v = value
    */
    for (let x=0, y=0, v=0; v < max;) {
        if (pyramid[y+1] && pyramid[y+1][x] === true) {
            pyramid[y++][x] = ++v;
            continue;
        }
        
        if (pyramid[y][x+1] === true) {
            pyramid[y][x++] = ++v;
            continue;
        }

        while (pyramid[y][x+1] !== true && pyramid[y][x] === true && v < max) {
          console.log(y, x)
          pyramid[y][x] = ++v;

          if (pyramid[y-1][x-1] === true) {
            y--;
            x--;
          }
        }
    }

    pyramid.forEach((row) => {
        answer = answer.concat(row);
    });
    return pyramid;
    return answer;
}

function getMax(n) {
    return n === 1 ? 1 : getMax(n-1) + n;
}

console.log(solution(7));