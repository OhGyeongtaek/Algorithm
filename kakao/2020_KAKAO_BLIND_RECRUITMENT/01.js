function solution(words, queries) {
  const DB = [];
  const RE_DB = [];

  words.forEach((word) => {
    if (!DB[word.length]) {
      DB[word.length] = { cnt: 0 };
      RE_DB[word.length] = { cnt: 0 };
    }

    createDBData(word, DB[word.length]);
    createDBData(word.reserve(), RE_DB[word.length]);
  });

  function createDBData(word, trie) {
    let temp = trie;
    temp.cnt++;

    for (let i = 0; i < word.length; i++) {
      if (!temp[word[i]]) {
        temp[word[i]] = { cnt: 0 };
      }

      temp = temp[word[i]];
      temp.cnt++;
    }
  }

  function search(query, idx, dbLink) {
    if (!dbLink) {
      return 0;
    }

    if (query[idx] === "?") {
      return dbLink.cnt;
    }

    return search(query, idx + 1, dbLink[query[idx]]);
  }

  return queries.map((query) => {
    if (query[0] === "?") {
      return search(query.reserve(), 0, RE_DB[query.length]);
    }

    return search(query, 0, DB[query.length]);
  });
}

String.prototype.reserve = function () {
  return this.split("").reverse().join("");
};

console.log(
  solution(
    ["frodo", "front", "frost", "frozen", "frame", "kakao"],
    ["fro??", "????o", "fr???", "fro???", "pro?"]
  )
);
