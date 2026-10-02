/* 2학년 2학기용 그림 부품 — 네 자리 수 모형, 돈, 표, 그래프, 덧셈표·곱셈표, 달력, 시간 띠, 줄자, 새 친구들 */
(function (g) {
  'use strict';
  const V = g.V;
  const DOW = ['일', '월', '화', '수', '목', '금', '토'];
  V.DOW = DOW;

  /* 네 자리 수 모형: 천 모형(큰 정사각형 덩어리), 백 모형, 십 모형, 일 모형 */
  V.blocks4 = function (n) {
    const th = Math.floor(n / 1000), h = Math.floor(n / 100) % 10, t = Math.floor(n / 10) % 10, u = n % 10;
    let s = '<div class="blocks3 b4" role="img" aria-label="수 모형 ' + n + '"><div class="bth">';
    for (let i = 0; i < th; i++) s += '<i class="thou"></i>';
    s += '</div><div class="bh">';
    for (let i = 0; i < h; i++) s += '<i class="flat"></i>';
    s += '</div><div class="bt">';
    for (let i = 0; i < t; i++) s += '<i class="rod"></i>';
    s += '</div><div class="bo">';
    for (let i = 0; i < u; i++) s += '<i class="cube"></i>';
    return s + '</div></div>';
  };

  /* 돈: 1000원 지폐, 100원·10원·1원 동전 */
  V.coins = function (th, h, t, o) {
    let s = '<div class="coins" role="img" aria-label="돈 ' + (th * 1000 + h * 100 + t * 10 + o) + '원">';
    for (let i = 0; i < th; i++) s += '<span class="cn c1000">1000</span>';
    for (let i = 0; i < h; i++) s += '<span class="cn c100">100</span>';
    for (let i = 0; i < t; i++) s += '<span class="cn c10">10</span>';
    for (let i = 0; i < o; i++) s += '<span class="cn c1">1</span>';
    return s + '</div>';
  };

  /* 표: head 는 항목 이름들, vals 는 수(또는 '_' 빈칸) */
  V.table = function (title, head, vals, o) {
    o = o || {};
    let s = '<table class="tbl"><tr><th>' + (o.corner || '항목') + '</th>' + head.map(function (x) { return '<th>' + x + '</th>'; }).join('') + (o.total !== undefined ? '<th>합계</th>' : '') + '</tr>';
    s += '<tr><th>' + title + '</th>' + vals.map(function (x) { return x === '_' ? '<td class="tb">?</td>' : '<td>' + x + '</td>'; }).join('') + (o.total !== undefined ? (o.total === '_' ? '<td class="tb">?</td>' : '<td>' + o.total + '</td>') : '') + '</tr></table>';
    return s;
  };

  /* ○ 그래프: 칸마다 ○ 하나가 1명(1개)을 나타내요 */
  V.graph = function (cats, vals, o) {
    o = o || {};
    const max = o.max || Math.max.apply(null, vals), cell = o.small ? 15 : 26;
    let s = '<div class="gph' + (o.small ? ' sm' : '') + '" style="--cell:' + cell + 'px" role="img" aria-label="그래프"><div class="gy">';
    for (let r = max; r >= 1; r--) s += '<span>' + r + '</span>';
    s += '</div>';
    cats.forEach(function (c, i) {
      s += '<div class="gcol"><div class="gcells">';
      for (let r = max; r >= 1; r--) s += '<i class="gcell' + (r <= vals[i] ? ' on' : '') + '"></i>';
      s += '</div><span class="gl">' + c + '</span></div>';
    });
    return s + '</div>';
  };

  /* 덧셈표·곱셈표: rows 는 세로 머리글, cols 는 가로 머리글. blank/shade 는 'r,c' 키 목록 */
  V.opTable = function (op, rows, cols, o) {
    o = o || {};
    const f = op === '+' ? function (a, b) { return a + b; } : function (a, b) { return a * b; };
    let s = '<table class="optab"><tr><th class="op0">' + op + '</th>' + cols.map(function (c) { return '<th>' + c + '</th>'; }).join('') + '</tr>';
    rows.forEach(function (r, i) {
      s += '<tr><th>' + r + '</th>' + cols.map(function (c, j) {
        const key = i + ',' + j;
        if (o.blank && o.blank.indexOf(key) >= 0) return '<td class="tb">?</td>';
        return '<td' + (o.shade && o.shade.indexOf(key) >= 0 ? ' class="sh"' : '') + '>' + f(r, c) + '</td>';
      }).join('') + '</tr>';
    });
    return s + '</table>';
  };

  /* 번호 칸(신발장, 사물함 번호): cols 개씩 한 줄 */
  V.numGrid = function (cols, rows, start, blank) {
    let s = '<div class="ngrid" style="--c:' + cols + '" role="img" aria-label="번호표">';
    for (let i = 0; i < cols * rows; i++) { const n = start + i; s += n === blank ? '<span class="ng bl">?</span>' : '<span class="ng">' + n + '</span>'; }
    return s + '</div>';
  };

  /* 달력: startDow 는 1일의 요일(0=일요일), days 는 그 달의 날수 */
  V.calendar = function (startDow, days, o) {
    o = o || {};
    let s = '<table class="cal" role="img" aria-label="달력"><tr>' + DOW.map(function (d, i) { return '<th class="' + (i === 0 ? 'su' : (i === 6 ? 'sa' : '')) + '">' + d + '</th>'; }).join('') + '</tr><tr>';
    let col = 0;
    for (let i = 0; i < startDow; i++) { s += '<td></td>'; col++; }
    for (let d = 1; d <= days; d++) {
      s += '<td class="' + (col === 0 ? 'su ' : (col === 6 ? 'sa ' : '')) + (o.hl && o.hl.indexOf(d) >= 0 ? 'hl' : '') + '">' + d + '</td>';
      col++;
      if (col === 7 && d < days) { s += '</tr><tr>'; col = 0; }
    }
    while (col > 0 && col < 7) { s += '<td></td>'; col++; }
    return s + '</tr></table>';
  };

  /* 시간 띠: h0시부터 h1시까지, startMin~endMin(h0시를 0으로 센 분)을 칠해요 */
  V.timeline = function (h0, h1, startMin, endMin) {
    const span = h1 - h0, u = span > 2 ? 4.2 : 6, W = span * 60 * u + 20;
    let s = '<svg class="tline" viewBox="0 0 ' + W + ' 66" width="' + W + '" height="66" role="img" aria-label="시간 띠">';
    s += '<rect x="10" y="8" width="' + (span * 60 * u) + '" height="26" rx="5" class="tl-bg"/>';
    s += '<rect x="' + (10 + startMin * u) + '" y="8" width="' + ((endMin - startMin) * u) + '" height="26" rx="4" class="tl-fg"/>';
    for (let m = 0; m <= span * 60; m += 10) {
      const x = 10 + m * u, big = m % 60 === 0;
      s += '<line x1="' + x + '" y1="' + (big ? 6 : 28) + '" x2="' + x + '" y2="36" class="tl-t"/>';
      if (big) s += '<text x="' + x + '" y="56" text-anchor="middle" class="tl-n">' + (((h0 + m / 60 - 1) % 12) + 1) + '시</text>';
    }
    return s + '</svg>';
  };

  /* 줄자: from 부터 13칸을 보여 주고 val 에 화살표 */
  V.rulerWindow = function (from, val) {
    const u = 34, W = 13 * u + 20;
    let s = '<svg class="ruler" viewBox="0 0 ' + W + ' 110" width="' + W + '" height="110" role="img" aria-label="줄자">';
    const ax = 10 + (val - from) * u;
    s += '<polygon points="' + (ax - 9) + ',4 ' + (ax + 9) + ',4 ' + ax + ',24" fill="#E8505B"/>';
    s += '<rect x="2" y="28" width="' + (W - 4) + '" height="74" rx="5" class="rl-body"/>';
    for (let i = 0; i <= 12; i++) {
      const x = 10 + i * u, n = from + i, hund = n % 100 === 0;
      s += '<line x1="' + x + '" y1="28" x2="' + x + '" y2="' + (hund ? 62 : 52) + '" class="' + (hund ? 'rl-g2' : 'rl-t') + '"/>';
      s += '<text x="' + x + '" y="86" text-anchor="middle" class="rl-n' + (hund ? ' hun' : '') + '">' + n + '</text>';
    }
    return s + '</svg>';
  };

  /* 조사한 자료: 한 명이 한 장씩 */
  V.votes = function (list) {
    return '<div class="votes" role="img" aria-label="조사한 자료">' + list.map(function (x) { return '<span class="vt">' + x + '</span>'; }).join('') + '</div>';
  };
  V.objScene = function (names, size) {
    return '<div class="scene" role="img" aria-label="물건 모음">' + names.map(function (n) { return V.obj(n, size || 44); }).join('') + '</div>';
  };

  /* 새 친구들 (art 12~17) */
  const baseFriend = V.friend;
  V.friend = function (i, size, name) {
    if (i < 12) return baseFriend(i, size, name);
    size = size || 72;
    const eyes = function (y, c) {
      return '<circle cx="27" cy="' + y + '" r="3.5" fill="' + (c || '#1E2B45') + '"/><circle cx="45" cy="' + y + '" r="3.5" fill="' + (c || '#1E2B45') + '"/>';
    };
    const cheeks = function (y) { return '<circle cx="20" cy="' + y + '" r="4" fill="#FF9C8A"/><circle cx="52" cy="' + y + '" r="4" fill="#FF9C8A"/>'; };
    let s = '';
    if (i === 12) { // 펭이
      s = '<ellipse cx="36" cy="40" rx="27" ry="30" fill="#2B3A55"/><ellipse cx="36" cy="46" rx="18" ry="22" fill="#F4F7FB"/>' + eyes(30, '#fff') + '<circle cx="27" cy="30" r="1.8" fill="#1E2B45"/><circle cx="45" cy="30" r="1.8" fill="#1E2B45"/>' +
        '<polygon points="30,37 42,37 36,45" fill="#F2A33A"/>' + cheeks(40) + '<path d="M10 44 C2 54 6 64 14 62Z M62 44 C70 54 66 64 58 62Z" fill="#2B3A55"/><ellipse cx="27" cy="68" rx="7" ry="3" fill="#F2A33A"/><ellipse cx="45" cy="68" rx="7" ry="3" fill="#F2A33A"/>';
    } else if (i === 13) { // 판다
      s = '<circle cx="13" cy="15" r="9" fill="#2B2B33"/><circle cx="59" cy="15" r="9" fill="#2B2B33"/><circle cx="36" cy="40" r="29" fill="#F8F8F8" stroke="#E1E5EC"/>' +
        '<ellipse cx="25" cy="35" rx="7" ry="9" fill="#2B2B33" transform="rotate(-18 25 35)"/><ellipse cx="47" cy="35" rx="7" ry="9" fill="#2B2B33" transform="rotate(18 47 35)"/>' +
        '<circle cx="26" cy="35" r="2.6" fill="#fff"/><circle cx="46" cy="35" r="2.6" fill="#fff"/><ellipse cx="36" cy="47" rx="4" ry="3" fill="#2B2B33"/><path d="M31 52 Q36 57 41 52" fill="none" stroke="#2B2B33" stroke-width="2.4" stroke-linecap="round"/>';
    } else if (i === 14) { // 여우
      s = '<polygon points="8,32 12,4 32,18" fill="#E8742A"/><polygon points="64,32 60,4 40,18" fill="#E8742A"/><polygon points="14,26 15,12 25,19" fill="#2B2B33"/><polygon points="58,26 57,12 47,19" fill="#2B2B33"/>' +
        '<ellipse cx="36" cy="42" rx="29" ry="27" fill="#F28A3C"/><path d="M8 48 C20 44 28 58 36 66 C44 58 52 44 64 48 C60 62 48 70 36 70 C24 70 12 62 8 48Z" fill="#fff"/>' + eyes(36) + cheeks(46) + '<ellipse cx="36" cy="56" rx="4" ry="3" fill="#1E2B45"/>';
    } else if (i === 15) { // 토끼
      s = '<ellipse cx="24" cy="16" rx="8" ry="17" fill="#F5F0F4"/><ellipse cx="48" cy="16" rx="8" ry="17" fill="#F5F0F4"/><ellipse cx="24" cy="17" rx="4" ry="12" fill="#F7B6C8"/><ellipse cx="48" cy="17" rx="4" ry="12" fill="#F7B6C8"/>' +
        '<circle cx="36" cy="46" r="26" fill="#FBF8FA" stroke="#E4DCE2"/>' + eyes(42) + cheeks(51) + '<ellipse cx="36" cy="49" rx="3.4" ry="2.6" fill="#F28CA8"/><path d="M32 54 Q36 58 40 54" fill="none" stroke="#1E2B45" stroke-width="2.2" stroke-linecap="round"/><rect x="33" y="55" width="6" height="7" rx="1.5" fill="#fff" stroke="#E4DCE2"/>';
    } else if (i === 16) { // 고래
      s = '<path d="M36 6 C30 12 26 14 22 12 M36 6 C42 12 46 14 50 12" fill="none" stroke="#7FC8F0" stroke-width="3" stroke-linecap="round"/><ellipse cx="34" cy="44" rx="29" ry="22" fill="#3A8FD6"/><ellipse cx="34" cy="53" rx="20" ry="11" fill="#CFE9FA"/>' +
        '<path d="M60 40 C68 30 72 36 70 44 C72 52 66 56 60 50Z" fill="#3A8FD6"/>' + eyes(40) + cheeks(47) + '<path d="M26 50 Q34 56 42 50" fill="none" stroke="#1E2B45" stroke-width="2.4" stroke-linecap="round"/>';
    } else { // 사자
      let m = '';
      for (let k = 0; k < 12; k++) { const a = k * Math.PI / 6; m += '<circle cx="' + (36 + 24 * Math.cos(a)).toFixed(1) + '" cy="' + (38 + 24 * Math.sin(a)).toFixed(1) + '" r="10" fill="#C77A2A"/>'; }
      s = m + '<circle cx="36" cy="38" r="22" fill="#F5C45B"/>' + eyes(34) + cheeks(43) + '<ellipse cx="36" cy="45" rx="9" ry="7" fill="#FBE3A4"/><ellipse cx="36" cy="42" rx="3.4" ry="2.6" fill="#1E2B45"/><path d="M31 48 Q36 53 41 48" fill="none" stroke="#1E2B45" stroke-width="2.2" stroke-linecap="round"/>';
    }
    return '<svg viewBox="0 0 72 72" width="' + size + '" height="' + size + '" role="img" aria-label="' + (name || '친구') + '">' + s + '</svg>';
  };

  g.V = V;
})(typeof window !== 'undefined' ? window : globalThis);
