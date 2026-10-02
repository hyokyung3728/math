/* 그림 만들기 도우미 — 수 모형, 십 배열판, 시계, 모양, 캐릭터 등을 HTML/SVG 문자열로 만들어요 */
(function (g) {
  'use strict';
  const V = {};
  const PAL = ['#E8505B', '#3A7BD5', '#F5B301', '#3A9D5D', '#9C6ADE', '#F2994A'];
  V.PAL = PAL;
  V.SHAPE_NAME = { c: '동그라미', t: '세모', s: '네모' };

  /* 수 모형: 십 모형(십 모형) + 일 모형(작은 조각). crossT/crossU 만큼은 지운 것으로 표시 */
  V.blocks = function (n, o) {
    o = o || {};
    const t = Math.floor(n / 10), u = n % 10, ct = o.crossT || 0, cu = o.crossU || 0;
    let h = '<div class="blocks" role="img" aria-label="수 모형 ' + n + '"><div class="bt">';
    for (let i = 0; i < t; i++) h += '<i class="rod' + (i >= t - ct ? ' x' : '') + '"></i>';
    h += '</div><div class="bo">';
    for (let i = 0; i < u; i++) h += '<i class="cube' + (i >= u - cu ? ' x' : '') + '"></i>';
    return h + '</div></div>';
  };
  V.pairBlocks = function (a, b, op) {
    if (op === '+') return '<div class="pairb">' + V.blocks(a) + '<span class="op">+</span>' + V.blocks(b) + '</div>';
    return '<div class="pairb">' + V.blocks(a, { crossT: Math.floor(b / 10), crossU: b % 10 }) + '</div>';
  };

  /* 식 */
  V.eq = function () {
    const a = Array.prototype.slice.call(arguments);
    return '<div class="eq">' + a.map(function (p) {
      if (p === '_') return '<span class="blank">?</span>';
      if (/^[+−×=]$/.test(String(p))) return '<span class="op">' + p + '</span>';
      return '<span class="n">' + p + '</span>';
    }).join('') + '</div>';
  };

  /* 십 배열판: cells 는 10칸의 상태(0 빈칸, 1 파랑, 2 주황, 3 지운 칸) */
  V.tf = function (cells) {
    let s = '<svg class="tf" viewBox="0 0 170 74" width="170" height="74" aria-hidden="true"><rect x="1" y="1" width="168" height="72" rx="8" class="tfbg"/>';
    for (let i = 0; i < 10; i++) {
      const c = i % 5, r = Math.floor(i / 5), x = 17 + c * 34, y = 19 + r * 36, st = cells[i] || 0;
      s += '<circle cx="' + x + '" cy="' + y + '" r="12" class="tf' + st + '"/>';
      if (st === 3) s += '<path class="tfx" d="M' + (x - 7) + ' ' + (y - 7) + 'L' + (x + 7) + ' ' + (y + 7) + 'M' + (x + 7) + ' ' + (y - 7) + 'L' + (x - 7) + ' ' + (y + 7) + '"/>';
    }
    return s + '</svg>';
  };
  V.tfN = function (n) { const c = []; for (let i = 0; i < 10; i++) c.push(i < n ? 1 : 0); return '<div class="frames">' + V.tf(c) + '</div>'; };
  V.tfSub = function (k) { const c = []; for (let i = 0; i < 10; i++) c.push(i < 10 - k ? 1 : 3); return '<div class="frames">' + V.tf(c) + '</div>'; };
  V.addFrames = function (a, b, stage) {
    const need = 10 - a, f1 = [], f2 = [];
    for (let i = 0; i < 10; i++) f1.push(i < a ? 1 : 0);
    if (stage === 0) { for (let i = 0; i < 10; i++) f2.push(i < b ? 2 : 0); }
    else { for (let i = a; i < 10; i++) f1[i] = 2; for (let i = 0; i < 10; i++) f2.push(i < b - need ? 2 : 0); }
    return '<div class="frames">' + V.tf(f1) + '<span class="op">+</span>' + V.tf(f2) + '</div>';
  };
  V.subFrames = function (total, b, stage) {
    const x = total - 10, f1 = [], f2 = [];
    for (let i = 0; i < 10; i++) f1.push(stage === 0 ? 1 : (i < 10 - b ? 1 : 3));
    for (let i = 0; i < 10; i++) f2.push(i < x ? 1 : 0);
    return '<div class="frames">' + V.tf(f1) + '<span class="op">+</span>' + V.tf(f2) + '</div>';
  };

  /* 시계: 짧은 바늘(시)은 주황, 긴 바늘(분)은 파랑 */
  V.clock = function (h, m, size) {
    size = size || 200;
    let s = '<svg class="clock" viewBox="0 0 200 200" width="' + size + '" height="' + size + '" role="img" aria-label="시계">';
    s += '<circle cx="100" cy="100" r="94" class="clk-face"/>';
    for (let i = 0; i < 60; i++) {
      const a = i * 6 * Math.PI / 180, r1 = i % 5 ? 88 : 84, r2 = 92;
      s += '<line class="clk-t" x1="' + (100 + r1 * Math.sin(a)).toFixed(1) + '" y1="' + (100 - r1 * Math.cos(a)).toFixed(1) + '" x2="' + (100 + r2 * Math.sin(a)).toFixed(1) + '" y2="' + (100 - r2 * Math.cos(a)).toFixed(1) + '"/>';
    }
    for (let i = 1; i <= 12; i++) {
      const a = i * 30 * Math.PI / 180;
      s += '<text class="clk-n" x="' + (100 + 68 * Math.sin(a)).toFixed(1) + '" y="' + (100 - 68 * Math.cos(a) + 6).toFixed(1) + '" text-anchor="middle">' + i + '</text>';
    }
    const ha = ((h % 12) * 30 + m * 0.5) * Math.PI / 180, ma = m * 6 * Math.PI / 180;
    s += '<line class="clk-h" x1="100" y1="100" x2="' + (100 + 42 * Math.sin(ha)).toFixed(1) + '" y2="' + (100 - 42 * Math.cos(ha)).toFixed(1) + '"/>';
    s += '<line class="clk-m" x1="100" y1="100" x2="' + (100 + 62 * Math.sin(ma)).toFixed(1) + '" y2="' + (100 - 62 * Math.cos(ma)).toFixed(1) + '"/>';
    return s + '<circle class="clk-c" cx="100" cy="100" r="6"/></svg>';
  };

  /* 모양 */
  V.shape = function (k, color, size) {
    size = size || 56;
    const c = color || '#3A7BD5';
    const p = k === 'c' ? '<circle cx="30" cy="30" r="26" fill="' + c + '"/>'
      : k === 't' ? '<polygon points="30,5 57,54 3,54" fill="' + c + '"/>'
      : '<rect x="6" y="6" width="48" height="48" rx="3" fill="' + c + '"/>';
    return '<svg viewBox="0 0 60 60" width="' + size + '" height="' + size + '" aria-hidden="true">' + p + '</svg>';
  };
  const OBJ = {
    '접시': '<circle cx="30" cy="30" r="26" fill="#F3E3C3" stroke="#C9A66B" stroke-width="3"/><circle cx="30" cy="30" r="16" fill="none" stroke="#C9A66B" stroke-width="2"/>',
    '시계': '<circle cx="30" cy="30" r="26" fill="#fff" stroke="#1E2B45" stroke-width="3"/><path d="M30 15V30L40 36" stroke="#1E2B45" stroke-width="3" fill="none" stroke-linecap="round"/>',
    '단추': '<circle cx="30" cy="30" r="26" fill="#7FA7EE"/><circle cx="23" cy="25" r="3" fill="#1E2B45"/><circle cx="37" cy="25" r="3" fill="#1E2B45"/><circle cx="23" cy="36" r="3" fill="#1E2B45"/><circle cx="37" cy="36" r="3" fill="#1E2B45"/>',
    '액자': '<rect x="5" y="7" width="50" height="46" rx="3" fill="#B5835A"/><rect x="12" y="14" width="36" height="32" fill="#EAF5FF"/><circle cx="24" cy="26" r="5" fill="#F5B301"/>',
    '창문': '<rect x="6" y="6" width="48" height="48" rx="3" fill="#9CC8F5" stroke="#1E2B45" stroke-width="3"/><path d="M30 6V54M6 30H54" stroke="#1E2B45" stroke-width="3"/>',
    '메모지': '<rect x="7" y="7" width="46" height="46" rx="3" fill="#FFE27A"/><path d="M15 20H45M15 30H45M15 40H34" stroke="#C9A62A" stroke-width="3" stroke-linecap="round"/>',
    '텐트': '<polygon points="30,6 56,52 4,52" fill="#E8505B"/><polygon points="30,28 40,52 20,52" fill="#7A2430"/>',
    '깃발': '<path d="M12 6V56" stroke="#5E6B82" stroke-width="4" stroke-linecap="round"/><polygon points="14,8 54,20 14,34" fill="#3A9D5D"/>',
    '삼각자': '<polygon points="30,5 56,53 4,53" fill="#9CC8F5" stroke="#1E2B45" stroke-width="3"/><polygon points="30,24 42,46 18,46" fill="#EAF5FF" stroke="#1E2B45" stroke-width="2"/>'
  };
  V.OBJ_SHAPE = { '접시': 'c', '시계': 'c', '단추': 'c', '액자': 's', '창문': 's', '메모지': 's', '텐트': 't', '깃발': 't', '삼각자': 't' };
  V.obj = function (name, size) {
    return '<svg viewBox="0 0 60 60" width="' + (size || 64) + '" height="' + (size || 64) + '" aria-hidden="true">' + OBJ[name] + '</svg>';
  };
  V.scene = function (list) {
    return '<div class="scene" role="img" aria-label="모양 모음">' + list.map(function (s) { return V.shape(s.k, s.c, 42); }).join('') + '</div>';
  };

  /* 무늬 규칙용 알: 0 빨간 동그라미, 1 파란 네모, 2 노란 세모, 3 초록 별 */
  V.tok = function (i, size) {
    size = size || 44;
    const p = [
      '<circle cx="24" cy="24" r="19" fill="#E8505B"/>',
      '<rect x="6" y="6" width="36" height="36" rx="3" fill="#3A7BD5"/>',
      '<polygon points="24,4 45,42 3,42" fill="#F5B301"/>',
      '<polygon points="24,3 29.5,17.5 45,18 33,28 37,43 24,34.5 11,43 15,28 3,18 18.5,17.5" fill="#3A9D5D"/>',
      '<rect x="6" y="6" width="36" height="36" rx="3" fill="#F5C518"/>'
    ][i];
    return '<svg viewBox="0 0 48 48" width="' + size + '" height="' + size + '" aria-hidden="true">' + p + '</svg>';
  };
  V.tokSeq = function (items) {
    return '<div class="tseq" role="img" aria-label="무늬 규칙">' + items.map(function (t) {
      return t === '_' ? '<span class="tk bl"></span>' : '<span class="tk">' + V.tok(t, 40) + '</span>';
    }).join('') + '</div>';
  };

  /* 수 띠, 수 배열표, 짝짓기 점 */
  V.seq = function (items) {
    return '<div class="seq">' + items.map(function (x) {
      return x === '_' ? '<span class="sq bl">?</span>' : '<span class="sq">' + x + '</span>';
    }).join('') + '</div>';
  };
  V.chart = function (o) {
    const r0 = o.r0 || 0, rows = o.rows || 3;
    let h = '<div class="chart" role="img" aria-label="수 배열표">';
    for (let r = r0; r < r0 + rows; r++) {
      for (let c = 1; c <= 10; c++) {
        const n = r * 10 + c;
        let cls = 'cc', txt = n;
        if (o.blank === n) { cls += ' bl'; txt = '?'; }
        else if (o.shaded && o.shaded.indexOf(n) >= 0) cls += ' sh';
        h += '<span class="' + cls + '">' + txt + '</span>';
      }
    }
    return h + '</div>';
  };
  V.pairs = function (n) {
    let h = '<div class="pairs" role="img" aria-label="점 ' + n + '개">';
    for (let i = 0; i < n; i += 2) {
      h += '<span class="pr"><i class="dt"></i>' + (i + 1 < n ? '<i class="dt"></i>' : '<i class="dt ghost"></i>') + '</span>';
    }
    return h + '</div>';
  };

  /* 세로셈 모양 고르기용 그림(모양을 비교하려고 b 는 한 자리 수) */
  V.vstatic = function (a, b, op, mis) {
    const at = Math.floor(a / 10), ao = a % 10;
    return '<div class="vs" role="img" aria-label="세로셈"><span></span><span class="t">' + at + '</span><span class="o">' + ao + '</span>' +
      '<span class="op">' + op + '</span><span class="t">' + (mis ? b : '') + '</span><span class="o">' + (mis ? '' : b) + '</span>' +
      '<span class="ln"></span></div>';
  };

  /* 새싹이: lv 1~5 */
  V.mascot = function (lv, size) {
    size = size || 120;
    const hh = Math.round(size * 1.25);
    const ground = '<ellipse cx="60" cy="144" rx="40" ry="6" fill="#C9E4C5"/>';
    const eyes = function (y) {
      return '<circle cx="47" cy="' + y + '" r="4.5" fill="#1E2B45"/><circle cx="73" cy="' + y + '" r="4.5" fill="#1E2B45"/>' +
        '<circle cx="37" cy="' + (y + 12) + '" r="5" fill="#FF9C8A"/><circle cx="83" cy="' + (y + 12) + '" r="5" fill="#FF9C8A"/>' +
        '<path d="M52 ' + (y + 12) + ' Q60 ' + (y + 21) + ' 68 ' + (y + 12) + '" fill="none" stroke="#1E2B45" stroke-width="3" stroke-linecap="round"/>';
    };
    const leaf = function (d) { return '<path d="' + d + '" fill="#3A9D5D"/>'; };
    const stem = function (d) { return '<path d="' + d + '" fill="none" stroke="#2A7444" stroke-width="5" stroke-linecap="round"/>'; };
    const body = function (cy, rx, ry) { return '<ellipse cx="60" cy="' + cy + '" rx="' + rx + '" ry="' + ry + '" fill="#FFC94D"/>'; };
    const star = 'M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z';
    let s = '';
    if (lv <= 1) {
      s = ground + '<ellipse cx="60" cy="104" rx="32" ry="38" fill="#B5835A"/><path d="M44 84 Q52 70 62 68" fill="none" stroke="#D2A77F" stroke-width="5" stroke-linecap="round"/>' +
        '<path d="M44 102 Q50 108 56 102" fill="none" stroke="#3A2A1C" stroke-width="3" stroke-linecap="round"/><path d="M64 102 Q70 108 76 102" fill="none" stroke="#3A2A1C" stroke-width="3" stroke-linecap="round"/>' +
        '<circle cx="42" cy="115" r="5" fill="#E8A08A"/><circle cx="78" cy="115" r="5" fill="#E8A08A"/><path d="M54 117 Q60 122 66 117" fill="none" stroke="#3A2A1C" stroke-width="3" stroke-linecap="round"/>';
    } else if (lv === 2) {
      s = ground + stem('M60 74 C60 62 60 56 60 50') + leaf('M60 54 C50 42 36 44 34 50 C40 60 54 60 60 54Z') + leaf('M60 54 C70 42 84 44 86 50 C80 60 66 60 60 54Z') + body(106, 36, 34) + eyes(102);
    } else if (lv === 3) {
      s = ground + stem('M60 80 L60 30') + leaf('M60 30 C54 20 58 12 60 8 C62 12 66 20 60 30Z') +
        leaf('M60 46 C48 32 32 34 30 40 C36 54 52 54 60 46Z') + leaf('M60 46 C72 32 88 34 90 40 C84 54 68 54 60 46Z') +
        leaf('M60 68 C50 58 38 60 36 64 C40 74 54 74 60 68Z') + leaf('M60 68 C70 58 82 60 84 64 C80 74 66 74 60 68Z') + body(108, 38, 34) + eyes(104);
    } else if (lv === 4) {
      s = ground + stem('M60 80 L60 40') + leaf('M60 62 C48 48 32 50 30 56 C36 70 52 70 60 62Z') + leaf('M60 62 C72 48 88 50 90 56 C84 70 68 70 60 62Z') +
        '<path d="M60 4 C46 12 44 30 60 42 C76 30 74 12 60 4Z" fill="#F27BA5"/><path d="M60 10 C55 20 55 31 60 39" fill="none" stroke="#D9558A" stroke-width="2.5" stroke-linecap="round"/>' +
        '<path d="M46 32 C52 46 68 46 74 32 C68 40 52 40 46 32Z" fill="#3A9D5D"/>' + body(108, 38, 34) + eyes(104);
    } else {
      let petals = '';
      for (let a = 0; a < 360; a += 45) petals += '<ellipse cx="60" cy="14" rx="9" ry="14" transform="rotate(' + a + ' 60 30)"/>';
      s = ground + stem('M60 80 L60 40') + leaf('M60 70 C50 60 38 62 36 66 C40 76 54 76 60 70Z') + leaf('M60 70 C70 60 82 62 84 66 C80 76 66 76 60 70Z') +
        '<g fill="#F27BA5">' + petals + '</g><circle cx="60" cy="30" r="12" fill="#F5B301"/><circle cx="55" cy="28" r="2" fill="#1E2B45"/><circle cx="65" cy="28" r="2" fill="#1E2B45"/>' +
        '<path d="M55 34 Q60 38 65 34" fill="none" stroke="#1E2B45" stroke-width="2" stroke-linecap="round"/>' +
        body(110, 38, 32) + eyes(106) +
        '<path transform="translate(4 18) scale(0.6)" d="' + star + '" fill="#F5B301"/><path transform="translate(98 50) scale(0.5)" d="' + star + '" fill="#F5B301"/>';
    }
    return '<svg class="mascot-svg" viewBox="0 0 120 150" width="' + size + '" height="' + hh + '" role="img" aria-label="새싹이">' + s + '</svg>';
  };

  /* 단원 친구들 (0~5) */
  V.friend = function (i, size, name) {
    size = size || 72;
    const eyes = function (y) {
      return '<circle cx="27" cy="' + y + '" r="3.5" fill="#1E2B45"/><circle cx="45" cy="' + y + '" r="3.5" fill="#1E2B45"/>' +
        '<circle cx="21" cy="' + (y + 10) + '" r="4" fill="#FF9C8A"/><circle cx="51" cy="' + (y + 10) + '" r="4" fill="#FF9C8A"/>' +
        '<path d="M30 ' + (y + 12) + ' Q36 ' + (y + 19) + ' 42 ' + (y + 12) + '" fill="none" stroke="#1E2B45" stroke-width="2.5" stroke-linecap="round"/>';
    };
    let s = '';
    if (i === 0) { // 동글곰
      s = '<circle cx="16" cy="14" r="9" fill="#7FA7EE"/><circle cx="56" cy="14" r="9" fill="#7FA7EE"/><circle cx="36" cy="38" r="30" fill="#7FA7EE"/>' + eyes(34);
    } else if (i === 1) { // 버스냥이
      s = '<polygon points="10,30 14,6 34,18" fill="#F2A766"/><polygon points="62,30 58,6 38,18" fill="#F2A766"/><polygon points="15,24 17,12 26,18" fill="#FF9C8A"/><polygon points="57,24 55,12 46,18" fill="#FF9C8A"/>' +
        '<circle cx="36" cy="40" r="29" fill="#F2A766"/><path d="M28 14 L30 22M36 12 V21M44 14 L42 22" stroke="#C97A35" stroke-width="3" stroke-linecap="round"/>' + eyes(36) +
        '<path d="M2 44H14M2 52L14 49M70 44H58M70 52L58 49" stroke="#1E2B45" stroke-width="2" stroke-linecap="round"/>';
    } else if (i === 2) { // 시계부엉
      s = '<polygon points="12,22 14,4 30,14" fill="#7B63C9"/><polygon points="60,22 58,4 42,14" fill="#7B63C9"/><ellipse cx="36" cy="40" rx="29" ry="30" fill="#9C86D9"/>' +
        '<circle cx="25" cy="30" r="11" fill="#fff"/><circle cx="47" cy="30" r="11" fill="#fff"/><circle cx="25" cy="31" r="5" fill="#1E2B45"/><circle cx="47" cy="31" r="5" fill="#1E2B45"/>' +
        '<polygon points="31,38 41,38 36,47" fill="#F5B301"/><circle cx="36" cy="58" r="9" fill="#fff"/><path d="M36 52V58L40 60" stroke="#1E2B45" stroke-width="2" fill="none" stroke-linecap="round"/>';
    } else if (i === 3) { // 열다리 (문어)
      s = '<ellipse cx="36" cy="30" rx="26" ry="24" fill="#F27BA5"/>' + eyes(28) +
        '<path d="M14 48 Q10 62 18 66M26 52 Q24 66 30 68M38 52 Q40 66 34 68M48 52 Q54 66 46 68M58 48 Q64 62 54 66" fill="none" stroke="#F27BA5" stroke-width="7" stroke-linecap="round"/>';
    } else if (i === 4) { // 무늬거북
      s = '<circle cx="36" cy="54" r="12" fill="#8AD1A0"/><path d="M8 52 Q8 14 36 14 Q64 14 64 52Z" fill="#3A9D5D"/>' +
        '<path d="M36 14V52M22 22 L26 52M50 22 L46 52M12 40H60" stroke="#2A7444" stroke-width="3" fill="none"/>' +
        '<circle cx="30" cy="56" r="2.5" fill="#1E2B45"/><circle cx="42" cy="56" r="2.5" fill="#1E2B45"/><path d="M32 62 Q36 66 40 62" fill="none" stroke="#1E2B45" stroke-width="2" stroke-linecap="round"/>';
    } else { // 반짝용
      s = '<polygon points="16,26 12,6 30,16" fill="#F5B301"/><polygon points="56,26 60,6 42,16" fill="#F5B301"/><circle cx="36" cy="40" r="28" fill="#E8505B"/>' +
        '<path d="M20 20 L24 12 L28 20M32 16 L36 8 L40 16M44 20 L48 12 L52 20" fill="none" stroke="#F5B301" stroke-width="3" stroke-linejoin="round"/>' +
        eyes(36) + '<path transform="translate(54 50) scale(0.7)" d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z" fill="#F5B301"/>';
    }
    return '<svg viewBox="0 0 72 72" width="' + size + '" height="' + size + '" role="img" aria-label="' + (name || '친구') + '">' + s + '</svg>';
  };

  /* 디지털 시계 */
  V.digital = function (h, m) {
    return '<div class="digital" role="img" aria-label="디지털 시계 ' + h + '시' + (m ? ' ' + m + '분' : '') + '">' + h + ':' + (m < 10 ? '0' + m : m) + '</div>';
  };

  /* 모양 조각으로 만든 그림: [모양, ...좌표, 색] — 모양 개수는 목록에서 바로 셀 수 있어요 */
  V.FIGS = [
    { n: '집', it: [['t', '30,8 57,32 3,32', '#E8505B'], ['s', 10, 32, 40, 24, '#F5B301'], ['s', 25, 40, 10, 16, '#8C5A3A'], ['s', 14, 36, 8, 8, '#9CC8F5'], ['c', 52, 9, 6, '#F2994A']] },
    { n: '로봇', it: [['s', 14, 5, 32, 22, '#9CC8F5'], ['s', 10, 29, 40, 22, '#7FA7EE'], ['c', 23, 15, 4, '#1E2B45'], ['c', 37, 15, 4, '#1E2B45'], ['t', '30,17 33,23 27,23', '#E8505B'], ['t', '14,51 22,51 18,57', '#F5B301'], ['t', '38,51 46,51 42,57', '#F5B301']] },
    { n: '로켓', it: [['s', 22, 16, 16, 32, '#C9D6E8'], ['t', '30,2 38,16 22,16', '#E8505B'], ['t', '22,34 22,52 10,52', '#E8505B'], ['t', '38,34 38,52 50,52', '#E8505B'], ['c', 30, 28, 5, '#3A7BD5']] },
    { n: '눈사람', it: [['c', 30, 44, 14, '#EAF0F8'], ['c', 30, 22, 10, '#EAF0F8'], ['t', '30,2 38,13 22,13', '#3A7BD5'], ['c', 26, 20, 1.8, '#1E2B45'], ['c', 34, 20, 1.8, '#1E2B45'], ['t', '30,22 37,24 30,26', '#F2994A'], ['s', 20, 31, 20, 4, '#E8505B']] }
  ];
  V.figCount = function (i) {
    const c = { c: 0, t: 0, s: 0 };
    V.FIGS[i].it.forEach(function (x) { c[x[0]]++; });
    return c;
  };
  V.figure = function (i, size) {
    size = size || 230;
    let s = '<svg viewBox="0 0 60 60" width="' + size + '" height="' + size + '" role="img" aria-label="모양 조각으로 만든 ' + V.FIGS[i].n + '">';
    V.FIGS[i].it.forEach(function (x) {
      const st = ' stroke="#1E2B45" stroke-width="1"';
      if (x[0] === 't') s += '<polygon points="' + x[1] + '" fill="' + x[2] + '"' + st + '/>';
      else if (x[0] === 's') s += '<rect x="' + x[1] + '" y="' + x[2] + '" width="' + x[3] + '" height="' + x[4] + '" fill="' + x[5] + '"' + st + '/>';
      else s += '<circle cx="' + x[1] + '" cy="' + x[2] + '" r="' + x[3] + '" fill="' + x[4] + '"' + st + '/>';
    });
    return s + '</svg>';
  };

  /* 십몇 − 몇 (낱개 먼저 빼기): 0 처음, 1 낱개를 먼저 뺀 뒤, 2 나머지를 10에서 뺀 뒤 */
  V.subFrames2 = function (total, b, stage) {
    const x = total - 10, f1 = [], f2 = [];
    for (let i = 0; i < 10; i++) f1.push(stage >= 2 ? (i < 10 - (b - x) ? 1 : 3) : 1);
    for (let i = 0; i < 10; i++) f2.push(i < x ? (stage >= 1 ? 3 : 1) : 0);
    return '<div class="frames">' + V.tf(f1) + '<span class="op">+</span>' + V.tf(f2) + '</div>';
  };

  g.V = V;
})(typeof window !== 'undefined' ? window : globalThis);
