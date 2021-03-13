let values = null;
const answer = [];

function solution(arr) {
    values = arr;


    arr.forEach((arr2) => {
        arr2.forEach(val => {
            if (!answer[val]) answer[val] = 1;
            else answer[val]++;
        });
    });

    for(let i=0; i < arr.length / 4; i++) {
        blockCheck(i, 0, 0);
        blockCheck(i, 0, 2);
        blockCheck(i, 2, 0);
        blockCheck(i, 2, 2);
    }

    return answer;
}

function blockCheck(i, v1, v2) {
    if (i === 0) {
        const value = values[v1][v2]; 
        const isMerge = value === values[v1][v2+1]
                     && value === values[v1+1][v2]
                     && value === values[v1+1][v2+1];

        if (isMerge) merge(i, v1, v2, value);

        return isMerge;
    }
}

function merge(i, v1, v2, value) {
    values[v1][v2] = {
        value,
        size : i * 4
    };
    answer[value] -= 3;
}

const test1 = [[1,1,0,0],[1,0,0,0],[1,0,0,1],[1,1,1,1]];

console.log(solution(test1));