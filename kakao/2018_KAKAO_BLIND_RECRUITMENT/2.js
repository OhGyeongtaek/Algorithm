//https://programmers.co.kr/learn/courses/30/lessons/17682
function solution(input) {
  let stage = 0;
  let stagePoint = [];

  let len = input.length;
  var answer = 0;
  
  for(let i =0; i < len; i++){
    switch(true) {
      case /[0-9]/.test(input[i]) : 
        stagePoint[stage] = parseInt(input[i]);

        if( input[i] === "1" && input[i+1] === "0" ) {
          stagePoint[stage] = 10;
          i++;
        }
      break;

      case /[S|D|T]/.test(input[i]) : 
        switch(input[i]) {
          case "S" :
            answer += stagePoint[stage];
          break;
          case "D" : 
            stagePoint[stage] = stagePoint[stage] ** 2;
            answer += stagePoint[stage];
          break;
          case "T" : 
            stagePoint[stage] = stagePoint[stage] ** 3;
            answer += (stagePoint[stage]);
          break;
          default : break;
        }

        stage++;
      break;

      case /[*|#]/.test(input[i]) : 
        if( input[i] === "*" ){
          answer += stagePoint[stage -1];
          stagePoint[stage -1] *= 2;

          if(stage > 1){
            answer += stagePoint[stage -2];
            stagePoint[stage -2] *= 2;
          }
        } else if( input[i] === "#" ) {
          answer -= stagePoint[stage -1] * 2;
          stagePoint[stage -1] *= -1;
        }
      break;
      default : break;
    }
  }
  
  return answer;
}