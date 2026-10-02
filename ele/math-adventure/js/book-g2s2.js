/* 2학년 2학기 (동아출판 『수학 2-2』 차례) — 차시 번호는 x 로 시작해요 */
window.MATH_BOOKS.push({
  id: 'g2s2', name: '2학년 2학기', short: '2-2',
  friends: [
    { name: '펭이', note: '네 자리 수', art: 12 },
    { name: '판다', note: '곱셈구구', art: 13 },
    { name: '여우', note: '길이 재기', art: 14 },
    { name: '토끼', note: '시각과 시간', art: 15 },
    { name: '고래', note: '표와 그래프', art: 16 },
    { name: '사자', note: '규칙 찾기', art: 17 }
  ],
  units: [
    {
      id: 'x1', title: '네 자리 수', color: '#1F5FD1',
      lessons: [
        { id: 'x1-1', title: '천 알아보기', desc: '100이 10개이면 1000', gen: 'x_thousand' },
        { id: 'x1-2', title: '몇천 알아보기', desc: '1000이 몇 개일까요?', gen: 'x_thousands' },
        { id: 'x1-3', title: '네 자리 수 알아보기', desc: '천, 백, 십, 일의 자리', gen: 'x_fourDigit' },
        { id: 'x1-4', title: '뛰어 세기', desc: '1000씩, 100씩, 10씩, 1씩', gen: 'x_skip4' },
        { id: 'x1-5', title: '수의 크기 비교', desc: '천의 자리부터 비교해요', gen: 'x_compare4' },
        { id: 'x1-6', title: '네 자리 수 문제 해결', desc: '수 카드와 돈으로 풀어요', gen: 'x_solve4' },
        { id: 'x1-7', title: '섬 지킴이 도전!', desc: '단원 마무리 문제', challenge: true, mix: ['x1-1', 'x1-2', 'x1-3', 'x1-4', 'x1-5', 'x1-6'] }
      ]
    },
    {
      id: 'x2', title: '곱셈구구', color: '#E8505B',
      lessons: [
        { id: 'x2-1', title: '2단 곱셈구구', desc: '2씩 뛰어 세어요', gen: 'x_mult2' },
        { id: 'x2-2', title: '5단 곱셈구구', desc: '5씩 뛰어 세어요', gen: 'x_mult5' },
        { id: 'x2-3', title: '3단, 6단 곱셈구구', desc: '6단은 3단의 두 배', gen: 'x_mult36' },
        { id: 'x2-4', title: '4단, 8단 곱셈구구', desc: '8단은 4단의 두 배', gen: 'x_mult48' },
        { id: 'x2-5', title: '7단 곱셈구구', desc: '7씩 뛰어 세어요', gen: 'x_mult7' },
        { id: 'x2-6', title: '9단 곱셈구구', desc: '9씩 뛰어 세어요', gen: 'x_mult9' },
        { id: 'x2-7', title: '1단 곱셈구구와 0의 곱', desc: '1과 0을 곱하면?', gen: 'x_mult01' },
        { id: 'x2-8', title: '곱셈표 만들기', desc: '곱이 같은 곱셈구구', gen: 'x_multTable' },
        { id: 'x2-9', title: '곱셈구구 문제 해결', desc: '이야기로 곱셈식 세우기', gen: 'x_multSolve' },
        { id: 'x2-10', title: '섬 지킴이 도전!', desc: '단원 마무리 문제', challenge: true, mix: ['x2-1', 'x2-2', 'x2-3', 'x2-4', 'x2-5', 'x2-6', 'x2-7', 'x2-8', 'x2-9'] }
      ]
    },
    {
      id: 'x3', title: '길이 재기', color: '#3A9D5D',
      lessons: [
        { id: 'x3-1', title: '1 m 알아보기', desc: 'm와 cm로 나타내요', gen: 'x_meter' },
        { id: 'x3-2', title: '자로 길이 재기', desc: '줄자의 눈금을 읽어요', gen: 'x_tape' },
        { id: 'x3-3', title: '길이의 합 구하기', desc: 'm끼리, cm끼리 더해요', gen: 'x_lenAdd' },
        { id: 'x3-4', title: '길이의 차 구하기', desc: 'm끼리, cm끼리 빼요', gen: 'x_lenSub' },
        { id: 'x3-5', title: '길이 어림하기', desc: '약 몇 m일까요?', gen: 'x_lenEst' },
        { id: 'x3-6', title: '길이 재기 문제 해결', desc: '이어 붙이고 비교해요', gen: 'x_lenSolve' },
        { id: 'x3-7', title: '섬 지킴이 도전!', desc: '단원 마무리 문제', challenge: true, mix: ['x3-1', 'x3-2', 'x3-3', 'x3-4', 'x3-5', 'x3-6'] }
      ]
    },
    {
      id: 'x4', title: '시각과 시간', color: '#F28A1F',
      lessons: [
        { id: 'x4-1', title: '몇 시 몇 분 읽기(1)', desc: '5분 단위로 읽어요', gen: 'x_time5' },
        { id: 'x4-2', title: '몇 시 몇 분 읽기(2)', desc: '1분 단위로 읽어요', gen: 'x_time1' },
        { id: 'x4-3', title: '여러 가지 방법으로 시각 읽기', desc: '몇 시 몇 분 전', gen: 'x_timeBefore' },
        { id: 'x4-4', title: '1시간 알아보기', desc: '60분은 1시간', gen: 'x_hour1' },
        { id: 'x4-5', title: '걸린 시간 알아보기', desc: '시작과 끝 사이의 시간', gen: 'x_elapsed' },
        { id: 'x4-6', title: '하루의 시간과 달력', desc: '24시간, 요일, 날수', gen: 'x_dayCal' },
        { id: 'x4-7', title: '시각과 시간 문제 해결', desc: '끝낸 시각과 걸린 시간', gen: 'x_timeSolve' },
        { id: 'x4-8', title: '섬 지킴이 도전!', desc: '단원 마무리 문제', challenge: true, mix: ['x4-1', 'x4-2', 'x4-3', 'x4-4', 'x4-5', 'x4-6', 'x4-7'] }
      ]
    },
    {
      id: 'x5', title: '표와 그래프', color: '#9C6ADE',
      lessons: [
        { id: 'x5-1', title: '분류하여 표로 나타내기', desc: '종류별로 세어요', gen: 'x_tableFromPic' },
        { id: 'x5-2', title: '조사하여 표로 나타내기', desc: '자료를 세어 표를 만들어요', gen: 'x_tableSurvey' },
        { id: 'x5-3', title: '분류하여 그래프로 나타내기', desc: '○ 그래프를 읽어요', gen: 'x_graphRead' },
        { id: 'x5-4', title: '표와 그래프로 나타내기', desc: '표와 그래프를 짝지어요', gen: 'x_tableGraph' },
        { id: 'x5-5', title: '표와 그래프 문제 해결', desc: '많은 것, 적은 것, 차', gen: 'x_graphSolve' },
        { id: 'x5-6', title: '섬 지킴이 도전!', desc: '단원 마무리 문제', challenge: true, mix: ['x5-1', 'x5-2', 'x5-3', 'x5-4', 'x5-5'] }
      ]
    },
    {
      id: 'x6', title: '규칙 찾기', color: '#D9558A',
      lessons: [
        { id: 'x6-1', title: '무늬에서 규칙 찾기', desc: '되풀이되는 부분을 찾아요', gen: 'x_patShapes' },
        { id: 'x6-2', title: '쌓은 모양에서 규칙 찾기', desc: '쌓기나무가 늘어나요', gen: 'x_patStack' },
        { id: 'x6-3', title: '덧셈표에서 규칙 찾기', desc: '몇씩 커질까요?', gen: 'x_patAddTable' },
        { id: 'x6-4', title: '곱셈표에서 규칙 찾기', desc: '곱이 같은 칸을 찾아요', gen: 'x_patMulTable' },
        { id: 'x6-5', title: '생활에서 규칙 찾기', desc: '번호와 달력의 규칙', gen: 'x_patLife' },
        { id: 'x6-6', title: '규칙 찾기 문제 해결', desc: '여러 가지 규칙을 섞어요', gen: 'x_patSolve' },
        { id: 'x6-7', title: '섬 지킴이 도전!', desc: '2학년 마지막 도전', challenge: true, mix: ['x6-1', 'x6-2', 'x6-3', 'x6-4', 'x6-5', 'x6-6'] }
      ]
    }
  ]
});
