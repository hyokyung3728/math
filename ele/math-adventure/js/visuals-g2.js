/* 2학년 1학기용 그림 부품 — 세 자리 수 모형, 도형, 칠교, 쌓기나무, 길이, 자, 묶음, 새 친구들 */
(function (g) {
  'use strict';
  const V = g.V;
  const rnd = function (a, b) { return a + Math.random() * (b - a); };
  const pick = function (a) { return a[Math.floor(Math.random() * a.length)]; };

  /* 세 자리 수 모형: 백 모형(큰 정사각형), 십 모형(막대), 일 모형(작은 조각) */
  V.blocks3 = function (n) {
    const h = Math.floor(n / 100), t = Math.floor(n / 10) % 10, u = n % 10;
    let s = '<div class="blocks3" role="img" aria-label="수 모형 ' + n + '"><div class="bh">';
    for (let i = 0; i < h; i++) s += '<i class="flat"></i>';
    s += '</div><div class="bt">';
    for (let i = 0; i < t; i++) s += '<i class="rod"></i>';
    s += '</div><div class="bo">';
    for (let i = 0; i < u; i++) s += '<i class="cube"></i>';
    return s + '</div></div>';
  };
  V.cards = function (ds) { return '<div class="cards">' + ds.map(function (d) { return '<span class="card3">' + d + '</span>'; }).join('') + '</div>'; };

  /* 도형: tri 삼각형, quad 사각형, pent 오각형, hex 육각형, circle 원, oval 타원, open 닫히지 않은 도형 */
  const TRIS = [[[30, 6], [55, 52], [5, 52]], [[8, 8], [8, 52], [54, 52]], [[10, 50], [54, 50], [40, 8]], [[6, 40], [52, 14], [44, 54]]];
  const QUADS = [[[8, 12], [52, 12], [52, 52], [8, 52]], [[6, 18], [54, 18], [54, 44], [6, 44]], [[18, 10], [42, 10], [54, 50], [6, 50]], [[16, 12], [54, 12], [44, 50], [6, 50]], [[30, 5], [52, 28], [30, 55], [8, 28]]];
  function regular(n) {
    const r0 = rnd(0, Math.PI * 2), pts = [];
    for (let i = 0; i < n; i++) { const a = r0 + i * Math.PI * 2 / n; pts.push([30 + 25 * Math.cos(a), 30 + 25 * Math.sin(a)]); }
    return pts;
  }
  const str = function (pts) { return pts.map(function (p) { return p[0].toFixed(1) + ',' + p[1].toFixed(1); }).join(' '); };
  V.POLY_VERTS = { tri: 3, quad: 4, pent: 5, hex: 6, circle: 0, oval: 0 };
  V.poly = function (kind, color, size) {
    size = size || 58; color = color || '#3A7BD5';
    let p;
    const st = ' stroke="#1E2B45" stroke-width="1.5" stroke-linejoin="round"';
    if (kind === 'tri') { const b = pick(TRIS); p = '<polygon points="' + str(b.map(function (q) { return [q[0] + rnd(-2, 2), q[1] + rnd(-2, 2)]; })) + '" fill="' + color + '"' + st + '/>'; }
    else if (kind === 'quad') { const b = pick(QUADS); p = '<polygon points="' + str(b.map(function (q) { return [q[0] + rnd(-1.5, 1.5), q[1] + rnd(-1.5, 1.5)]; })) + '" fill="' + color + '"' + st + '/>'; }
    else if (kind === 'pent') p = '<polygon points="' + str(regular(5)) + '" fill="' + color + '"' + st + '/>';
    else if (kind === 'hex') p = '<polygon points="' + str(regular(6)) + '" fill="' + color + '"' + st + '/>';
    else if (kind === 'circle') p = '<circle cx="30" cy="30" r="26" fill="' + color + '"' + st + '/>';
    else if (kind === 'oval') p = '<ellipse cx="30" cy="30" rx="27" ry="17" fill="' + color + '"' + st + '/>';
    else if (kind === 'open') p = '<polyline points="30,6 55,52 5,52" fill="none" stroke="' + color + '" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>';
    else p = '<polyline points="8,12 52,12 52,52 8,52" fill="none" stroke="' + color + '" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>';
    return '<svg viewBox="0 0 60 60" width="' + size + '" height="' + size + '" aria-hidden="true">' + p + '</svg>';
  };
  V.scenePoly = function (list, size) {
    return '<div class="scene" role="img" aria-label="도형 모음">' + list.map(function (s) { return V.poly(s.k, s.c, size || 46); }).join('') + '</div>';
  };

  /* 칠교판: 큰 삼각형 2, 중간 삼각형 1, 작은 삼각형 2, 정사각형 1, 평행사변형 1 */
  const TG = [
    { k: 'tri', sz: 'L', p: [[0, 0], [4, 0], [2, 2]] }, { k: 'tri', sz: 'L', p: [[0, 0], [2, 2], [0, 4]] }, { k: 'tri', sz: 'M', p: [[4, 4], [4, 2], [2, 4]] },
    { k: 'tri', sz: 'S', p: [[4, 0], [4, 2], [3, 1]] }, { k: 'tri', sz: 'S', p: [[1, 3], [3, 3], [2, 2]] },
    { k: 'quad', sz: 'sq', p: [[2, 2], [3, 1], [4, 2], [3, 3]] }, { k: 'quad', sz: 'pa', p: [[0, 4], [2, 4], [3, 3], [1, 3]] }
  ];
  const TGC = ['#E8505B', '#F2994A', '#F5B301', '#3A9D5D', '#3A7BD5', '#9C6ADE', '#D9558A'];
  V.tangram = function (size) {
    size = size || 220;
    let s = '<svg viewBox="-2 -2 92 92" width="' + size + '" height="' + size + '" role="img" aria-label="칠교판">';
    TG.forEach(function (t, i) { s += '<polygon points="' + t.p.map(function (q) { return q[0] * 22 + ',' + q[1] * 22; }).join(' ') + '" fill="' + TGC[i] + '" stroke="#fff" stroke-width="1.6" stroke-linejoin="round"/>'; });
    return s + '</svg>';
  };
  V.TG_COUNTS = { tri: 5, quad: 2, big: 2, small: 2, all: 7 };

  /* 쌓기나무를 앞에서 본 모양 */
  V.stack = function (hs) {
    return '<div class="stackv" role="img" aria-label="쌓기나무 ' + hs.join(', ') + '개">' + hs.map(function (h) {
      let c = ''; for (let i = 0; i < h; i++) c += '<i class="sq1"></i>';
      return '<div class="sc">' + c + '</div>';
    }).join('') + '</div>';
  };

  /* 길이: 막대들을 한쪽 끝을 맞추어 늘어놓기 */
  V.bars = function (list, o) {
    o = o || {};
    const u = o.unit || 20;
    return '<div class="lbars" role="img" aria-label="막대 길이 비교">' + list.map(function (it) {
      return '<div class="lbr"><span class="lb">' + it.label + '</span><i class="lbar" style="width:' + (it.len * u) + 'px;background:' + (it.color || '#7FA7EE') + (it.gap ? ';margin-left:' + (it.gap * u) + 'px' : '') + '"></i>' + (it.text ? '<span class="lt2">' + it.text + '</span>' : '') + '</div>';
    }).join('') + '</div>';
  };
  V.measureUnits = function (n, kind, u) {
    u = u || (n > 9 ? 24 : 30);
    let cells = '';
    for (let i = 0; i < n; i++) cells += '<i class="un ' + kind + '" style="width:' + u + 'px"></i>';
    return '<div class="mu" role="img" aria-label="길이 재기"><i class="mbar" style="width:' + (n * u) + 'px"></i><div class="mrow">' + cells + '</div></div>';
  };
  V.ruler = function (len, o) {
    o = o || {};
    const u = o.scale || 28, pad = 16, maxCm = o.max || 12, W = pad * 2 + maxCm * u, st = o.start || 0;
    let s = '<svg class="ruler" viewBox="0 0 ' + W + ' 100" width="' + W + '" height="100" role="img" aria-label="자와 막대">';
    s += '<rect x="' + (pad + st * u) + '" y="6" width="' + (len * u) + '" height="28" rx="7" fill="' + (o.color || '#F2A766') + '" stroke="#1E2B45" stroke-width="1.5"/>';
    s += '<rect x="' + (pad - 8) + '" y="44" width="' + (maxCm * u + 16) + '" height="52" rx="5" class="rl-body"/>';
    s += '<line x1="' + (pad + st * u) + '" y1="34" x2="' + (pad + st * u) + '" y2="44" class="rl-g"/><line x1="' + (pad + (st + len) * u) + '" y1="34" x2="' + (pad + (st + len) * u) + '" y2="44" class="rl-g"/>';
    for (let i = 0; i <= maxCm; i++) {
      const x = pad + i * u;
      s += '<line x1="' + x + '" y1="44" x2="' + x + '" y2="' + (44 + 20) + '" class="rl-t"/><text x="' + x + '" y="86" text-anchor="middle" class="rl-n">' + i + '</text>';
      if (i < maxCm) s += '<line x1="' + (x + u / 2) + '" y1="44" x2="' + (x + u / 2) + '" y2="' + (44 + 11) + '" class="rl-t"/>';
    }
    return s + '<text x="' + (W - pad + 4) + '" y="62" text-anchor="end" class="rl-c">cm</text></svg>';
  };

  /* 묶음 그림: a개씩 n묶음 */
  V.groups = function (a, n, color) {
    color = color || '#7FA7EE';
    let h = '<div class="grps" role="img" aria-label="' + a + '개씩 ' + n + '묶음">';
    for (let i = 0; i < n; i++) {
      h += '<span class="grp">';
      for (let j = 0; j < a; j++) h += '<i class="gd" style="background:' + color + '"></i>';
      h += '</span>';
    }
    return h + '</div>';
  };
  V.dots = function (n, color) {
    let h = '<div class="dotsg" role="img" aria-label="점 ' + n + '개">';
    for (let i = 0; i < n; i++) h += '<i class="gd" style="background:' + (color || '#7FA7EE') + '"></i>';
    return h + '</div>';
  };

  /* 분류하기: 색, 모양, 크기가 다른 물건들 */
  V.CNAME = { '#E8505B': '빨간색', '#3A7BD5': '파란색', '#F5B301': '노란색', '#3A9D5D': '초록색' };
  V.items = function (list) {
    return '<div class="scene" role="img" aria-label="분류할 물건들">' + list.map(function (s) { return V.shape(s.k, s.c, s.big ? 50 : 30); }).join('') + '</div>';
  };

  /* 새 친구들 (art 6~11) */
  const baseFriend = V.friend;
  V.friend = function (i, size, name) {
    if (i < 6) return baseFriend(i, size, name);
    size = size || 72;
    const eyes = function (y) {
      return '<circle cx="27" cy="' + y + '" r="3.5" fill="#1E2B45"/><circle cx="45" cy="' + y + '" r="3.5" fill="#1E2B45"/><circle cx="21" cy="' + (y + 10) + '" r="4" fill="#FF9C8A"/><circle cx="51" cy="' + (y + 10) + '" r="4" fill="#FF9C8A"/>';
    };
    let s = '';
    if (i === 6) { // 백호
      s = '<circle cx="14" cy="16" r="9" fill="#F2F2F2"/><circle cx="58" cy="16" r="9" fill="#F2F2F2"/><circle cx="36" cy="40" r="29" fill="#F7F7F7"/>' +
        '<path d="M22 14 L26 22M36 11 V21M50 14 L46 22M7 38 L16 40M7 48 L16 46M65 38 L56 40M65 48 L56 46" stroke="#1E2B45" stroke-width="3" stroke-linecap="round"/>' +
        eyes(34) + '<ellipse cx="36" cy="49" rx="9" ry="6" fill="#fff" stroke="#D5DCE8"/><polygon points="32,44 40,44 36,49" fill="#E8505B"/>';
    } else if (i === 7) { // 다람이
      s = '<path d="M60 58 C74 52 74 24 58 20 C64 34 58 44 50 50Z" fill="#B5835A"/><circle cx="14" cy="16" r="8" fill="#B5835A"/><circle cx="46" cy="16" r="8" fill="#B5835A"/><circle cx="30" cy="38" r="26" fill="#C9966A"/>' +
        '<ellipse cx="30" cy="48" rx="13" ry="10" fill="#F3E3C3"/><circle cx="22" cy="32" r="3.5" fill="#1E2B45"/><circle cx="38" cy="32" r="3.5" fill="#1E2B45"/><circle cx="30" cy="44" r="3" fill="#1E2B45"/><rect x="27" y="48" width="6" height="7" rx="1" fill="#fff" stroke="#D5DCE8"/>';
    } else if (i === 8) { // 물개
      s = '<ellipse cx="36" cy="40" rx="30" ry="28" fill="#8FA6C4"/><ellipse cx="36" cy="50" rx="18" ry="13" fill="#DCE6F3"/>' + eyes(34) +
        '<ellipse cx="36" cy="42" rx="5" ry="3.5" fill="#1E2B45"/><path d="M14 46H3M14 52L4 56M58 46H69M58 52L68 56" stroke="#1E2B45" stroke-width="2" stroke-linecap="round"/><path d="M6 60 C0 70 12 70 14 62Z M66 60 C72 70 60 70 58 62Z" fill="#8FA6C4"/>';
    } else if (i === 9) { // 기린이
      s = '<rect x="18" y="2" width="4" height="12" rx="2" fill="#C2A24A"/><rect x="50" y="2" width="4" height="12" rx="2" fill="#C2A24A"/><circle cx="20" cy="2" r="4" fill="#8A6D2A"/><circle cx="52" cy="2" r="4" fill="#8A6D2A"/>' +
        '<ellipse cx="9" cy="24" rx="7" ry="4" fill="#E8C766"/><ellipse cx="63" cy="24" rx="7" ry="4" fill="#E8C766"/><circle cx="36" cy="38" r="28" fill="#F5C94D"/>' +
        '<circle cx="22" cy="20" r="4" fill="#C98A2A"/><circle cx="46" cy="24" r="3.5" fill="#C98A2A"/><circle cx="56" cy="44" r="4" fill="#C98A2A"/><circle cx="14" cy="46" r="3.5" fill="#C98A2A"/>' + eyes(34) +
        '<ellipse cx="36" cy="50" rx="11" ry="8" fill="#F3E0A8"/><circle cx="32" cy="50" r="1.6" fill="#1E2B45"/><circle cx="40" cy="50" r="1.6" fill="#1E2B45"/>';
    } else if (i === 10) { // 고슴이
      let sp = '';
      for (let k = 0; k < 9; k++) { const a = Math.PI + k * Math.PI / 8, x = 36 + 30 * Math.cos(a), y = 44 + 30 * Math.sin(a); sp += '<polygon points="' + (36 + 22 * Math.cos(a - 0.16)).toFixed(1) + ',' + (44 + 22 * Math.sin(a - 0.16)).toFixed(1) + ' ' + x.toFixed(1) + ',' + y.toFixed(1) + ' ' + (36 + 22 * Math.cos(a + 0.16)).toFixed(1) + ',' + (44 + 22 * Math.sin(a + 0.16)).toFixed(1) + '" fill="#7A5A3A"/>'; }
      s = sp + '<ellipse cx="36" cy="46" rx="26" ry="22" fill="#B5835A"/><ellipse cx="36" cy="50" rx="17" ry="14" fill="#F3E3C3"/>' + eyes(40) + '<ellipse cx="36" cy="49" rx="4" ry="3" fill="#1E2B45"/>';
    } else { // 코끼리
      s = '<circle cx="12" cy="30" r="14" fill="#A3B3C8"/><circle cx="60" cy="30" r="14" fill="#A3B3C8"/><circle cx="36" cy="34" r="26" fill="#B8C6D8"/>' + eyes(30) +
        '<path d="M30 44 C28 60 36 68 44 60" fill="none" stroke="#A3B3C8" stroke-width="10" stroke-linecap="round"/><path d="M24 50 L20 58M48 50 L52 58" stroke="#fff" stroke-width="4" stroke-linecap="round"/>';
    }
    return '<svg viewBox="0 0 72 72" width="' + size + '" height="' + size + '" role="img" aria-label="' + (name || '친구') + '">' + s + '</svg>';
  };

  g.V = V;
})(typeof window !== 'undefined' ? window : globalThis);
