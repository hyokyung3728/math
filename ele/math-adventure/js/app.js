/* 수학 모험 — 화면과 진행 기록 */
(function () {
  'use strict';
  const BOOKS = window.MATH_BOOKS, ST = window.MATH_DATA.stages, V = window.V, G = window.GEN;
  let D = BOOKS[0]; /* 지금 고른 학기 */
  const $ = function (s, r) { return (r || document).querySelector(s); };
  const $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  const R = function (a, b) { return a + Math.floor(Math.random() * (b - a + 1)); };
  const KEY = 'mathAdventure.g1s2.v1';

  const IC = {
    back: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>',
    x: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    lock: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>',
    lockS: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>',
    spk: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9v6h4l5 4V5L8 9z"/><path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12"/></svg>',
    chk: '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5 9-10"/></svg>',
    minus: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M6 12h12"/></svg>',
    plus: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M12 6v12M6 12h12"/></svg>'
  };
  const starSvg = function (on, sz) { return '<svg class="st' + (on ? ' on' : '') + '" width="' + sz + '" height="' + sz + '" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/></svg>'; };
  const stars3 = function (n, sz) { let h = ''; for (let i = 0; i < 3; i++) h += starSvg(i < n, sz); return h; };

  /* ===== 저장 ===== */
  const defaults = function () { return { v: 2, stars: 0, lessons: {}, days: {}, tags: {}, name: '', book: 'g1s2', settings: { per: 8, voice: true, sound: true, help: true, unlockAll: false } }; };
  function normalize(o) {
    const d = defaults();
    if (!o || typeof o !== 'object') return d;
    const s = Object.assign({}, d, o);
    s.settings = Object.assign({}, d.settings, o.settings || {});
    ['lessons', 'days', 'tags'].forEach(function (k) { if (!s[k] || typeof s[k] !== 'object') s[k] = d[k]; });
    s.stars = +s.stars || 0;
    if (!BOOKS.some(function (b) { return b.id === s.book; })) s.book = 'g1s2';
    if (!o.v || o.v < 2) { s.lessons = {}; s.tags = {}; s.v = 2; } /* 교과서에 맞춰 차시를 바꾸기 전 기록은 차시 번호가 달라서 비워요 */
    return s;
  }
  let S = defaults();
  function load() { try { const raw = localStorage.getItem(KEY); if (raw) S = normalize(JSON.parse(raw)); } catch (e) { /* 저장소를 쓸 수 없어도 계속해요 */ }
    D = bookById(S.book);
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* ignore */ } }
  const dkey = function (d) { d = d || new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); };

  /* ===== 진도 ===== */
  function bookById(id) { for (let i = 0; i < BOOKS.length; i++) if (BOOKS[i].id === id) return BOOKS[i]; return BOOKS[0]; }
  function lessonBook(id) { for (let b = 0; b < BOOKS.length; b++) for (let i = 0; i < BOOKS[b].units.length; i++) for (let j = 0; j < BOOKS[b].units[i].lessons.length; j++) if (BOOKS[b].units[i].lessons[j].id === id) return BOOKS[b]; return null; }
  function findLesson(id) { const bk = lessonBook(id); if (!bk) return null; for (let i = 0; i < bk.units.length; i++) for (let j = 0; j < bk.units[i].lessons.length; j++) if (bk.units[i].lessons[j].id === id) return bk.units[i].lessons[j]; return null; }
  function posOf(id) { const bk = lessonBook(id) || D; for (let i = 0; i < bk.units.length; i++) for (let j = 0; j < bk.units[i].lessons.length; j++) if (bk.units[i].lessons[j].id === id) return [i, j]; return [0, 0]; }
  const lessonStars = function (id) { return (S.lessons[id] && S.lessons[id].stars) || 0; };
  const done = function (id) { return lessonStars(id) > 0; };
  const unitComplete = function (ui) { return D.units[ui].lessons.every(function (l) { return done(l.id); }); };
  const unitOpen = function (ui) { return S.settings.unlockAll || ui === 0 || unitComplete(ui - 1); };
  const lessonOpen = function (ui, li) { return unitOpen(ui) && (S.settings.unlockAll || li === 0 || done(D.units[ui].lessons[li - 1].id)); };
  function stageOf(stars) { let lv = 0; ST.forEach(function (s, i) { if (stars >= s.at) lv = i; }); return lv; }
  const bookDone = function (b) { return b.units.every(function (u) { return u.lessons.every(function (l) { return done(l.id); }); }); };
  const bookOpen = function (i) { return S.settings.unlockAll || i === 0 || bookDone(BOOKS[i - 1]); };
  function curUnit() { for (let i = 0; i < D.units.length; i++) if (unitOpen(i) && !unitComplete(i)) return i; return D.units.length - 1; }

  /* ===== 소리, 읽어 주기, 알림 ===== */
  let ac = null;
  function beep(list) {
    if (!S.settings.sound) return;
    try {
      ac = ac || new (window.AudioContext || window.webkitAudioContext)();
      list.forEach(function (n) {
        const o = ac.createOscillator(), g = ac.createGain(), t0 = ac.currentTime + n[1];
        o.type = 'sine'; o.frequency.value = n[0];
        g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(0.16, t0 + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t0 + n[2]);
        o.connect(g); g.connect(ac.destination); o.start(t0); o.stop(t0 + n[2] + 0.05);
      });
    } catch (e) { /* ignore */ }
  }
  const sfx = {
    ok: function () { beep([[660, 0, 0.12], [880, 0.1, 0.18]]); },
    no: function () { beep([[240, 0, 0.2]]); },
    win: function () { beep([[523, 0, 0.12], [659, 0.12, 0.12], [784, 0.24, 0.12], [1047, 0.36, 0.3]]); }
  };
  function say(t) {
    if (!t || !('speechSynthesis' in window)) return;
    try { speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(t); u.lang = 'ko-KR'; u.rate = 0.95; speechSynthesis.speak(u); } catch (e) { /* ignore */ }
  }
  /* 숫자 뒤 조사를 숫자 읽는 소리에 맞춰 바로잡아요 (8를 → 8을, 2이 → 2가) */
  const BAT = [1, 1, 0, 1, 0, 0, 1, 1, 1, 0];
  function fj(t) {
    if (!t) return t;
    return String(t).replace(/(\d)((?:<\/[a-z]+>)*)(이에요|예요|으로|로|을|를|은|는|이|가|과|와)(?![가-힣])/g, function (m, d, tag, p) {
      const has = BAT[+d] === 1, rieul = d === '1' || d === '7' || d === '8';
      let r = p;
      if (p === '이에요' || p === '예요') r = has ? '이에요' : '예요';
      else if (p === '으로' || p === '로') r = (has && !rieul) ? '으로' : '로';
      else if (p === '을' || p === '를') r = has ? '을' : '를';
      else if (p === '은' || p === '는') r = has ? '은' : '는';
      else if (p === '이' || p === '가') r = has ? '이' : '가';
      else r = has ? '과' : '와';
      return d + tag + r;
    });
  }
  function plain(h) { const d = document.createElement('div'); d.innerHTML = h; return d.textContent.replace(/\s+/g, ' ').trim(); }
  let toastT = 0;
  function toast(msg) { const t = $('#toast'); t.textContent = msg; t.classList.add('on'); clearTimeout(toastT); toastT = setTimeout(function () { t.classList.remove('on'); }, 2200); }

  /* ===== 화면 전환 ===== */
  let cur = 'map', Pl = null, U = 0, parentOK = false, gateAns = 0;
  const SCREENS = ['map', 'unit', 'play', 'result', 'friends', 'parent'];
  function show(name) {
    if (name !== 'parent') parentOK = false;
    cur = name;
    SCREENS.forEach(function (s) { $('#s-' + s).hidden = s !== name; });
    $('#nav').hidden = ['map', 'friends', 'parent'].indexOf(name) < 0;
    $$('#nav button').forEach(function (b) { if (b.dataset.go === name) b.setAttribute('aria-current', 'page'); else b.removeAttribute('aria-current'); });
    if (name !== 'play' && 'speechSynthesis' in window) { try { speechSynthesis.cancel(); } catch (e) { /* ignore */ } }
  }
  function goMap() { show('map'); renderMap(); }
  function goUnit(ui) {
    if (!unitOpen(ui)) { toast('앞의 섬을 먼저 건너 보아요'); return; }
    U = ui; show('unit'); renderUnit();
  }

  /* ===== 모험 지도 ===== */
  function renderMap() {
    $('#m-hello').textContent = S.name ? '안녕, ' + S.name + '!' : '안녕!';
    $('#m-stars-ic').innerHTML = starSvg(true, 24); $('#m-stars').textContent = S.stars;
    $('#m-title').textContent = D.name + ' 섬';
    $('#m-books').innerHTML = BOOKS.map(function (b, i) {
      const open = bookOpen(i);
      return '<button data-bk="' + i + '" aria-pressed="' + (b === D) + '"' + (open ? '' : ' class="lk"') + ' aria-label="' + b.name + (open ? '' : ', 아직 잠겨 있어요') + '">' + (open ? '' : IC.lockS + ' ') + b.short + '</button>';
    }).join('');
    const wrap = $('#mapwrap'), W = wrap.clientWidth, H = wrap.clientHeight;
    if (!W || !H) return;
    const N = D.units.length, land = W > H * 1.15, ci = curUnit(), pts = [];
    for (let i = 0; i < N; i++) {
      if (land) pts.push([70 + (W - 140) * i / (N - 1), H * (i % 2 ? 0.34 : 0.58)]);
      else pts.push([W * (i % 2 ? 0.7 : 0.3), H - 120 - (H - 190) * i / (N - 1)]);
    }
    let d = 'M' + pts[0][0] + ' ' + pts[0][1];
    for (let i = 0; i < N - 1; i++) {
      const a = pts[i], b = pts[i + 1];
      if (land) { const mx = (a[0] + b[0]) / 2; d += ' C' + mx + ' ' + a[1] + ',' + mx + ' ' + b[1] + ',' + b[0] + ' ' + b[1]; }
      else { const my = (a[1] + b[1]) / 2; d += ' C' + a[0] + ' ' + my + ',' + b[0] + ' ' + my + ',' + b[0] + ' ' + b[1]; }
    }
    const svg = $('#mappath');
    svg.setAttribute('width', W); svg.setAttribute('height', H); svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    svg.firstElementChild.setAttribute('d', d);
    let h = '';
    D.units.forEach(function (u, i) {
      const comp = unitComplete(i), open = unitOpen(i), isCur = i === ci;
      const st = comp ? 'done' : isCur ? 'cur' : open ? 'open' : 'lock';
      const dn = u.lessons.filter(function (l) { return done(l.id); }).length;
      const sub = comp ? '완료!' : isCur ? '지금 여기!' : open ? dn + ' / ' + u.lessons.length : '';
      h += '<div class="isl ' + st + '" style="left:' + pts[i][0].toFixed(0) + 'px;top:' + pts[i][1].toFixed(0) + 'px;--d:' + (isCur ? 92 : 76) + 'px">' +
        '<button class="ib" data-u="' + i + '" aria-label="' + (i + 1) + '단원 ' + u.title + (open ? '' : ', 아직 잠겨 있어요') + '">' + (st === 'lock' ? IC.lock : (comp ? IC.chk : i + 1)) + '</button>' +
        '<div class="il">' + u.title + '</div>' + (sub ? '<div class="is">' + sub + '</div>' : '') + '</div>';
    });
    const mp = pts[ci], side = land ? 70 : (ci % 2 ? -104 : 64);
    const mx = Math.max(4, Math.min(W - 70, mp[0] + (land ? 56 : side))), my = Math.max(4, mp[1] - (land ? 112 : 56));
    h += '<div class="mmas" style="left:' + mx.toFixed(0) + 'px;top:' + my.toFixed(0) + 'px">' + V.mascot(stageOf(S.stars) + 1, 56) + '</div>';
    $('#islands').innerHTML = h;
  }

  /* ===== 단원 ===== */
  function renderUnit() {
    const u = D.units[U], total = u.lessons.length, dn = u.lessons.filter(function (l) { return done(l.id); }).length;
    $('#u-back').innerHTML = IC.back;
    $('#u-sub').textContent = (U + 1) + '단원'; $('#u-title').textContent = u.title;
    $('#u-prog').textContent = dn + ' / ' + total; $('#u-bar').style.width = (dn / total * 100) + '%';
    let h = '', nextL = null;
    u.lessons.forEach(function (l, li) {
      const open = lessonOpen(U, li), dd = done(l.id), isCur = open && !dd && !nextL;
      if (isCur) nextL = l;
      const cls = dd ? 'done' : isCur ? 'cur' : open ? 'open' : 'lock';
      h += '<button class="lcard ' + cls + '" data-l="' + l.id + '"' + (open ? '' : ' disabled') + ' aria-label="' + l.title + (open ? '' : ', 잠겨 있어요') + '">' +
        '<span class="ln">' + (open ? (dd ? IC.chk : (li + 1)) : IC.lock) + '</span>' +
        '<span class="lt"><b>' + l.title + '</b><span>' + l.desc + '</span></span>' +
        (dd ? '<span class="ls">' + stars3(lessonStars(l.id), 22) + '</span>' : (isCur ? '<span class="go">시작</span>' : '')) + '</button>';
    });
    $('#u-list').innerHTML = h;
    $('#u-mas').innerHTML = V.mascot(stageOf(S.stars) + 1, 48);
    $('#u-tip').textContent = nextL ? '“' + nextL.title + '” 차례예요. 같이 해 봐요!' : '이 섬을 모두 건넜어요! 다시 도전해서 별을 더 모아 봐요.';
  }

  /* ===== 문제 풀기 ===== */
  function build(l, n) {
    const ctx = { help: S.settings.help && !l.challenge };
    let qs;
    if (l.challenge) {
      let pool = [];
      l.mix.forEach(function (id) {
        const m = findLesson(id);
        G[m.gen](3, ctx).forEach(function (q) { q.lid = id; pool.push(q); });
      });
      qs = window.GENU.S(pool).slice(0, n);
    } else {
      qs = G[l.gen](n, ctx);
      qs.forEach(function (q) { q.lid = l.id; });
    }
    return qs;
  }
  function startLesson(id) {
    const l = findLesson(id), pos = posOf(id), bk = lessonBook(id);
    if (!l) return;
    if (bk && bk !== D) { D = bk; S.book = bk.id; save(); }
    const n = S.settings.per + (l.challenge ? 2 : 0);
    Pl = { l: l, ui: pos[0], li: pos[1], qs: build(l, n), i: 0, ok: 0, q: null, tries: 0, bad: false, step: 0, ans: '', lock: false, say: '' };
    show('play');
    $('#p-close').innerHTML = IC.x; $('#p-say').innerHTML = IC.spk;
    renderQ();
  }
  function setPrompt(html, spoken) {
    html = fj(html); spoken = fj(spoken);
    $('#p-prompt').innerHTML = html;
    Pl.say = spoken || plain(html);
    if (S.settings.voice) say(Pl.say);
  }
  function setMascot(mood) {
    const m = $('#p-mascot');
    m.className = 'mas' + (mood ? ' ' + mood : '');
  }
  function renderQ() {
    const q = Pl.qs[Pl.i];
    Pl.q = q; Pl.tries = 0; Pl.bad = false; Pl.step = 0; Pl.ans = ''; Pl.lock = false; Pl.revealed = false;
    $('#p-count').textContent = (Pl.i + 1) + ' / ' + Pl.qs.length;
    $('#p-bar').style.width = (Pl.i / Pl.qs.length * 100) + '%';
    $('#p-mascot').innerHTML = V.mascot(stageOf(S.stars) + 1, 56);
    setMascot('');
    ['#p-hint', '#p-choices', '#p-step', '#p-ans', '#p-visual'].forEach(function (s) { $(s).innerHTML = ''; });
    $('#p-next').hidden = true;
    const hasKeys = q.kind === 'num' || q.kind === 'steps' || q.kind === 'vertical';
    $('#p-keys').hidden = !hasKeys;
    $('#p-keys').classList.toggle('vmode', q.kind === 'vertical');
    $('#p-main').classList.toggle('nokeys', !hasKeys);
    if (q.kind === 'num' || q.kind === 'steps') initNum(q);
    else if (q.kind === 'choice') initChoice(q);
    else if (q.kind === 'vertical') initVertical(q);
    else if (q.kind === 'clockset') initClock(q);
    else if (q.kind === 'patternfill') initPattern(q);
  }
  function drawAns(cls) { $('#p-ans').innerHTML = '<div class="abox' + (cls ? ' ' + cls : '') + '" aria-live="polite">' + (Pl.ans || '<i class="caret"></i>') + '</div>'; }
  function shake() { const c = $('#p-card'); c.classList.remove('shake'); void c.offsetWidth; c.classList.add('shake'); }
  function flash(t) { const f = $('#p-flash'); f.textContent = t === true ? '정답!' : (t || ''); f.className = t ? 'on' : ''; setTimeout(function () { f.className = ''; }, 650); }

  function initNum(q) {
    const st = q.kind === 'steps' ? q.steps[Pl.step] : null;
    $('#p-visual').innerHTML = q.kind === 'steps' ? q.visualFn(Pl.step) : q.visual;
    $('#p-step').innerHTML = st ? fj(st.p) : '';
    setPrompt(q.prompt, (q.say || plain(q.prompt)) + (st ? ' ' + st.p : ''));
    Pl.ans = ''; drawAns();
  }
  function initChoice(q) {
    setPrompt(q.prompt, q.say);
    $('#p-visual').innerHTML = q.visual;
    const c = $('#p-choices');
    c.style.setProperty('--cols', q.cols || q.options.length);
    c.innerHTML = q.options.map(function (o, i) { return '<button class="opt" data-i="' + i + '">' + o.html + '</button>'; }).join('');
  }

  function expected() { const q = Pl.q; return q.kind === 'steps' ? q.steps[Pl.step].a : q.answer; }
  function onKey(k) {
    if (!Pl || cur !== 'play' || Pl.lock) return;
    const q = Pl.q;
    if (q.kind === 'vertical') return vKey(k);
    if (q.kind !== 'num' && q.kind !== 'steps') return;
    if (k === 'back') { Pl.ans = Pl.ans.slice(0, -1); drawAns(); return; }
    if (k === 'ok') { if (!Pl.ans) return; if (+Pl.ans === expected()) good(); else bad(); return; }
    if (Pl.ans.length < String(expected()).length) { Pl.ans += k; drawAns(); }
  }
  function good() {
    const q = Pl.q;
    Pl.lock = true; sfx.ok(); setMascot('happy');
    if (q.kind === 'steps' && Pl.step < q.steps.length - 1) {
      flash('좋아요!');
      const mine = Pl;
      setTimeout(function () { if (Pl !== mine || cur !== 'play') return; Pl.step++; Pl.lock = false; $('#p-hint').innerHTML = ''; initNum(q); }, 600);
      return;
    }
    doneQ();
  }
  function bad(msg) {
    const q = Pl.q;
    Pl.tries++; Pl.bad = true; sfx.no(); shake(); setMascot('sad');
    if (Pl.tries >= (q.kind === 'choice' ? 2 : 3)) { reveal(); return; }
    const st = q.kind === 'steps' ? q.steps[Pl.step] : null;
    const hint = (st && st.hint) || q.hint;
    let h = '<div class="hmsg">' + (msg || (Pl.tries === 1 ? '아쉬워요! 다시 해 볼까요?' : '조금만 더! 힌트를 볼까요?')) + '</div>';
    if (hint) h += '<div class="htx">' + fj(hint) + '</div>';
    if (Pl.tries >= 2 && q.hv) h += q.hv;
    $('#p-hint').innerHTML = h;
    if (q.kind === 'num' || q.kind === 'steps') { Pl.ans = ''; drawAns(); }
  }
  function reveal() {
    const q = Pl.q;
    Pl.lock = true; Pl.revealed = true;
    let msg = '';
    if (q.kind === 'num' || q.kind === 'steps') { const e = expected(); Pl.ans = String(e); drawAns('rv'); msg = '정답은 <b>' + e + '</b>이에요.'; }
    else if (q.kind === 'choice') {
      $$('#p-choices .opt').forEach(function (b, i) { b.disabled = true; if (String(q.options[i].value) === String(q.answer)) b.classList.add('ok'); });
      msg = '이 친구가 정답이에요.';
    } else if (q.kind === 'vertical') { Pl.v.ones = String(Pl.vd.ro); Pl.v.tens = String(Pl.vd.rt); Pl.v.hund = Pl.vd.rh ? '1' : ''; Pl.v.stage = 'done'; drawVertical(); msg = '정답이에요. 같이 확인해 봐요.'; }
    else if (q.kind === 'clockset') { Pl.ck = { h: q.h, m: q.m }; drawClock(); msg = '시계는 이렇게 맞춰요.'; }
    else if (q.kind === 'patternfill') { Pl.pf.n = q.answers.length; drawPattern(); msg = '규칙은 이렇게 이어져요.'; }
    $('#p-hint').innerHTML = '<div class="hmsg">' + msg + ' 다음에 또 도전해요!</div>';
    $('#p-next').hidden = false;
  }
  function nextQ() {
    const q = Pl && Pl.q;
    if (!q || !Pl.revealed) return;
    $('#p-next').hidden = true; $('#p-hint').innerHTML = '';
    if (q.kind === 'steps' && Pl.step < q.steps.length - 1) { Pl.step++; Pl.tries = 0; Pl.lock = false; Pl.revealed = false; initNum(q); return; }
    doneQ();
  }
  function logTag(tag, ok, lid) {
    const t = S.tags[tag] || (S.tags[tag] = { r: [], lid: lid });
    t.r.push(ok ? 1 : 0); if (t.r.length > 10) t.r.shift(); t.lid = lid;
  }
  function doneQ() {
    const q = Pl.q, ok = !Pl.bad, k = dkey();
    Pl.lock = true;
    const d = S.days[k] || (S.days[k] = { s: 0, c: 0 });
    d.s++; if (ok) d.c++;
    logTag(q.tag || Pl.l.title, ok, q.lid || Pl.l.id);
    if (q.kind === 'vertical' && Pl.v) {
      logTag('세로셈 · 일의 자리 계산', Pl.v.wr.ones === 0, q.lid || Pl.l.id);
      logTag('세로셈 · 십의 자리 계산', Pl.v.wr.tens === 0, q.lid || Pl.l.id);
    }
    Pl.res = (Pl.res || []).concat([ok]);
    if (ok) Pl.ok++;
    $('#p-bar').style.width = ((Pl.i + 1) / Pl.qs.length * 100) + '%';
    $('#p-next').hidden = true;
    if (ok) flash(true);
    save();
    const mine = Pl;
    setTimeout(function () { if (Pl !== mine || cur !== 'play') return; Pl.i++; if (Pl.i >= Pl.qs.length) finish(); else renderQ(); }, ok ? 750 : 250);
  }

  /* 세로셈: 일의 자리 → 십의 자리(→ 백의 자리) 순서로만 쓸 수 있어요. 받아올림과 받아내림도 보여 줘요 */
  function vPlan(q) {
    const a = q.a, b = q.b, p = { at: Math.floor(a / 10), ao: a % 10, bt: Math.floor(b / 10), bo: b % 10, c1: 0, br: 0, rh: 0 };
    if (q.op === '+') {
      const s1 = p.ao + p.bo; p.c1 = s1 >= 10 ? 1 : 0; p.ro = s1 % 10;
      const s2 = p.at + p.bt + p.c1; p.rt = s2 % 10; p.rh = s2 >= 10 ? 1 : 0;
    } else {
      p.br = p.ao < p.bo ? 1 : 0; p.ro = p.ao + (p.br ? 10 : 0) - p.bo; p.rt = p.at - p.br - p.bt;
    }
    p.stages = p.rh ? ['ones', 'tens', 'hund'] : ['ones', 'tens'];
    return p;
  }
  function initVertical(q) {
    Pl.vd = vPlan(q);
    Pl.v = { stage: 'ones', ones: '', tens: '', hund: '', wr: { ones: 0, tens: 0, hund: 0 } };
    drawVertical(); vPrompt();
  }
  function vBox(key) {
    const v = Pl.v, order = Pl.vd.stages, idx = order.indexOf(key), cu = order.indexOf(v.stage);
    if (v.stage === 'done' || idx < cu) return '<div class="vb fill">' + v[key] + '</div>';
    if (idx === cu) return '<div class="vb act"><i class="caret"></i></div>';
    return '<div class="vb lk" aria-label="아직 잠겨 있어요">' + IC.lock + '</div>';
  }
  function drawVertical() {
    const q = Pl.q, d = Pl.vd, v = Pl.v, h3 = !!d.rh, add = q.op === '+';
    const doneOnes = v.stage !== 'ones', doneTens = v.stage === 'hund' || v.stage === 'done';
    let g = '<span></span>' + (h3 ? '<span class="vh h">백의 자리</span>' : '') + '<span class="vh t">십의 자리</span><span class="vh o">일의 자리</span>';
    g += '<span></span>' + (h3 ? '<span class="vc">' + (doneTens ? '1' : '') + '</span>' : '') + '<span class="vc">' + (add ? (d.c1 && doneOnes ? '1' : '') : (d.br ? (d.at - 1) : '')) + '</span><span class="vc"></span>';
    g += '<span></span>' + (h3 ? '<span class="vn h"></span>' : '') + '<span class="vn t' + (!add && d.br ? ' cross' : '') + '">' + d.at + '</span><span class="vn o">' + d.ao + '</span>';
    g += '<span class="vop">' + (add ? '+' : '−') + '</span>' + (h3 ? '<span class="vn h"></span>' : '') + '<span class="vn t">' + (q.b >= 10 ? d.bt : '') + '</span><span class="vn o">' + d.bo + '</span>';
    g += '<i class="vln"></i><span></span>' + (h3 ? vBox('hund') : '') + vBox('tens') + vBox('ones');
    const plain = !d.c1 && !d.br && !d.rh;
    $('#p-visual').innerHTML = '<div class="vwrap" data-a="' + q.a + '" data-b="' + q.b + '"><div class="vgrid" style="--n:' + (h3 ? 3 : 2) + '">' + g + '</div>' +
      (q.help && plain ? '<div class="vhelp">' + V.pairBlocks(q.a, q.b, q.op) + '</div>' : '') + '</div>';
  }
  function vPrompt() {
    const q = Pl.q, d = Pl.vd, v = Pl.v, add = q.op === '+', word = add ? '더해' : '빼', sym = add ? '+' : '−', sw = add ? ' 더하기 ' : ' 빼기 ';
    if (v.stage === 'ones') {
      if (!add && d.br) setPrompt('<b class="po">일의 자리</b>부터 계산해요. ' + d.ao + '에서 ' + d.bo + '를 뺄 수 없으니 십의 자리에서 10을 받아내림해요. <b class="po">' + (10 + d.ao) + ' − ' + d.bo + '</b>는?', '일의 자리부터 계산해요. ' + d.ao + '에서 ' + d.bo + '를 뺄 수 없으니 십의 자리에서 10을 받아내림해요. ' + (10 + d.ao) + ' 빼기 ' + d.bo + '는?');
      else setPrompt('<b class="po">일의 자리</b>부터 ' + word + ' 볼까요? <b class="po">' + d.ao + ' ' + sym + ' ' + d.bo + '</b>는?' + (add && d.c1 ? ' (10이 넘으면 남은 수만 써요)' : ''), '일의 자리부터 ' + word + ' 볼까요? ' + d.ao + sw + d.bo + '는?');
    } else if (v.stage === 'tens') {
      if (add) setPrompt('이번에는 <b class="pt">십의 자리</b>예요. ' + (d.c1 ? '올림한 1도 함께 더해요. ' : '') + '<b class="pt">' + d.at + ' + ' + d.bt + (d.c1 ? ' + 1' : '') + '</b>는?', '이번에는 십의 자리예요. ' + (d.c1 ? '올림한 1도 함께 더해요. ' : '') + d.at + ' 더하기 ' + d.bt + (d.c1 ? ' 더하기 1' : '') + '는?');
      else setPrompt('이번에는 <b class="pt">십의 자리</b>예요. ' + (d.br ? '받아내림해서 ' + d.at + '이 ' + (d.at - 1) + '이 되었어요. ' : '') + '<b class="pt">' + (d.at - d.br) + ' − ' + d.bt + '</b>는?', '이번에는 십의 자리예요. ' + (d.br ? '받아내림해서 ' + d.at + '이 ' + (d.at - 1) + '이 되었어요. ' : '') + (d.at - d.br) + ' 빼기 ' + d.bt + '는?');
    } else if (v.stage === 'hund') setPrompt('십의 자리에서 10을 <b class="pt">백의 자리</b>로 올렸어요. 백의 자리에는 무엇을 써야 할까요?', '십의 자리에서 10을 백의 자리로 올렸어요. 백의 자리에는 무엇을 써야 할까요?');
  }
  function vKey(k) {
    if (!/^\d$/.test(k)) return;
    const v = Pl.v, d = Pl.vd, q = Pl.q, st = v.stage;
    if (st === 'done') return;
    const add = q.op === '+', exp = st === 'ones' ? d.ro : (st === 'tens' ? d.rt : d.rh);
    if (+k === exp) {
      v[st] = String(k);
      v.stage = d.stages[d.stages.indexOf(st) + 1] || 'done';
      $('#p-hint').innerHTML = '';
      drawVertical();
      if (v.stage === 'done') { good(); return; }
      sfx.ok();
      if (st === 'ones' && add && d.c1) $('#p-hint').innerHTML = '<div class="hmsg">' + (d.ao + d.bo) + '는 10이 넘어요! 10은 십의 자리로 올리고, 일의 자리에는 ' + d.ro + '만 써요.</div>';
      if (st === 'tens' && d.rh) $('#p-hint').innerHTML = '<div class="hmsg">십의 자리 계산이 10이 넘어서 백의 자리로 올려요!</div>';
      vPrompt();
    } else {
      v.wr[st]++;
      const place = { ones: '일의 자리', tens: '십의 자리', hund: '백의 자리' }[st], origHint = q.hint, origHv = q.hv;
      let hint;
      if (st === 'ones') hint = add ? (d.c1 ? d.ao + ' + ' + d.bo + '를 계산해요. 10이 넘으면 10은 십의 자리로 올리고, 남은 수만 일의 자리에 써요.' : d.ao + ' + ' + d.bo + '를 수 모형이나 손가락으로 세어 보세요.')
        : (d.br ? d.ao + '가 ' + d.bo + '보다 작아서 십의 자리에서 10을 빌려 와요. 10과 ' + d.ao + '를 합친 수에서 ' + d.bo + '를 빼요.' : d.ao + ' − ' + d.bo + '를 수 모형이나 손가락으로 세어 보세요.');
      else if (st === 'tens') hint = add ? d.at + ' + ' + d.bt + (d.c1 ? ' + (올림한 1)' : '') + '을 계산해요.' : (d.at - d.br) + ' − ' + d.bt + '을 계산해요.' + (d.br ? ' 십의 자리는 받아내림해서 1 작아졌어요.' : '');
      else hint = '십의 자리에서 10을 올림하면 백의 자리에는 1을 써요.';
      q.hint = hint; q.hv = (!d.c1 && !d.br && !d.rh) ? V.pairBlocks(q.a, q.b, q.op) : '';
      bad(place + '를 다시 볼까요?');
      q.hint = origHint; q.hv = origHv;
    }
  }

  /* 시계 맞추기: 정각·30분은 버튼 두 개, 몇 분 읽기 단원(fine)은 분을 직접 돌려요 */
  function initClock(q) {
    setPrompt(q.prompt);
    Pl.ck = { h: (q.h + 2) % 12 + 1, m: q.fine ? (Math.floor(q.m / 5) * 5 + 25) % 60 : 0 };
    if (Pl.ck.h === q.h) Pl.ck.h = q.h % 12 + 1;
    drawClock();
  }
  function drawClock() {
    const c = Pl.ck, rev = Pl.revealed, q = Pl.q, dis = rev ? ' disabled' : '';
    const minute = q.fine
      ? '<div class="ckr"><span class="lab mn">긴바늘 (분)</span>' +
        '<button class="chip" data-ck="m-5" aria-label="5분 줄이기"' + dis + '>−5</button><button class="chip" data-ck="m-1" aria-label="1분 줄이기"' + dis + '>−1</button>' +
        '<b>' + c.m + '분</b>' +
        '<button class="chip" data-ck="m+1" aria-label="1분 늘리기"' + dis + '>+1</button><button class="chip" data-ck="m+5" aria-label="5분 늘리기"' + dis + '>+5</button></div>'
      : '<div class="ckr"><span class="lab mn">긴 바늘 (분)</span><button class="chip' + (c.m === 0 ? ' on' : '') + '" data-ck="m0"' + dis + '>12 · 정각</button><button class="chip' + (c.m === 30 ? ' on' : '') + '" data-ck="m30"' + dis + '>6 · 30분</button></div>';
    $('#p-visual').innerHTML = '<div class="clkset"><div class="clockbox">' + V.clock(c.h, c.m, 210) + '</div><div class="ckc">' +
      '<div class="ckr"><span class="lab hr">짧은 바늘 (시)</span><button class="sq2" data-ck="h-" aria-label="시 줄이기"' + dis + '>' + IC.minus + '</button><b>' + c.h + '시</b><button class="sq2" data-ck="h+" aria-label="시 늘리기"' + dis + '>' + IC.plus + '</button></div>' +
      minute + (rev ? '' : '<button class="big" data-ck="ok">확인</button>') + '</div></div>';
  }
  function ckAct(a) {
    if (Pl.lock) return;
    const c = Pl.ck, q = Pl.q;
    if (a === 'h-') c.h = c.h === 1 ? 12 : c.h - 1;
    else if (a === 'h+') c.h = c.h === 12 ? 1 : c.h + 1;
    else if (a === 'm0') c.m = 0;
    else if (a === 'm30') c.m = 30;
    else if (a === 'm-5') c.m = (c.m + 55) % 60;
    else if (a === 'm-1') c.m = (c.m + 59) % 60;
    else if (a === 'm+1') c.m = (c.m + 1) % 60;
    else if (a === 'm+5') c.m = (c.m + 5) % 60;
    else if (a === 'ok') {
      if (c.h === q.h && c.m === q.m) { good(); return; }
      bad(c.h !== q.h ? '짧은바늘이 가리키는 숫자를 다시 볼까요?' : '긴바늘을 다시 볼까요?');
      return;
    }
    drawClock();
  }

  /* 규칙 만들기 */
  function initPattern(q) { setPrompt(q.prompt); Pl.pf = { n: 0 }; drawPattern(); }
  function drawPattern() {
    const q = Pl.q, n = Pl.pf.n;
    let h = '<div class="tseq' + (q.cols ? ' grid" style="--c:' + q.cols : '') + '">';
    q.seq.forEach(function (t) { h += '<span class="tk">' + V.tok(t, 44) + '</span>'; });
    q.answers.forEach(function (t, i) { h += i < n ? '<span class="tk">' + V.tok(t, 44) + '</span>' : '<span class="tk bl' + (i === n ? ' act' : '') + '"></span>'; });
    h += '</div><div class="palette">' + q.palette.map(function (t) { return '<button class="pal" data-t="' + t + '" aria-label="모양 고르기">' + V.tok(t, 48) + '</button>'; }).join('') + '</div>';
    $('#p-visual').innerHTML = h;
  }
  function palPick(t) {
    if (Pl.lock) return;
    const q = Pl.q;
    if (t === q.answers[Pl.pf.n]) {
      Pl.pf.n++; sfx.ok(); drawPattern();
      if (Pl.pf.n >= q.answers.length) good();
    } else bad();
  }

  /* ===== 결과 ===== */
  function finish() {
    const n = Pl.qs.length, c = Pl.ok, l = Pl.l, ui = Pl.ui;
    const stars = c === n ? 3 : (c >= Math.ceil(n * 0.7) ? 2 : 1);
    const rec = S.lessons[l.id] || (S.lessons[l.id] = { stars: 0, plays: 0 });
    const wasDone = unitComplete(ui), lvBefore = stageOf(S.stars);
    rec.plays++; rec.stars = Math.max(rec.stars, stars);
    const earn = stars + (l.challenge && stars === 3 ? 2 : 0);
    S.stars += earn;
    const lvAfter = stageOf(S.stars), friendNew = !wasDone && unitComplete(ui);
    save();
    let nextL = null;
    const lessons = D.units[ui].lessons;
    if (Pl.li + 1 < lessons.length && lessonOpen(ui, Pl.li + 1)) nextL = lessons[Pl.li + 1];
    renderResult({ l: l, ui: ui, c: c, n: n, stars: stars, earn: earn, lvUp: lvAfter > lvBefore ? lvAfter : -1, friend: friendNew ? ui : -1, nextL: nextL });
    show('result'); sfx.win();
  }
  function renderResult(r) {
    const msg = r.stars === 3 ? '하나도 안 틀렸어요! 최고예요!' : r.stars === 2 ? '아주 잘했어요!' : '끝까지 해냈어요! 다시 하면 별이 늘어요.';
    let h = '<div class="stars">' + stars3(r.stars, 64) + '</div><h2>' + r.l.title + '</h2>' +
      '<div class="jua" style="font-size:22px">' + r.n + '문제 중 ' + r.c + '문제를 한 번에 맞혔어요</div><div class="muted">' + msg + ' (별 +' + r.earn + ')</div>' +
      V.mascot(stageOf(S.stars) + 1, 110);
    if (r.lvUp >= 0) h += '<div class="banner">' + V.mascot(r.lvUp + 1, 52) + '<div><b class="jua" style="font-size:20px">새싹이가 자랐어요!</b><br>이제 “' + ST[r.lvUp].name + '”가 되었어요.</div></div>';
    if (r.friend >= 0) h += '<div class="banner">' + V.friend(D.friends[r.friend].art, 60, D.friends[r.friend].name) + '<div><b class="jua" style="font-size:20px">새 친구 ' + D.friends[r.friend].name + '!</b><br>' + D.units[r.friend].title + ' 섬을 모두 건너서 친구가 되었어요.</div></div>';
    h += '<div class="rbtns">';
    if (r.nextL) h += '<button class="big" data-r="next" data-id="' + r.nextL.id + '">다음 징검다리: ' + r.nextL.title + '</button>';
    h += '<button class="big' + (r.nextL ? ' sec' : '') + '" data-r="again" data-id="' + r.l.id + '">한 번 더 하기</button>' +
      '<button class="big sec" data-r="unit">' + (r.nextL ? '섬으로 돌아가기' : '섬 보기') + '</button>' +
      '<button class="big sec" data-r="map">지도로 가기</button></div>';
    $('#r-body').innerHTML = h;
  }

  /* ===== 내 친구 ===== */
  function renderFriends() {
    const lv = stageOf(S.stars), nx = ST[lv + 1];
    $('#f-stars-ic').innerHTML = starSvg(true, 24); $('#f-stars').textContent = S.stars;
    let h = '<div class="card" style="margin-bottom:14px"><div class="row" style="display:flex;justify-content:space-between;font-size:14px;margin-bottom:8px"><span>' + (nx ? '다음 모습 “' + nx.name + '”까지' : '가장 멋진 모습이에요!') + '</span><b>' + (nx ? S.stars + ' / ' + nx.at : S.stars) + '</b></div>' +
      '<div class="bar"><i class="o" style="width:' + (nx ? Math.min(100, (S.stars - ST[lv].at) / (nx.at - ST[lv].at) * 100) : 100) + '%;background:var(--orange)"></i></div></div>';
    h += '<div class="stgrow">' + ST.map(function (s, i) {
      return '<div class="stg ' + (i === lv ? 'now' : (i > lv ? 'future' : '')) + '">' + V.mascot(i + 1, 64) + '<b>' + s.name + '</b><span>별 ' + s.at + '개부터</span></div>';
    }).join('') + '</div>';
    h += BOOKS.map(function (bk) {
      return '<div class="sec-title">' + bk.name + ' 친구들</div><div class="fgrid">' + bk.friends.map(function (f, i) {
        const got = bk.units[i].lessons.every(function (l) { return done(l.id); });
        return '<div class="fcell">' + (got ? V.friend(f.art, 72, f.name) : '<div class="fl">' + IC.lock + '</div>') + '<b>' + (got ? f.name : '???') + '</b><span>' + (got ? f.note : (i + 1) + '단원을 끝내면 만나요') + '</span></div>';
      }).join('') + '</div>';
    }).join('');
    $('#f-body').innerHTML = h;
  }

  /* ===== 엄마 화면 ===== */
  function renderParent() {
    const body = $('#pa-body');
    if (!parentOK) {
      $('#pa-sub').textContent = '보호자 확인이 필요해요';
      const a = R(6, 9), b = R(6, 9); gateAns = a * b;
      body.innerHTML = '<div class="gate card"><div class="muted">엄마·아빠만 열 수 있어요</div><div class="q">' + a + ' × ' + b + ' = ?</div>' +
        '<input id="g-in" type="number" inputmode="numeric" aria-label="정답 입력"><div class="err" id="g-err"></div><button class="big" data-act="gate">확인</button></div>';
      return;
    }
    $('#pa-sub').textContent = '공부 기록과 설정';
    const old = body.scrollTop;
    const now = new Date(), dow = (now.getDay() + 6) % 7, names = ['월', '화', '수', '목', '금', '토', '일'];
    const wk = []; let ws = 0, wc = 0, wd = 0;
    for (let i = 0; i < 7; i++) {
      const dt = new Date(now.getFullYear(), now.getMonth(), now.getDate() - dow + i), rec = S.days[dkey(dt)] || { s: 0, c: 0 };
      wk.push({ n: names[i], s: rec.s, today: i === dow, fut: i > dow }); ws += rec.s; wc += rec.c; if (rec.s > 0) wd++;
    }
    const td = S.days[dkey()] || { s: 0, c: 0 }, mx = Math.max(10, Math.max.apply(null, wk.map(function (w) { return w.s; })));
    let h = '<div class="pgrid">' +
      '<div class="card stat"><span class="muted">오늘 푼 문제</span><b>' + td.s + '개</b></div>' +
      '<div class="card stat"><span class="muted">이번 주 공부한 날</span><b>' + wd + '일</b></div>' +
      '<div class="card stat"><span class="muted">이번 주 한 번에 맞힌 비율</span><b>' + (ws ? Math.round(wc / ws * 100) + '%' : '-') + '</b></div></div>';
    h += '<div class="sec-title">이번 주 공부</div><div class="card"><div class="wk">' + wk.map(function (w) {
      return '<div class="' + (w.today ? 'today' : '') + (w.fut ? ' fut' : '') + (w.s ? '' : ' zero') + '"><span>' + (w.s || '') + '</span><i style="height:' + Math.max(4, w.s / mx * 90) + '%"></i><span>' + w.n + '</span></div>';
    }).join('') + '</div></div>';
    h += '<div class="sec-title">단원별 진도</div>' + BOOKS.map(function (bk) {
      return '<div class="card" style="margin-bottom:12px"><div class="muted" style="margin-bottom:4px">' + bk.name + '</div>' + bk.units.map(function (u, i) {
        const dn = u.lessons.filter(function (l) { return done(l.id); }).length;
        return '<div class="prow"><span>' + (i + 1) + '. ' + u.title + '</span><div class="bar"><i class="o" style="width:' + (dn / u.lessons.length * 100) + '%"></i></div><b>' + dn + '/' + u.lessons.length + '</b></div>';
      }).join('') + '</div>';
    }).join('');
    const weak = Object.keys(S.tags).map(function (k) {
      const t = S.tags[k], r = t.r || [], w = r.filter(function (x) { return !x; }).length;
      return { k: k, a: r.length ? (r.length - w) / r.length : 1, n: r.length, w: w, lid: t.lid };
    }).filter(function (x) { return x.n >= 3 && x.a < 0.7 && findLesson(x.lid); }).sort(function (x, y) { return x.a - y.a; }).slice(0, 3);
    h += '<div class="sec-title">다시 연습하면 좋아요</div><div class="card">' + (weak.length ? weak.map(function (x) {
      return '<div class="wi"><div><b>' + x.k + '</b><span>최근 ' + x.n + '번 중 ' + x.w + '번 다시 해 보았어요</span></div><button data-act="retry" data-lid="' + x.lid + '">다시 풀기</button></div>';
    }).join('') : '<div class="muted">아직 어려워하는 유형이 없어요. 계속 풀다 보면 여기에 나타나요.</div>') + '</div>';
    const st = S.settings;
    const tg = function (k, label, sub) { return '<div class="setr"><div>' + label + (sub ? '<br><span class="muted">' + sub + '</span>' : '') + '</div><button class="tg" data-act="tg" data-k="' + k + '" aria-pressed="' + (st[k] ? 'true' : 'false') + '" aria-label="' + label + '"></button></div>'; };
    h += '<div class="sec-title">설정</div><div class="card">' +
      '<div class="setr"><label for="nm">아이 이름</label><input id="nm" type="text" maxlength="8" style="max-width:180px"></div>' +
      '<div class="setr"><div>한 번에 푸는 문제 수</div><div class="stp2"><button class="mini" data-act="per" data-d="-1" aria-label="문제 수 줄이기">' + IC.minus + '</button>' + st.per + '개<button class="mini" data-act="per" data-d="1" aria-label="문제 수 늘리기">' + IC.plus + '</button></div></div>' +
      tg('voice', '문제 읽어 주기', '문제가 나오면 소리 내어 읽어요') + tg('sound', '효과음') +
      tg('help', '계산 도우미', '세로셈 처음 세 문제에 수 모형을 보여 줘요') +
      tg('unlockAll', '순서 잠금 풀기', '학교 진도에 맞춰 아무 단원이나 열 수 있어요') + '</div>';
    h += '<div class="sec-title">기록 옮기기</div><div class="card"><div class="muted" style="margin-bottom:8px">기록은 이 기기의 이 브라우저에만 저장돼요. 다른 기기로 옮기려면 아래 글을 복사해서 그쪽 화면에 붙여 넣어요.</div>' +
      '<textarea id="bk" readonly aria-label="백업 글"></textarea>' +
      '<div style="display:flex;gap:8px;margin:8px 0 14px;flex-wrap:wrap"><button class="btn2" data-act="copy">복사하기</button></div>' +
      '<textarea id="rs" placeholder="복사한 글을 여기에 붙여 넣어요" aria-label="불러올 글"></textarea>' +
      '<div style="display:flex;gap:8px;margin-top:8px;flex-wrap:wrap"><button class="btn2" data-act="restore">불러오기</button><button class="btn2 warn" data-act="reset">모든 기록 지우기</button></div></div>';
    body.innerHTML = h;
    $('#bk').value = JSON.stringify(S); $('#nm').value = S.name || '';
    body.scrollTop = old;
  }

  /* ===== 이벤트 ===== */
  function bind() {
    $('#nav').addEventListener('click', function (e) {
      const b = e.target.closest('button'); if (!b) return;
      const go = b.dataset.go;
      if (go === 'map') goMap();
      else if (go === 'friends') { show('friends'); renderFriends(); }
      else if (go === 'parent') { show('parent'); renderParent(); }
    });
    $('#m-books').addEventListener('click', function (e) {
      const b = e.target.closest('button'); if (!b) return;
      const i = +b.dataset.bk;
      if (!bookOpen(i)) { toast('앞 학기 섬을 먼저 건너 보아요. (엄마 화면에서 순서 잠금을 풀 수도 있어요)'); return; }
      D = BOOKS[i]; S.book = D.id; save(); renderMap();
    });
    $('#islands').addEventListener('click', function (e) { const b = e.target.closest('.ib'); if (b) goUnit(+b.dataset.u); });
    $('#u-back').addEventListener('click', goMap);
    $('#u-list').addEventListener('click', function (e) { const b = e.target.closest('.lcard'); if (b && !b.disabled) startLesson(b.dataset.l); });
    $('#p-close').addEventListener('click', function () { goUnit(Pl ? Pl.ui : U); });
    $('#p-say').addEventListener('click', function () { if (Pl) say(Pl.say); });
    $('#p-keys').addEventListener('click', function (e) { const b = e.target.closest('button'); if (b) onKey(b.dataset.k); });
    $('#p-next').addEventListener('click', nextQ);
    $('#p-choices').addEventListener('click', function (e) {
      const b = e.target.closest('.opt'); if (!b || !Pl || Pl.lock || b.disabled) return;
      const q = Pl.q, i = +b.dataset.i;
      if (String(q.options[i].value) === String(q.answer)) { b.classList.add('ok'); good(); }
      else { b.classList.add('no'); b.disabled = true; bad(); }
    });
    $('#p-visual').addEventListener('click', function (e) {
      const c = e.target.closest('[data-ck]'); if (c && Pl && Pl.q.kind === 'clockset') return ckAct(c.dataset.ck);
      const p = e.target.closest('.pal'); if (p && Pl && Pl.q.kind === 'patternfill') palPick(+p.dataset.t);
    });
    $('#r-body').addEventListener('click', function (e) {
      const b = e.target.closest('[data-r]'); if (!b) return;
      const a = b.dataset.r;
      if (a === 'next' || a === 'again') startLesson(b.dataset.id);
      else if (a === 'unit') { show('unit'); renderUnit(); }
      else goMap();
    });
    $('#pa-body').addEventListener('click', function (e) {
      const b = e.target.closest('[data-act]'); if (!b) return;
      const a = b.dataset.act;
      if (a === 'gate') {
        const v = +($('#g-in').value || 0);
        if (v === gateAns) { parentOK = true; renderParent(); } else { $('#g-err').textContent = '다시 계산해 보세요.'; }
      } else if (a === 'per') {
        const opts = [5, 8, 10], i = opts.indexOf(S.settings.per), j = Math.max(0, Math.min(2, (i < 0 ? 1 : i) + (+b.dataset.d)));
        S.settings.per = opts[j]; save(); renderParent();
      } else if (a === 'tg') {
        S.settings[b.dataset.k] = !S.settings[b.dataset.k]; save(); renderParent();
      } else if (a === 'retry') {
        startLesson(b.dataset.lid);
      } else if (a === 'copy') {
        const ta = $('#bk'); ta.select();
        let ok = false; try { ok = document.execCommand('copy'); } catch (err) { ok = false; }
        if (!ok && navigator.clipboard) { navigator.clipboard.writeText(ta.value).then(function () { toast('복사했어요'); }, function () { toast('글을 길게 눌러 복사해 주세요'); }); }
        else toast(ok ? '복사했어요' : '글을 길게 눌러 복사해 주세요');
      } else if (a === 'restore') {
        try {
          const o = JSON.parse($('#rs').value.trim());
          if (!o || typeof o !== 'object' || !o.lessons) throw new Error('bad');
          S = normalize(o); save(); toast('기록을 불러왔어요'); renderParent();
        } catch (err) { toast('복사한 글이 올바르지 않아요'); }
      } else if (a === 'reset') {
        if (b.dataset.armed) { S = defaults(); save(); toast('기록을 지웠어요'); renderParent(); }
        else {
          b.dataset.armed = '1'; b.textContent = '정말 지울까요? 한 번 더 눌러요';
          setTimeout(function () { if (b.isConnected) { delete b.dataset.armed; b.textContent = '모든 기록 지우기'; } }, 4000);
        }
      }
    });
    $('#pa-body').addEventListener('change', function (e) { if (e.target.id === 'nm') { S.name = e.target.value.trim().slice(0, 8); save(); const bk = $('#bk'); if (bk) bk.value = JSON.stringify(S); toast('이름을 저장했어요'); } });
    $('#pa-body').addEventListener('keydown', function (e) { if (e.key === 'Enter' && e.target.id === 'g-in') { e.preventDefault(); const b = $('[data-act="gate"]'); if (b) b.click(); } });
    document.addEventListener('keydown', function (e) {
      if (cur !== 'play' || !Pl) return;
      if (e.target && /INPUT|TEXTAREA/.test(e.target.tagName)) return;
      if (!$('#p-next').hidden && e.key === 'Enter') { nextQ(); return; }
      if ($('#p-keys').hidden) return;
      if (/^[0-9]$/.test(e.key)) onKey(e.key);
      else if (e.key === 'Backspace') onKey('back');
      else if (e.key === 'Enter') onKey('ok');
    });
    let rt = 0;
    window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(function () { if (cur === 'map') renderMap(); }, 120); });
  }

  load();
  bind();
  goMap();
  setTimeout(function () { if (cur === 'map') renderMap(); }, 300); /* 글꼴이 늦게 불러와져도 지도를 다시 맞춰요 */
})();
