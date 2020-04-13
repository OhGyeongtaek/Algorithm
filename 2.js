'use strict'

// let input = "1S2D*3T";
// let input = "1D2S#10S";
// let input = "1D2S0T";
// let input = "1S*2T*3S";
// let input = "1D#2S*3S";
// let input = "1T2D3D#";
let input = "1D2S3T*";

let stage = 0;
let stagePoint = [];

let total = 0;
let len = input.length;

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
          total += stagePoint[stage];
        break;
        case "D" : 
          stagePoint[stage] = Math.pow(stagePoint[stage],2);
          total += stagePoint[stage];
        break;
        case "T" : 
          stagePoint[stage] = Math.pow(stagePoint[stage], 3);
          total += (stagePoint[stage]);
        break;
        default : break;
      }

      stage++;
    break;
      
    case /[*|#]/.test(input[i]) : 
      if( input[i] === "*" ){
        total += stagePoint[stage -1];
        stagePoint[stage -1] *= 2;

        if(stage > 1){
          total += stagePoint[stage -2];
          stagePoint[stage -2] *= 2;
        }
      } else if( input[i] === "#" ) {
        total -= stagePoint[stage -1] * 2;
        stagePoint[stage -1] *= -1;
      }
    break;
    default : break;
  }
}

console.log(total);