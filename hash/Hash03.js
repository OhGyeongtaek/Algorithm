function solution(clothes) {
    var answer = 1;
    var types = {};
    
    /* 옷이 종류별로 몇가지가 있는지 Count */
    
    clothes.forEach((val) =>{
        types[val[1]] = types[val[1]] ? types[val[1]]+1 : 1;
    });

    /* types 객체의 key 값을 가져옴 */
    var keys = Object.keys(types);
    
    keys.forEach((key) => {
        const target = types[key];
        answer *= target+1;
    });

    return answer-1;
}