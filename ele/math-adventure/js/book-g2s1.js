/* 2학년 1학기 (동아출판 『수학 2-1』 차례) — 차시 번호는 w 로 시작해요 */
window.MATH_BOOKS.push({
  id: 'g2s1', name: '2학년 1학기', short: '2-1',
  friends: [
    { name: '백호', note: '세 자리 수', art: 6 },
    { name: '다람이', note: '여러 가지 도형', art: 7 },
    { name: '물개', note: '덧셈과 뺄셈', art: 8 },
    { name: '기린이', note: '길이 재기', art: 9 },
    { name: '고슴이', note: '분류하기', art: 10 },
    { name: '코끼리', note: '곱셈', art: 11 }
  ],
  units: [
    {
      id: 'w1', title: '세 자리 수', color: '#1F5FD1',
      lessons: [
        { id: 'w1-1', title: '백 알아보기', desc: '99보다 1 큰 수는 100', gen: 'w_hundred' },
        { id: 'w1-2', title: '몇백 알아보기', desc: '100이 몇 개일까요?', gen: 'w_hundreds' },
        { id: 'w1-3', title: '세 자리 수 알아보기', desc: '백, 십, 일의 자리', gen: 'w_threeDigit' },
        { id: 'w1-4', title: '뛰어 세기', desc: '100씩, 10씩, 1씩', gen: 'w_skip' },
        { id: 'w1-5', title: '수의 크기 비교', desc: '백의 자리부터 비교해요', gen: 'w_compare3' },
        { id: 'w1-6', title: '세 자리 수 문제 해결', desc: '수 카드와 단서로 수 찾기', gen: 'w_solve3' },
        { id: 'w1-7', title: '섬 지킴이 도전!', desc: '단원 마무리 문제', challenge: true, mix: ['w1-1', 'w1-2', 'w1-3', 'w1-4', 'w1-5', 'w1-6'] }
      ]
    },
    {
      id: 'w2', title: '여러 가지 도형', color: '#3A9D5D',
      lessons: [
        { id: 'w2-1', title: '삼각형 알아보기', desc: '변과 꼭짓점이 3개', gen: 'w_triangle' },
        { id: 'w2-2', title: '사각형 알아보기', desc: '변과 꼭짓점이 4개', gen: 'w_quad' },
        { id: 'w2-3', title: '원 알아보기', desc: '똑같이 동그란 모양', gen: 'w_circle' },
        { id: 'w2-4', title: '칠교 조각 알아보기', desc: '삼각형과 사각형 조각', gen: 'w_tangram' },
        { id: 'w2-5', title: '쌓은 모양 알아보기', desc: '쌓기나무를 세어요', gen: 'w_stack' },
        { id: 'w2-6', title: '섬 지킴이 도전!', desc: '단원 마무리 문제', challenge: true, mix: ['w2-1', 'w2-2', 'w2-3', 'w2-4', 'w2-5'] }
      ]
    },
    {
      id: 'w3', title: '덧셈과 뺄셈', color: '#C2560A',
      lessons: [
        { id: 'w3-1', title: '여러 가지 방법으로 덧셈하기', desc: '나누어서 차례로 더해요', gen: 'w_addDecomp' },
        { id: 'w3-2', title: '가로셈으로 덧셈하기', desc: '받아올림이 있어요', gen: 'w_addHz' },
        { id: 'w3-3', title: '세로셈으로 덧셈하기', desc: '10이 넘으면 올려요', gen: 'w_addVert' },
        { id: 'w3-4', title: '여러 가지 방법으로 뺄셈하기', desc: '나누어서 차례로 빼요', gen: 'w_subDecomp' },
        { id: 'w3-5', title: '가로셈으로 뺄셈하기', desc: '받아내림이 있어요', gen: 'w_subHz' },
        { id: 'w3-6', title: '세로셈으로 뺄셈하기', desc: '10을 빌려 와요', gen: 'w_subVert' },
        { id: 'w3-7', title: '세 수의 계산', desc: '앞에서부터 차례로', gen: 'w_calc3' },
        { id: 'w3-8', title: '덧셈과 뺄셈의 관계', desc: '덧셈식을 뺄셈식으로', gen: 'w_relation' },
        { id: 'w3-9', title: '□의 값 구하기', desc: '모르는 수를 찾아요', gen: 'w_unknown' },
        { id: 'w3-10', title: '덧셈과 뺄셈 문제 해결', desc: '이야기로 식을 세워요', gen: 'w_story3' },
        { id: 'w3-11', title: '섬 지킴이 도전!', desc: '단원 마무리 문제', challenge: true, mix: ['w3-1', 'w3-2', 'w3-3', 'w3-4', 'w3-5', 'w3-6', 'w3-7', 'w3-8', 'w3-9', 'w3-10'] }
      ]
    },
    {
      id: 'w4', title: '길이 재기', color: '#9C6ADE',
      lessons: [
        { id: 'w4-1', title: '길이 비교하기', desc: '어느 쪽이 더 길까요?', gen: 'w_lenCompare' },
        { id: 'w4-2', title: '여러 가지 단위로 재기', desc: '클립으로 몇 번?', gen: 'w_lenUnits' },
        { id: 'w4-3', title: '1 cm 알아보기', desc: '1 cm가 몇 번일까요?', gen: 'w_lenCm' },
        { id: 'w4-4', title: '자로 길이 재기', desc: '눈금 0에서 시작해요', gen: 'w_ruler' },
        { id: 'w4-5', title: '길이 어림하기', desc: '약 몇 cm일까요?', gen: 'w_lenEst' },
        { id: 'w4-6', title: '길이 재기 문제 해결', desc: '이어 붙이고 비교해요', gen: 'w_lenSolve' },
        { id: 'w4-7', title: '섬 지킴이 도전!', desc: '단원 마무리 문제', challenge: true, mix: ['w4-1', 'w4-2', 'w4-3', 'w4-4', 'w4-5', 'w4-6'] }
      ]
    },
    {
      id: 'w5', title: '분류하기', color: '#D9558A',
      lessons: [
        { id: 'w5-1', title: '분류 기준 알아보기', desc: '누가 해도 같은 기준', gen: 'w_clsCriteria' },
        { id: 'w5-2', title: '기준에 따라 분류하기', desc: '색깔, 모양, 크기', gen: 'w_clsDo' },
        { id: 'w5-3', title: '분류하고 세어 보기', desc: '몇 개씩 있을까요?', gen: 'w_clsCount' },
        { id: 'w5-4', title: '분류한 결과 말하기', desc: '가장 많은 것은?', gen: 'w_clsResult' },
        { id: 'w5-5', title: '섬 지킴이 도전!', desc: '단원 마무리 문제', challenge: true, mix: ['w5-1', 'w5-2', 'w5-3', 'w5-4'] }
      ]
    },
    {
      id: 'w6', title: '곱셈', color: '#E8505B',
      lessons: [
        { id: 'w6-1', title: '여러 가지 방법으로 세기', desc: '뛰어 세기와 묶어 세기', gen: 'w_countWays' },
        { id: 'w6-2', title: '묶어 세기', desc: '몇씩 몇 묶음?', gen: 'w_groups' },
        { id: 'w6-3', title: '몇의 몇 배 알아보기', desc: '2씩 3묶음은 2의 3배', gen: 'w_times' },
        { id: 'w6-4', title: '곱셈 알아보기', desc: '곱하기(×)로 나타내요', gen: 'w_multIntro' },
        { id: 'w6-5', title: '곱셈식으로 나타내기', desc: '3 × 4 = 12', gen: 'w_mult' },
        { id: 'w6-6', title: '곱셈 문제 해결', desc: '이야기로 곱셈식 만들기', gen: 'w_multSolve' },
        { id: 'w6-7', title: '섬 지킴이 도전!', desc: '2학년 1학기 마지막 도전', challenge: true, mix: ['w6-1', 'w6-2', 'w6-3', 'w6-4', 'w6-5', 'w6-6'] }
      ]
    }
  ]
});
