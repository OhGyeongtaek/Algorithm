//https://programmers.co.kr/learn/courses/30/lessons/17680
function solution(cacheSize, cities) {
    if (cacheSize === 0) return 5 * cities.length;
    
    let answer = 0;
    let cache = [];
    let cityCnt = cities.length;

    cities.forEach((city, i) => {
        city = city.toUpperCase(); 
        let idx = cache.indexOf(city);
        
        if(idx > -1){
           cache.splice(idx, 1);
           answer += 1;
        } else {
            if ( cache.length >= cacheSize ) {
                cache.shift();
            }
            answer += 5;
        }
        
        cache.push(city);
    });
     
    return answer;
}