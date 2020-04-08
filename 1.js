//https://tech.kakao.com/2017/09/27/kakao-blind-recruitment-round-1/

'use strict'

/*
n	5
arr1	[9, 20, 28, 18, 11]
arr2	[30, 1, 21, 17, 28]
출력	["#####","# # #", "### #", "# ##", "#####"]
*/
const problem1_1  = () => {
    let n = 5,
        arr1 = [9, 20, 28, 18, 11],
        arr2 = [30, 1, 21, 17, 28],
        result = [];
    
    for (let i =0; i < n; i++) {
        result[i] = (arr1[i] | arr2[i]).toString(2);
        
        result[i] = result[i].replace(/1/gi,"#");
        result[i] = result[i].replace(/0/gi," ");
    }
    
    console.log(result);
}

/*
n	6
arr1	[46, 33, 33 ,22, 31, 50]
arr2	[27 ,56, 19, 14, 14, 10]
출력	["######", "###  #", "##  ##", " #### ", " #####", "### # "]
*/
const problem1_2  = () => {
    let n = 6,
        arr1 = [46, 33, 33 ,22, 31, 50],
        arr2 = [27 ,56, 19, 14, 14, 10],
        arrString1 = [],
        arrString2 = [],
        result = [];
    
    for (let i =0; i < n; i++) {
        arrString1[i] = ("00000"+(arr1[i].toString(2))).substr(n * -1);
        arrString2[i] = ("00000"+(arr2[i].toString(2))).substr(n * -1);

        result[i] = "";

        for (let j =0; j < n; j++) {
            result[i] += (arrString1[i][j] | arrString2[i][j])? '1' : "0";
        }

        result[i] = result[i].replace(/1/gi,"#");
        result[i] = result[i].replace(/0/gi," ");
    }
    
    console.log(result);
}

problem1_1();
problem1_2();