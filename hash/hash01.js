//https://programmers.co.kr/learn/courses/30/lessons/42576
function solution(participant, completion) {
    var answer = "";
    var temp = [];
    
    //동명이인이 몇명인지 카운트
    for(var i =0, target; target = participant[i]; i++){
        if(temp[target]){
           temp[target]++;
        }else{
            temp[target] = 1;
        }
    }
    //완주한 사람은 제거
    for(var i =0, target; target = completion[i]; i++){
        temp[target]--;
    }
    
    var keys = Object.keys(temp);//동명이인 이름 중복 제거된 값
    
    //temp 값이 0이 아닌 것을 추출
    for(var i =0, target; target = keys[i]; i++){
        if(temp[target] > 0){
            answer = target;
            break;
        }
    }
    return answer;
}