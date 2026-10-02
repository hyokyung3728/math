/* 2학년 1학기 문제 만들기 틀 (동아출판 『수학 2-1』 차시에 맞춤) — 이름이 w_ 로 시작해요 */
(function (g) {
  'use strict';
  const V = g.V, G = g.GEN, U = g.GENU;
  const R = U.R, S = U.S;
  const P = function (a) { return a[R(0, a.length - 1)]; };
  const M = '−', X = '×';
  const SINO = ['', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구'];
  function read3(n) {
    const h = Math.floor(n / 100), t = Math.floor(n / 10) % 10, o = n % 10;
    let s = '';
    if (h) s += (h > 1 ? SINO[h] : '') + '백';
    if (t) s += (t > 1 ? SINO[t] : '') + '십';
    if (o) s += SINO[o];
    return s;
  }
  const num = function (prompt, visual, answer, o) { return Object.assign({ kind: 'num', prompt: prompt, visual: visual || '', answer: answer }, o || {}); };
  const choice = function (prompt, visual, options, answer, o) { return Object.assign({ kind: 'choice', prompt: prompt, visual: visual || '', options: options, answer: answer }, o || {}); };
  const steps = function (prompt, visualFn, list, o) { return Object.assign({ kind: 'steps', prompt: prompt, visualFn: visualFn, steps: list }, o || {}); };
  const nOpt = function (n) { return { html: '<span class="on">' + n + '</span>', value: n }; };
  const wOpt = function (t, v) { return { html: '<span class="ow">' + t + '</span>', value: v === undefined ? t : v }; };
  function cyc(n, k) {
    const out = []; let bag = [];
    while (out.length < n) { if (!bag.length) { bag = []; for (let i = 0; i < k; i++) bag.push(i); bag = S(bag); } out.push(bag.pop()); }
    return out;
  }
  function distinctNums(ans, cands, count) {
    const s = [ans];
    S(cands).forEach(function (c) { if (s.length < count && s.indexOf(c) < 0 && c > 0) s.push(c); });
    let guard = 0;
    while (s.length < count && guard++ < 200) { const c = R(Math.max(1, ans - 12), ans + 12); if (s.indexOf(c) < 0 && c > 0) s.push(c); }
    return S(s).map(nOpt);
  }

  /* ================= 1단원 세 자리 수 ================= */
  G.w_hundred = function (n) {
    return cyc(n, 4).map(function (v) {
      if (v === 0) { const m = R(91, 99); return num(m + '보다 ▢만큼 더 큰 수는 100이에요. ▢에 알맞은 수를 써요.', V.blocks(m), 100 - m, { tag: '백 알아보기', hint: m + '에서 100까지 몇을 더 세면 될까요?', say: m + '보다 얼마만큼 더 큰 수가 100일까요?' }); }
      if (v === 1) { const k = R(5, 9), a = k * 10; return num(a + '보다 ▢만큼 더 큰 수는 100이에요. ▢에 알맞은 수를 써요.', V.eq(a, '+', '_', '=', 100), 100 - a, { tag: '백 알아보기', hint: '10개씩 묶음이 ' + k + '개 있어요. 10개씩 묶음 10개가 되려면 몇 개가 더 있어야 할까요?', say: a + '보다 얼마만큼 더 큰 수가 100일까요?' }); }
      if (v === 2) { const k = R(2, 8); return num('10개씩 묶음 ' + k + '개와 10개씩 묶음 ' + (10 - k) + '개를 합치면 모두 얼마일까요?', V.pairBlocks(k * 10, (10 - k) * 10, '+'), 100, { tag: '백 알아보기', hint: '10개씩 묶음이 모두 10개가 되면 100이에요.' }); }
      return choice('10이 10개이면 얼마일까요?', '', [90, 100, 110].map(nOpt), 100, { tag: '백 알아보기', hint: '10이 10개이면 100이라고 하고, “백”이라고 읽어요.' });
    });
  };

  const hOpts = function (ans) {
    const s = [ans];
    S([1, 2, 3, 4, 5, 6, 7, 8, 9].map(function (x) { return x * 100; })).forEach(function (c) { if (s.length < 3 && s.indexOf(c) < 0) s.push(c); });
    return s;
  };
  G.w_hundreds = function (n) {
    return cyc(n, 4).map(function (v) {
      const k = R(2, 9);
      if (v === 0) return num('100이 ' + k + '개이면 얼마일까요?', V.blocks3(k * 100), k * 100, { tag: '몇백', hint: '100, 200, 300… 100씩 뛰어 세어 보세요.' });
      if (v === 1) return num(k * 100 + '은 100이 몇 개일까요?', V.blocks3(k * 100), k, { tag: '몇백', hint: '백 모형이 몇 개인지 세어 보세요.' });
      if (v === 2) return choice('"' + read3(k * 100) + '"은 얼마일까요?', '', S(hOpts(k * 100)).map(nOpt), k * 100, { tag: '몇백 읽기', hint: '이백, 삼백, 사백… 앞의 글자가 백이 몇 개인지 알려 줘요.', say: read3(k * 100) + '은 얼마일까요?' });
      return choice(k * 100 + '을 바르게 읽은 것을 골라요.', '', S(hOpts(k * 100)).map(function (x) { return wOpt(read3(x), x); }), k * 100, { tag: '몇백 읽기', hint: k + '개의 백이므로 “' + read3(k * 100) + '”이라고 읽어요.' });
    });
  };

  function rnd3(zero) {
    const h = R(1, 9); let t = R(0, 9), o = R(0, 9);
    if (!zero) { t = R(1, 9); o = R(1, 9); }
    return h * 100 + t * 10 + o;
  }
  G.w_threeDigit = function (n) {
    return cyc(n, 6).map(function (v) {
      const m = rnd3(Math.random() < 0.3), h = Math.floor(m / 100), t = Math.floor(m / 10) % 10, o = m % 10;
      if (v === 0) return num('수 모형이 나타내는 수를 써요.', V.blocks3(m), m, { tag: '세 자리 수', hint: '백 모형, 십 모형, 일 모형을 차례로 세어 보세요.' });
      if (v === 1) return num('100이 ' + h + '개, 10이 ' + t + '개, 1이 ' + o + '개이면 얼마일까요?', '', m, { tag: '세 자리 수', hint: h + '00과 ' + t + '0과 ' + o + '를 합쳐 보세요.', hv: V.blocks3(m) });
      if (v === 2) return steps('수 모형을 보고 빈칸에 알맞은 수를 써요.', function () { return V.blocks3(m); },
        [{ p: '백 모형은 몇 개일까요?', a: h }, { p: '십 모형은 몇 개일까요?', a: t }, { p: '일 모형은 몇 개일까요?', a: o }], { tag: '세 자리 수의 자릿값', hint: '모형의 종류별로 따로 세어 보세요.' });
      if (v === 3) {
        const cand = [m + 10, m - 10, m + 100, m - 100, h * 100 + o * 10 + t, t * 100 + h * 10 + o].filter(function (x) { return x >= 100 && x <= 999 && x !== m; });
        const ds = S(cand.filter(function (x, i, a) { return a.indexOf(x) === i; })).slice(0, 2);
        return choice(m + '을 바르게 읽은 것을 골라요.', '', S([m].concat(ds)).map(function (x) { return wOpt(read3(x), x); }), m, { tag: '세 자리 수 읽기', hint: '백의 자리, 십의 자리, 일의 자리 순서로 읽어요.' });
      }
      const q = rnd3(false), qh = Math.floor(q / 100), qt = Math.floor(q / 10) % 10, qo = q % 10;
      if (v === 4) {
        const pl = P([['백', qh * 100], ['십', qt * 10], ['일', qo]]);
        return num(q + '에서 ' + pl[0] + '의 자리 숫자는 얼마를 나타낼까요?', V.eq(q), pl[1], { tag: '세 자리 수의 자릿값', hint: pl[0] + '의 자리 숫자의 자리가 어디인지 살펴보세요. 백의 자리는 100, 십의 자리는 10, 일의 자리는 1이 몇 개인지 나타내요.', say: q + '에서 ' + pl[0] + '의 자리 숫자는 얼마를 나타낼까요?' });
      }
      const pi = R(0, 2), d = [qh, qt, qo][pi], digs = String(q).split('').map(function (c, i) { return i === pi ? '<u>' + c + '</u>' : c; }).join('');
      return choice('밑줄 친 숫자가 나타내는 수를 골라요.', '<div class="eq"><span class="n">' + digs + '</span></div>', S([d * 100, d * 10, d]).map(nOpt), [100, 10, 1][pi] * d, { tag: '세 자리 수의 자릿값', hint: '밑줄 친 숫자가 백의 자리면 ○00, 십의 자리면 ○0, 일의 자리면 ○를 나타내요.' });
    });
  };

  G.w_skip = function (n) {
    return cyc(n, 5).map(function (v) {
      if (v <= 2) {
        const k = [100, 10, 1][v];
        const a = k === 100 ? R(1, 5) * 100 + R(0, 99) : (k === 10 ? R(100, 950) : R(100, 995));
        const items = []; for (let i = 0; i < 5; i++) items.push(a + k * i);
        const bi = P([2, 3, 4]), ans = items[bi]; items[bi] = '_';
        return num(k + '씩 뛰어 세어 빈칸에 알맞은 수를 써요.', V.seq(items), ans, { tag: k + '씩 뛰어 세기', hint: k === 100 ? '백의 자리 수가 1씩 커져요.' : (k === 10 ? '십의 자리 수가 1씩 커져요.' : '일의 자리 수가 1씩 커져요. 9 다음은 십의 자리가 올라가요.'), say: k + '씩 뛰어 세어 빈칸에 알맞은 수를 써요.' });
      }
      if (v === 3) {
        const k = P([100, 10, 1]), s0 = R(4 * k + 100, 999), items = []; for (let i = 0; i < 5; i++) items.push(s0 - k * i);
        const bi = P([2, 3, 4]), ans = items[bi]; items[bi] = '_';
        return num(k + '씩 거꾸로 뛰어 세어 빈칸에 알맞은 수를 써요.', V.seq(items), ans, { tag: '거꾸로 뛰어 세기', hint: k + '씩 작아지는 수예요.', say: k + '씩 거꾸로 뛰어 세어 빈칸에 알맞은 수를 써요.' });
      }
      const k = P([100, 10, 1]), a = R(100, 599), items = [a, a + k, a + 2 * k, a + 3 * k];
      return choice('몇씩 뛰어 세었을까요?', V.seq(items), [1, 10, 100].map(nOpt), k, { tag: '뛰어 세기', hint: '이웃한 두 수의 차를 구해 보세요.' });
    });
  };

  G.w_compare3 = function (n) {
    function two() {
      const a = R(100, 999); let b, gd = 0;
      do { const r = Math.random(); b = r < 0.4 ? Math.floor(a / 10) * 10 + R(0, 9) : (r < 0.7 ? Math.floor(a / 100) * 100 + R(0, 99) : R(100, 999)); gd++; } while (b === a && gd < 50);
      return b === a ? [a, a + 1] : [a, b];
    }
    const hint = '백의 자리부터 비교하고, 같으면 십의 자리, 그것도 같으면 일의 자리를 비교해요.';
    return cyc(n, 6).map(function (v) {
      const p = two();
      if (v === 0) return choice('더 큰 수를 골라요.', '', S(p).map(nOpt), Math.max(p[0], p[1]), { tag: '세 자리 수 크기 비교', hint: hint });
      if (v === 1) return choice('더 작은 수를 골라요.', '', S(p).map(nOpt), Math.min(p[0], p[1]), { tag: '세 자리 수 크기 비교', hint: hint });
      if (v === 2) return choice('알맞은 기호를 골라요.', '<div class="eq"><span class="n">' + p[0] + '</span><span class="blank">?</span><span class="n">' + p[1] + '</span></div>',
        [{ html: '<span class="on">&gt;</span>', value: '>' }, { html: '<span class="on">&lt;</span>', value: '<' }], p[0] > p[1] ? '>' : '<', { tag: '크기 비교 기호', hint: hint, say: p[0] + '과 ' + p[1] + '을 비교해요. 알맞은 기호를 골라요.' });
      if (v === 3) return choice(p[0] + '은 ' + p[1] + '보다 어떨까요?', '', S([wOpt('큽니다', 'big'), wOpt('작습니다', 'small')]), p[0] > p[1] ? 'big' : 'small', { tag: '세 자리 수 크기 비교', hint: hint });
      const t = []; while (t.length < 3) { const x = t.length && Math.random() < 0.6 ? Math.floor(t[0] / 100) * 100 + R(0, 99) : R(100, 999); if (t.indexOf(x) < 0 && x >= 100) t.push(x); }
      if (v === 4) return choice('가장 큰 수를 골라요.', '', t.map(nOpt), Math.max.apply(null, t), { tag: '세 자리 수 크기 비교', hint: hint });
      return choice('가장 작은 수를 골라요.', '', t.map(nOpt), Math.min.apply(null, t), { tag: '세 자리 수 크기 비교', hint: hint });
    });
  };

  G.w_solve3 = function (n) {
    return cyc(n, 4).map(function (v) {
      if (v === 0 || v === 1) {
        const ds = []; while (ds.length < 3) { const d = R(1, 9); if (ds.indexOf(d) < 0) ds.push(d); }
        const sorted = ds.slice().sort(function (a, b) { return a - b; });
        const big = sorted[2] * 100 + sorted[1] * 10 + sorted[0], small = sorted[0] * 100 + sorted[1] * 10 + sorted[2];
        return num('수 카드를 한 번씩만 사용하여 만들 수 있는 가장 ' + (v === 0 ? '큰' : '작은') + ' 세 자리 수를 써요.', V.cards(ds), v === 0 ? big : small,
          { tag: '수 카드로 수 만들기', hint: v === 0 ? '큰 수를 백의 자리에 놓아요.' : '작은 수를 백의 자리에 놓아요.' });
      }
      if (v === 2) { const h = R(1, 9), t = R(1, 9), o = R(1, 9), m = h * 100 + t * 10 + o;
        return num('이 수는 세 자리 수예요. 백의 자리 숫자는 ' + h + ', 십의 자리 숫자는 ' + t * 10 + '을 나타내고, 일의 자리 숫자는 ' + o + '예요. 이 수를 써요.', '', m, { tag: '세 자리 수 문제', hint: h + '00과 ' + t * 10 + '과 ' + o + '를 차례로 쓰면 돼요.' }); }
      const h = R(1, 9), t = R(1, 9), o = R(1, 9), m = h * 100 + t * 10 + o;
      return steps(m + '원을 100원, 10원, 1원짜리 동전으로 내려고 해요. 각각 몇 개가 필요할까요?', function () { return V.blocks3(m); },
        [{ p: '100원짜리는 몇 개일까요?', a: h }, { p: '10원짜리는 몇 개일까요?', a: t }, { p: '1원짜리는 몇 개일까요?', a: o }], { tag: '세 자리 수 문제', hint: '백의 자리 숫자가 100원짜리의 개수예요.' });
    });
  };

  /* ================= 2단원 여러 가지 도형 ================= */
  const PK = { tri: '삼각형', quad: '사각형', circle: '원' };
  const OBJC = ['접시', '시계', '단추'], OBJO = ['액자', '창문', '메모지', '텐트', '깃발', '삼각자'];
  function polyOptions(target) {
    const others = S(['tri', 'quad', 'circle', 'pent', 'hex', 'oval'].filter(function (k) { return k !== target; })).slice(0, 2);
    return S([target].concat(others)).map(function (k) { return { html: V.poly(k, P(V.PAL), 58), value: k }; });
  }
  function polyGen(target) {
    const nm = PK[target], vt = target === 'tri' ? 3 : (target === 'quad' ? 4 : 0);
    const statements = {
      tri: { ok: '곧은 선 3개로 둘러싸여 있어요.', no: ['꼭짓점이 4개 있어요.', '둥근 부분이 있어요.'] },
      quad: { ok: '변이 4개, 꼭짓점이 4개예요.', no: ['변이 3개예요.', '둥근 부분이 있어요.'] },
      circle: { ok: '어느 방향에서 보아도 똑같이 동그란 모양이에요.', no: ['꼭짓점이 3개 있어요.', '곧은 선으로 둘러싸여 있어요.'] }
    }[target];
    return function (n) {
      return cyc(n, 5).map(function (v) {
        if (v === 0) return choice(nm + '을 찾아요.', '', polyOptions(target), target, { tag: nm + ' 찾기', hint: target === 'circle' ? '어느 쪽에서 보아도 똑같이 동그란 모양이 원이에요.' : '곧은 선으로 둘러싸인 도형 중에서 변이 ' + vt + '개인 것을 찾아요.', say: nm + '을 찾아요.' });
        if (v === 1) {
          if (target === 'circle') return num('원의 꼭짓점은 몇 개일까요?', '<div class="bigshape">' + V.poly('circle', P(V.PAL), 110) + '</div>', 0, { tag: '원의 특징', hint: '원에는 뾰족한 부분이 없어요.' });
          const what = P(['변', '꼭짓점']);
          return num('이 도형의 ' + what + '은 몇 개일까요?', '<div class="bigshape">' + V.poly(target, P(V.PAL), 110) + '</div>', vt, { tag: nm + '의 변과 꼭짓점', hint: what === '변' ? '곧은 선을 하나씩 짚으며 세어 보세요.' : '뾰족한 점을 하나씩 짚으며 세어 보세요.' });
        }
        if (v === 2) return choice(nm + '을 바르게 말한 것을 골라요.', '<div class="bigshape">' + V.poly(target, P(V.PAL), 90) + '</div>', S([wOpt(statements.ok, 'ok'), wOpt(statements.no[0], 'n1'), wOpt(statements.no[1], 'n2')]), 'ok', { tag: nm + ' 알아보기', hint: '그림을 보며 ' + nm + '의 특징을 떠올려 보세요.', cols: 1 });
        if (v === 3) {
          const t = R(1, 5), others = [], pool = ['tri', 'quad', 'circle', 'pent', 'hex'].filter(function (k) { return k !== target; });
          const c = R(3, 6); for (let i = 0; i < c; i++) others.push(P(pool));
          const list = S(Array(t).fill(target).concat(others)).map(function (k) { return { k: k, c: P(V.PAL) }; });
          return num(nm + '은 모두 몇 개일까요?', V.scenePoly(list, 46), t, { tag: nm + ' 세기', hint: '색깔과 크기가 달라도 ' + nm + '이면 같은 도형이에요. 하나씩 짚으며 세어 보세요.' });
        }
        if (target === 'circle') {
          const two = S(OBJO).slice(0, 2), pr = S([P(OBJC)].concat(two));
          const ans = pr.filter(function (x) { return OBJC.indexOf(x) >= 0; })[0];
          return choice('원 모양인 물건을 찾아요.', '', pr.map(function (x) { return { html: V.obj(x, 64) + '<span class="ow">' + x + '</span>', value: x }; }), ans, { tag: '원 찾기', hint: '둥글고 뾰족한 부분이 없는 물건을 찾아요.' });
        }
        return choice('이 도형이 ' + nm + '이 아닌 까닭을 골라요.', '<div class="bigshape">' + V.poly(target === 'tri' ? 'open' : 'openq', P(V.PAL), 100) + '</div>',
          S([wOpt('곧은 선이 모두 이어져 있지 않아요.', 'a'), wOpt('변이 ' + (target === 'tri' ? 4 : 3) + '개예요.', 'b'), wOpt('둥근 부분이 있어요.', 'c')]), 'a', { tag: nm + ' 알아보기', hint: nm + '은 곧은 선으로 빈틈없이 둘러싸여 있어야 해요.', cols: 1 });
      });
    };
  }
  G.w_triangle = polyGen('tri');
  G.w_quad = polyGen('quad');
  G.w_circle = polyGen('circle');

  G.w_tangram = function (n) {
    const defs = [{ nm: '삼각형', c: 5 }, { nm: '사각형', c: 2 }, { nm: '큰 삼각형', c: 2 }, { nm: '작은 삼각형', c: 2 }];
    return cyc(n, 5).map(function (v) {
      const tg = '<div class="bigshape">' + V.tangram(220) + '</div>';
      if (v === 4) return num('칠교 조각은 모두 몇 개일까요?', tg, 7, { tag: '칠교 조각', hint: '조각 하나하나의 색깔이 달라요. 색깔을 따라 세어 보세요.' });
      const d = defs[v];
      return num('칠교 조각 중에서 ' + d.nm + ' 모양인 조각은 모두 몇 개일까요?', tg, d.c, { tag: '칠교 조각', hint: v === 2 ? '삼각형 중에서 가장 큰 조각을 찾아요.' : (v === 3 ? '삼각형 중에서 가장 작은 조각을 찾아요.' : '모양이 ' + d.nm + '인 조각을 하나씩 세어 보세요.') });
    });
  };

  G.w_stack = function (n) {
    return cyc(n, 4).map(function (v) {
      const L = R(2, 4), hs = []; for (let i = 0; i < L; i++) hs.push(R(1, 4));
      const sum = hs.reduce(function (a, b) { return a + b; }, 0), vis = '<div class="bigshape">' + V.stack(hs) + '</div>';
      if (v === 0) return num('쌓기나무는 모두 몇 개일까요?', vis, sum, { tag: '쌓기나무 세기', hint: '아래에서 위로 한 줄씩 세어서 더해 보세요.' });
      if (v === 1) return num('가장 높게 쌓은 곳에는 쌓기나무가 몇 개 있을까요?', vis, Math.max.apply(null, hs), { tag: '쌓기나무 세기', hint: '가장 높은 줄을 찾아 몇 개인지 세어 보세요.' });
      if (v === 2) { const k = R(0, L - 1), w = ['첫 번째', '두 번째', '세 번째', '네 번째'][k]; return num('왼쪽에서 ' + w + ' 줄에는 쌓기나무가 몇 개 있을까요?', vis, hs[k], { tag: '쌓기나무 세기', hint: '왼쪽에서부터 줄을 하나씩 세어 보세요.' }); }
      const key = function (a) { return a.join(','); }, opts = [hs]; let tries = 0;
      while (opts.length < 3 && tries++ < 100) {
        const c = hs.slice(), i = R(0, L - 1);
        if (Math.random() < 0.5) c[i] = Math.max(1, Math.min(4, c[i] + P([-1, 1]))); else { const j = R(0, L - 1); const tmp = c[i]; c[i] = c[j]; c[j] = tmp; }
        if (!opts.some(function (o) { return key(o) === key(c); })) opts.push(c);
      }
      return choice('쌓기나무가 왼쪽에서부터 ' + hs.join('개, ') + '개 쌓여 있어요. 알맞은 모양을 골라요.', '', S(opts).map(function (o) { return { html: V.stack(o), value: key(o) }; }), key(hs), { tag: '쌓은 모양 알아보기', hint: '왼쪽 줄부터 쌓기나무의 수를 차례로 맞춰 보세요.' });
    });
  };

  /* ================= 3단원 덧셈과 뺄셈 ================= */
  function pairAdd(kind) {
    let at, ao, bt, bo;
    if (kind === 0) { at = R(1, 8); ao = R(1, 9); bt = 0; bo = R(10 - ao, 9); }
    else if (kind === 1) { at = R(1, 4); bt = R(1, 4); ao = R(1, 9); bo = R(10 - ao, 9); }
    else if (kind === 2) { at = R(5, 9); bt = R(10 - at, 9); ao = R(0, 8); bo = R(0, 9 - ao); }
    else { at = R(4, 9); bt = R(Math.max(1, 9 - at), 9); ao = R(1, 9); bo = R(10 - ao, 9); }
    return [at * 10 + ao, bt * 10 + bo];
  }
  function pairSub(kind) {
    let at, ao, bt, bo;
    if (kind === 0) { at = R(2, 9); ao = R(0, 8); bo = R(ao + 1, 9); bt = 0; }
    else if (kind === 1) { bt = R(1, 7); at = R(bt + 2, 9); ao = R(0, 8); bo = R(ao + 1, 9); }
    else { bt = R(1, 7); at = R(bt + 2, 9); ao = 0; bo = R(1, 9); }
    return [at * 10 + ao, bt * 10 + bo];
  }
  G.w_addDecomp = function (n) {
    return cyc(n, 2).map(function (v) {
      const p = pairAdd(P([1, 2, 3])), a = p[0], b = p[1], at = Math.floor(a / 10), ao = a % 10, bt = Math.floor(b / 10), bo = b % 10, vis = V.eq(a, '+', b, '=', '_');
      if (v === 0) return steps('십의 자리와 일의 자리를 나누어 더해요.', function () { return vis; },
        [{ p: '십의 자리끼리 더해요: ' + at * 10 + ' + ' + bt * 10 + ' = ?', a: (at + bt) * 10 }, { p: '일의 자리끼리 더해요: ' + ao + ' + ' + bo + ' = ?', a: ao + bo }, { p: '합치기: ' + (at + bt) * 10 + ' + ' + (ao + bo) + ' = ?', a: a + b }],
        { tag: '여러 가지 방법으로 덧셈', hint: '몇십은 몇십끼리, 낱개는 낱개끼리 더한 뒤 합쳐요.', say: a + ' 더하기 ' + b + '를 나누어서 더해요.' });
      return steps('더하는 수를 몇십과 몇으로 나누어 차례로 더해요.', function () { return vis; },
        [{ p: a + ' + ' + bt * 10 + ' = ?', a: a + bt * 10 }, { p: (a + bt * 10) + ' + ' + bo + ' = ?', a: a + b }], { tag: '여러 가지 방법으로 덧셈', hint: b + '를 ' + bt * 10 + '과 ' + bo + '로 나누어 차례로 더해요.', say: a + ' 더하기 ' + b + '를 나누어서 차례로 더해요.' });
    });
  };
  G.w_addHz = function (n) {
    return cyc(n, 4).map(function (k) {
      const p = pairAdd(k), a = p[0], b = p[1];
      return num('계산해요.', V.eq(a, '+', b, '=', '_'), a + b, { tag: '가로셈 덧셈(받아올림)', hint: '일의 자리끼리 더해서 10이 넘으면 10을 십의 자리로 올려요.', say: a + ' 더하기 ' + b + '는 얼마일까요?' });
    });
  };
  G.w_addVert = function (n) {
    return cyc(n, 4).map(function (k) { const p = pairAdd(k); return { kind: 'vertical', op: '+', a: p[0], b: p[1], help: false, tag: '세로셈 덧셈(받아올림)' }; });
  };
  G.w_subDecomp = function (n) {
    return cyc(n, 2).map(function (v) {
      const kind = v === 0 ? P([1, 2]) : P([0, 1, 2]), p = pairSub(kind), a = p[0], b = p[1], y = Math.floor(b / 10), bo = b % 10, vis = V.eq(a, M, b, '=', '_');
      if (v === 0) return steps('빼는 수를 몇십과 몇으로 나누어 차례로 빼요.', function () { return vis; },
        [{ p: a + ' ' + M + ' ' + y * 10 + ' = ?', a: a - y * 10 }, { p: (a - y * 10) + ' ' + M + ' ' + bo + ' = ?', a: a - b }], { tag: '여러 가지 방법으로 뺄셈', hint: b + '를 ' + y * 10 + '과 ' + bo + '로 나누어 차례로 빼요.', say: a + ' 빼기 ' + b + '를 나누어서 차례로 빼요.' });
      const c = (y + 1) * 10;
      return steps('빼는 수보다 큰 몇십을 이용해서 계산해요.', function () { return vis; },
        [{ p: a + ' ' + M + ' ' + c + ' = ?', a: a - c }, { p: c + ' ' + M + ' ' + b + ' = ?', a: c - b }, { p: (a - c) + ' + ' + (c - b) + ' = ?', a: a - b }],
        { tag: '여러 가지 방법으로 뺄셈', hint: c + '을 먼저 빼면 ' + (c - b) + '만큼 너무 많이 뺀 거예요. 그만큼 다시 더해요.', say: a + ' 빼기 ' + b + '를 ' + c + '을 이용해서 계산해요.' });
    });
  };
  G.w_subHz = function (n) {
    return cyc(n, 3).map(function (k) {
      const p = pairSub(k), a = p[0], b = p[1];
      return num('계산해요.', V.eq(a, M, b, '=', '_'), a - b, { tag: '가로셈 뺄셈(받아내림)', hint: '일의 자리끼리 뺄 수 없으면 십의 자리에서 10을 받아내림해요.', say: a + ' 빼기 ' + b + '는 얼마일까요?' });
    });
  };
  G.w_subVert = function (n) {
    return cyc(n, 3).map(function (k) { const p = pairSub(k); return { kind: 'vertical', op: '-', a: p[0], b: p[1], help: false, tag: '세로셈 뺄셈(받아내림)' }; });
  };
  function tri3(a, o1, b, o2, c) {
    const r1 = o1 === '+' ? a + b : a - b, ans = o2 === '+' ? r1 + c : r1 - c, sym = function (o) { return o === '+' ? '+' : M; };
    return steps('앞에서부터 차례로 계산해요.', function (i) { return i === 0 ? V.eq(a, sym(o1), b, sym(o2), c, '=', '_') : V.eq(r1, sym(o2), c, '=', '_'); },
      [{ p: a + ' ' + sym(o1) + ' ' + b + ' = ?', a: r1 }, { p: r1 + ' ' + sym(o2) + ' ' + c + ' = ?', a: ans }],
      { tag: '세 수의 계산', hint: '앞의 두 수를 먼저 계산하고, 그 값에 나머지 수를 계산해요.', say: a + (o1 === '+' ? ' 더하기 ' : ' 빼기 ') + b + (o2 === '+' ? ' 더하기 ' : ' 빼기 ') + c + '을 앞에서부터 차례로 계산해요.' });
  }
  G.w_calc3 = function (n) {
    return cyc(n, 4).map(function (v) {
      if (v === 0) { const a = R(3, 9), b = R(3, 9), c = R(1, 20 - a - b > 0 ? Math.min(9, 20 - a - b) : 1); return tri3(a, '+', b, '+', c); }
      if (v === 1) { const a = R(12, 20), b = R(2, 9), c = R(1, Math.max(1, Math.min(9, a - b - 1))); return tri3(a, '-', b, '-', c); }
      if (v === 2) { const a = R(12, 49), b = R(5, 40), c = R(5, Math.min(30, a + b - 1)); return tri3(a, '+', b, '-', c); }
      const a = R(30, 70), b = R(5, 29), c = R(5, 30); return tri3(a, '-', b, '+', c);
    });
  };
  G.w_relation = function (n) {
    return cyc(n, 4).map(function (v) {
      let a = R(5, 60), b = R(5, 40); while (a === b) b = R(5, 40);
      const s = a + b;
      if (v === 0) { const useA = Math.random() < 0.5; return num(a + ' + ' + b + ' = ' + s + '이에요. 알맞은 수를 써요.', V.eq(s, M, useA ? a : b, '=', '_'), useA ? b : a, { tag: '덧셈과 뺄셈의 관계', hint: '덧셈식의 합에서 한 수를 빼면 다른 수가 나와요.', say: a + ' 더하기 ' + b + '는 ' + s + '이에요. ' + s + ' 빼기 ' + (useA ? a : b) + '는 얼마일까요?' }); }
      if (v === 1) return choice(a + ' + ' + b + ' = ' + s + '을 뺄셈식으로 바르게 나타낸 것을 골라요.', '',
        S([wOpt(s + ' ' + M + ' ' + a + ' = ' + b, 'ok'), wOpt(a + ' ' + M + ' ' + b + ' = ' + s, 'n1'), wOpt(s + ' ' + M + ' ' + b + ' = ' + s, 'n2')]), 'ok', { tag: '덧셈과 뺄셈의 관계', hint: '합에서 더한 수 하나를 빼면 나머지 수가 나와요.', cols: 1 });
      if (v === 2) return choice(s + ' ' + M + ' ' + a + ' = ' + b + '를 덧셈식으로 바르게 나타낸 것을 골라요.', '',
        S([wOpt(a + ' + ' + b + ' = ' + s, 'ok'), wOpt(a + ' + ' + s + ' = ' + b, 'n1'), wOpt(s + ' + ' + b + ' = ' + a, 'n2')]), 'ok', { tag: '덧셈과 뺄셈의 관계', hint: '가장 큰 수 ' + s + '가 덧셈식에서는 합이 돼요.', cols: 1 });
      return steps('수 ' + a + ', ' + b + ', ' + s + '로 덧셈식과 뺄셈식을 만들어요.', function () { return V.seq([a, b, s]); },
        [{ p: a + ' + ' + b + ' = ?', a: s }, { p: s + ' ' + M + ' ' + a + ' = ?', a: b }, { p: s + ' ' + M + ' ' + b + ' = ?', a: a }], { tag: '덧셈과 뺄셈의 관계', hint: '세 수로 덧셈식 하나와 뺄셈식 둘을 만들 수 있어요.' });
    });
  };
  G.w_unknown = function (n) {
    return cyc(n, 5).map(function (v) {
      let a = R(5, 60), b = R(5, 38); while (a === b) b = R(5, 38);
      const s = a + b;
      if (v === 0) return num('▢에 알맞은 수를 써요.', V.eq(a, '+', '_', '=', s), b, { tag: '□의 값 구하기', hint: s + ' ' + M + ' ' + a + '를 계산하면 ▢를 알 수 있어요.', say: a + ' 더하기 얼마는 ' + s + '일까요?' });
      if (v === 1) return num('▢에 알맞은 수를 써요.', V.eq('_', '+', a, '=', s), b, { tag: '□의 값 구하기', hint: s + ' ' + M + ' ' + a + '를 계산하면 ▢를 알 수 있어요.', say: '얼마 더하기 ' + a + '는 ' + s + '일까요?' });
      if (v === 2) return num('▢에 알맞은 수를 써요.', V.eq(s, M, '_', '=', a), b, { tag: '□의 값 구하기', hint: s + ' ' + M + ' ' + a + '를 계산하면 ▢를 알 수 있어요.', say: s + ' 빼기 얼마는 ' + a + '일까요?' });
      if (v === 3) return num('▢에 알맞은 수를 써요.', V.eq('_', M, a, '=', b), s, { tag: '□의 값 구하기', hint: a + ' + ' + b + '를 계산하면 ▢를 알 수 있어요.', say: '얼마 빼기 ' + a + '는 ' + b + '일까요?' });
      const x = R(11, 40), y = R(5, 9);
      return choice('구슬이 ' + x + '개 있었는데 몇 개를 더 받았더니 ' + (x + y) + '개가 되었어요. 더 받은 구슬의 수를 ▢로 하여 알맞은 식을 골라요.', '',
        S([wOpt(x + ' + ▢ = ' + (x + y), 'ok'), wOpt(x + ' ' + M + ' ▢ = ' + (x + y), 'n1'), wOpt((x + y) + ' + ▢ = ' + x, 'n2')]), 'ok', { tag: '□를 사용한 식', hint: '구슬이 늘어났으니 덧셈식으로 나타내요. 처음 수가 앞에 와요.', cols: 1 });
    });
  };
  const NAMES = ['재이', '연우', '지아', '세미', '슬기', '나래'];
  const ITEMS = [['구슬', '개'], ['색종이', '장'], ['사탕', '개'], ['딱지', '장'], ['제기', '개'], ['조개껍데기', '개']];
  G.w_story3 = function (n) {
    return cyc(n, 4).map(function (v) {
      const it = P(ITEMS), n1 = P(NAMES), u = it[1], uS = u === '개' ? '가' : '이', uO = u === '개' ? '를' : '을'; let n2; do { n2 = P(NAMES); } while (n2 === n1);
      if (v === 0) { const p = pairAdd(P([0, 1, 2, 3])), a = p[0], b = p[1];
        return num(n1 + '는 ' + it[0] + ' ' + a + u + ', ' + n2 + '는 ' + b + u + ' 가지고 있어요. 두 사람이 가진 ' + it[0] + '의 수는 모두 몇 ' + u + '일까요?', V.eq(a, '+', b, '=', '_'), a + b, { tag: '덧셈 문제', hint: '합치는 이야기는 덧셈식으로 나타내요.' }); }
      if (v === 1) { const p = pairSub(P([0, 1, 2])), a = p[0], b = p[1];
        return num(n1 + '는 ' + it[0] + ' ' + a + u + ', ' + n2 + '는 ' + b + u + ' 가지고 있어요. ' + n1 + '는 ' + n2 + '보다 몇 ' + u + ' 더 많이 가지고 있을까요?', V.eq(a, M, b, '=', '_'), a - b, { tag: '뺄셈 문제', hint: '얼마나 더 많은지 구할 때는 뺄셈식으로 나타내요.' }); }
      if (v === 2) { const a = R(20, 50), b = R(10, 30), c = R(5, Math.min(25, a + b - 1));
        return steps('참새 ' + a + '마리가 앉아 있었는데 ' + b + '마리가 더 날아왔고, 그 뒤 ' + c + '마리가 날아갔어요. 남은 참새는 몇 마리일까요?', function (i) { return i === 0 ? V.eq(a, '+', b, M, c, '=', '_') : V.eq(a + b, M, c, '=', '_'); },
          [{ p: '날아온 뒤 참새는 몇 마리일까요? (' + a + ' + ' + b + ')', a: a + b }, { p: '날아간 뒤 남은 참새는? (' + (a + b) + ' ' + M + ' ' + c + ')', a: a + b - c }], { tag: '세 수의 계산 문제', hint: '일어난 일의 순서대로 식을 세워요.' }); }
      const a = R(30, 80), b = R(11, a - 5), c = a - b;
      return num(n1 + '는 ' + it[0] + ' ' + a + u + ' 중에서 몇 ' + u + uO + ' 가져갔더니 ' + b + u + uS + ' 남았어요. ' + n1 + '가 가져간 ' + it[0] + '의 수는 몇 ' + u + '일까요?', V.eq(a, M, '_', '=', b), c, { tag: '□를 구하는 문제', hint: a + ' ' + M + ' ' + b + '를 계산하면 가져간 수를 알 수 있어요.' });
    });
  };

  /* ================= 4단원 길이 재기 ================= */
  const BC = ['#E8505B', '#3A7BD5', '#3A9D5D', '#F5B301'];
  const MARK = ['㉠', '㉡', '㉢'];
  G.w_lenCompare = function (n) {
    return cyc(n, 4).map(function (v) {
      if (v === 3) return choice('두 물건의 길이를 비교하는 방법으로 알맞은 것을 골라요.', '', S([wOpt('한쪽 끝을 맞추고 다른 쪽 끝을 비교해요.', 'ok'), wOpt('아무 곳에서나 비교해요.', 'n1'), wOpt('굵기가 굵은 쪽이 길어요.', 'n2')]), 'ok', { tag: '길이 비교 방법', hint: '한쪽 끝을 맞추어야 정확하게 비교할 수 있어요.', cols: 1 });
      const k = v === 2 ? 3 : 2, lens = []; while (lens.length < k) { const x = R(2, 11); if (lens.indexOf(x) < 0) lens.push(x); }
      const items = lens.map(function (l, i) { return { label: MARK[i], len: l, color: BC[i] }; });
      const maxI = lens.indexOf(Math.max.apply(null, lens)), minI = lens.indexOf(Math.min.apply(null, lens));
      const opts = MARK.slice(0, k).map(function (m, i) { return { html: '<span class="ow">' + m + '</span>', value: i }; });
      if (v === 0) return choice('길이가 더 ' + (k === 2 ? '긴' : '가장 긴') + ' 것을 골라요.', V.bars(items), opts, maxI, { tag: '길이 비교', hint: '왼쪽 끝이 맞춰져 있으니 오른쪽 끝이 더 먼 것이 더 길어요.' });
      if (v === 1) return choice('길이가 더 ' + (k === 2 ? '짧은' : '가장 짧은') + ' 것을 골라요.', V.bars(items), opts, minI, { tag: '길이 비교', hint: '왼쪽 끝이 맞춰져 있으니 오른쪽 끝이 더 가까운 것이 더 짧아요.' });
      return choice('길이가 가장 긴 것을 골라요.', V.bars(items), opts, maxI, { tag: '길이 비교', hint: '세 개 모두 오른쪽 끝을 비교해 보세요.' });
    });
  };
  G.w_lenUnits = function (n) {
    return cyc(n, 4).map(function (v) {
      const k = R(3, 10);
      if (v === 0) return num('클립으로 길이를 쟀어요. 막대의 길이는 클립으로 몇 번일까요?', V.measureUnits(k, 'clip'), k, { tag: '여러 가지 단위로 재기', hint: '클립을 하나씩 세어 보세요.' });
      if (v === 1) return choice('같은 막대를 큰 단위와 작은 단위로 재었어요. 작은 단위로 재면 잰 횟수는 어떻게 될까요?', V.measureUnits(4, 'cube big', 52) + V.measureUnits(8, 'cube', 26), S([wOpt('더 많아요', 'more'), wOpt('더 적어요', 'less'), wOpt('똑같아요', 'same')]), 'more', { tag: '단위 길이와 횟수', hint: '단위의 길이가 짧으면 같은 길이를 재는 데 더 여러 번 필요해요.' });
      if (v === 2) { const a = R(3, 7), b = a + R(1, 4), nm = ['연필', '리본', '막대'];
        return choice('같은 클립으로 재었더니 ㉠은 ' + a + '번, ㉡은 ' + b + '번이었어요. 더 긴 것을 골라요.', V.measureUnits(a, 'clip', 22) + V.measureUnits(b, 'clip', 22), [wOpt('㉠', 0), wOpt('㉡', 1)], 1, { tag: '여러 가지 단위로 재기', hint: '같은 단위로 잰 횟수가 더 많은 쪽이 더 길어요.' }); }
      return num('막대의 길이는 1 cm가 몇 번인지 세어 보세요.', V.measureUnits(k, 'cm'), k, { tag: '1 cm 알아보기', hint: '1 cm 길이가 몇 칸인지 세어 보세요.' });
    });
  };
  G.w_lenCm = function (n) {
    return cyc(n, 4).map(function (v) {
      const k = R(2, 11);
      if (v === 0) return num('막대의 길이는 몇 cm일까요?', V.measureUnits(k, 'cm'), k, { tag: '1 cm 알아보기', hint: '1 cm가 몇 번 들어가는지 세어 보세요.' });
      if (v === 1) return num('1 cm가 ' + k + '번이면 몇 cm일까요?', V.measureUnits(k, 'cm'), k, { tag: '1 cm 알아보기', hint: '1 cm가 ' + k + '번이면 ' + k + ' cm예요.' });
      if (v === 2) return choice(k + ' cm를 바르게 읽은 것을 골라요.', '', S([wOpt(k + ' 센티미터', 'ok'), wOpt(k + ' 밀리미터', 'n1'), wOpt(k + ' 미터', 'n2')]), 'ok', { tag: 'cm 읽기', hint: 'cm는 센티미터라고 읽어요.', say: k + ' cm를 바르게 읽은 것을 골라요.' });
      const j = R(2, 11);
      return num(j + ' 센티미터를 수와 단위로 쓰면 ' + j + ' cm예요. 1 cm가 몇 번일까요?', V.measureUnits(j, 'cm'), j, { tag: '1 cm 알아보기', hint: j + ' cm는 1 cm가 ' + j + '번이에요.' });
    });
  };
  G.w_ruler = function (n) {
    return cyc(n, 4).map(function (v) {
      const k = R(2, 11);
      if (v === 0 || v === 3) return num('자로 막대의 길이를 재었어요. 몇 cm일까요?', V.ruler(k), k, { tag: '자로 길이 재기', hint: '막대의 한쪽 끝은 눈금 0에 맞춰져 있어요. 다른 쪽 끝의 눈금을 읽어요.', say: '자로 막대의 길이를 재었어요. 몇 센티미터일까요?' });
      if (v === 1) return choice('자로 길이를 잴 때 물건의 한쪽 끝은 어느 눈금에 맞춰야 할까요?', '', [0, 1, 5].map(nOpt), 0, { tag: '자 사용법', hint: '자의 눈금 0에 물건의 한쪽 끝을 맞추어요.' });
      const L = R(3, 7);
      return choice('자로 길이를 바르게 잰 것을 골라요.', '', S([{ html: V.ruler(L, { max: 8, scale: 17 }), value: 'ok' }, { html: V.ruler(L, { max: 8, scale: 17, start: 1 }), value: 'no' }]), 'ok', { tag: '자 사용법', hint: '물건의 한쪽 끝이 눈금 0에 맞는 것을 찾아요.', cols: 1 });
    });
  };
  const THINGS = [['지우개', 5], ['클립', 3], ['풀', 10], ['연필', 15], ['가위', 18], ['공책의 짧은 쪽', 18], ['엄지손가락 길이', 5], ['색연필', 15]];
  G.w_lenEst = function (n) {
    return cyc(n, 3).map(function (v) {
      if (v === 2) { const t = P(THINGS), k = t[1], opts = distinctNums(k, [Math.max(1, Math.round(k / 3)), k * 2, k + 8, Math.max(1, k - 4)], 3);
        return choice(t[0] + '의 길이는 약 몇 cm일까요?', '', opts, k, { tag: '길이 어림하기', hint: '내 손가락이나 클립(약 3 cm)과 견주어 생각해 보세요.', say: t[0] + '의 길이는 약 몇 센티미터일까요?' }); }
      const ref = P([3, 4, 5]), k = R(2, 11), target = k === ref ? k + 1 : k;
      return choice('㉠ 막대의 길이는 ' + ref + ' cm예요. ㉡ 막대의 길이는 약 몇 cm일까요?', V.bars([{ label: '㉠', len: ref, color: '#3A7BD5', text: ref + ' cm' }, { label: '㉡', len: target, color: '#F2994A' }]),
        distinctNums(target, [target + 3, target - 3, target + 5, Math.max(1, target - 5)], 3), target, { tag: '길이 어림하기', hint: '㉠ 막대 ' + ref + ' cm가 ㉡ 막대에 몇 번 들어가는지 어림해 보세요.', say: '㉡ 막대의 길이는 약 몇 센티미터일까요?' });
    });
  };
  G.w_lenSolve = function (n) {
    return cyc(n, 3).map(function (v) {
      if (v === 0) { const a = R(2, 6), b = R(2, 6);
        return num('길이가 ' + a + ' cm인 막대와 ' + b + ' cm인 막대를 이어 붙이면 모두 몇 cm일까요?', V.bars([{ label: '㉠', len: a, color: '#3A7BD5', text: a + ' cm' }, { label: '㉡', len: b, color: '#F2994A', text: b + ' cm', gap: a }]), a + b, { tag: '길이 더하기', hint: '두 막대의 길이를 더해요.' }); }
      if (v === 1) { const b = R(2, 6), a = b + R(1, 6);
        return num('㉠ 막대는 ' + a + ' cm, ㉡ 막대는 ' + b + ' cm예요. ㉠은 ㉡보다 몇 cm 더 길까요?', V.bars([{ label: '㉠', len: a, color: '#3A7BD5', text: a + ' cm' }, { label: '㉡', len: b, color: '#F2994A', text: b + ' cm' }]), a - b, { tag: '길이 빼기', hint: '긴 길이에서 짧은 길이를 빼요.' }); }
      const a = R(3, 6), b = R(3, 6), c = R(2, 5);
      return steps('길이가 ' + a + ' cm, ' + b + ' cm, ' + c + ' cm인 막대를 한 줄로 이어 붙였어요. 모두 몇 cm일까요?', function (i) { return V.bars([{ label: '㉠', len: a, color: '#3A7BD5', text: a + ' cm' }, { label: '㉡', len: b, color: '#F2994A', text: b + ' cm', gap: a }, { label: '㉢', len: c, color: '#3A9D5D', text: c + ' cm', gap: a + b }]); },
        [{ p: '㉠과 ㉡을 이으면 몇 cm일까요?', a: a + b }, { p: '㉢까지 이으면 모두 몇 cm일까요?', a: a + b + c }], { tag: '길이 더하기', hint: '두 막대씩 차례로 더해요.' });
    });
  };

  /* ================= 5단원 분류하기 ================= */
  const CK = ['#E8505B', '#3A7BD5', '#F5B301', '#3A9D5D'];
  const SN = { c: '원', t: '삼각형', s: '사각형' };
  function makeItems(crit, counts) {
    const list = [];
    if (crit === 'color') { const cols = S(CK).slice(0, counts.length); counts.forEach(function (c, i) { for (let j = 0; j < c; j++) list.push({ k: P(['c', 't', 's']), c: cols[i], big: Math.random() < 0.5 }); }); return { list: S(list), cats: cols, names: cols.map(function (c) { return V.CNAME[c]; }) }; }
    if (crit === 'shape') { const ks = S(['c', 't', 's']).slice(0, counts.length); counts.forEach(function (c, i) { for (let j = 0; j < c; j++) list.push({ k: ks[i], c: P(CK), big: Math.random() < 0.5 }); }); return { list: S(list), cats: ks, names: ks.map(function (k) { return SN[k]; }) }; }
    counts.forEach(function (c, i) { for (let j = 0; j < c; j++) list.push({ k: P(['c', 't', 's']), c: P(CK), big: i === 0 }); });
    return { list: S(list), cats: [true, false], names: ['큰 것', '작은 것'] };
  }
  G.w_clsCriteria = function (n) {
    const GOOD = ['색깔', '모양', '크기'], BAD = ['예쁜 것', '귀여운 것', '좋아하는 것', '맛있는 것'];
    return cyc(n, 3).map(function (v) {
      if (v === 0) return choice('분류 기준으로 알맞은 것을 골라요.', '', S([wOpt(P(GOOD), 'ok'), wOpt(BAD[0], 'n1'), wOpt(BAD[1], 'n2')]), 'ok', { tag: '분류 기준', hint: '누가 분류해도 결과가 같은 기준이어야 해요.' });
      if (v === 1) { const m = R(2, 3), cn = [R(1, 3), R(1, 3), R(1, 3)].slice(0, m), crit = P(['color', 'shape']);
        const vis = makeItems(crit, cn);
        return num((crit === 'color' ? '색깔' : '모양') + '을 기준으로 분류하면 몇 가지로 나눌 수 있을까요?', V.items(vis.list), vis.cats.length, { tag: '분류 기준', hint: '기준이 같은 것끼리 묶었을 때 몇 묶음이 생기는지 세어 보세요.' }); }
      const info = makeItems('color', [R(2, 3), R(2, 3), R(1, 3)]);
      return choice('물건들을 분류하는 기준으로 알맞지 않은 것을 골라요.', V.items(info.list), S([wOpt('색깔', 'g1'), wOpt('모양', 'g2'), wOpt('예쁜 것', 'bad')]), 'bad', { tag: '분류 기준', hint: '“예쁘다”는 사람마다 생각이 달라서 분류 기준이 될 수 없어요.' });
    });
  };
  G.w_clsDo = function (n) {
    return cyc(n, 4).map(function (v) {
      if (v === 0) { const info = makeItems('color', [R(1, 5), R(1, 5), R(1, 4)]), i = R(0, info.cats.length - 1), cnt = info.list.filter(function (x) { return x.c === info.cats[i]; }).length;
        return num(info.names[i] + '은 모두 몇 개일까요?', V.items(info.list), cnt, { tag: '기준에 따라 분류', hint: info.names[i] + ' 도형만 하나씩 짚으며 세어 보세요.' }); }
      if (v === 1) { const info = makeItems('shape', [R(1, 5), R(1, 5), R(1, 4)]), i = R(0, info.cats.length - 1), cnt = info.list.filter(function (x) { return x.k === info.cats[i]; }).length;
        return num(info.names[i] + '은 모두 몇 개일까요?', V.items(info.list), cnt, { tag: '기준에 따라 분류', hint: '색깔과 크기는 달라도 모양이 같으면 같은 도형이에요.' }); }
      if (v === 2) { const b = R(2, 6), s = R(1, 6), info = makeItems('size', [b, s]);
        return num('큰 도형은 모두 몇 개일까요?', V.items(info.list), b, { tag: '기준에 따라 분류', hint: '크기가 큰 도형만 세어 보세요.' }); }
      const info = makeItems('color', [R(2, 5), R(2, 5), R(1, 3)]), c = P(info.cats), k = P(['c', 't', 's']), cnt = info.list.filter(function (x) { return x.c === c && x.k === k; }).length;
      const lst = info.list.slice(); if (cnt === 0) { lst.push({ k: k, c: c, big: true }); }
      const real = lst.filter(function (x) { return x.c === c && x.k === k; }).length;
      return num(V.CNAME[c] + ' ' + SN[k] + '은 모두 몇 개일까요?', V.items(S(lst)), real, { tag: '기준에 따라 분류', hint: '색깔과 모양이 모두 맞는 도형만 세어 보세요.' });
    });
  };
  G.w_clsCount = function (n) {
    return cyc(n, 3).map(function (v) {
      const crit = ['color', 'shape', 'size'][v], counts = crit === 'size' ? [R(2, 6), R(2, 6)] : [R(1, 5), R(1, 5), R(1, 4)];
      const info = makeItems(crit, counts), total = counts.reduce(function (a, b) { return a + b; }, 0);
      const list = counts.map(function (c, i) { return { p: info.names[i] + '은 몇 개일까요?', a: c }; });
      list.push({ p: '모두 몇 개일까요?', a: total });
      return steps((crit === 'color' ? '색깔' : (crit === 'shape' ? '모양' : '크기')) + '을 기준으로 분류하고 세어 보아요.', function () { return V.items(info.list); }, list, { tag: '분류하고 세어 보기', hint: '한 가지씩 따로 세어 보세요. 다 세고 나면 모두 더해요.' });
    });
  };
  G.w_clsResult = function (n) {
    return cyc(n, 4).map(function (v) {
      let counts, info, gd = 0;
      do { counts = [R(1, 6), R(1, 6), R(1, 6)]; gd++; } while (gd < 100 && (v < 2) && (function () { const a = counts.slice().sort(function (x, y) { return x - y; }); return v === 0 ? a[2] === a[1] : a[0] === a[1]; })());
      info = makeItems(P(['color', 'shape']), counts);
      const key = function (i) { return info.names[i]; };
      const idx = [0, 1, 2];
      const opts = S(idx.map(function (i) { return wOpt(key(i), i); }));
      const cnt = function (i) { return info.list.filter(function (x) { return (typeof info.cats[0] === 'string' && info.cats[0][0] === '#') ? x.c === info.cats[i] : x.k === info.cats[i]; }).length; };
      const real = idx.map(cnt);
      if (v === 0) return choice('가장 많은 것은 무엇일까요?', V.items(info.list), opts, real.indexOf(Math.max.apply(null, real)), { tag: '분류한 결과 말하기', hint: '종류별로 몇 개인지 세어서 비교해 보세요.' });
      if (v === 1) return choice('가장 적은 것은 무엇일까요?', V.items(info.list), opts, real.indexOf(Math.min.apply(null, real)), { tag: '분류한 결과 말하기', hint: '종류별로 몇 개인지 세어서 비교해 보세요.' });
      if (v === 2) { const o = real.map(function (c, i) { return [c, i]; }).sort(function (a, b) { return b[0] - a[0]; }); const A = o[0], B = o[2];
        if (A[0] === B[0]) return num(key(A[1]) + '은 모두 몇 개일까요?', V.items(info.list), A[0], { tag: '분류한 결과 말하기', hint: '하나씩 짚으며 세어 보세요.' });
        return num(key(A[1]) + '은 ' + key(B[1]) + '보다 몇 개 더 많을까요?', V.items(info.list), A[0] - B[0], { tag: '분류한 결과 말하기', hint: '두 종류의 개수를 센 뒤 큰 수에서 작은 수를 빼요.' }); }
      return choice('가게에서 도형 스티커를 사 가려고 해요. 이 중에서 가장 많이 준비해 두어야 하는 것은 무엇일까요?', V.items(info.list), opts, real.indexOf(Math.max.apply(null, real)), { tag: '분류한 결과 말하기', hint: '가장 많은 것을 더 많이 준비해야 해요.' });
    });
  };

  /* ================= 6단원 곱셈 ================= */
  const GC = ['#3A7BD5', '#E8505B', '#3A9D5D', '#F2994A'];
  const pa = function () { return R(2, 6); };
  G.w_countWays = function (n) {
    return cyc(n, 4).map(function (v) {
      if (v === 0) { const a = pa(), k = R(2, 5); return num('모두 몇 개인지 세어 보세요.', V.groups(a, k, P(GC)), a * k, { tag: '여러 가지 방법으로 세기', hint: a + '씩 뛰어 세어도 좋고, 하나씩 세어도 좋아요.' }); }
      if (v === 1) { const a = P([2, 3, 4, 5]), items = []; for (let i = 1; i <= 4; i++) items.push(a * i); const bi = R(1, 3), ans = items[bi]; items[bi] = '_';
        return num(a + '씩 뛰어 세어 빈칸에 알맞은 수를 써요.', V.seq(items), ans, { tag: '뛰어 세기', hint: a + '씩 커지는 수예요.' }); }
      if (v === 2) { const a = pa(), k = R(2, 5);
        return choice('같은 수씩 묶어서 세어 보세요. 알맞은 설명을 골라요.', V.groups(a, k, P(GC)), S([wOpt(a + '씩 ' + k + '묶음', 'ok'), wOpt((a + 1) + '씩 ' + k + '묶음', 'n1'), wOpt(a + '씩 ' + (k + 1) + '묶음', 'n2')]), 'ok', { tag: '묶어 세기', hint: '한 묶음에 몇 개씩 있는지, 묶음이 몇 개인지 세어 보세요.', cols: 1 }); }
      const a = P([2, 3, 4, 5]), k = R(3, 5), items = []; for (let i = 1; i <= k; i++) items.push(a * i); items[k - 1] = '_';
      return num(a + '씩 ' + k + '번 뛰어 세면 마지막 수는 얼마일까요?', V.seq(items), a * k, { tag: '뛰어 세기', hint: a + '씩 ' + k + '번 뛰어 세어 보세요.' });
    });
  };
  G.w_groups = function (n) {
    return cyc(n, 2).map(function (v) {
      const a = pa(), k = R(2, 6), vis = V.groups(a, k, P(GC));
      if (v === 0) return steps('묶어 세어 보아요.', function () { return vis; }, [{ p: '몇 개씩 묶여 있나요?', a: a }, { p: '몇 묶음인가요?', a: k }, { p: '모두 몇 개일까요?', a: a * k }], { tag: '묶어 세기', hint: '한 묶음에 몇 개씩인지 먼저 세어 보세요.' });
      return num(a + '개씩 ' + k + '묶음은 모두 몇 개일까요?', vis, a * k, { tag: '묶어 세기', hint: a + '씩 ' + k + '번 뛰어 세어 보세요.', hv: '' });
    });
  };
  G.w_times = function (n) {
    return cyc(n, 5).map(function (v) {
      const a = pa(), k = R(2, 6);
      if (v === 0) return num(a + '씩 ' + k + '묶음은 ' + a + '의 몇 배일까요?', V.groups(a, k, P(GC)), k, { tag: '몇의 몇 배', hint: a + '씩 ' + k + '묶음은 ' + a + '의 ' + k + '배예요.' });
      if (v === 1) return choice(a + '씩 ' + k + '묶음을 바르게 나타낸 것을 골라요.', V.groups(a, k, P(GC)), S([wOpt(a + '의 ' + k + '배', 'ok'), wOpt(k + '의 ' + a + '배', 'n1'), wOpt(a + '의 ' + (k + 1) + '배', 'n2')]), 'ok', { tag: '몇의 몇 배', hint: '한 묶음의 수가 먼저, 묶음의 수가 뒤에 와요.', cols: 1 });
      if (v === 2) return num(a + '의 ' + k + '배는 ' + a + '씩 몇 묶음일까요?', V.groups(a, k, P(GC)), k, { tag: '몇의 몇 배', hint: a + '의 ' + k + '배는 ' + a + '씩 ' + k + '묶음이에요.' });
      if (v === 3) { const small = R(2, 4), big = small * R(2, 4);
        return num('파란 막대의 길이는 노란 막대의 길이의 몇 배일까요?', V.bars([{ label: '노랑', len: small, color: '#F5B301', text: small + ' cm' }, { label: '파랑', len: big, color: '#3A7BD5', text: big + ' cm' }], { unit: big > 12 ? 14 : 18 }), big / small, { tag: '몇 배로 나타내기', hint: '노란 막대를 몇 번 이어 붙이면 파란 막대와 같아질까요?' }); }
      const red = R(2, 4), m = R(2, 5);
      return num('빨간 구슬은 ' + red + '개, 파란 구슬은 ' + red * m + '개예요. 파란 구슬의 수는 빨간 구슬의 수의 몇 배일까요?', V.dots(red, '#E8505B') + V.dots(red * m, '#3A7BD5'), m, { tag: '몇 배로 나타내기', hint: red + '개씩 묶으면 파란 구슬은 몇 묶음일까요?' });
    });
  };
  G.w_multIntro = function (n) {
    return cyc(n, 4).map(function (v) {
      const a = pa(), k = R(2, 7), p = a * k, vis = V.groups(a, k, P(GC));
      if (v === 0) return steps('곱셈을 알아보아요.', function () { return vis; }, [{ p: a + '씩 ' + k + '묶음은 ' + a + '의 몇 배일까요?', a: k }, { p: a + '의 ' + k + '배는 ' + a + ' × ' + k + '이라고 써요. ' + a + ' × ' + k + ' = ?', a: p }], { tag: '곱셈 알아보기', hint: a + '씩 ' + k + '번 더하면 몇일까요?' });
      if (v === 1) { const parts = []; for (let i = 0; i < k; i++) parts.push(a);
        return num(parts.join(' + ') + '는 ' + a + ' × □와 같아요. □에 알맞은 수를 써요.', '', k, { tag: '곱셈 알아보기', hint: a + '를 몇 번 더했는지 세어 보세요.', say: a + '를 ' + k + '번 더한 것은 ' + a + ' 곱하기 얼마와 같을까요?' }); }
      if (v === 2) return choice(a + ' × ' + k + ' = ' + p + '을 바르게 읽은 것을 골라요.', '', S([wOpt(a + ' 곱하기 ' + k + '는 ' + p + '과 같습니다.', 'ok'), wOpt(a + ' 더하기 ' + k + '는 ' + p + '과 같습니다.', 'n1'), wOpt(a + ' 빼기 ' + k + '는 ' + p + '과 같습니다.', 'n2')]), 'ok', { tag: '곱셈 읽기', hint: '×는 곱하기라고 읽어요.', cols: 1, say: a + ' 곱하기 ' + k + '는 ' + p + '과 같습니다.' });
      return num(a + ' × ' + k + '의 곱은 얼마일까요?', vis, p, { tag: '곱셈 알아보기', hint: a + '씩 ' + k + '묶음이에요. 모두 세어 보세요.', say: a + ' 곱하기 ' + k + '의 곱은 얼마일까요?' });
    });
  };
  G.w_mult = function (n) {
    return cyc(n, 4).map(function (v) {
      const a = pa(), k = R(2, 7), p = a * k, vis = V.groups(a, k, P(GC));
      if (v === 0) return num('그림을 곱셈식으로 나타내어 계산해요. ' + a + ' × ' + k + ' = ?', vis, p, { tag: '곱셈식', hint: a + '씩 ' + k + '묶음이에요.' });
      if (v === 1) return choice('그림을 곱셈식으로 바르게 나타낸 것을 골라요.', vis, S([wOpt(a + ' × ' + k + ' = ' + p, 'ok'), wOpt(a + ' + ' + k + ' = ' + (a + k), 'n1'), wOpt(k + ' × ' + (a + 1) + ' = ' + k * (a + 1), 'n2')]), 'ok', { tag: '곱셈식', hint: '한 묶음의 수 × 묶음의 수로 나타내요.', cols: 1 });
      if (v === 2) { const parts = []; for (let i = 0; i < k; i++) parts.push(a);
        return steps('덧셈식을 곱셈식으로 바꾸어 보아요.', function () { return V.eq(a + ' × ' + k); }, [{ p: parts.join(' + ') + ' = ?', a: p }, { p: a + ' × ' + k + ' = ?', a: p }], { tag: '곱셈식', hint: '같은 수를 여러 번 더한 것은 곱셈식으로 나타낼 수 있어요.' }); }
      return num(a + ' × ' + k + ' = ?', V.eq(a, X, k, '=', '_'), p, { tag: '곱셈식', hint: a + '를 ' + k + '번 더해 보세요.', hv: vis });
    });
  };
  G.w_multSolve = function (n) {
    return cyc(n, 3).map(function (v) {
      const a = pa(), k = R(2, 7), p = a * k, it = P([['접시', '가', '사과', '가', '는'], ['상자', '가', '과자', '가', '는'], ['봉지', '가', '귤', '이', '은'], ['바구니', '가', '달걀', '이', '은'], ['꽃병', '이', '장미', '가', '는']]);
      if (v === 0) return num(it[0] + it[1] + ' ' + k + '개 있어요. ' + it[0] + ' 한 개에 ' + it[2] + it[3] + ' ' + a + '개씩 있어요. ' + it[2] + it[4] + ' 모두 몇 개일까요?', V.groups(a, k, P(GC)), p, { tag: '곱셈 문제', hint: '곱셈식 ' + a + ' × ' + k + '로 구해요.' });
      if (v === 1) return choice(a + ' × ' + k + '의 곱과 같은 것을 골라요.', '', S([wOpt(k + ' × ' + a, 'ok'), wOpt(a + ' × ' + (k + 1), 'n1'), wOpt((a + 1) + ' × ' + k, 'n2')]), 'ok', { tag: '곱셈 문제', hint: a + '씩 ' + k + '묶음이나 ' + k + '씩 ' + a + '묶음이나 모두 같은 수예요.', cols: 1 });
      const rows = R(2, 5), cols = R(2, 6);
      return steps('한 줄에 ' + cols + '개씩 ' + rows + '줄로 쿠키를 놓았어요.', function () { return V.groups(cols, rows, '#F2994A'); }, [{ p: '곱셈식 ' + cols + ' × ' + rows + ' = ?', a: cols * rows }, { p: '쿠키는 모두 몇 개일까요?', a: cols * rows }], { tag: '곱셈 문제', hint: '한 줄의 수 × 줄의 수로 구해요.' });
    });
  };

  g.GEN = G;
})(typeof window !== 'undefined' ? window : globalThis);
