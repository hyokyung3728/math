/* 2학년 2학기 문제 만들기 틀 (동아출판 『수학 2-2』 차시에 맞춤) — 이름이 x_ 로 시작해요 */
(function (g) {
  'use strict';
  const V = g.V, G = g.GEN, U = g.GENU;
  const R = U.R, S = U.S;
  const P = function (a) { return a[R(0, a.length - 1)]; };
  const M = '−', X = '×';
  const SINO = ['', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구'];
  function read4(n) {
    const d = [Math.floor(n / 1000), Math.floor(n / 100) % 10, Math.floor(n / 10) % 10, n % 10], u = ['천', '백', '십', ''];
    let s = '';
    d.forEach(function (x, i) { if (x) s += (x > 1 || i === 3 ? SINO[x] : '') + u[i]; });
    return s;
  }
  const num = function (prompt, visual, answer, o) { return Object.assign({ kind: 'num', prompt: prompt, visual: visual || '', answer: answer }, o || {}); };
  const choice = function (prompt, visual, options, answer, o) { return Object.assign({ kind: 'choice', prompt: prompt, visual: visual || '', options: options, answer: answer }, o || {}); };
  const steps = function (prompt, visualFn, list, o) { return Object.assign({ kind: 'steps', prompt: prompt, visualFn: typeof visualFn === 'function' ? visualFn : function () { return visualFn; }, steps: list }, o || {}); };
  const nOpt = function (n) { return { html: '<span class="on">' + n + '</span>', value: n }; };
  const wOpt = function (t, v) { return { html: '<span class="ow">' + t + '</span>', value: v === undefined ? t : v }; };
  const dOpt = function (t, v) { return { html: '<span class="ow digi">' + t + '</span>', value: v }; };
  function cyc(n, k) {
    const out = []; let bag = [];
    while (out.length < n) { if (!bag.length) { bag = []; for (let i = 0; i < k; i++) bag.push(i); bag = S(bag); } out.push(bag.pop()); }
    return out;
  }
  function distinctNums(ans, cands, count, lo, hi) {
    const s = [ans];
    S(cands).forEach(function (c) { if (s.length < count && s.indexOf(c) < 0 && c >= (lo || 0) && c <= (hi || 99999)) s.push(c); });
    let guard = 0;
    while (s.length < count && guard++ < 300) { const c = R(Math.max(lo || 0, ans - 12), Math.min(hi || 99999, ans + 12)); if (s.indexOf(c) < 0) s.push(c); }
    return S(s).map(nOpt);
  }
  function weave(n, lists) {
    const out = []; let i = 0;
    while (out.length < n) { const l = lists[i % lists.length]; if (l.length) out.push(l.shift()); i++; if (i > n * 6) break; }
    return out;
  }
  function catOpts(cats, right) { return S([right].concat(S(cats.filter(function (c) { return c !== right; })).slice(0, 2))).map(function (c) { return wOpt(c); }); }
  /* 받침에 따라 조사를 붙여요 */
  const hasB = function (w) { const c = String(w).charCodeAt(String(w).length - 1) - 0xAC00; return c >= 0 && c % 28 !== 0; };
  const jp = function (w, a, b) { return w + (hasB(w) ? a : b); };
  const tt = function (h, m) { return m ? h + '시 ' + m + '분' : h + '시'; };
  const pad = function (m) { return m < 10 ? '0' + m : String(m); };

  /* ================= 1단원 네 자리 수 ================= */
  G.x_thousand = function (n) {
    return cyc(n, 5).map(function (v) {
      if (v === 0) { const a = R(5, 9) * 100; return num(a + '보다 ▢만큼 더 큰 수는 1000이에요. ▢에 알맞은 수를 써요.', V.eq(a, '+', '_', '=', 1000), 1000 - a, { tag: '천 알아보기', hint: a + '에서 1000까지 얼마나 더 가야 할까요? 100씩 세어 보세요.', say: a + '보다 얼마만큼 더 큰 수가 1000일까요?' }); }
      if (v === 1) return choice('100이 10개이면 얼마일까요?', V.coins(0, 10, 0, 0), [900, 1000, 1100].map(nOpt), 1000, { tag: '천 알아보기', hint: '100이 10개이면 1000이라 쓰고 “천”이라고 읽어요.' });
      if (v === 2) { const p = P([[990, 10], [999, 1], [900, 100], [950, 50]]); return num(p[0] + '보다 ' + p[1] + '만큼 더 큰 수는 얼마일까요?', '', 1000, { tag: '천 알아보기', hint: p[0] + '에 ' + p[1] + '을 더하면 몇이 될까요?' }); }
      if (v === 3) return num('1000은 100이 몇 개일까요?', V.coins(0, 10, 0, 0), 10, { tag: '천 알아보기', hint: '100원짜리 동전 몇 개가 1000원일까요?' });
      return choice('1000을 바르게 읽은 것을 골라요.', '', S([wOpt('천', 'a'), wOpt('백', 'b'), wOpt('만', 'c')]), 'a', { tag: '천 알아보기', hint: '1000은 “천”이라고 읽어요.' });
    });
  };
  G.x_thousands = function (n) {
    return cyc(n, 5).map(function (v) {
      const k = R(2, 9);
      if (v === 0) return num('1000이 ' + k + '개이면 얼마일까요?', V.coins(k, 0, 0, 0), k * 1000, { tag: '몇천', hint: '1000, 2000, 3000… 1000씩 뛰어 세어 보세요.' });
      if (v === 1) return num(k * 1000 + '은 1000이 몇 개일까요?', V.coins(k, 0, 0, 0), k, { tag: '몇천', hint: '1000원짜리 지폐가 몇 장일까요?' });
      if (v === 2) { const o = [k * 1000]; S([2, 3, 4, 5, 6, 7, 8, 9]).forEach(function (x) { if (o.length < 3 && x !== k) o.push(x * 1000); });
        return choice('"' + read4(k * 1000) + '"은 얼마일까요?', '', S(o).map(nOpt), k * 1000, { tag: '몇천 읽기', hint: '이천, 삼천, 사천… 앞의 글자가 천이 몇 개인지 알려 줘요.', say: read4(k * 1000) + '은 얼마일까요?' }); }
      if (v === 3) { const o = [k * 1000]; S([2, 3, 4, 5, 6, 7, 8, 9]).forEach(function (x) { if (o.length < 3 && x !== k) o.push(x * 1000); });
        return choice(k * 1000 + '을 바르게 읽은 것을 골라요.', '', S(o).map(function (x) { return wOpt(read4(x), x); }), k * 1000, { tag: '몇천 읽기', hint: '1000이 ' + k + '개이므로 “' + read4(k * 1000) + '”이라고 읽어요.' }); }
      const a = R(1, 4), b = R(1, 4);
      return num('1000원짜리 지폐 ' + a + '장과 ' + b + '장을 합치면 모두 얼마일까요?', V.coins(a + b, 0, 0, 0), (a + b) * 1000, { tag: '몇천', hint: '1000이 모두 몇 개인지 먼저 세어 보세요.' });
    });
  };
  function rnd4(zero) {
    const th = R(1, 9); let h = R(0, 9), t = R(0, 9), o = R(0, 9);
    if (!zero) { h = R(1, 9); t = R(1, 9); o = R(1, 9); }
    return th * 1000 + h * 100 + t * 10 + o;
  }
  G.x_fourDigit = function (n) {
    return cyc(n, 7).map(function (v) {
      const m = rnd4(Math.random() < 0.35), th = Math.floor(m / 1000), h = Math.floor(m / 100) % 10, t = Math.floor(m / 10) % 10, o = m % 10;
      if (v === 0) return num('수 모형이 나타내는 수를 써요.', V.blocks4(m), m, { tag: '네 자리 수', hint: '천 모형, 백 모형, 십 모형, 일 모형을 차례로 세어 보세요.' });
      if (v === 1) return num('1000이 ' + th + '개, 100이 ' + h + '개, 10이 ' + t + '개, 1이 ' + o + '개이면 얼마일까요?', '', m, { tag: '네 자리 수', hint: th * 1000 + ', ' + h * 100 + ', ' + t * 10 + ', ' + o + '를 차례로 쓰면 돼요.', hv: V.blocks4(m) });
      if (v === 2) return steps('수 모형을 보고 빈칸에 알맞은 수를 써요.', function () { return V.blocks4(m); },
        [{ p: '천 모형은 몇 개일까요?', a: th }, { p: '백 모형은 몇 개일까요?', a: h }, { p: '십 모형은 몇 개일까요?', a: t }, { p: '일 모형은 몇 개일까요?', a: o }], { tag: '네 자리 수의 자릿값', hint: '모형의 종류별로 따로 세어 보세요. 없으면 0이에요.' });
      if (v === 3) {
        const cand = [m + 1000, m - 1000, m + 100, m - 100, m + 10, th * 1000 + t * 100 + h * 10 + o, h * 1000 + th * 100 + t * 10 + o].filter(function (x) { return x >= 1000 && x <= 9999 && x !== m; });
        const ds = S(cand.filter(function (x, i, a) { return a.indexOf(x) === i; })).slice(0, 2);
        return choice(m + '을 바르게 읽은 것을 골라요.', '', S([m].concat(ds)).map(function (x) { return wOpt(read4(x), x); }), m, { tag: '네 자리 수 읽기', hint: '천의 자리부터 차례로 읽어요. 0인 자리는 읽지 않아요.' });
      }
      if (v === 4) { const q = rnd4(false), d = [Math.floor(q / 1000), Math.floor(q / 100) % 10, Math.floor(q / 10) % 10, q % 10], pl = R(0, 3), nm = ['천', '백', '십', '일'][pl];
        return num(q + '에서 ' + nm + '의 자리 숫자는 얼마를 나타낼까요?', V.eq(q), d[pl] * [1000, 100, 10, 1][pl], { tag: '네 자리 수의 자릿값', hint: nm + '의 자리 숫자는 ' + [1000, 100, 10, 1][pl] + '이 몇 개인지를 나타내요.', say: q + '에서 ' + nm + '의 자리 숫자는 얼마를 나타낼까요?' }); }
      if (v === 5) return steps(m + '을 천, 백, 십, 일의 자리 수의 합으로 나타내요.', function () { return V.eq(m); },
        [{ p: '천의 자리 숫자가 나타내는 수는?', a: th * 1000 }, { p: '백의 자리 숫자가 나타내는 수는?', a: h * 100 }, { p: '십의 자리 숫자가 나타내는 수는?', a: t * 10 }, { p: '일의 자리 숫자가 나타내는 수는?', a: o }], { tag: '네 자리 수의 자릿값', hint: '각 자리 숫자에 알맞은 값을 써요. ' + m + ' = ' + th * 1000 + ' + ' + h * 100 + ' + ' + t * 10 + ' + ' + o });
      const zs = []; while (zs.length < 2) { const x = rnd4(false); if (zs.indexOf(x) < 0) zs.push(x); }
      const withZero = R(1, 9) * 1000 + R(1, 9) * 100 + R(1, 9);
      return choice('십의 자리 숫자가 0인 수를 골라요.', '', S([withZero, zs[0], zs[1]]).map(nOpt), withZero, { tag: '네 자리 수의 자릿값', hint: '십의 자리는 오른쪽에서 두 번째 숫자예요.' });
    });
  };
  G.x_skip4 = function (n) {
    return cyc(n, 6).map(function (v) {
      if (v <= 3) {
        const k = [1000, 100, 10, 1][v], a = R(1000, 9999 - k * 4), items = []; for (let i = 0; i < 5; i++) items.push(a + k * i);
        const bi = P([2, 3, 4]), ans = items[bi]; items[bi] = '_';
        return num(k + '씩 뛰어 세어 빈칸에 알맞은 수를 써요.', V.seq(items), ans, { tag: k + '씩 뛰어 세기', hint: k === 1000 ? '천의 자리 수가 1씩 커져요.' : (k === 100 ? '백의 자리 수가 1씩 커져요.' : (k === 10 ? '십의 자리 수가 1씩 커져요.' : '일의 자리 수가 1씩 커져요.')), say: k + '씩 뛰어 세어 빈칸에 알맞은 수를 써요.' });
      }
      if (v === 4) { const k = P([1000, 100, 10, 1]), s0 = R(1000 + k * 4, 9999), items = []; for (let i = 0; i < 5; i++) items.push(s0 - k * i);
        const bi = P([2, 3, 4]), ans = items[bi]; items[bi] = '_';
        return num(k + '씩 거꾸로 뛰어 세어 빈칸에 알맞은 수를 써요.', V.seq(items), ans, { tag: '거꾸로 뛰어 세기', hint: k + '씩 작아지는 수예요.', say: k + '씩 거꾸로 뛰어 세어 빈칸에 알맞은 수를 써요.' }); }
      const k = P([1000, 100, 10, 1]), a = R(1000, 5999);
      return choice('몇씩 뛰어 세었을까요?', V.seq([a, a + k, a + 2 * k, a + 3 * k]), [1, 10, 100, 1000].map(nOpt), k, { tag: '뛰어 세기', hint: '이웃한 두 수의 차를 구해 보세요.', cols: 4 });
    });
  };
  G.x_compare4 = function (n) {
    function two() {
      const a = R(1000, 9999); let b, gd = 0;
      do { const r = Math.random(); b = r < 0.35 ? Math.floor(a / 100) * 100 + R(0, 99) : (r < 0.7 ? Math.floor(a / 1000) * 1000 + R(0, 999) : R(1000, 9999)); gd++; } while (b === a && gd < 50);
      return b === a ? [a, a + 1] : [a, b];
    }
    const hint = '천의 자리부터 차례로 비교해요. 같으면 백의 자리, 십의 자리, 일의 자리를 비교해요.';
    return cyc(n, 6).map(function (v) {
      const p = two();
      if (v === 0) return choice('더 큰 수를 골라요.', '', S(p).map(nOpt), Math.max(p[0], p[1]), { tag: '네 자리 수 크기 비교', hint: hint });
      if (v === 1) return choice('더 작은 수를 골라요.', '', S(p).map(nOpt), Math.min(p[0], p[1]), { tag: '네 자리 수 크기 비교', hint: hint });
      if (v === 2) return choice('알맞은 기호를 골라요.', '<div class="eq"><span class="n">' + p[0] + '</span><span class="blank">?</span><span class="n">' + p[1] + '</span></div>',
        [{ html: '<span class="on">&gt;</span>', value: '>' }, { html: '<span class="on">&lt;</span>', value: '<' }], p[0] > p[1] ? '>' : '<', { tag: '크기 비교 기호', hint: hint, say: p[0] + '과 ' + p[1] + '을 비교해요. 알맞은 기호를 골라요.' });
      if (v === 3) return choice(p[0] + '은 ' + p[1] + '보다 어떨까요?', '', S([wOpt('큽니다', 'big'), wOpt('작습니다', 'small')]), p[0] > p[1] ? 'big' : 'small', { tag: '네 자리 수 크기 비교', hint: hint });
      const t = []; while (t.length < 3) { const x = t.length && Math.random() < 0.6 ? Math.floor(t[0] / 1000) * 1000 + R(0, 999) : R(1000, 9999); if (t.indexOf(x) < 0 && x >= 1000) t.push(x); }
      if (v === 4) return choice('가장 큰 수를 골라요.', '', t.map(nOpt), Math.max.apply(null, t), { tag: '네 자리 수 크기 비교', hint: hint });
      return choice('가장 작은 수를 골라요.', '', t.map(nOpt), Math.min.apply(null, t), { tag: '네 자리 수 크기 비교', hint: hint });
    });
  };
  G.x_solve4 = function (n) {
    return cyc(n, 5).map(function (v) {
      if (v === 0 || v === 1) {
        const ds = []; while (ds.length < 4) { const d = R(0, 9); if (ds.indexOf(d) < 0) ds.push(d); }
        const asc = ds.slice().sort(function (a, b) { return a - b; }), desc = asc.slice().reverse();
        const big = Number(desc.join(''));
        const small = asc.slice(); if (small[0] === 0) { const j = small.findIndex(function (x) { return x > 0; }); const first = small.splice(j, 1)[0]; small.unshift(first); }
        return num('수 카드를 한 번씩만 사용하여 만들 수 있는 가장 ' + (v === 0 ? '큰' : '작은') + ' 네 자리 수를 써요.', V.cards(ds), v === 0 ? big : Number(small.join('')),
          { tag: '수 카드로 수 만들기', hint: v === 0 ? '큰 수부터 차례로 천의 자리에 놓아요.' : '작은 수부터 놓아요. 천의 자리에는 0을 놓을 수 없어요.' });
      }
      if (v === 2) { const th = R(1, 9), h = R(1, 9), t = R(1, 9), o = R(1, 9), m = th * 1000 + h * 100 + t * 10 + o;
        return num('이 수는 네 자리 수예요. 천의 자리 숫자는 ' + th + ', 백의 자리 숫자는 ' + h * 100 + '을 나타내고, 십의 자리 숫자는 ' + t + ', 일의 자리 숫자는 ' + o + '예요. 이 수를 써요.', '', m, { tag: '네 자리 수 문제', hint: '자리 순서대로 숫자를 써요.' }); }
      if (v === 3) { const a = R(1, 5), b = R(1, 9), c = R(0, 9);
        return num('1000원짜리 지폐 ' + a + '장, 100원짜리 동전 ' + b + '개, 10원짜리 동전 ' + c + '개가 있어요. 모두 얼마일까요?', V.coins(a, b, c, 0), a * 1000 + b * 100 + c * 10, { tag: '네 자리 수 문제', hint: '지폐와 동전을 종류별로 합친 금액을 쓰면 돼요.' }); }
      const ds = []; while (ds.length < 4) { const d = R(1, 9); if (ds.indexOf(d) < 0) ds.push(d); }
      const mxd = Math.max.apply(null, ds), others = S(ds.filter(function (x) { return x !== mxd; })).slice(0, 2);
      return choice('수 카드로 가장 큰 네 자리 수를 만들 때, 천의 자리에 놓을 카드를 골라요.', V.cards(ds), S([mxd].concat(others)).map(nOpt), mxd, { tag: '수 카드로 수 만들기', hint: '가장 큰 수를 천의 자리에 놓아야 큰 수가 돼요.' });
    });
  };

  /* ================= 2단원 곱셈구구 ================= */
  const BOX = [['봉지', '사탕'], ['상자', '공책'], ['바구니', '귤'], ['접시', '구슬'], ['통', '풍선'], ['줄', '달걀']];
  const UNIT = { 사탕: '개', 공책: '권', 귤: '개', 구슬: '개', 풍선: '개', 달걀: '개' };
  function mult(dans, o) {
    o = o || {};
    return function (n) {
      return cyc(n, 7).map(function (v) {
        const d = P(dans), k = R(o.k0 || 1, 9), p = d * k, vk = Math.max(2, k);
        if (v === 0) return num(d + ' × ' + k + ' = ?', V.eq(d, X, k, '=', '_'), p, { tag: d + '단 곱셈구구', hint: k > 1 ? d + ' × ' + (k - 1) + ' = ' + d * (k - 1) + '에 ' + d + '를 더해 보세요.' : d + '를 한 번 더한 것과 같아요.', say: d + ' 곱하기 ' + k + '는 얼마일까요?' });
        if (v === 1) return num(d + '씩 ' + k + '묶음은 모두 몇 개일까요?', k <= 6 ? V.groups(d, k, P(['#3A7BD5', '#E8505B', '#3A9D5D'])) : '', p, { tag: d + '단 곱셈구구', hint: d + '씩 ' + k + '번 뛰어 세어 보세요.' });
        if (v === 2) return choice(d + ' × ' + k + '의 값을 골라요.', '', distinctNums(p, [p + d, p - d, p + k, p - k, p + 1, p - 1, p + 2], 3, 1), p, { tag: d + '단 곱셈구구', hint: d + '단을 외워 보세요. ' + d + ' × ' + (k - 1) + ' = ' + d * (k - 1) + '이에요.', say: d + ' 곱하기 ' + k + '의 값을 골라요.' });
        if (v === 3) return steps(d + ' × ' + vk + '를 앞의 곱셈구구를 이용해 계산해요.', function () { return V.eq(d, X, vk, '=', '_'); },
          [{ p: d + ' × ' + (vk - 1) + ' = ?', a: d * (vk - 1) }, { p: d * (vk - 1) + ' + ' + d + ' = ?', a: d * vk }], { tag: d + '단 곱셈구구', hint: d + '단은 ' + d + '씩 커져요.', say: d + ' 곱하기 ' + vk + '를 앞의 곱셈구구를 이용해 계산해요.' });
        if (v === 4) return num(d + ' × ▢ = ' + p + ' 에서 ▢에 알맞은 수를 써요.', V.eq(d, X, '_', '=', p), k, { tag: d + '단 곱셈구구', hint: d + '단에서 ' + p + '이 나오는 곳을 찾아 보세요.', say: d + ' 곱하기 얼마는 ' + p + '일까요?' });
        if (v === 5) { const b = P(BOX), un = UNIT[b[1]];
          return num(b[1] + '을 ' + b[0] + ' 한 개에 ' + d + un + '씩 담았어요. ' + k + b[0] + '에 담은 ' + b[1] + '은 모두 몇 ' + un + '일까요?', k <= 6 ? V.groups(d, k, '#F2994A') : '', p, { tag: d + '단 곱셈구구', hint: '곱셈식 ' + d + ' × ' + k + '로 구해요.' }); }
        return choice(d + ' × ' + k + '와 곱이 같은 것을 골라요.', '', S([wOpt(k + ' × ' + d, 'ok'), wOpt(d + ' × ' + (k + 1), 'n1'), wOpt((d + 1) + ' × ' + k, 'n2')]), 'ok', { tag: d + '단 곱셈구구', hint: '곱하는 순서를 바꾸어도 곱은 같아요.', cols: 1 });
      });
    };
  }
  G.x_mult2 = mult([2]); G.x_mult5 = mult([5]); G.x_mult36 = mult([3, 6]); G.x_mult48 = mult([4, 8]); G.x_mult7 = mult([7]); G.x_mult9 = mult([9]);
  G.x_mult01 = function (n) {
    return cyc(n, 6).map(function (v) {
      const k = R(1, 9);
      if (v === 0) return num('1 × ' + k + ' = ?', V.eq(1, X, k, '=', '_'), k, { tag: '1단 곱셈구구', hint: '1에 어떤 수를 곱하면 그 수가 돼요.', say: '1 곱하기 ' + k + '는 얼마일까요?' });
      if (v === 1) return num(k + ' × 1 = ?', V.eq(k, X, 1, '=', '_'), k, { tag: '1단 곱셈구구', hint: '어떤 수에 1을 곱하면 그 수 그대로예요.', say: k + ' 곱하기 1은 얼마일까요?' });
      if (v === 2) return num('0 × ' + k + ' = ?', V.eq(0, X, k, '=', '_'), 0, { tag: '0의 곱', hint: '0을 ' + k + '번 더해도 0이에요.', say: '0 곱하기 ' + k + '는 얼마일까요?' });
      if (v === 3) return num(k + ' × 0 = ?', V.eq(k, X, 0, '=', '_'), 0, { tag: '0의 곱', hint: '어떤 수에 0을 곱하면 0이에요.', say: k + ' 곱하기 0은 얼마일까요?' });
      if (v === 4) return choice('0과 어떤 수의 곱은 얼마일까요?', '', S([wOpt('항상 0이에요', 'z'), wOpt('항상 1이에요', 'o'), wOpt('그 수와 같아요', 's')]), 'z', { tag: '0의 곱', hint: '0 × 3, 5 × 0 처럼 계산해 보세요. 모두 0이에요.', cols: 1 });
      const a = R(2, 8);
      return num('고리 던지기에서 고리를 기둥에 걸면 1점, 걸지 못하면 0점이에요. 세미는 ' + a + '번 걸고 ' + R(1, 4) + '번 걸지 못했어요. 걸지 못한 고리의 점수는 모두 몇 점일까요?', '', 0, { tag: '0의 곱', hint: '0점이 몇 번 나와도 점수는 0이에요.' });
    });
  };
  const PAIRS = { 12: [[2, 6], [3, 4]], 16: [[2, 8], [4, 4]], 18: [[2, 9], [3, 6]], 24: [[3, 8], [4, 6]], 36: [[4, 9], [6, 6]] };
  G.x_multTable = function (n) {
    return cyc(n, 5).map(function (v) {
      if (v === 0 || v === 4) {
        const r0 = R(1, 6), c0 = R(1, 6), rows = [r0, r0 + 1, r0 + 2, r0 + 3], cols = [c0, c0 + 1, c0 + 2, c0 + 3], bi = R(0, 3), bj = R(0, 3);
        return num('곱셈표의 빈칸에 알맞은 수를 써요.', V.opTable('×', rows, cols, { blank: [bi + ',' + bj] }), rows[bi] * cols[bj], { tag: '곱셈표', hint: '가로 ' + rows[bi] + '와 세로 ' + cols[bj] + '가 만나는 칸이에요. ' + rows[bi] + ' × ' + cols[bj] + '를 계산해요.' });
      }
      if (v === 1) { const p = P([12, 16, 18, 24, 36]), pr = PAIRS[p], a = pr[0], right = pr[1];
        const wrongs = []; S([[2, 5], [3, 5], [4, 5], [3, 7], [2, 7], [4, 7], [5, 5], [6, 5]]).forEach(function (q) { if (wrongs.length < 2 && q[0] * q[1] !== p) wrongs.push(q); });
        return choice(a[0] + ' × ' + a[1] + '과 곱이 같은 곱셈구구를 골라요.', '', S([right].concat(wrongs)).map(function (q) { return wOpt(q[0] + ' × ' + q[1], q.join('x')); }), right.join('x'), { tag: '곱이 같은 곱셈구구', hint: a[0] + ' × ' + a[1] + ' = ' + p + '이에요. 곱이 ' + p + '인 것을 찾아요.', say: a[0] + ' 곱하기 ' + a[1] + '과 곱이 같은 곱셈구구를 골라요.' }); }
      if (v === 2) { const t = R(1, 4);
        return num('어떤 수인지 구해 보세요. 5단 곱셈구구에 있는 수이고, 홀수이고, 십의 자리 숫자는 ' + t * 10 + '을 나타내요.', '', t * 10 + 5, { tag: '곱셈표', hint: '5단의 수 중에서 홀수는 일의 자리가 5예요.' }); }
      const d = R(2, 9), c0 = R(1, 5), cols = [c0, c0 + 1, c0 + 2, c0 + 3, c0 + 4];
      return num(d + '단 곱셈구구는 오른쪽으로 갈수록 몇씩 커질까요?', V.opTable('×', [d], cols, {}), d, { tag: '곱셈표', hint: '이웃한 두 수의 차를 구해 보세요.' });
    });
  };
  const AGE = [['혜린', 8, 5], ['도윤', 9, 4], ['민준', 7, 3], ['서윤', 6, 5]];
  G.x_multSolve = function (n) {
    return cyc(n, 6).map(function (v) {
      const d = R(2, 9), k = R(2, 9);
      if (v === 0) return num('한 줄에 ' + d + '개씩 ' + k + '줄로 쿠키를 놓았어요. 쿠키는 모두 몇 개일까요?', k <= 6 ? V.groups(d, k, '#F2994A') : '', d * k, { tag: '곱셈 문제', hint: d + ' × ' + k + '로 구해요.' });
      if (v === 1) { const e = R(2, 5); return num('리모컨 한 개에 건전지를 ' + e + '개씩 넣어야 해요. 리모컨 ' + k + '개에 필요한 건전지는 모두 몇 개일까요?', '', e * k, { tag: '곱셈 문제', hint: e + ' × ' + k + '로 구해요.' }); }
      if (v === 2) { const a = P(AGE); return num(a[0] + '이는 ' + a[1] + '살이에요. ' + a[0] + '이 어머니의 나이는 ' + a[0] + '이 나이의 ' + a[2] + '배예요. 어머니는 몇 살일까요?', '', a[1] * a[2], { tag: '곱셈 문제', hint: a[1] + '의 ' + a[2] + '배를 곱셈식으로 나타내요.' }); }
      if (v === 3) { const e = R(1, 9);
        return steps('한 접시에 사과를 ' + d + '개씩 ' + k + '접시에 놓고, 낱개로 ' + e + '개 더 있어요. 사과는 모두 몇 개일까요?', function () { return V.groups(d, Math.min(k, 6), '#E8505B'); },
          [{ p: d + ' × ' + k + ' = ?', a: d * k }, { p: d * k + ' + ' + e + ' = ?', a: d * k + e }], { tag: '곱셈 문제', hint: '먼저 묶음의 수를 곱셈으로 구하고 낱개를 더해요.' }); }
      if (v === 4) { const L = R(3, 9);
        return num('블록 한 개의 길이는 ' + L + ' cm예요. 블록 ' + k + '개를 한 줄로 이으면 길이는 몇 cm일까요?', '', L * k, { tag: '곱셈 문제', hint: L + ' × ' + k + '로 구해요.' }); }
      const a = R(2, 5), b = R(2, 5);
      return steps('원판에서 3점을 ' + a + '번, 6점을 ' + b + '번 맞혔어요. 점수를 구해요.', '', [{ p: '3점을 ' + a + '번 맞힌 점수는? (3 × ' + a + ')', a: 3 * a }, { p: '6점을 ' + b + '번 맞힌 점수는? (6 × ' + b + ')', a: 6 * b }, { p: '두 점수를 합치면?', a: 3 * a + 6 * b }], { tag: '곱셈 문제', hint: '점수별로 곱셈식을 세워 구한 뒤 더해요.' });
    });
  };

  /* ================= 3단원 길이 재기 ================= */
  const fmtL = function (m, c) { return m + ' m ' + c + ' cm'; };
  function twoLens(noCarry, order) {
    let a, b, c, d, gd = 0;
    do { a = R(1, 8); b = R(1, 89); c = R(1, 8); d = R(1, 89); gd++; } while (noCarry === 'add' && b + d >= 100 && gd < 200);
    if (noCarry === 'sub') { c = R(1, 7); a = R(c + 1, 9); d = R(1, 80); b = R(d + 1, 99); }
    return [a, b, c, d];
  }
  G.x_meter = function (n) {
    return cyc(n, 6).map(function (v) {
      const m = R(1, 9), c = R(1, 99), L = m * 100 + c;
      if (v === 0) return num(m * 100 + ' cm = ▢ m', V.eq(m * 100 + ' cm'), m, { tag: '1 m 알아보기', hint: '100 cm가 1 m예요.', say: m * 100 + ' 센티미터는 몇 미터일까요?' });
      if (v === 1) return steps(m + ' m ' + c + ' cm를 cm로 나타내요.', '', [{ p: m + ' m = ▢ cm', a: m * 100 }, { p: m * 100 + ' cm + ' + c + ' cm = ▢ cm', a: L }], { tag: 'm와 cm', hint: '1 m = 100 cm예요.' });
      if (v === 2) return steps(L + ' cm를 m와 cm로 나타내요.', '', [{ p: L + ' cm에는 100 cm가 몇 번 들어 있을까요? (몇 m)', a: m }, { p: '남은 길이는 몇 cm일까요?', a: c }], { tag: 'm와 cm', hint: '100 cm씩 묶어 m로 나타내고 남은 것은 cm로 써요.' });
      if (v === 3) return choice(fmtL(m, c) + '를 바르게 읽은 것을 골라요.', '', S([wOpt(m + ' 미터 ' + c + ' 센티미터', 'ok'), wOpt(c + ' 미터 ' + m + ' 센티미터', 'n1'), wOpt(m + c + ' 센티미터', 'n2')]), 'ok', { tag: '길이 읽기', hint: 'm는 미터, cm는 센티미터라고 읽어요.', cols: 1 });
      if (v === 4) { const t = P([['필통의 길이는 약 15', 'cm'], ['칠판 긴 쪽의 길이는 약 3', 'm'], ['교실 문의 높이는 약 200', 'cm'], ['교실 짧은 쪽의 길이는 약 7', 'm'], ['책상 높이는 약 70', 'cm'], ['운동장 긴 쪽의 길이는 약 100', 'm'], ['버스의 길이는 약 10', 'm'], ['연필의 길이는 약 15', 'cm']]);
        return choice(t[0] + ' 입니다. ▢에 알맞은 단위를 골라요.', '', S([wOpt('cm', 'cm'), wOpt('m', 'm')]), t[1], { tag: '알맞은 단위', hint: '1 m는 100 cm예요. 작은 물건은 cm, 큰 물건은 m를 써요.' }); }
      const a = R(2, 8), vals = [a * 100 + R(1, 99)]; while (vals.length < 3) { const x = a * 100 + R(1, 99); if (vals.indexOf(x) < 0) vals.push(x); }
      const labels = [fmtL(a, vals[0] % 100), vals[1] + ' cm', fmtL(a, vals[2] % 100)], mx = vals.indexOf(Math.max.apply(null, vals));
      return choice('가장 긴 길이를 골라요.', '', labels.map(function (t, i) { return wOpt(t, i); }), mx, { tag: '길이 비교', hint: 'm와 cm로 나타낸 길이는 cm로 바꾸어 비교해요. 1 m = 100 cm', cols: 1 });
    });
  };
  G.x_tape = function (n) {
    return cyc(n, 4).map(function (v) {
      const val = R(101, 399), from = val - R(2, 9), m = Math.floor(val / 100), c = val % 100;
      if (v === 0) return num('줄자의 눈금을 읽어요. 화살표가 가리키는 길이는 몇 cm일까요?', V.rulerWindow(from, val), val, { tag: '줄자 읽기', hint: '화살표가 가리키는 눈금의 숫자를 읽어요.', say: '줄자의 눈금을 읽어요. 화살표가 가리키는 길이는 몇 센티미터일까요?' });
      if (v === 1) return steps('화살표가 가리키는 길이를 m와 cm로 나타내요.', V.rulerWindow(from, val), [{ p: '몇 m일까요?', a: m }, { p: '몇 cm가 더 있을까요?', a: c }], { tag: '줄자 읽기', hint: val + ' cm에서 100 cm가 몇 번인지 먼저 봐요.' });
      if (v === 2) { const o = [fmtL(m, c), fmtL(m + 1, c), fmtL(m, c < 50 ? c + 30 : c - 30)];
        return choice('화살표가 가리키는 길이를 m와 cm로 바르게 나타낸 것을 골라요.', V.rulerWindow(from, val), S(o).map(function (t) { return wOpt(t); }), o[0], { tag: '줄자 읽기', hint: val + ' cm = ' + fmtL(m, c) + '이에요.', cols: 1 }); }
      const t = P([['교실 긴 쪽의 길이', 'tape'], ['공책 긴 쪽의 길이', 'short'], ['운동장의 길이', 'tape'], ['지우개의 길이', 'short']]);
      return choice(t[0] + '를 재기에 더 편리한 자를 골라요.', '', S([wOpt('긴 줄자', 'tape'), wOpt('30 cm 자', 'short')]), t[1], { tag: '알맞은 자 고르기', hint: '긴 길이를 잴 때는 줄자가 편리해요.' });
    });
  };
  const bar2 = function (a, b, c, d) { return V.bars([{ label: '㉠', len: a + b / 100, color: '#3A7BD5', text: fmtL(a, b) }, { label: '㉡', len: c + d / 100, color: '#F2994A', text: fmtL(c, d), gap: a + b / 100 }], { unit: 22 }); };
  G.x_lenAdd = function (n) {
    return cyc(n, 3).map(function (v) {
      const t = twoLens('add'), a = t[0], b = t[1], c = t[2], d = t[3];
      if (v === 0) return steps(fmtL(a, b) + ' + ' + fmtL(c, d) + '를 m끼리, cm끼리 더해요.', bar2(a, b, c, d), [{ p: 'm끼리 더하면? (' + a + ' + ' + c + ')', a: a + c }, { p: 'cm끼리 더하면? (' + b + ' + ' + d + ')', a: b + d }], { tag: '길이의 합', hint: 'm는 m끼리, cm는 cm끼리 더해요.', say: a + ' 미터 ' + b + ' 센티미터 더하기 ' + c + ' 미터 ' + d + ' 센티미터를 구해요.' });
      if (v === 1) { const nm = P(['승현', '민준', '서윤', '도윤']); return steps(nm + '이는 길이가 ' + fmtL(a, b) + '인 색 테이프와 ' + fmtL(c, d) + '인 색 테이프를 이어 붙였어요. 이은 길이는 얼마일까요?', bar2(a, b, c, d), [{ p: '몇 m일까요?', a: a + c }, { p: '몇 cm일까요?', a: b + d }], { tag: '길이의 합', hint: 'm끼리, cm끼리 더해요.' }); }
      return num(fmtL(a, b) + ' + ' + fmtL(c, d) + '는 몇 cm일까요?', bar2(a, b, c, d), (a + c) * 100 + b + d, { tag: '길이의 합', hint: '합을 m와 cm로 구한 다음 cm로 바꿔요. 1 m = 100 cm', say: a + ' 미터 ' + b + ' 센티미터 더하기 ' + c + ' 미터 ' + d + ' 센티미터는 몇 센티미터일까요?' });
    });
  };
  G.x_lenSub = function (n) {
    return cyc(n, 3).map(function (v) {
      const t = twoLens('sub'), a = t[0], b = t[1], c = t[2], d = t[3], vis = V.bars([{ label: '㉠', len: a + b / 100, color: '#3A7BD5', text: fmtL(a, b) }, { label: '㉡', len: c + d / 100, color: '#F2994A', text: fmtL(c, d) }], { unit: 22 });
      if (v === 0) return steps(fmtL(a, b) + ' − ' + fmtL(c, d) + '를 m끼리, cm끼리 빼요.', vis, [{ p: 'm끼리 빼면? (' + a + ' − ' + c + ')', a: a - c }, { p: 'cm끼리 빼면? (' + b + ' − ' + d + ')', a: b - d }], { tag: '길이의 차', hint: 'm는 m끼리, cm는 cm끼리 빼요.', say: a + ' 미터 ' + b + ' 센티미터 빼기 ' + c + ' 미터 ' + d + ' 센티미터를 구해요.' });
      if (v === 1) { const n1 = P(['선생님', '아빠']), n2 = P(['유찬', '지호']);
        return steps(jp(n1, '은', '는') + ' ' + fmtL(a, b) + '를, ' + jp(n2, '은', '는') + ' ' + fmtL(c, d) + '를 뛰었어요. ' + jp(n1, '이', '가') + ' 얼마나 더 멀리 뛰었을까요?', vis, [{ p: '몇 m 차이일까요?', a: a - c }, { p: '몇 cm 차이일까요?', a: b - d }], { tag: '길이의 차', hint: 'm끼리, cm끼리 빼요.' }); }
      return num(fmtL(a, b) + ' − ' + fmtL(c, d) + '는 몇 cm일까요?', vis, (a - c) * 100 + b - d, { tag: '길이의 차', hint: '차를 m와 cm로 구한 다음 cm로 바꿔요.', say: a + ' 미터 ' + b + ' 센티미터 빼기 ' + c + ' 미터 ' + d + ' 센티미터는 몇 센티미터일까요?' });
    });
  };
  const OB = [['야구 방망이', '1 m', 1], ['방문의 높이', '2 m', 2], ['버스의 길이', '10 m', 10], ['운동장 긴 쪽', '50 m', 50]];
  G.x_lenEst = function (n) {
    return cyc(n, 4).map(function (v) {
      if (v === 0) { const t = P(OB), others = S(OB.filter(function (x) { return x !== t; })).slice(0, 2);
        return choice(t[0] + '의 길이는 약 얼마일까요?', '', S([t].concat(others)).map(function (x) { return wOpt(x[1], x[2]); }), t[2], { tag: '길이 어림하기', hint: '1 m가 몇 번 들어갈지 생각해 보세요. 어른 걸음 한 걸음이 약 1 m예요.', say: t[0] + '의 길이는 약 얼마일까요?' }); }
      if (v === 1) { const k = R(2, 8);
        return num('길이가 1 m인 색 테이프로 줄의 길이를 어림했어요. 줄의 길이는 약 몇 m일까요?', V.bars([{ label: '1 m', len: 1, color: '#F5B301' }, { label: '줄', len: k, color: '#3A7BD5' }], { unit: 36 }), k, { tag: '길이 어림하기', hint: '1 m 색 테이프가 줄에 몇 번 들어가는지 세어 보세요.' }); }
      if (v === 2) { const k = R(2, 8);
        return num('세미의 두 걸음이 약 1 m라면, 시소의 길이가 세미의 ' + 2 * k + '걸음일 때 약 몇 m일까요?', '', k, { tag: '길이 어림하기', hint: '두 걸음이 1 m이므로 ' + 2 * k + '걸음에는 2걸음이 몇 번 들어 있는지 세어요.' }); }
      const big = P([['운동장 긴 쪽의 길이', 'big'], ['2학년 학생 20명이 팔을 벌린 길이', 'big']]), sm = S([['책가방 한 개의 길이', 'small'], ['색연필의 길이', 'small'], ['공책 긴 쪽의 길이', 'small']]).slice(0, 2);
      return choice('길이가 10 m보다 긴 것을 골라요.', '', S([big].concat(sm)).map(function (x) { return wOpt(x[0], x[1] + x[0]); }), big[1] + big[0], { tag: '길이 어림하기', hint: '1 m가 10번 이상 들어가는 길이를 찾아요.', cols: 1 });
    });
  };
  G.x_lenSolve = function (n) {
    return cyc(n, 4).map(function (v) {
      if (v === 0) { const L = []; let a = R(2, 5), b = R(10, 40); L.push([a, b]); L.push([a + R(1, 3), b + R(10, 30)]); L.push([a - 1 + R(0, 1), Math.max(5, b - R(0, 5))]);
        const vals = L.map(function (x) { return x[0] * 100 + x[1]; }), mx = L[vals.indexOf(Math.max.apply(null, vals))], mn = L[vals.indexOf(Math.min.apply(null, vals))];
        if (mx[1] + mn[1] >= 100) return G.x_lenSolve(1)[0];
        return steps('세 길이 중에서 가장 긴 길이와 가장 짧은 길이의 합을 구해요. ' + L.map(function (x) { return fmtL(x[0], x[1]); }).join(', '), '', [{ p: '가장 긴 길이는 ' + fmtL(mx[0], mx[1]) + ', 가장 짧은 길이는 ' + fmtL(mn[0], mn[1]) + '예요. m끼리 더하면?', a: mx[0] + mn[0] }, { p: 'cm끼리 더하면?', a: mx[1] + mn[1] }], { tag: '길이 재기 문제', hint: '가장 긴 길이와 가장 짧은 길이를 먼저 찾아요.' }); }
      if (v === 1) { const c = R(110, 190), m = R(2, 3), cc = R(10, 90), L = m * 100 + cc;
        return choice(c + ' cm와 ' + fmtL(m, cc) + ' 중에서 어느 쪽이 더 길까요?', '', S([wOpt(c + ' cm', 'a'), wOpt(fmtL(m, cc), 'b')]), 'b', { tag: '길이 비교', hint: fmtL(m, cc) + '를 cm로 바꾸면 ' + L + ' cm예요.' }); }
      if (v === 2) { const t = twoLens('add'), nm = P(['수찬', '도윤']);
        return steps(nm + '이는 ' + fmtL(t[0], t[1]) + '를 걸어간 뒤 ' + fmtL(t[2], t[3]) + '를 더 걸어갔어요. 모두 얼마나 걸었을까요?', '', [{ p: '몇 m일까요?', a: t[0] + t[2] }, { p: '몇 cm일까요?', a: t[1] + t[3] }], { tag: '길이의 합', hint: 'm끼리, cm끼리 더해요.' }); }
      const t = twoLens('sub');
      return steps('끈 ' + fmtL(t[0], t[1]) + ' 중에서 ' + fmtL(t[2], t[3]) + '를 잘라 썼어요. 남은 끈의 길이는 얼마일까요?', '', [{ p: '몇 m일까요?', a: t[0] - t[2] }, { p: '몇 cm일까요?', a: t[1] - t[3] }], { tag: '길이의 차', hint: 'm끼리, cm끼리 빼요.' });
    });
  };

  /* ================= 4단원 시각과 시간 ================= */
  const clk = function (h, m) { return '<div class="clockbox">' + V.clock(h, m, 200) + '</div>'; };
  function digiOptions(h, m) {
    const o = [h + ':' + pad(m)], alt = [[Math.max(1, Math.round(m / 5)) || 12, (h * 5) % 60], [h, m + 5 > 59 ? m - 5 : m + 5], [h % 12 + 1, m]];
    S(alt).forEach(function (a) { const t = a[0] + ':' + pad(a[1]); if (o.length < 3 && o.indexOf(t) < 0) o.push(t); });
    return S(o).map(function (t) { return dOpt(t, t); });
  }
  G.x_time5 = function (n) {
    return cyc(n, 4).map(function (v) {
      const h = R(1, 12), m = R(1, 11) * 5;
      if (v === 0) return steps('시계를 보고 시각을 읽어요.', clk(h, m), [{ p: '몇 시일까요?', a: h }, { p: '몇 분일까요?', a: m }], { tag: '5분 단위 시각', hint: '짧은바늘이 가리키는 숫자는 시, 긴바늘이 가리키는 숫자에 5를 곱하면 분이에요.' });
      if (v === 1) return choice('시계가 나타내는 시각을 디지털 시계로 나타낸 것을 골라요.', clk(h, m), digiOptions(h, m), h + ':' + pad(m), { tag: '5분 단위 시각', hint: '긴바늘이 가리키는 숫자 × 5가 분이에요.', say: '시계가 나타내는 시각을 디지털 시계로 나타낸 것을 골라요.' });
      if (v === 2) return { kind: 'clockset', fine: true, h: h, m: m, prompt: h + '시 ' + m + '분이 되도록 시계 바늘을 움직여요.', tag: '시계 바늘 맞추기', hint: '긴바늘은 ' + m / 5 + '에 맞추고, 짧은바늘은 ' + h + '와 ' + (h % 12 + 1) + ' 사이에 둬요.' };
      const k = R(1, 11);
      return num('긴바늘이 ' + k + '을 가리키면 몇 분일까요?', clk(h, k * 5), k * 5, { tag: '5분 단위 시각', hint: '시계의 숫자 1은 5분, 2는 10분, 3은 15분… 5씩 커져요.', say: '긴바늘이 ' + k + '을 가리키면 몇 분일까요?' });
    });
  };
  G.x_time1 = function (n) {
    return cyc(n, 4).map(function (v) {
      const h = R(1, 12); let m; do { m = R(1, 59); } while (m % 5 === 0 && Math.random() < 0.8);
      if (v === 0) return steps('시계를 보고 시각을 읽어요.', clk(h, m), [{ p: '몇 시일까요?', a: h }, { p: '몇 분일까요?', a: m }], { tag: '1분 단위 시각', hint: '작은 눈금 한 칸이 1분이에요. 가까운 5분 단위 숫자에서 몇 칸 더 갔는지 세어요.' });
      if (v === 1) return choice('시계가 나타내는 시각을 디지털 시계로 나타낸 것을 골라요.', clk(h, m), digiOptions(h, m), h + ':' + pad(m), { tag: '1분 단위 시각', hint: '작은 눈금 한 칸이 1분이에요.', say: '시계가 나타내는 시각을 디지털 시계로 나타낸 것을 골라요.' });
      if (v === 2) return { kind: 'clockset', fine: true, h: h, m: m, prompt: h + '시 ' + m + '분이 되도록 시계 바늘을 움직여요.', tag: '시계 바늘 맞추기', hint: '긴바늘을 ' + Math.floor(m / 5) * 5 + '분에서 ' + (m % 5) + '칸 더 가게 맞춰요.' };
      const a = R(1, 11), b = R(1, 4);
      return num('긴바늘이 ' + a + '에서 작은 눈금 ' + b + '칸 더 간 곳을 가리켜요. 몇 분일까요?', clk(h, a * 5 + b), a * 5 + b, { tag: '1분 단위 시각', hint: a + '는 ' + a * 5 + '분이에요. 거기에서 ' + b + '분을 더해요.', say: '긴바늘이 ' + a + '에서 작은 눈금 ' + b + '칸 더 간 곳을 가리켜요. 몇 분일까요?' });
    });
  };
  G.x_timeBefore = function (n) {
    return cyc(n, 4).map(function (v) {
      const b = R(1, 5) * 5, nh = R(2, 12), h = nh - 1, m = 60 - b;
      if (v === 0) return num('이 시각은 ' + nh + '시 몇 분 전일까요?', clk(h, m), b, { tag: '몇 시 몇 분 전', hint: '긴바늘이 ' + nh + '시(12)가 되기까지 몇 분이 남았는지 세어요.', say: '이 시각은 ' + nh + '시 몇 분 전일까요?' });
      if (v === 1) return num(h + '시 ' + m + '분은 ' + nh + '시 몇 분 전일까요?', '', b, { tag: '몇 시 몇 분 전', hint: m + '분에서 60분까지 몇 분이 남았을까요?' });
      if (v === 2) return steps(nh + '시 ' + b + '분 전을 시와 분으로 나타내요.', clk(h, m), [{ p: '몇 시일까요?', a: h }, { p: '몇 분일까요?', a: m }], { tag: '몇 시 몇 분 전', hint: nh + '시 ' + b + '분 전은 ' + nh + '시가 되기 ' + b + '분 전이므로 ' + h + '시 ' + m + '분이에요.' });
      const o = [nh + '시 ' + b + '분 전', h + '시 ' + b + '분', nh + '시 ' + m + '분 전'];
      return choice('시계가 나타내는 시각을 알맞게 말한 것을 골라요.', clk(h, m), S(o).map(function (t) { return wOpt(t); }), o[0], { tag: '몇 시 몇 분 전', hint: '긴바늘이 12가 되기 ' + b + '분 전이에요.', cols: 1 });
    });
  };
  G.x_hour1 = function (n) {
    return cyc(n, 5).map(function (v) {
      const m = P([10, 15, 20, 30, 40, 45]);
      if (v === 0) { const k = R(1, 3); return num(k + '시간은 몇 분일까요?', '', 60 * k, { tag: '1시간', hint: '1시간은 60분이에요.', say: k + '시간은 몇 분일까요?' }); }
      if (v === 1) return steps('1시간 ' + m + '분을 분으로 나타내요.', '', [{ p: '1시간 = ▢분', a: 60 }, { p: '60분 + ' + m + '분 = ▢분', a: 60 + m }], { tag: '시간과 분', hint: '1시간은 60분이에요.' });
      if (v === 2) return steps(60 + m + '분을 시간과 분으로 나타내요.', '', [{ p: '몇 시간일까요?', a: 1 }, { p: '몇 분이 남을까요?', a: m }], { tag: '시간과 분', hint: '60분마다 1시간으로 바꿔요.' });
      if (v === 3) { const k = R(2, 6); return num('시계에서 긴바늘이 ' + k + '시간 동안 몇 바퀴 돌까요?', '', k, { tag: '1시간', hint: '긴바늘은 1시간에 한 바퀴를 돌아요.' }); }
      const t = P([['책을 읽은 시간은 30', '분'], ['하루 동안 잔 시간은 8', '시간'], ['양치하는 데 걸린 시간은 3', '분'], ['학교에서 보낸 시간은 5', '시간']]);
      return choice(t[0] + '입니다. 알맞은 단위를 골라요.', '', S([wOpt('분', '분'), wOpt('시간', '시간')]), t[1], { tag: '시간의 단위', hint: '짧은 시간은 분, 긴 시간은 시간으로 나타내요.' });
    });
  };
  function tl(h, m, d) { // 시작 시각과 걸린 분 → [끝 h, 끝 m]
    const t = h * 60 + m + d; let eh = Math.floor(t / 60) % 12; if (eh === 0) eh = 12; return [eh, t % 60];
  }
  G.x_elapsed = function (n) {
    return cyc(n, 3).map(function (v) {
      const h = R(1, 10), m = P([0, 10, 20, 30, 40, 50]), dH = R(0, 2), dM = P([10, 20, 30, 40, 50]), d = dH * 60 + dM, e = tl(h, m, d);
      const sT = tt(h, m), eT = tt(e[0], e[1]);
      const sm = m, em = m + d, lineH0 = h, lineH1 = h + Math.ceil(em / 60);
      const vis = V.timeline(lineH0, Math.max(lineH1, lineH0 + 1), sm, em);
      if (v === 0) return steps('시작한 시각은 ' + sT + ', 끝낸 시각은 ' + eT + '예요. 걸린 시간을 구해요.', vis, [{ p: '몇 시간일까요?', a: dH }, { p: '몇 분일까요?', a: dM }], { tag: '걸린 시간', hint: '시간 띠에서 색칠된 부분의 길이를 세어 보세요. 한 칸이 10분이에요.' });
      if (v === 1) return steps(sT + '부터 ' + (dH ? dH + '시간 ' : '') + dM + '분 동안 활동했어요. 끝낸 시각을 구해요.', vis, [{ p: '끝낸 시각은 몇 시일까요?', a: e[0] }, { p: '몇 분일까요?', a: e[1] }], { tag: '끝낸 시각', hint: '시작 시각에서 ' + (dH ? dH + '시간 ' : '') + dM + '분을 더해요.' });
      return num(sT + '부터 ' + eT + '까지 걸린 시간은 몇 분일까요?', vis, d, { tag: '걸린 시간', hint: '시간 띠에서 색칠된 칸을 세어 10분씩 더해요. 1시간은 60분이에요.' });
    });
  };
  const MON = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  G.x_dayCal = function (n) {
    return cyc(n, 8).map(function (v) {
      if (v === 0) { const k = R(1, 3); return num(k + '일은 몇 시간일까요?', '', 24 * k, { tag: '하루의 시간', hint: '하루는 24시간이에요.', say: k + '일은 몇 시간일까요?' }); }
      if (v === 1) { const t = P([['낮 2시', '오후'], ['새벽 5시', '오전'], ['아침 8시', '오전'], ['밤 11시', '오후'], ['저녁 7시', '오후'], ['낮 12시 30분', '오후']]);
        return choice(t[0] + '는 오전일까요, 오후일까요?', '', S([wOpt('오전', '오전'), wOpt('오후', '오후')]), t[1], { tag: '오전과 오후', hint: '밤 12시부터 낮 12시까지는 오전, 낮 12시부터 밤 12시까지는 오후예요.' }); }
      if (v === 2) { const k = P([[1, 7, '1주일은 며칠일까요?'], [1, 12, '1년은 몇 개월일까요?']]); return num(k[2], '', k[1], { tag: '달력', hint: k[1] === 7 ? '일, 월, 화, 수, 목, 금, 토 일곱 요일이에요.' : '1월부터 12월까지예요.' }); }
      const sd = R(0, 6), days = P([28, 30, 31]), cal = V.calendar(sd, days, {});
      if (v === 3) { const d = R(8, days - 1), w = (sd + d - 1) % 7, o = [w]; S([0, 1, 2, 3, 4, 5, 6]).forEach(function (x) { if (o.length < 3 && x !== w) o.push(x); });
        return choice('이 달 ' + d + '일은 무슨 요일일까요?', cal, S(o).map(function (x) { return wOpt(V.DOW[x] + '요일', x); }), w, { tag: '달력 읽기', hint: '1일의 요일부터 7일씩 지나면 같은 요일이에요.' }); }
      if (v === 4) { const dw = R(0, 6); let c = 0; for (let d = 1; d <= days; d++) if ((sd + d - 1) % 7 === dw) c++;
        return num('이 달에는 ' + V.DOW[dw] + '요일이 모두 몇 번 있을까요?', cal, c, { tag: '달력 읽기', hint: V.DOW[dw] + '요일 칸의 날짜를 하나씩 세어 보세요.' }); }
      if (v === 5) { const d = R(1, days - 7); return num('이 달 ' + d + '일의 일주일 뒤는 며칠일까요?', V.calendar(sd, days, { hl: [d] }), d + 7, { tag: '달력 읽기', hint: '일주일은 7일이에요. ' + d + '에 7을 더해요.' }); }
      const mo = R(0, 11);
      if (v === 6) return choice((mo + 1) + '월은 며칠까지 있을까요?', '', [28, 30, 31].map(nOpt), MON[mo], { tag: '월별 날수', hint: '1, 3, 5, 7, 8, 10, 12월은 31일, 4, 6, 9, 11월은 30일, 2월은 28일이에요.' });
      return num('1월부터 12월까지 날수가 30일인 달은 모두 몇 개일까요?', '', 4, { tag: '월별 날수', hint: '4월, 6월, 9월, 11월이에요.' });
    });
  };
  G.x_timeSolve = function (n) {
    return cyc(n, 4).map(function (v) {
      const h = R(1, 10), m = P([0, 10, 20, 30, 40, 50]);
      if (v === 0) { const dH = R(1, 2), dM = P([10, 20, 30, 40]), e = tl(h, m, dH * 60 + dM);
        return steps(tt(h, m) + '부터 ' + dH + '시간 ' + dM + '분 동안 독서를 했어요. 독서를 끝낸 시각을 구해요.', '', [{ p: '몇 시일까요?', a: e[0] }, { p: '몇 분일까요?', a: e[1] }], { tag: '끝낸 시각', hint: '시작 시각에 ' + dH + '시간을 먼저 더하고, ' + dM + '분을 더해요.' }); }
      if (v === 1) { const d = P([30, 40, 50]); const e = tl(h, m, d); return num('수업이 ' + tt(h, m) + '에 시작해서 ' + tt(e[0], e[1]) + '에 끝났어요. 수업 시간은 몇 분일까요?', '', d, { tag: '걸린 시간', hint: '시작에서 끝까지 몇 분이 지났는지 세어요.' }); }
      if (v === 2) { const k = R(2, 6); return num('멈춘 시계를 현재 시각으로 맞추려고 해요. 현재 시각이 ' + k + '시간 뒤라면 긴바늘을 몇 바퀴 돌려야 할까요?', '', k, { tag: '시간 문제', hint: '긴바늘은 1시간에 한 바퀴를 돌아요.' }); }
      const d = P([70, 80, 90]), e = tl(h, m, d);
      return steps('도자기 만들기는 ' + tt(h, m) + '부터 ' + tt(e[0], e[1]) + '까지 했어요. 걸린 시간을 구해요.', '', [{ p: '몇 시간일까요?', a: 1 }, { p: '몇 분일까요?', a: d - 60 }], { tag: '걸린 시간', hint: '60분은 1시간이에요. ' + d + '분을 시간과 분으로 나타내요.' });
    });
  };

  /* ================= 5단원 표와 그래프 ================= */
  const SETS = [['봄', '여름', '가을', '겨울'], ['사과', '딸기', '포도', '귤'], ['강아지', '고양이', '토끼', '햄스터'], ['축구', '수영', '태권도', '농구'], ['동화책', '만화책', '과학책', '위인전']];
  const TITLE = ['좋아하는 계절별 학생 수', '좋아하는 과일별 학생 수', '키우고 싶은 동물별 학생 수', '배우고 싶은 운동별 학생 수', '좋아하는 책별 학생 수'];
  function dataSet(k, lo, hi, unique) {
    const si = R(0, SETS.length - 1), cats = SETS[si].slice(0, k); let vals, gd = 0;
    do { vals = cats.map(function () { return R(lo, hi); }); gd++; } while (unique && new Set(vals).size < vals.length && gd < 200);
    return { cats: cats, vals: vals, title: TITLE[si], total: vals.reduce(function (a, b) { return a + b; }, 0) };
  }
  const sum = function (a) { return a.reduce(function (x, y) { return x + y; }, 0); };
  G.x_tableFromPic = function (n) {
    return cyc(n, 2).map(function (v) {
      const names = S(['접시', '시계', '단추', '액자', '창문', '메모지', '텐트', '깃발', '삼각자']).slice(0, 3), cnt = names.map(function () { return R(1, 6); }), list = [];
      names.forEach(function (nm, i) { for (let j = 0; j < cnt[i]; j++) list.push(nm); });
      const scene = V.objScene(S(list), 42);
      if (v === 0) return steps('물건을 종류별로 세어 표를 완성해요.', scene, names.map(function (nm, i) { return { p: jp(nm, '은', '는') + ' 몇 개일까요?', a: cnt[i] }; }).concat([{ p: '합계는 몇 개일까요?', a: sum(cnt) }]), { tag: '자료를 표로', hint: '종류별로 하나씩 짚으며 세어 보세요. 합계는 세 수를 모두 더해요.' });
      const hi = cnt.indexOf(Math.max.apply(null, cnt)), lo = cnt.indexOf(Math.min.apply(null, cnt));
      if (hi === lo || cnt.filter(function (x) { return x === cnt[hi]; }).length > 1 || cnt.filter(function (x) { return x === cnt[lo]; }).length > 1) return G.x_tableFromPic(1)[0];
      return num(jp(names[hi], '은', '는') + ' ' + names[lo] + '보다 몇 개 더 많을까요?', scene, cnt[hi] - cnt[lo], { tag: '자료를 표로', hint: '종류별 개수를 센 다음 큰 수에서 작은 수를 빼요.' });
    });
  };
  G.x_tableSurvey = function (n) {
    return cyc(n, 4).map(function (v) {
      const d = dataSet(R(3, 4), 1, 6, false), list = []; d.cats.forEach(function (c, i) { for (let j = 0; j < d.vals[i]; j++) list.push(c); });
      const vis = V.votes(S(list));
      if (v === 0) { const i = R(0, d.cats.length - 1); return num(jp(d.title.replace('별 학생 수', ''), '을', '를') + ' 조사했어요. ' + jp(d.cats[i], '을', '를') + ' 고른 학생은 몇 명일까요?', vis, d.vals[i], { tag: '조사하여 표로', hint: jp(d.cats[i], '이', '가') + ' 적힌 카드만 하나씩 짚으며 세어 보세요.' }); }
      if (v === 1) return steps('조사한 자료를 세어 표를 완성해요.', vis, d.cats.map(function (c, i) { return { p: jp(c, '을', '를') + ' 고른 학생은 몇 명일까요?', a: d.vals[i] }; }).concat([{ p: '합계는 몇 명일까요?', a: d.total }]), { tag: '조사하여 표로', hint: '표시를 하며 하나씩 세면 빠뜨리지 않아요. 합계는 모두 더해요.' });
      if (v === 2) return num('조사한 학생은 모두 몇 명일까요?', vis, d.total, { tag: '조사하여 표로', hint: '전체 카드 수를 세어도 되고, 종류별 수를 더해도 돼요.' });
      const mx = Math.max.apply(null, d.vals);
      if (d.vals.filter(function (x) { return x === mx; }).length > 1) return G.x_tableSurvey(1)[0];
      return choice('가장 많은 학생이 고른 것은 무엇일까요?', vis, catOpts(d.cats, d.cats[d.vals.indexOf(mx)]), d.cats[d.vals.indexOf(mx)], { tag: '조사하여 표로', hint: '종류별로 센 수를 비교해 보세요.' });
    });
  };
  G.x_graphRead = function (n) {
    return cyc(n, 5).map(function (v) {
      const d = dataSet(R(3, 4), 1, 7, true), gr = V.graph(d.cats, d.vals), mx = Math.max.apply(null, d.vals), mn = Math.min.apply(null, d.vals);
      if (v === 0) { const i = R(0, d.cats.length - 1); return num(d.title + '를 ○ 그래프로 나타냈어요. ○ 하나는 1명이에요. ' + jp(d.cats[i], '은', '는') + ' 몇 명일까요?', gr, d.vals[i], { tag: '그래프 읽기', hint: d.cats[i] + ' 줄의 ○를 세어 보세요.' }); }
      if (v === 1) return choice('가장 많은 학생이 고른 것을 골라요.', gr, catOpts(d.cats, d.cats[d.vals.indexOf(mx)]), d.cats[d.vals.indexOf(mx)], { tag: '그래프 읽기', hint: '○가 가장 높이 쌓인 줄을 찾아요.' });
      if (v === 2) return choice('가장 적은 학생이 고른 것을 골라요.', gr, catOpts(d.cats, d.cats[d.vals.indexOf(mn)]), d.cats[d.vals.indexOf(mn)], { tag: '그래프 읽기', hint: '○가 가장 낮게 쌓인 줄을 찾아요.' });
      if (v === 3) { const i = d.vals.indexOf(mx), j = d.vals.indexOf(mn); return num(jp(d.cats[i], '은', '는') + ' ' + d.cats[j] + '보다 몇 명 더 많을까요?', gr, mx - mn, { tag: '그래프 읽기', hint: '두 줄의 ○ 수를 센 다음 큰 수에서 작은 수를 빼요.' }); }
      return num('조사한 학생은 모두 몇 명일까요?', gr, d.total, { tag: '그래프 읽기', hint: '각 줄의 ○ 수를 세어 모두 더해요.' });
    });
  };
  G.x_tableGraph = function (n) {
    return cyc(n, 4).map(function (v) {
      const d = dataSet(R(3, 4), 1, 6, true);
      if (v === 0) {
        const opts = [d.vals]; let gd = 0;
        while (opts.length < 3 && gd++ < 100) { const c = d.vals.slice(), i = R(0, c.length - 1), j = R(0, c.length - 1); if (i === j) continue; const t = c[i]; c[i] = c[j]; c[j] = t; if (!opts.some(function (o) { return o.join() === c.join(); })) opts.push(c); }
        if (opts.length < 3) return G.x_tableGraph(1)[0];
        const mx = 6;
        return choice('표를 보고 알맞게 나타낸 그래프를 골라요.', V.table('학생 수(명)', d.cats, d.vals, { total: d.total }), S(opts).map(function (o) { return { html: V.graph(d.cats, o, { small: true, max: mx }), value: o.join() }; }), d.vals.join(), { tag: '표와 그래프', hint: '표의 수만큼 ○가 있는 그래프를 찾아요.' });
      }
      if (v === 1) { const bi = R(0, d.cats.length - 1), vals = d.vals.map(function (x, i) { return i === bi ? '_' : x; });
        return num('그래프를 보고 표의 빈칸에 알맞은 수를 써요.', V.graph(d.cats, d.vals) + V.table('학생 수(명)', d.cats, vals, { total: d.total }), d.vals[bi], { tag: '표와 그래프', hint: d.cats[bi] + ' 줄의 ○를 세어 보세요.' }); }
      if (v === 2) return num('표의 합계에 알맞은 수를 써요.', V.table('학생 수(명)', d.cats, d.vals, { total: '_' }), d.total, { tag: '표와 그래프', hint: '표의 수를 모두 더해요.' });
      const q = P([['각 항목의 수를 한눈에 비교하기 좋은 것은 무엇일까요?', 'graph'], ['전체 합계를 알아보기 좋은 것은 무엇일까요?', 'table']]);
      return choice(q[0], '', S([wOpt('그래프', 'graph'), wOpt('표', 'table')]), q[1], { tag: '표와 그래프', hint: '그래프는 ○의 높이로 비교하고, 표는 합계를 적을 수 있어요.' });
    });
  };
  G.x_graphSolve = function (n) {
    return cyc(n, 4).map(function (v) {
      const d = dataSet(4, 1, 7, true), gr = V.graph(d.cats, d.vals), o = d.vals.map(function (x, i) { return [x, i]; }).sort(function (a, b) { return b[0] - a[0]; });
      if (v === 0) return choice('가장 많이 고른 것과 두 번째로 많이 고른 것을 차례로 말한 것을 골라요.', gr, S([wOpt(d.cats[o[0][1]] + ', ' + d.cats[o[1][1]], 'ok'), wOpt(d.cats[o[1][1]] + ', ' + d.cats[o[0][1]], 'n1'), wOpt(d.cats[o[2][1]] + ', ' + d.cats[o[3][1]], 'n2')]), 'ok', { tag: '표와 그래프 문제', hint: '○가 많은 순서대로 찾아요.', cols: 1 });
      if (v === 1) return num('가장 많이 고른 것과 두 번째로 많이 고른 것의 학생 수를 합하면 모두 몇 명일까요?', gr, o[0][0] + o[1][0], { tag: '표와 그래프 문제', hint: '가장 많은 두 줄의 ○ 수를 더해요.' });
      if (v === 2) return num(jp(d.cats[o[0][1]], '을', '를') + ' 고른 학생은 ' + jp(d.cats[o[3][1]], '을', '를') + ' 고른 학생보다 몇 명 더 많을까요?', gr, o[0][0] - o[3][0], { tag: '표와 그래프 문제', hint: '두 줄의 ○ 수의 차를 구해요.' });
      return steps('그래프를 보고 알아보아요.', gr, [{ p: '조사한 학생은 모두 몇 명일까요?', a: d.total }, { p: '가장 많은 학생 수와 가장 적은 학생 수의 차는?', a: o[0][0] - o[3][0] }], { tag: '표와 그래프 문제', hint: '먼저 모두 더하고, 가장 큰 수와 가장 작은 수를 비교해요.' });
    });
  };

  /* ================= 6단원 규칙 찾기 ================= */
  G.x_patShapes = function (n) {
    const k = Math.ceil(n / 3) + 1;
    return weave(n, [G.patFind(k), G.patRepr(k), G.patFill(k)]);
  };
  G.x_patStack = function (n) {
    return cyc(n, 4).map(function (v) {
      if (v === 0) { const a = R(1, 3), b = R(1, 4), c = R(1, 4), hs = [a, b, c, a, b], nxt = c;
        return num('쌓기나무를 규칙에 따라 쌓았어요. 다음 줄에는 쌓기나무를 몇 개 쌓아야 할까요?', '<div class="bigshape">' + V.stack(hs) + '</div>', nxt, { tag: '쌓은 모양의 규칙', hint: '같은 높이의 줄이 되풀이되고 있어요. 되풀이되는 부분을 찾아요.' }); }
      if (v === 1) { const s0 = R(1, 2), d = R(1, 2), hs = [s0, s0 + d, s0 + 2 * d, s0 + 3 * d];
        return num('쌓기나무를 규칙에 따라 쌓았어요. 다음 줄에는 쌓기나무를 몇 개 쌓아야 할까요?', '<div class="bigshape">' + V.stack(hs) + '</div>', s0 + 4 * d, { tag: '쌓은 모양의 규칙', hint: '한 줄마다 쌓기나무가 ' + d + '개씩 늘어나고 있어요.' }); }
      if (v === 2) { const s0 = R(1, 2), d = R(1, 2), hs = [s0, s0 + d, s0 + 2 * d, s0 + 3 * d];
        return num('쌓기나무는 모두 몇 개일까요?', '<div class="bigshape">' + V.stack(hs) + '</div>', sum(hs), { tag: '쌓은 모양의 규칙', hint: '줄마다 몇 개인지 세어 모두 더해요.' }); }
      const a = R(1, 2), b = a + R(1, 2), c = b + R(1, 2), hs = [a, b, c, a, b, c], o = [a + '층, ' + b + '층, ' + c + '층이 되풀이돼요.', a + '층씩 계속 늘어나요.', '위로 한 층씩 줄어들어요.'];
      return choice('규칙을 바르게 말한 것을 골라요.', '<div class="bigshape">' + V.stack(hs) + '</div>', S(o).map(function (t) { return wOpt(t); }), o[0], { tag: '쌓은 모양의 규칙', hint: '높이가 어떻게 바뀌는지 왼쪽부터 차례로 살펴보세요.', cols: 1 });
    });
  };
  G.x_patAddTable = function (n) {
    return cyc(n, 4).map(function (v) {
      const r0 = R(1, 5), c0 = R(1, 5), rows = [r0, r0 + 1, r0 + 2, r0 + 3, r0 + 4], cols = [c0, c0 + 1, c0 + 2, c0 + 3, c0 + 4];
      if (v === 0) { const bi = R(0, 4), bj = R(0, 4); return num('덧셈표의 빈칸에 알맞은 수를 써요.', V.opTable('+', rows, cols, { blank: [bi + ',' + bj] }), rows[bi] + cols[bj], { tag: '덧셈표', hint: '가로 ' + rows[bi] + '와 세로 ' + cols[bj] + '를 더해요.' }); }
      if (v === 1) return choice('덧셈표에서 오른쪽으로 한 칸 갈 때마다 수가 어떻게 변할까요?', V.opTable('+', rows, cols, { shade: ['2,0', '2,1', '2,2', '2,3', '2,4'] }), S([wOpt('1씩 커져요', 'a'), wOpt('2씩 커져요', 'b'), wOpt('1씩 작아져요', 'c')]), 'a', { tag: '덧셈표', hint: '색칠한 칸의 이웃한 두 수를 비교해요.', cols: 1 });
      if (v === 2) return choice('색칠한 칸의 수는 아래로 한 칸 갈 때마다 어떻게 변할까요?', V.opTable('+', rows, cols, { shade: ['0,2', '1,2', '2,2', '3,2', '4,2'] }), S([wOpt('1씩 커져요', 'a'), wOpt('2씩 커져요', 'b'), wOpt('똑같아요', 'c')]), 'a', { tag: '덧셈표', hint: '위아래로 이웃한 두 수를 비교해요.', cols: 1 });
      return num('색칠한 칸은 ↘ 방향으로 갈 때 몇씩 커질까요?', V.opTable('+', rows, cols, { shade: ['0,0', '1,1', '2,2', '3,3', '4,4'] }), 2, { tag: '덧셈표', hint: '색칠한 칸의 이웃한 두 수의 차를 구해요. 1칸 오른쪽, 1칸 아래로 가면 1 + 1 만큼 커져요.' });
    });
  };
  G.x_patMulTable = function (n) {
    return cyc(n, 4).map(function (v) {
      const r0 = R(1, 5), c0 = R(1, 5), rows = [r0, r0 + 1, r0 + 2, r0 + 3, r0 + 4], cols = [c0, c0 + 1, c0 + 2, c0 + 3, c0 + 4];
      if (v === 0) { const bi = R(0, 4), bj = R(0, 4); return num('곱셈표의 빈칸에 알맞은 수를 써요.', V.opTable('×', rows, cols, { blank: [bi + ',' + bj] }), rows[bi] * cols[bj], { tag: '곱셈표 규칙', hint: '가로 ' + rows[bi] + '와 세로 ' + cols[bj] + '를 곱해요.' }); }
      if (v === 1) { const bi = R(0, 4); return num(rows[bi] + '단은 오른쪽으로 갈수록 몇씩 커질까요?', V.opTable('×', rows, cols, { shade: cols.map(function (c, j) { return bi + ',' + j; }) }), rows[bi], { tag: '곱셈표 규칙', hint: '색칠한 칸의 이웃한 두 수의 차를 구해요.' }); }
      if (v === 2) { const a = R(2, 6), b = R(a + 1, 8), vis = V.opTable('×', [2, 3, 4, 5, 6, 7, 8, 9], [2, 3, 4, 5, 6, 7, 8, 9], { shade: [(a - 2) + ',' + (b - 2), (b - 2) + ',' + (a - 2)] });
        return num('곱셈표에서 색칠한 두 칸의 수는 같아요. ' + a + ' × ' + b + '와 ' + b + ' × ' + a + '의 곱은 얼마일까요?', vis, a * b, { tag: '곱셈표 규칙', hint: '곱하는 순서를 바꾸어도 곱은 같아요.' }); }
      const sq = [1, 4, 9, 16, 25];
      return choice('곱셈표에서 색칠한 칸은 같은 수를 두 번 곱한 수예요. 빈칸 ?에 알맞은 수를 골라요.', V.opTable('×', [1, 2, 3, 4, 5], [1, 2, 3, 4, 5], { shade: ['0,0', '1,1', '2,2', '3,3'], blank: ['4,4'] }), [20, 25, 30].map(nOpt), 25, { tag: '곱셈표 규칙', hint: '5 × 5를 계산해요.' });
    });
  };
  G.x_patLife = function (n) {
    return cyc(n, 5).map(function (v) {
      if (v === 0) { const cols = P([6, 8]), rows = 4, st = 1, b = R(5, cols * rows - 1);
        return num('신발장 번호의 규칙을 찾아 빈칸에 알맞은 번호를 써요.', V.numGrid(cols, rows, st, b), b, { tag: '생활 속 규칙', hint: '오른쪽으로 갈수록 1씩 커져요. 줄의 처음 번호는 앞 줄의 끝 번호보다 1 커요.' }); }
      if (v === 1) { const sd = R(0, 6), d = R(1, 20), days = 30; return num('이 달 ' + d + '일과 같은 요일인 다음 주 날짜는 며칠일까요?', V.calendar(sd, days, { hl: [d] }), d + 7, { tag: '달력의 규칙', hint: '같은 요일은 7일마다 돌아와요.' }); }
      if (v === 2) { const c = P([4, 6, 8]), r = R(2, 5); return num('공연장 의자 번호가 한 줄에 ' + c + '개씩 있어요. 첫째 줄이 1번부터 ' + c + '번이라면 둘째 줄의 첫 번호는 몇 번일까요?', V.numGrid(c, 2, 1, -1), c + 1, { tag: '생활 속 규칙', hint: '첫째 줄이 ' + c + '번에서 끝나면 둘째 줄은 그다음 번호부터 시작해요.' }); }
      if (v === 3) { const c = P([4, 6, 8]), r = R(3, 5); return num('한 줄에 ' + c + '개씩 ' + r + '줄로 번호를 붙이면 마지막 번호는 몇 번일까요?', V.numGrid(c, 2, 1, -1), c * r, { tag: '생활 속 규칙', hint: c + '씩 ' + r + '줄이므로 ' + c + ' × ' + r + '이에요.' }); }
      const sd = R(0, 6), d = R(1, 14);
      return choice('달력에서 아래로 한 칸 내려가면 날짜가 몇씩 커질까요?', V.calendar(sd, 30, { hl: [d, d + 7, d + 14] }), [1, 7, 10].map(nOpt), 7, { tag: '달력의 규칙', hint: '같은 요일 칸은 일주일마다 있어서 7씩 커져요.' });
    });
  };
  G.x_patSolve = function (n) {
    const k = Math.ceil(n / 4) + 1;
    return weave(n, [G.numPat(k), G.chartPat(k), G.x_patStack(k), G.x_patLife(k)]);
  };

  g.GEN = G;
})(typeof window !== 'undefined' ? window : globalThis);
