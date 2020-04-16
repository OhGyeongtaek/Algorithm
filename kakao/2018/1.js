//https://programmers.co.kr/learn/courses/30/lessons/17681
function solution(n, arr1, arr2) {
    var answer = [];
    
    let arrString1 = [],
        arrString2 = [];
    
    for (let i =0; i < n; i++) {
        arrString1[i] = ("0".repeat( n ) + (arr1[i].toString(2))).substr(n * -1);
        arrString2[i] = ("0".repeat( n ) +(arr2[i].toString(2))).substr(n * -1);

        answer[i] = "";

        for (let j =0; j < n; j++) {
            answer[i] += (arrString1[i][j] | arrString2[i][j])? '1' : "0";
        }

        answer[i] = answer[i].replace(/1/gi,"#");
        answer[i] = answer[i].replace(/0/gi," ");
    }
    
    return answer;
}