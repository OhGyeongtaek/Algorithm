//https://tech.kakao.com/2017/09/27/kakao-blind-recruitment-round-1/

'use strict'

const tester = () => {
    let vals = [
        [ 3, ["Jeju", "Pangyo", "Seoul", "NewYork", "LA", "Jeju", "Pangyo", "Seoul", "NewYork", "LA"], 50 ],
        [ 3, ["Jeju", "Pangyo", "Seoul", "Jeju", "Pangyo", "Seoul", "Jeju", "Pangyo", "Seoul"], 21 ],
        [ 2, ["Jeju", "Pangyo", "Seoul", "NewYork", "LA", "SanFrancisco", "Seoul", "Rome", "Paris", "Jeju", "NewYork", "Rome"], 60 ],
        [ 5, ["Jeju", "Pangyo", "Seoul", "NewYork", "LA", "SanFrancisco", "Seoul", "Rome", "Paris", "Jeju", "NewYork", "Rome"], 52 ],
        [ 2, ["Jeju", "Pangyo", "NewYork", "newyork"], 16 ],
        [ 0, ["Jeju", "Pangyo", "Seoul", "NewYork", "LA"], 25 ]
    ]

    vals.forEach(( val, idx ) => {
        getActionTime(val) === val[2] 
            ? console.log("True") 
            : console.log("False");
    });
}

/* val = [cacheSize, cities, result] */
const getActionTime = (val) => {
    if (val[0] === 0) return 5 * val[1].length;

    let time = 0;
    let cache = [];

    val[1].forEach(( city ) => {
        city = city.toUpperCase();

        let idx = cache.indexOf(city);

        if(idx > -1){
           cache.splice(idx, 1);
           time += 1;
        } else {
            if ( cache.length >= val[0] ) {
                cache.shift();
            }
            time += 5;
        }
        
        cache.push(city);
    });
    
    return time;
}

tester();