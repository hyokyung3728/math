/* 문제 만들기 틀 — data.js 의 gen 이름과 같은 함수가 문제를 매번 새로 만들어요
   (동아출판 『수학 1-2』 차시 구성에 맞춤) */
(function (g) {
  'use strict';
  const V = g.V;
  const R = function (a, b) { return a + Math.floor(Math.random() * (b - a + 1)); };
  const P = function (a) { return a[R(0, a.length - 1)]; };
  const S = function (a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = R(0, i), t = a[i]; a[i] = a[j]; a[j] = t; } return a; };
  const M = '−';
  const SINO = ['', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구'];
  const NT = ['', '열', '스물', '서른', '마흔', '쉰', '예순', '일흔', '여든', '아흔'];
  const NO = ['', '하나', '둘', '셋', '넷', '다섯', '여섯', '일곱', '여덟', '아홉'];
  const sino = function (n) { if (n >= 100) return '백'; const t = Math.floor(n / 10), o = n % 10; return (t > 1 ? SINO[t] : '') + (t ? '십' : '') + SINO[o]; };
  const native = function (n) { return NT[Math.floor(n / 10)] + NO[n % 10]; };
  const josa = function (n, withB, noB) { const c = sino(n).slice(-1).charCodeAt(0) - 0xAC00; return c % 28 ? withB : noB; };

  const num = function (prompt, visual, answer, o) { return Object.assign({ kind: 'num', prompt: prompt, visual: visual || '', answer: answer }, o || {}); };
  const choice = function (prompt, visual, options, answer, o) { return Object.assign({ kind: 'choice', prompt: prompt, visual: visual || '', options: options, answer: answer }, o || {}); };
  const steps = function (prompt, visualFn, list, o) { return Object.assign({ kind: 'steps', prompt: prompt, visualFn: visualFn, steps: list }, o || {}); };
  const nOpt = function (n) { return { html: '<span class="on">' + n + '</span>', value: n }; };
  const wOpt = function (t, v) { return { html: '<span class="ow">' + t + '</span>', value: v === undefined ? t : v }; };
  const dOpt = function (t, v) { return { html: '<span class="ow digi">' + t + '</span>', value: v }; };
  const shapeOpt = function (x) { return { html: V.shape(x, '#8C98AD', 40) + '<span class="ow">' + V.SHAPE_NAME[x] + '</span>', value: x }; };

  function numOpts(ans, count, mode) {
    const s = [ans]; let guard = 0;
    while (s.length < count && guard++ < 300) {
      let c;
      if (mode === 'ten') c = R(1, 9) * 10;
      else if (mode === 'digit') c = R(1, 9);
      else if (mode === 'swap') c = P([ans + 10, ans - 10, ans + 1, ans - 1, (ans % 10) * 10 + Math.floor(ans / 10)]);
      else c = R(Math.max(1, ans - 9), Math.min(99, ans + 9));
      if (c >= 1 && c <= 100 && s.indexOf(c) < 0) s.push(c);
    }
    return S(s).map(nOpt);
  }
  function cyc(n, k) {
    const out = []; let bag = [];
    while (out.length < n) { if (!bag.length) { bag = []; for (let i = 0; i < k; i++) bag.push(i); bag = S(bag); } out.push(bag.pop()); }
    return out;
  }

  const GEN = {};

  /* ===================== 1단원 100까지의 수 ===================== */
  GEN.tens = function (n) {
    return cyc(n, 4).map(function (v) {
      const k = R(2, 9), t = k * 10;
      if (v === 0) return num('10개씩 묶음 ' + k + '개예요. 모두 몇 개일까요?', V.blocks(t), t, { tag: '몇십', hint: '10, 20, 30… 10씩 뛰어 세어 보세요.', say: '10개씩 묶음이 ' + k + '개예요. 모두 몇 개일까요?' });
      if (v === 1) return num(t + '은 10개씩 묶음 몇 개일까요?', V.blocks(t), k, { tag: '몇십', hint: '수 모형에서 십 모형이 몇 개인지 세어 보세요.' });
      if (v === 2) return choice("'" + native(t) + "'은 어떤 수일까요?", '', numOpts(t, 3, 'ten'), t, { tag: '몇십 읽기', hint: '열, 스물, 서른, 마흔, 쉰, 예순, 일흔, 여든, 아흔 순서예요.', say: native(t) + '은 어떤 수일까요?' });
      return choice("'" + sino(t) + "'은 어떤 수일까요?", '', numOpts(t, 3, 'ten'), t, { tag: '몇십 읽기', hint: '십, 이십, 삼십, 사십, 오십… 순서로 읽어 보세요.', say: sino(t) + '은 어떤 수일까요?' });
    });
  };

  GEN.tensOnes = function (n) {
    return cyc(n, 4).map(function (v) {
      const t = R(1, 9), o = R(1, 9), a = t * 10 + o;
      if (v === 0) return num('수 모형이 나타내는 수를 써요.', V.blocks(a), a, { tag: '99까지의 수', hint: '십 모형은 10, 일 모형은 1이에요. 10씩 세고 낱개를 더해요.' });
      if (v === 1) return num('10개씩 묶음 ' + t + '개와 낱개 ' + o + '개는 얼마일까요?', V.blocks(a), a, { tag: '99까지의 수', hint: t + '0과 ' + o + '를 합쳐 보세요.' });
      if (v === 2) return steps('수 모형을 보고 빈칸에 알맞은 수를 써요.', function () { return V.blocks(a); },
        [{ p: '10개씩 묶음은 몇 개일까요?', a: t }, { p: '낱개는 몇 개일까요?', a: o }], { tag: '자릿값', hint: '십 모형과 일 모형을 따로 세어 보세요.' });
      return Math.random() < 0.5
        ? choice("'" + native(a) + "'은 어떤 수일까요?", '', numOpts(a, 3, 'swap'), a, { tag: '99까지의 수 읽기', say: native(a) + '은 어떤 수일까요?', hint: '앞부분이 몇십을 나타내요.' })
        : choice("'" + sino(a) + "'은 어떤 수일까요?", '', numOpts(a, 3, 'swap'), a, { tag: '99까지의 수 읽기', say: sino(a) + '은 어떤 수일까요?', hint: '앞부분이 몇십을 나타내요.' });
    });
  };

  /* 수를 넣어 이야기하기: 개수는 하나·둘…, 번호나 값은 일·이… 로 읽어요 */
  GEN.storyNum = function (n) {
    return cyc(n, 3).map(function (v) {
      const m = R(2, 9) * 10 + R(5, 9);
      if (v === 0) {
        const u = P(['마리', '개', '명', '송이', '자루']);
        return choice('"' + m + u + '"을 바르게 읽은 것을 골라요.', '', S([wOpt(native(m) + ' ' + u, 'n'), wOpt(sino(m) + ' ' + u, 's')]), 'n',
          { tag: '수 읽기 이야기', hint: '물건의 개수를 셀 때는 열, 스물, 서른… 하나, 둘, 셋… 이렇게 읽어요.', say: m + u + '을 바르게 읽은 것을 골라요.' });
      }
      if (v === 1) {
        const u = P(['쪽', '호', '원']);
        return choice('"' + m + u + '"을 바르게 읽은 것을 골라요.', '', S([wOpt(native(m) + ' ' + u, 'n'), wOpt(sino(m) + ' ' + u, 's')]), 's',
          { tag: '수 읽기 이야기', hint: '쪽, 호, 원처럼 번호나 값을 말할 때는 일, 이, 삼… 십, 이십… 이렇게 읽어요.', say: m + u + '을 바르게 읽은 것을 골라요.' });
      }
      const u = P(['마리', '개', '명', '송이', '자루']);
      return choice("'" + native(m) + ' ' + u + "'은 얼마일까요?", '', numOpts(m, 3, 'swap'), m, { tag: '수 읽기 이야기', hint: '앞부분이 몇십을 나타내요.', say: native(m) + ' ' + u + '은 얼마일까요?' });
    });
  };

  GEN.order = function (n) {
    return cyc(n, 6).map(function (v) {
      if (v === 0) { const s = R(1, 96), bi = R(1, 3), items = []; for (let i = 0; i < 5; i++) items.push(s + i); const a = items[bi]; items[bi] = '_'; return num('빈칸에 알맞은 수를 써요.', V.seq(items), a, { tag: '수의 순서', hint: '앞의 수보다 1 큰 수예요.' }); }
      if (v === 1) { const m = R(10, 99); return num(m + '보다 1 큰 수는 얼마일까요?', V.seq([m, '_']), m + 1, { tag: '1 큰 수·1 작은 수', hint: m + ' 다음에 오는 수예요.' }); }
      if (v === 2) { const m = R(11, 100); return num(m + '보다 1 작은 수는 얼마일까요?', V.seq(['_', m]), m - 1, { tag: '1 큰 수·1 작은 수', hint: m + ' 바로 앞에 오는 수예요.' }); }
      if (v === 3) { const r0 = R(0, 7), b = r0 * 10 + R(1, 30); return num('수 배열표의 빈칸에 알맞은 수를 써요.', V.chart({ r0: r0, rows: 3, blank: b }), b, { tag: '수 배열표', hint: '오른쪽으로 갈수록 1씩 커지고, 아래로 가면 10씩 커져요.' }); }
      if (v === 4) { const m = R(11, 98); return steps(m + '의 바로 앞의 수와 바로 뒤의 수를 써요.', function () { return V.seq(['_', m, '_']); }, [{ p: '바로 앞의 수는?', a: m - 1 }, { p: '바로 뒤의 수는?', a: m + 1 }], { tag: '1 큰 수·1 작은 수', hint: '앞의 수는 1 작고, 뒤의 수는 1 커요.' }); }
      const m = R(10, 89); return num(m + '보다 10 큰 수는 얼마일까요?', V.seq([m, '_']), m + 10, { tag: '10 큰 수', hint: '10개씩 묶음이 하나 늘어나요.' });
    });
  };

  GEN.compare = function (n) {
    function two() { const a = R(10, 99); let b; do { b = Math.random() < 0.5 ? Math.floor(a / 10) * 10 + R(0, 9) : R(10, 99); } while (b === a); return [a, b]; }
    function three() { const s = []; while (s.length < 3) { const x = R(10, 99); if (s.indexOf(x) < 0) s.push(x); } return s; }
    const hint = '먼저 10개씩 묶음 수를 비교하고, 같으면 낱개를 비교해요.';
    return cyc(n, 6).map(function (v) {
      if (v === 0) { const p = two(); return choice('더 큰 수를 골라요.', '', S(p).map(nOpt), Math.max(p[0], p[1]), { tag: '수의 크기 비교', hint: hint }); }
      if (v === 1) { const p = two(); return choice('더 작은 수를 골라요.', '', S(p).map(nOpt), Math.min(p[0], p[1]), { tag: '수의 크기 비교', hint: hint }); }
      if (v === 2) { const p = two(); return choice('알맞은 기호를 골라요.', '<div class="eq"><span class="n">' + p[0] + '</span><span class="blank">?</span><span class="n">' + p[1] + '</span></div>',
        [{ html: '<span class="on">&gt;</span>', value: '>' }, { html: '<span class="on">&lt;</span>', value: '<' }], p[0] > p[1] ? '>' : '<', { tag: '크기 비교 기호', hint: '큰 쪽으로 입이 벌어져요. ' + hint, say: p[0] + '과 ' + p[1] + '을 비교해요. 알맞은 기호를 골라요.' }); }
      if (v === 3) { const p = two(); return choice(p[0] + josa(p[0], '은', '는') + ' ' + p[1] + '보다 어떨까요?', '', S([wOpt('큽니다', 'big'), wOpt('작습니다', 'small')]), p[0] > p[1] ? 'big' : 'small', { tag: '수의 크기 비교', hint: hint }); }
      const t = three();
      if (v === 4) return choice('가장 큰 수를 골라요.', '', t.map(nOpt), Math.max.apply(null, t), { tag: '수의 크기 비교', hint: hint });
      return choice('가장 작은 수를 골라요.', '', t.map(nOpt), Math.min.apply(null, t), { tag: '수의 크기 비교', hint: hint });
    });
  };

  GEN.evenodd = function (n) {
    return cyc(n, 5).map(function (v) {
      if (v === 0) { const k = R(2, 20); return choice('점을 둘씩 짝지어 보고 짝수인지 홀수인지 골라요.', V.pairs(k), [wOpt('짝수', '짝'), wOpt('홀수', '홀')], k % 2 ? '홀' : '짝', { tag: '짝수와 홀수', hint: '짝이 없는 점이 남으면 홀수, 모두 짝이 있으면 짝수예요.' }); }
      if (v === 1 || v === 2) {
        const evens = [], odds = [];
        while (evens.length < 3) { const x = R(1, 49) * 2; if (evens.indexOf(x) < 0) evens.push(x); }
        while (odds.length < 3) { const x = R(0, 49) * 2 + 1; if (odds.indexOf(x) < 0) odds.push(x); }
        if (v === 1) return choice('짝수를 골라요.', '', S([evens[0], odds[0], odds[1]]).map(nOpt), evens[0], { tag: '짝수와 홀수', hint: '일의 자리가 0, 2, 4, 6, 8이면 짝수예요.' });
        return choice('홀수를 골라요.', '', S([odds[0], evens[0], evens[1]]).map(nOpt), odds[0], { tag: '짝수와 홀수', hint: '일의 자리가 1, 3, 5, 7, 9이면 홀수예요.' });
      }
      if (v === 3) { const s = 2 * R(1, 40); return num('짝수를 순서대로 써요. 빈칸에 알맞은 수는?', V.seq([s, s + 2, s + 4, '_']), s + 6, { tag: '짝수와 홀수', hint: '짝수는 2씩 커져요.' }); }
      const s = 2 * R(0, 40) + 1; return num('홀수를 순서대로 써요. 빈칸에 알맞은 수는?', V.seq([s, s + 2, s + 4, '_']), s + 6, { tag: '짝수와 홀수', hint: '홀수도 2씩 커져요.' });
    });
  };

  /* ===================== 2단원 덧셈과 뺄셈(1) ===================== */
  function tri(a, o1, b, o2, c) {
    const r1 = o1 === '+' ? a + b : a - b, ans = o2 === '+' ? r1 + c : r1 - c;
    const sym = function (o) { return o === '+' ? '+' : M; };
    return steps('앞에서부터 차례로 계산해요.', function (i) { return i === 0 ? V.eq(a, sym(o1), b, sym(o2), c, '=', '_') : V.eq(r1, sym(o2), c, '=', '_'); },
      [{ p: a + ' ' + sym(o1) + ' ' + b + ' = ?', a: r1 }, { p: r1 + ' ' + sym(o2) + ' ' + c + ' = ?', a: ans }],
      { tag: o1 === '+' ? '세 수의 덧셈' : '세 수의 뺄셈', hint: '앞의 두 수를 먼저 계산하고, 그 값에 나머지 수를 계산해요.',
        say: a + (o1 === '+' ? ' 더하기 ' : ' 빼기 ') + b + (o2 === '+' ? ' 더하기 ' : ' 빼기 ') + c + '은 얼마일까요?' });
  }
  GEN.add3 = function (n) {
    const out = [];
    for (let i = 0; i < n; i++) {
      let a, b, c, gd = 0;
      do { a = R(1, 7); b = R(1, 7); c = R(1, 7); gd++; } while (a + b + c > 9 && gd < 200);
      if (a + b + c > 9) { a = 2; b = 3; c = 4; }
      out.push(tri(a, '+', b, '+', c));
    }
    return out;
  };
  GEN.sub3 = function (n) {
    const out = [];
    for (let i = 0; i < n; i++) { const a = R(5, 9), b = R(1, a - 2), c = R(1, a - b - 1); out.push(tri(a, '-', b, '-', c)); }
    return out;
  };
  GEN.make10 = function (n) {
    return cyc(n, 3).map(function (v) {
      const a = R(1, 9);
      if (v === 0) return num('빈칸에 알맞은 수를 써요.', V.eq(a, '+', '_', '=', 10) + V.tfN(a), 10 - a, { tag: '10 만들기', hint: '10칸 중에서 비어 있는 칸이 몇 개인지 세어 보세요.', say: a + ' 더하기 얼마는 10일까요?' });
      if (v === 1) return num('빈칸에 알맞은 수를 써요.', V.eq('_', '+', a, '=', 10) + V.tfN(a), 10 - a, { tag: '10 만들기', hint: '10칸 중에서 비어 있는 칸이 몇 개인지 세어 보세요.', say: '얼마 더하기 ' + a + '는 10일까요?' });
      return choice(a + '와 더해서 10이 되는 수를 골라요.', V.tfN(a), numOpts(10 - a, 3, 'digit'), 10 - a, { tag: '10 만들기', hint: '10칸 중에서 비어 있는 칸이 몇 개일까요?' });
    });
  };
  GEN.sub10 = function (n) {
    return cyc(n, 3).map(function (v) {
      const a = R(1, 9);
      if (v === 0) return num('10에서 ' + a + '를 빼면 얼마일까요?', V.eq(10, M, a, '=', '_') + V.tfSub(a), 10 - a, { tag: '10에서 빼기', hint: '지운 칸을 빼고 남은 칸을 세어 보세요.', say: '10 빼기 ' + a + '는 얼마일까요?' });
      if (v === 1) return num('빈칸에 알맞은 수를 써요.', V.eq(10, M, '_', '=', a) + V.tfN(a), 10 - a, { tag: '10에서 빼기', hint: '10에서 몇을 빼면 ' + a + '가 남을까요? 10칸에서 ' + a + '칸이 남아요.', say: '10 빼기 얼마는 ' + a + '일까요?' });
      return choice('10에서 ' + a + '를 빼고 남은 수를 골라요.', V.tfSub(a), numOpts(10 - a, 3, 'digit'), 10 - a, { tag: '10에서 빼기', hint: '10칸에서 지운 칸을 빼고 세어 보세요.' });
    });
  };
  /* 10을 만들어 더하기: 세 수 중 더해서 10이 되는 두 수를 먼저 더해요 */
  GEN.addMake10 = function (n) {
    return cyc(n, 3).map(function (pos) {
      const x = R(1, 9), y = 10 - x, z = R(1, 9), arr = pos === 0 ? [x, y, z] : (pos === 1 ? [z, x, y] : [x, z, y]);
      return steps('더해서 10이 되는 두 수를 먼저 더해요.', function (i) { return i === 0 ? V.eq(arr[0], '+', arr[1], '+', arr[2], '=', '_') : V.eq(10, '+', z, '=', '_'); },
        [{ p: x + '와 더해서 10이 되는 수를 찾아 써요.', a: y }, { p: '10 + ' + z + ' = ?', a: 10 + z }],
        { tag: '10을 만들어 더하기', hint: '세 수 중에서 더해서 10이 되는 두 수를 찾아 먼저 더해요.', say: arr[0] + ' 더하기 ' + arr[1] + ' 더하기 ' + arr[2] + '을 10을 만들어서 계산해요.' });
    });
  };

  /* ===================== 3단원 모양과 시각 ===================== */
  const OBJS = { c: ['접시', '시계', '단추'], s: ['액자', '창문', '메모지'], t: ['텐트', '깃발', '삼각자'] };
  const ALLOBJ = [].concat(OBJS.c, OBJS.s, OBJS.t);
  GEN.shapeFind = function (n) {
    return cyc(n, 2).map(function (v) {
      const ks = ['c', 't', 's'], k = P(ks);
      if (v === 0) return choice('이 모양의 이름을 골라요.', '<div class="bigshape">' + V.shape(k, P(V.PAL), 110) + '</div>', S(ks).map(shapeOpt), k,
        { tag: '모양 이름', hint: '네모, 세모, 동그라미 중에서 어떤 모양과 같은지 살펴보세요.', say: '이 모양의 이름을 골라요.' });
      const picks = S(ks).map(function (x) { return P(OBJS[x]); });
      const ans = picks.filter(function (nm) { return V.OBJ_SHAPE[nm] === k; })[0];
      return choice(V.SHAPE_NAME[k] + ' 모양인 물건을 찾아요.', '<div class="bigshape">' + V.shape(k, '#8C98AD', 64) + '</div>',
        picks.map(function (nm) { return { html: V.obj(nm, 64) + '<span class="ow">' + nm + '</span>', value: nm }; }), ans,
        { tag: '모양 찾기', hint: '물건의 겉모양이 어떤 모양과 닮았는지 살펴보세요.' });
    });
  };
  /* 모양 알아보기: 뾰족한 부분 */
  GEN.shapeProp = function (n) {
    const pts = { c: 0, t: 3, s: 4 };
    return cyc(n, 4).map(function (v) {
      const ks = ['c', 't', 's'], k = P(ks);
      if (v === 0) { const t = P(['t', 's']); return choice('뾰족한 부분이 ' + pts[t] + '개인 모양을 골라요.', '', S(ks).map(shapeOpt), t, { tag: '모양의 특징', hint: '뾰족한 부분을 손가락으로 짚으며 세어 보세요.' }); }
      if (v === 1) return choice('뾰족한 부분이 없는 모양을 골라요.', '', S(ks).map(shapeOpt), 'c', { tag: '모양의 특징', hint: '동그라미는 둥글어서 뾰족한 부분이 없어요.' });
      if (v === 2) return num('이 모양에는 뾰족한 부분이 몇 개 있을까요?', '<div class="bigshape">' + V.shape(k, P(V.PAL), 110) + '</div>', pts[k], { tag: '모양의 특징', hint: '뾰족한 부분을 하나씩 세어 보세요. 없으면 0이에요.' });
      let list, cnt, gd = 0;
      do { list = []; for (let i = 0; i < R(6, 8); i++) list.push(P(ALLOBJ)); cnt = list.filter(function (x) { return V.OBJ_SHAPE[x] === 'c'; }).length; gd++; } while ((cnt < 1 || cnt > 5) && gd < 100);
      if (cnt < 1) { list = ['접시', '액자', '텐트', '단추', '창문', '깃발']; cnt = 2; }
      return num('뾰족한 부분이 없는 물건은 모두 몇 개일까요?', '<div class="scene">' + list.map(function (x) { return V.obj(x, 54); }).join('') + '</div>', cnt, { tag: '모양의 특징', hint: '동그라미 모양인 물건을 찾아 세어 보세요.' });
    });
  };
  GEN.shapeCount = function (n) {
    return cyc(n, 5).map(function (v) {
      const keys = ['c', 't', 's'];
      if (v <= 2) {
        let cnt, gd = 0;
        do { cnt = { c: R(1, 5), t: R(1, 5), s: R(1, 5) }; gd++; }
        while (v > 0 && gd < 100 && (function () { const a = [cnt.c, cnt.t, cnt.s].sort(function (x, y) { return x - y; }); return v === 1 ? a[2] === a[1] : a[0] === a[1]; })());
        const list = [];
        keys.forEach(function (k) { for (let i = 0; i < cnt[k]; i++) list.push({ k: k, c: P(V.PAL) }); });
        const scene = V.scene(S(list));
        if (v === 0) { const k = P(keys); return num(V.SHAPE_NAME[k] + ' 모양은 모두 몇 개일까요?', scene, cnt[k], { tag: '모양 세기', hint: '색깔은 달라도 모양이 같으면 같은 모양이에요. 하나씩 짚으며 세어 보세요.' }); }
        const ans = keys.slice().sort(function (x, y) { return v === 1 ? cnt[y] - cnt[x] : cnt[x] - cnt[y]; })[0];
        return choice(v === 1 ? '가장 많은 모양을 골라요.' : '가장 적은 모양을 골라요.', scene, S(keys).map(shapeOpt), ans, { tag: '모양 세기', hint: '모양별로 몇 개인지 세어서 비교해 보세요.' });
      }
      const fi = R(0, V.FIGS.length - 1), fc = V.figCount(fi), fig = '<div class="bigshape">' + V.figure(fi, 230) + '</div>';
      if (v === 3) { const k = P(keys); return num('모양 조각으로 만든 ' + V.FIGS[fi].n + '이에요. ' + V.SHAPE_NAME[k] + ' 모양 조각은 몇 개 쓰였을까요?', fig, fc[k], { tag: '모양 만들기', hint: '그림을 보며 ' + V.SHAPE_NAME[k] + ' 모양 조각을 하나씩 세어 보세요.' }); }
      const ans = keys.slice().sort(function (x, y) { return fc[y] - fc[x]; })[0];
      return choice('이 그림에 가장 많이 쓰인 모양 조각을 골라요.', fig, S(keys).map(shapeOpt), ans, { tag: '모양 만들기', hint: '모양별로 몇 개 쓰였는지 세어서 비교해 보세요.' });
    });
  };
  function otherHours(h) { return S([h % 12 + 1, (h + 10) % 12 + 1, (h + 5) % 12 + 1]).filter(function (x) { return x !== h; }).slice(0, 2); }
  GEN.clockRead = function (n) {
    return cyc(n, 4).map(function (v) {
      const h = R(1, 12), od = otherHours(h);
      if (v === 0) return choice('시계가 나타내는 시각을 골라요.', '<div class="clockbox">' + V.clock(h, 0, 190) + '</div>', S([h, od[0], od[1]]).map(function (x) { return wOpt(x + '시', x); }), h,
        { tag: '몇 시', hint: '짧은 바늘이 가리키는 숫자가 시예요. 긴 바늘이 12에 있으면 정각이에요.', say: '시계가 나타내는 시각을 골라요.' });
      if (v === 1) return { kind: 'clockset', h: h, m: 0, prompt: h + '시가 되도록 시계 바늘을 움직여요.', tag: '몇 시 만들기', hint: '긴 바늘은 12에 두고, 짧은 바늘을 ' + h + '에 맞춰요.' };
      if (v === 2) return num('디지털 시계가 나타내는 시각은 몇 시일까요?', V.digital(h, 0), h, { tag: '디지털 시계', hint: ':(두 점) 앞의 수가 시예요.', say: '디지털 시계가 나타내는 시각은 몇 시일까요?' });
      return choice('시계가 나타내는 시각을 디지털 시계로 나타낸 것을 골라요.', '<div class="clockbox">' + V.clock(h, 0, 190) + '</div>', S([h, od[0], od[1]]).map(function (x) { return dOpt(x + ':00', x); }), h,
        { tag: '디지털 시계', hint: '정각은 ○:00 으로 나타내요.', say: '시계가 나타내는 시각을 디지털 시계로 나타낸 것을 골라요.' });
    });
  };
  GEN.clockHalf = function (n) {
    return cyc(n, 4).map(function (v) {
      const h = R(1, 12), nx = h % 12 + 1;
      if (v === 0) return choice('시계가 나타내는 시각을 골라요.', '<div class="clockbox">' + V.clock(h, 30, 190) + '</div>', S([wOpt(h + '시 30분', 'a'), wOpt(h + '시', 'b'), wOpt(nx + '시 30분', 'c')]), 'a',
        { tag: '몇 시 30분', hint: '긴 바늘이 6을 가리키면 30분이에요. 짧은 바늘은 ' + h + '와 ' + nx + ' 사이에 있어요.', say: '시계가 나타내는 시각을 골라요.' });
      if (v === 1) return { kind: 'clockset', h: h, m: 30, prompt: h + '시 30분이 되도록 시계 바늘을 움직여요.', tag: '몇 시 30분 만들기', hint: '긴 바늘은 6에 두고, 짧은 바늘은 ' + h + '를 막 지난 자리에 둬요.' };
      if (v === 2) return steps('디지털 시계를 보고 빈칸에 알맞은 수를 써요.', function () { return V.digital(h, 30); }, [{ p: '몇 시일까요?', a: h }, { p: '몇 분일까요?', a: 30 }], { tag: '디지털 시계', hint: ':(두 점) 앞의 수는 시, 뒤의 수는 분이에요.' });
      return choice('시계가 나타내는 시각을 디지털 시계로 나타낸 것을 골라요.', '<div class="clockbox">' + V.clock(h, 30, 190) + '</div>', S([dOpt(h + ':30', 'a'), dOpt(h + ':00', 'b'), dOpt(nx + ':30', 'c')]), 'a',
        { tag: '디지털 시계', hint: '30분은 ○:30 으로 나타내요.', say: '시계가 나타내는 시각을 디지털 시계로 나타낸 것을 골라요.' });
    });
  };

  /* ===================== 4단원 덧셈과 뺄셈(2) ===================== */
  const ADDS = [], SUBS = [];
  for (let a = 2; a <= 9; a++) for (let b = 2; b <= 9; b++) if (a + b >= 11) ADDS.push([a, b]);
  for (let t = 11; t <= 18; t++) for (let b = t - 9; b <= 9; b++) if (b >= 2) SUBS.push([t, b]);

  GEN.addCarrySteps = function (n) {
    return cyc(n, 1).map(function () {
      const big = R(6, 9), small = R(11 - big, big), need = 10 - big, rest = small - need, tot = big + small, swap = Math.random() < 0.5;
      const x = swap ? small : big, y = swap ? big : small;
      return steps('10을 만들어서 더해요.', function (i) { return V.eq(x, '+', y, '=', '_') + V.addFrames(big, small, i > 0 ? 1 : 0); },
        [{ p: big + '과 더해서 10이 되려면 몇이 필요할까요?', a: need }, { p: small + '를 ' + need + '와 몇으로 가를 수 있을까요?', a: rest }, { p: '10 + ' + rest + ' = ?', a: tot }],
        { tag: '10을 만들어 더하기', hint: '큰 수에 얼마를 더하면 10이 되는지 먼저 찾아요.', say: x + ' 더하기 ' + y + '를 10을 만들어서 더해요.' });
    });
  };
  GEN.addCarryNum = function (n) {
    return cyc(n, 1).map(function () {
      const p = P(ADDS), a = p[0], b = p[1];
      return num('계산해요.', V.eq(a, '+', b, '=', '_'), a + b, { tag: '몇 더하기 몇', hint: '큰 수에서 10을 먼저 만들어 보세요.', hv: V.addFrames(Math.max(a, b), Math.min(a, b), 1), say: a + ' 더하기 ' + b + '는 얼마일까요?' });
    });
  };
  /* 여러 가지 덧셈: 합이 같은 식, 합이 1씩 커지는 규칙 */
  GEN.addSame = function (n) {
    const fmt = function (p) { return p[0] + ' + ' + p[1]; };
    return cyc(n, 3).map(function (v) {
      if (v === 1) {
        const a = R(5, 9), b0 = R(Math.max(2, 11 - a), 6);
        const vis = [0, 1, 2].map(function (i) { return V.eq(a, '+', b0 + i, '=', a + b0 + i); }).join('') + V.eq(a, '+', b0 + 3, '=', '_');
        return num('계산 결과가 어떻게 변하는지 살펴보고, 빈칸에 알맞은 수를 써요.', vis, a + b0 + 3, { tag: '여러 가지 덧셈', hint: '더하는 수가 1씩 커지면 합도 1씩 커져요.' });
      }
      let base, same, gd = 0;
      do { base = P(ADDS); same = ADDS.filter(function (p) { return p[0] + p[1] === base[0] + base[1] && p[0] !== base[0] && p[0] !== base[1]; }); gd++; } while (!same.length && gd < 200);
      const s = base[0] + base[1];
      const others = S(ADDS.filter(function (p) { return p[0] + p[1] !== s; }));
      if (v === 0) {
        const right = P(same), wrong = [others[0], others[1]];
        return choice(base[0] + ' + ' + base[1] + '과 합이 같은 식을 찾아요.', V.eq(base[0], '+', base[1]), S([right, wrong[0], wrong[1]]).map(function (p) { return wOpt(fmt(p)); }), fmt(right), { tag: '여러 가지 덧셈', hint: base[0] + ' + ' + base[1] + '의 합은 ' + s + '이에요. 합이 ' + s + '인 식을 찾아요.', say: base[0] + ' 더하기 ' + base[1] + '과 합이 같은 식을 찾아요.' });
      }
      const eq2 = ADDS.filter(function (p) { return p[0] + p[1] === s; }), a1 = P(eq2);
      let a2 = P(eq2.filter(function (p) { return fmt(p) !== fmt(a1); }).concat(eq2.length > 1 ? [] : [a1]));
      return choice('합이 ' + s + josa(s, '이', '가') + ' 아닌 식을 골라요.', '', S([a1, a2, others[0]]).filter(function (p, i, arr) { return arr.findIndex(function (q) { return fmt(q) === fmt(p); }) === i; }).map(function (p) { return wOpt(fmt(p)); }), fmt(others[0]), { tag: '여러 가지 덧셈', hint: '식마다 합을 구해서 ' + s + '이 아닌 것을 찾아요.' });
    });
  };
  GEN.subBorrowSteps = function (n) {
    return cyc(n, 1).map(function () {
      const p = P(SUBS), tot = p[0], b = p[1], x = tot - 10;
      return steps('10에서 먼저 빼서 계산해요.', function (i) { return V.eq(tot, M, b, '=', '_') + V.subFrames(tot, b, i > 0 ? 1 : 0); },
        [{ p: tot + '은 10과 몇일까요?', a: x }, { p: '10에서 ' + b + '를 빼면?', a: 10 - b }, { p: (10 - b) + ' + ' + x + ' = ?', a: tot - b }],
        { tag: '10에서 빼서 계산', hint: '십몇을 10과 몇으로 가르고, 10에서 먼저 빼요.', say: tot + ' 빼기 ' + b + '를 10에서 먼저 빼서 계산해요.' });
    });
  };
  /* 낱개를 먼저 빼서 계산하기 */
  GEN.subBorrowSteps2 = function (n) {
    return cyc(n, 1).map(function () {
      const p = P(SUBS), tot = p[0], b = p[1], x = tot - 10;
      return steps('낱개를 먼저 빼서 계산해요.', function (i) { return V.eq(tot, M, b, '=', '_') + V.subFrames2(tot, b, i); },
        [{ p: tot + '에서 낱개 ' + x + '를 먼저 빼면?', a: 10 }, { p: b + '에서 ' + x + '를 빼면 몇이 남을까요?', a: b - x }, { p: '10 ' + M + ' ' + (b - x) + ' = ?', a: tot - b }],
        { tag: '낱개 먼저 빼기', hint: '낱개를 먼저 빼서 10을 만들고, 남은 수를 10에서 빼요.', say: tot + ' 빼기 ' + b + '를 낱개를 먼저 빼서 계산해요.' });
    });
  };
  GEN.subBorrowNum = function (n) {
    return cyc(n, 1).map(function () {
      const p = P(SUBS), tot = p[0], b = p[1], x = tot - 10;
      return num('계산해요.', V.eq(tot, M, b, '=', '_'), tot - b, { tag: '십몇 빼기 몇', hint: '10에서 ' + b + '를 빼고, 남은 ' + x + '를 더해 보세요.', hv: V.subFrames(tot, b, 1), say: tot + ' 빼기 ' + b + '는 얼마일까요?' });
    });
  };
  GEN.subBorrowMix = function (n) {
    const h = Math.ceil(n / 2), a = GEN.subBorrowSteps2(h), b = GEN.subBorrowNum(n - h), out = [];
    for (let i = 0; i < n; i++) out.push(i % 2 === 0 ? a.shift() || b.shift() : b.shift() || a.shift());
    return out;
  };
  /* 여러 가지 뺄셈: 차가 같은 식, 차가 1씩 줄어드는 규칙 */
  GEN.subSame = function (n) {
    const fmt = function (p) { return p[0] + ' ' + M + ' ' + p[1]; }, diff = function (p) { return p[0] - p[1]; };
    return cyc(n, 2).map(function (v) {
      if (v === 1) {
        const t = R(12, 15), b0 = R(Math.max(2, t - 9), 6);
        const vis = [0, 1, 2].map(function (i) { return V.eq(t, M, b0 + i, '=', t - b0 - i); }).join('') + V.eq(t, M, b0 + 3, '=', '_');
        return num('계산 결과가 어떻게 변하는지 살펴보고, 빈칸에 알맞은 수를 써요.', vis, t - b0 - 3, { tag: '여러 가지 뺄셈', hint: '빼는 수가 1씩 커지면 차는 1씩 작아져요.' });
      }
      let base, same, gd = 0;
      do { base = P(SUBS); same = SUBS.filter(function (p) { return diff(p) === diff(base) && p[0] !== base[0]; }); gd++; } while (!same.length && gd < 200);
      const right = P(same), others = S(SUBS.filter(function (p) { return diff(p) !== diff(base); }));
      return choice(fmt(base) + '과 계산 결과가 같은 식을 찾아요.', V.eq(base[0], M, base[1]), S([right, others[0], others[1]]).map(function (p) { return wOpt(fmt(p)); }), fmt(right),
        { tag: '여러 가지 뺄셈', hint: fmt(base) + '의 결과는 ' + diff(base) + '이에요. 결과가 ' + diff(base) + '인 식을 찾아요.', say: base[0] + ' 빼기 ' + base[1] + '과 계산 결과가 같은 식을 찾아요.' });
    });
  };

  /* ===================== 5단원 규칙 찾기 ===================== */
  function letterMap() { const l = S([0, 1, 2, 3]); return { A: l[0], B: l[1], C: l[2] }; }
  const UNITS = ['AB', 'AAB', 'ABB', 'ABC', 'AABB'];
  function patSeq(u, map, L) { const seq = []; for (let i = 0; i < L; i++) seq.push(map[u[i % u.length]]); return seq; }
  GEN.patFind = function (n) {
    return cyc(n, 6).map(function (ui) {
      const u = UNITS[ui % 5], map = letterMap();
      if (ui === 5) {
        const uu = P(UNITS), seq = patSeq(uu, map, uu.length * 3);
        return choice('되풀이되는 부분은 몇 개씩일까요?', V.tokSeq(seq), [2, 3, 4].map(nOpt), uu.length, { tag: '규칙 찾기', hint: '같은 모양이 처음으로 다시 나올 때까지 몇 개인지 세어 보세요.' });
      }
      const L = u.length === 4 ? 9 : (u.length === 3 ? 8 : 7), seq = patSeq(u, map, L);
      const bi = P([L - 1, L - 2]), ans = seq[bi], shown = seq.slice(); shown[bi] = '_';
      const others = S([0, 1, 2, 3].filter(function (t) { return t !== ans; })).slice(0, 2);
      return choice('규칙을 찾아 빈칸에 알맞은 것을 골라요.', V.tokSeq(shown), S([ans].concat(others)).map(function (t) { return { html: V.tok(t, 52), value: t }; }), ans,
        { tag: '무늬 규칙', hint: '같은 모양이 되풀이되는 부분을 찾아보세요.', cols: 3 });
    });
  };
  GEN.patFill = function (n) {
    return cyc(n, 4).map(function (ui) {
      const u = ['AB', 'AAB', 'ABB', 'ABC'][ui], map = letterMap(), given = u.length * 2, seq = patSeq(u, map, given + 3);
      const used = []; u.split('').forEach(function (ch) { if (used.indexOf(map[ch]) < 0) used.push(map[ch]); });
      const extra = [0, 1, 2, 3].filter(function (t) { return used.indexOf(t) < 0; });
      return { kind: 'patternfill', prompt: '규칙에 맞게 빈칸을 채워요.', seq: seq.slice(0, given), answers: seq.slice(given), palette: S(used.concat(used.length < 3 ? [P(extra)] : [])), tag: '규칙 만들기', hint: '앞부분에서 되풀이되는 묶음을 찾아 이어 보세요.' };
    });
  };
  /* 규칙 만들기(2): 두 가지 색으로 칸 채우기 */
  GEN.patGrid = function (n) {
    return cyc(n, 3).map(function (v) {
      const sw = Math.random() < 0.5, c1 = sw ? 4 : 1, c2 = sw ? 1 : 4;
      const rows = v === 0 ? [[c1, c2, c1, c2], [c2, c1, c2, c1], [c1, c2, c1, c2]]
        : v === 1 ? [[c1, c1, c1, c1], [c2, c2, c2, c2], [c1, c1, c1, c1]]
        : [[c1, c2, c1, c2], [c1, c2, c1, c2], [c1, c2, c1, c2]];
      const flat = [].concat(rows[0], rows[1], rows[2]);
      return { kind: 'patternfill', prompt: '규칙에 맞게 색을 칠해요.', seq: flat.slice(0, 8), answers: flat.slice(8), palette: S([1, 4]), cols: 4, tag: '색칠로 규칙 만들기', hint: v === 0 ? '위아래로 색이 번갈아 나와요.' : v === 1 ? '한 줄씩 색이 번갈아 나와요.' : '위에서 아래로 같은 색이 이어져요.' };
    });
  };
  GEN.numPat = function (n) {
    return cyc(n, 2).map(function (v) {
      const k = P([1, 2, 3, 5, 10]), items = [];
      if (v === 0) { const s = R(1, 100 - 4 * k); for (let i = 0; i < 5; i++) items.push(s + k * i); }
      else { const s = R(4 * k + 1, 100); for (let i = 0; i < 5; i++) items.push(s - k * i); }
      const bi = P([2, 3, 4]), a = items[bi]; items[bi] = '_';
      return num('규칙을 찾아 빈칸에 알맞은 수를 써요.', V.seq(items), a, { tag: '수 배열의 규칙', hint: '이웃한 두 수가 몇씩 차이 나는지 살펴보세요.' });
    });
  };
  GEN.chartPat = function (n) {
    return cyc(n, 2).map(function (v) {
      const k = P([2, 5, 10, 11]), m = k >= 10 ? 4 : 5, s = k >= 10 ? R(1, 9) : R(1, k), sh = [];
      for (let i = 0; i < m; i++) sh.push(s + k * i);
      const nx = s + k * m, r0 = Math.floor((s - 1) / 10);
      if (v === 0) { const r1 = Math.floor((nx - 1) / 10); return num('색칠한 수의 규칙을 찾아 ?에 알맞은 수를 써요.', V.chart({ r0: r0, rows: r1 - r0 + 1, shaded: sh, blank: nx }), nx, { tag: '수 배열표 규칙', hint: '색칠한 수가 몇씩 커지는지 살펴보세요.', say: '색칠한 수의 규칙을 찾아 물음표에 알맞은 수를 써요.' }); }
      const r1 = Math.floor((sh[m - 1] - 1) / 10);
      return num('색칠한 수는 몇씩 커질까요?', V.chart({ r0: r0, rows: r1 - r0 + 1, shaded: sh }), k, { tag: '수 배열표 규칙', hint: '색칠한 이웃한 두 수의 차를 구해 보세요.' });
    });
  };
  /* 규칙을 여러 가지 방법으로 나타내기: 모양 규칙을 수로 */
  GEN.patRepr = function (n) {
    return cyc(n, 1).map(function () {
      const u = P(UNITS), map = letterMap(), L = u.length === 4 ? 8 : 6, seq = patSeq(u, map, L);
      const code = function (uu) { const idx = { A: 1, B: 2, C: 3 }; const out = []; for (let i = 0; i < L; i++) out.push(idx[uu[i % uu.length]]); return out.join(' '); };
      const own = {}; let c = 1; seq.forEach(function (t) { if (!(t in own)) own[t] = c++; });
      const right = seq.map(function (t) { return own[t]; }).join(' ');
      const wrongs = S(UNITS.filter(function (x) { return code(x) !== right; })).map(code).filter(function (x, i, a) { return a.indexOf(x) === i; }).slice(0, 2);
      return choice('같은 규칙을 수로 나타낸 것을 골라요.', V.tokSeq(seq), S([right].concat(wrongs)).map(function (x) { return { html: '<span class="ow ns">' + x + '</span>', value: x }; }), right,
        { tag: '규칙을 수로 나타내기', hint: '같은 모양은 같은 수로 나타내요. 처음 나온 모양부터 1, 2, 3으로 정해 보세요.', cols: 1 });
    });
  };

  /* ===================== 6단원 덧셈과 뺄셈(3) ===================== */
  function addPair(kind) {
    if (kind === 0) { const t = R(1, 8), o1 = R(0, 8), o2 = R(1, 9 - o1); return [t * 10 + o1, o2]; }
    if (kind === 1) { const t1 = R(1, 7), o = R(0, 9), t2 = R(1, 9 - t1); return [t1 * 10 + o, t2 * 10]; }
    const t1 = R(1, 7), o1 = R(0, 8), t2 = R(1, 9 - t1), o2 = R(1, 9 - o1); return [t1 * 10 + o1, t2 * 10 + o2];
  }
  function subPair(kind) {
    if (kind === 0) { const t = R(1, 8), o1 = R(1, 9), o2 = R(1, o1); return [t * 10 + o1, o2]; }
    if (kind === 1) { const t1 = R(2, 9), o = R(0, 9), t2 = R(1, t1 - 1); return [t1 * 10 + o, t2 * 10]; }
    const t1 = R(2, 9), o1 = R(0, 9), t2 = R(1, t1 - 1), o2 = R(0, o1); return [t1 * 10 + o1, t2 * 10 + o2];
  }
  GEN.addBlocks = function (n) {
    return cyc(n, 3).map(function (k) {
      const p = addPair(k), a = p[0], b = p[1];
      return num('수 모형을 합치면 모두 얼마일까요?', V.pairBlocks(a, b, '+'), a + b, { tag: '수 모형 덧셈', hint: '십 모형끼리, 일 모형끼리 따로 세어서 합쳐요.', say: a + ' 더하기 ' + b + '를 수 모형으로 합쳐요. 모두 얼마일까요?' });
    });
  };
  GEN.addHz = function (n) {
    return cyc(n, 3).map(function (k) {
      const p = addPair(k), a = p[0], b = p[1];
      return num('가로셈으로 계산해요.', V.eq(a, '+', b, '=', '_'), a + b, { tag: '가로셈 덧셈', hint: '일의 자리끼리, 십의 자리끼리 더해요.', hv: V.pairBlocks(a, b, '+'), say: a + ' 더하기 ' + b + '는 얼마일까요?' });
    });
  };
  GEN.addVert = function (n, ctx) {
    const ks = cyc(n, 3), out = [];
    for (let i = 0; i < n; i++) {
      if (i % 4 === 3) {
        const p = addPair(0), a = p[0], b = p[1];
        out.push(choice(a + ' + ' + b + '를 세로셈으로 바르게 쓴 것을 골라요.', '', S([{ html: V.vstatic(a, b, '+', false), value: 'ok' }, { html: V.vstatic(a, b, '+', true), value: 'no' }]), 'ok',
          { tag: '세로셈 자리 맞추기', hint: '일의 자리는 일의 자리끼리 줄을 맞춰 써요.', say: a + ' 더하기 ' + b + '를 세로셈으로 바르게 쓴 것을 골라요.' }));
      } else {
        const p = addPair(ks[i]);
        out.push({ kind: 'vertical', op: '+', a: p[0], b: p[1], help: !!(ctx && ctx.help && i < 3), tag: '세로셈 덧셈' });
      }
    }
    return out;
  };
  GEN.subBlocks = function (n) {
    return cyc(n, 3).map(function (k) {
      const p = subPair(k), a = p[0], b = p[1];
      return num(a + '개에서 ' + b + '개를 빼면 몇 개가 남을까요?', V.pairBlocks(a, b, '-'), a - b, { tag: '수 모형 뺄셈', hint: '지워진 모형을 빼고 남은 것을 세어 보세요.' });
    });
  };
  GEN.subHz = function (n) {
    return cyc(n, 3).map(function (k) {
      const p = subPair(k), a = p[0], b = p[1];
      return num('가로셈으로 계산해요.', V.eq(a, M, b, '=', '_'), a - b, { tag: '가로셈 뺄셈', hint: '일의 자리끼리, 십의 자리끼리 빼요.', hv: V.pairBlocks(a, b, '-'), say: a + ' 빼기 ' + b + '는 얼마일까요?' });
    });
  };
  GEN.subVert = function (n, ctx) {
    const ks = cyc(n, 3), out = [];
    for (let i = 0; i < n; i++) {
      const p = subPair(ks[i]);
      out.push({ kind: 'vertical', op: '-', a: p[0], b: p[1], help: !!(ctx && ctx.help && i < 3), tag: '세로셈 뺄셈' });
    }
    return out;
  };
  /* 덧셈과 뺄셈 이야기, 두 수의 합과 차 */
  const NAMES = ['재이', '연우', '지아', '세미', '슬기'];
  const ITEMS = [['구슬', '개', '를'], ['색종이', '장', '을'], ['사탕', '개', '를'], ['딱지', '장', '을'], ['제기', '개', '를'], ['공깃돌', '개', '를']];
  GEN.story = function (n) {
    return cyc(n, 3).map(function (v) {
      const it = P(ITEMS), n1 = P(NAMES); let n2; do { n2 = P(NAMES); } while (n2 === n1);
      if (v === 0) {
        const p = addPair(P([0, 1, 2])), a = p[0], b = p[1];
        return num(n1 + '는 ' + it[0] + ' ' + a + it[1] + it[2] + ' 가지고 있고, ' + n2 + '는 ' + b + it[1] + it[2] + ' 가지고 있어요. 모두 몇 ' + it[1] + '일까요?', V.eq(a, '+', b, '=', '_'), a + b, { tag: '덧셈 이야기', hint: '합치는 이야기는 덧셈식으로 나타내요.', hv: V.pairBlocks(a, b, '+') });
      }
      if (v === 1) {
        const p = subPair(P([0, 1, 2])), a = p[0], b = p[1];
        return num(n1 + '는 ' + it[0] + ' ' + a + it[1] + it[2] + ' 가지고 있고, ' + n2 + '는 ' + b + it[1] + it[2] + ' 가지고 있어요. ' + n1 + '는 ' + n2 + '보다 몇 ' + it[1] + ' 더 많이 가지고 있을까요?', V.eq(a, M, b, '=', '_'), a - b, { tag: '뺄셈 이야기', hint: '얼마나 더 많은지 구할 때는 뺄셈식으로 나타내요.', hv: V.pairBlocks(a, b, '-') });
      }
      const t2 = R(1, 4), t1 = R(t2 + 1, 9 - t2), o2 = R(1, 4), o1 = R(o2, 9 - o2), a = t1 * 10 + o1, b = t2 * 10 + o2;
      return steps('두 수 ' + a + '와 ' + b + '의 합과 차를 구해요.', function () { return V.seq([a, b]); },
        [{ p: '합은 얼마일까요? (' + a + ' + ' + b + ')', a: a + b }, { p: '차는 얼마일까요? (' + a + ' ' + M + ' ' + b + ')', a: a - b }], { tag: '합과 차', hint: '합은 더하고, 차는 큰 수에서 작은 수를 빼요.' });
    });
  };

  g.GEN = GEN;
  g.GENU = { sino: sino, native: native, S: S, R: R };
})(typeof window !== 'undefined' ? window : globalThis);
