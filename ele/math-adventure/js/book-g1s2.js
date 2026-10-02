/* 1학년 2학기 (동아출판 『수학 1-2』 차례) — 새 학기를 추가할 때는 이 파일처럼 book-○○.js 를 하나 더 만들고 index.html 에 넣어요.
   gen: js/generators*.js 에 있는 문제 만들기 틀의 이름 / challenge: 단원 마무리 도전(mix 에 적은 차시 문제를 섞어요) */
window.MATH_BOOKS.push({
  id: 'g1s2', name: '1학년 2학기', short: '1-2',
  friends: [
    { name: '동글곰', note: '100까지의 수', art: 0 },
    { name: '버스냥이', note: '덧셈과 뺄셈(1)', art: 1 },
    { name: '시계부엉', note: '모양과 시각', art: 2 },
    { name: '열다리', note: '덧셈과 뺄셈(2)', art: 3 },
    { name: '무늬거북', note: '규칙 찾기', art: 4 },
    { name: '반짝용', note: '덧셈과 뺄셈(3)', art: 5 }
  ],
  units: [
    {
      id: 'u1', title: '100까지의 수', color: '#3A9D5D',
      lessons: [
        { id: 'u1-1', title: '60, 70, 80, 90 알아보기', desc: '10개씩 묶음으로 세어요', gen: 'tens' },
        { id: 'u1-2', title: '99까지의 수', desc: '묶음과 낱개로 나타내요', gen: 'tensOnes' },
        { id: 'u1-3', title: '수를 넣어 이야기하기', desc: '개수와 번호를 읽어요', gen: 'storyNum' },
        { id: 'u1-4', title: '수의 순서', desc: '1 큰 수, 1 작은 수를 찾아요', gen: 'order' },
        { id: 'u1-5', title: '수의 크기 비교', desc: '어느 수가 더 클까요?', gen: 'compare' },
        { id: 'u1-6', title: '짝수와 홀수', desc: '둘씩 짝을 지어 봐요', gen: 'evenodd' },
        { id: 'u1-7', title: '섬 지킴이 도전!', desc: '단원 마무리 문제', challenge: true, mix: ['u1-1', 'u1-2', 'u1-3', 'u1-4', 'u1-5', 'u1-6'] }
      ]
    },
    {
      id: 'u2', title: '덧셈과 뺄셈(1)', color: '#C2560A',
      lessons: [
        { id: 'u2-1', title: '세 수의 덧셈', desc: '앞에서부터 차례로 더해요', gen: 'add3' },
        { id: 'u2-2', title: '세 수의 뺄셈', desc: '앞에서부터 차례로 빼요', gen: 'sub3' },
        { id: 'u2-3', title: '10이 되는 더하기', desc: '짝꿍 수를 찾아요', gen: 'make10' },
        { id: 'u2-4', title: '10에서 빼기', desc: '10에서 몇을 빼면?', gen: 'sub10' },
        { id: 'u2-5', title: '10을 만들어 더하기', desc: '10이 되는 두 수를 먼저 더해요', gen: 'addMake10' },
        { id: 'u2-6', title: '섬 지킴이 도전!', desc: '단원 마무리 문제', challenge: true, mix: ['u2-1', 'u2-2', 'u2-3', 'u2-4', 'u2-5'] }
      ]
    },
    {
      id: 'u3', title: '모양과 시각', color: '#1F5FD1',
      lessons: [
        { id: 'u3-1', title: '네모, 세모, 동그라미 찾기', desc: '모양의 이름을 알아요', gen: 'shapeFind' },
        { id: 'u3-2', title: '모양 알아보기', desc: '뾰족한 부분을 세어요', gen: 'shapeProp' },
        { id: 'u3-3', title: '모양 세기와 만들기', desc: '어떤 모양이 몇 개일까요?', gen: 'shapeCount' },
        { id: 'u3-4', title: '몇 시 알아보기', desc: '시계를 읽고 맞춰 봐요', gen: 'clockRead' },
        { id: 'u3-5', title: '몇 시 30분 알아보기', desc: '긴 바늘이 6을 가리켜요', gen: 'clockHalf' },
        { id: 'u3-6', title: '섬 지킴이 도전!', desc: '단원 마무리 문제', challenge: true, mix: ['u3-1', 'u3-2', 'u3-3', 'u3-4', 'u3-5'] }
      ]
    },
    {
      id: 'u4', title: '덧셈과 뺄셈(2)', color: '#9C6ADE',
      lessons: [
        { id: 'u4-1', title: '덧셈 알아보기', desc: '10을 만들어서 더해요', gen: 'addCarrySteps' },
        { id: 'u4-2', title: '덧셈 해 보기', desc: '몇 더하기 몇 계산하기', gen: 'addCarryNum' },
        { id: 'u4-3', title: '여러 가지 덧셈', desc: '합이 같은 식, 변하는 규칙', gen: 'addSame' },
        { id: 'u4-4', title: '뺄셈 알아보기', desc: '10에서 먼저 빼요', gen: 'subBorrowSteps' },
        { id: 'u4-5', title: '뺄셈 해 보기', desc: '낱개를 먼저 빼는 방법도 있어요', gen: 'subBorrowMix' },
        { id: 'u4-6', title: '여러 가지 뺄셈', desc: '차가 같은 식, 변하는 규칙', gen: 'subSame' },
        { id: 'u4-7', title: '섬 지킴이 도전!', desc: '단원 마무리 문제', challenge: true, mix: ['u4-1', 'u4-2', 'u4-3', 'u4-4', 'u4-5', 'u4-6'] }
      ]
    },
    {
      id: 'u5', title: '규칙 찾기', color: '#D9558A',
      lessons: [
        { id: 'u5-1', title: '규칙 찾아보기', desc: '되풀이되는 모양을 찾아요', gen: 'patFind' },
        { id: 'u5-2', title: '규칙 만들기', desc: '규칙대로 빈칸을 채워요', gen: 'patFill' },
        { id: 'u5-3', title: '색칠로 규칙 만들기', desc: '두 가지 색으로 칸을 채워요', gen: 'patGrid' },
        { id: 'u5-4', title: '수 배열에서 규칙 찾기', desc: '몇씩 뛰어 셀까요?', gen: 'numPat' },
        { id: 'u5-5', title: '수 배열표에서 규칙 찾기', desc: '색칠한 수를 살펴봐요', gen: 'chartPat' },
        { id: 'u5-6', title: '규칙을 수로 나타내기', desc: '모양을 수로 바꿔요', gen: 'patRepr' },
        { id: 'u5-7', title: '섬 지킴이 도전!', desc: '단원 마무리 문제', challenge: true, mix: ['u5-1', 'u5-2', 'u5-3', 'u5-4', 'u5-5', 'u5-6'] }
      ]
    },
    {
      id: 'u6', title: '덧셈과 뺄셈(3)', color: '#E8505B',
      lessons: [
        { id: 'u6-1', title: '수 모형으로 더하기', desc: '십 모형, 일 모형을 합쳐요', gen: 'addBlocks' },
        { id: 'u6-2', title: '가로셈으로 더하기', desc: '32 + 5 = ?', gen: 'addHz' },
        { id: 'u6-3', title: '세로셈으로 더하기', desc: '일의 자리부터 차근차근!', gen: 'addVert' },
        { id: 'u6-4', title: '수 모형으로 빼기', desc: '지우고 남은 것을 세어요', gen: 'subBlocks' },
        { id: 'u6-5', title: '가로셈으로 빼기', desc: '47 − 12 = ?', gen: 'subHz' },
        { id: 'u6-6', title: '세로셈으로 빼기', desc: '여기도 일의 자리부터', gen: 'subVert' },
        { id: 'u6-7', title: '덧셈과 뺄셈 이야기', desc: '이야기로 식을 세워요, 합과 차', gen: 'story' },
        { id: 'u6-8', title: '섬 지킴이 도전!', desc: '1학년 2학기 마지막 도전', challenge: true, mix: ['u6-1', 'u6-2', 'u6-3', 'u6-4', 'u6-5', 'u6-6', 'u6-7'] }
      ]
    }
  ]
});
