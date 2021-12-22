const openBody = "<body>";
const closeBody = "</body>";

function solution(word, pages) {
  const keyword = word.toLowerCase();
  const infos = [];

  function getURL(pageArr) {
    let url = "";

    pageArr.forEach((code) => {
      if (code.indexOf("meta property") > -1) {
        url = code.match(/"https:\S*"/gi)[0];
      }
    });

    return url.replace(/["]/g, "");
  }

  function getContents(pageArr) {
    let start = 0;
    let finish = 0;

    pageArr.forEach((code, idx) => {
      if (code.indexOf(openBody) > -1) start = idx;
      if (code.indexOf(closeBody) > -1) finish = idx;
    });

    return pageArr.slice(start + 1, finish);
  }

  function getHrefs(contents) {
    const hrefs = [];

    console.log(contents);
    contents.forEach((str) => {
      if (str.indexOf("a href=") > -1) {
        str.match(/<a href="https:\S*"/gi).forEach((url) => {
          hrefs.push(url.substr(9, url.length).replace('"', ""));
        });
      }
    });

    return hrefs;
  }

  pages.forEach((page, idx) => {
    const pageArr = page.toLowerCase().split("\n");

    infos.push({
      idx,
      pageArr,
      href: getURL(pageArr),
      linkCount: 0,
      links: [],
      basePoint: 0,
    });
  });

  infos.forEach((info) => {
    const contents = getContents(info.pageArr);
    const hrefs = getHrefs(contents);

    info.linkCount = hrefs.length;
    info.basePoint = contents
      .flatMap((str) => str.split(/[\d|\W]/))
      .filter((str) => str === keyword).length;

    hrefs.forEach((href) => {
      const idx = infos.findIndex((item) => item.href === href);
      if (idx > -1) {
        infos[idx].links.push(info);
      }
    });
  });

  infos.forEach((info) => {
    info.matchPoint =
      info.basePoint +
      info.links.reduce((acc, cur) => acc + cur.basePoint / cur.linkCount, 0);
  });

  console.log(infos);

  infos.sort(({ matchPoint: ma, idx: ia }, { matchPoint: mb, idx: ib }) =>
    mb === ma ? ia - ib : mb - ma
  );

  return infos[0].idx;
}

// console.log(
//   solution("Muzi", [
//     '<html lang="ko" xml:lang="ko" xmlns="http://www.w3.org/1999/xhtml">\n<head>\n  <meta charset="utf-8">\n  <meta property="og:url" content="https://careers.kakao.com/interview/list"/>\n</head>  \n<body>\n<a href="https://programmers.co.kr/learn/courses/4673"></a>#!MuziMuzi!)jayg07con&&\n\n</body>\n</html>',
//     '<html lang="ko" xml:lang="ko" xmlns="http://www.w3.org/1999/xhtml">\n<head>\n  <meta charset="utf-8">\n  <meta property="og:url" content="https://www.kakaocorp.com"/>\n</head>  \n<body>\ncon%\tmuzI92apeach&2<a href="https://hashcode.co.kr/tos"></a>\n\n\t^\n</body>\n</html>',
//   ])
// );

console.log(
  solution("blind", [
    '<html lang="ko" xml:lang="ko" xmlns="http://www.w3.org/1999/xhtml">\n<head>\n  <meta charset="utf-8">\n  <meta property="og:url" content="https://a.com"/>\n</head>  \n<body>\nBlind Lorem Blind ipsum dolor Blind test sit amet, consectetur adipiscing elit. \n<a href="https://b.com"> Link to b </a>\n</body>\n</html>',
    '<html lang="ko" xml:lang="ko" xmlns="http://www.w3.org/1999/xhtml">\n<head>\n  <meta charset="utf-8">\n  <meta property="og:url" content="https://b.com"/>\n</head>  \n<body>\nSuspendisse potenti. Vivamus venenatis tellus non turpis bibendum, \n<a href="https://a.com"> Link to a </a>\nblind sed congue urna varius. Suspendisse feugiat nisl ligula, quis malesuada felis hendrerit ut.\n<a href="https://c.com"> Link to c </a>\n</body>\n</html>',
    '<html lang="ko" xml:lang="ko" xmlns="http://www.w3.org/1999/xhtml">\n<head>\n  <meta charset="utf-8">\n  <meta property="og:url" content="https://c.com"/>\n</head>  \n<body>\nUt condimentum urna at felis sodales rutrum. Sed dapibus cursus diam, non interdum nulla tempor nec. Phasellus rutrum enim at orci consectetu blind\n<a href="https://a.com"> Link to a </a>\n</body>\n</html>',
  ])
);
