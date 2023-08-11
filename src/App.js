import { useEffect, useMemo, useRef, useState } from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';
import OptimizeTest from './OptimizeTest';

function App() {
  const [data, setData] = useState([]); //일기 데이터 배열, 배열을 관리할 변수
  
  const dataId = useRef(0); //일기 id

  //API 호출 함수
  const getData = async() => {
    const res = await fetch("https://jsonplaceholder.typicode.com/comments")
      .then((res) => res.json());
    
    const initData = res.slice(0, 20).map((it) => { //20개까지만 잘라서 가져오기
      return {
        author: it.email,
        content: it.body,
        emotion: Math.floor(Math.random() * 5) + 1,  //1~5까지의 난수 생성
        created_date: new Date().getTime(),
        id: dataId.current++
      }
    })
    setData(initData);
  }

  //Mount 시에 getData함수 실행
  useEffect(() => {
    getData();
  }, [])

  //새로운 일기를 추가하는 함수
  const onCreate = (author, content, emotion) => {  //setData를 통해, 작성된 일기데이터를 data에 업데이트
    const created_date = new Date().getTime();
    const newItem = { //새로운 일기 data로 추가되어야 하는 요소
      author, content, emotion, created_date,
      id: dataId.current
    }
    dataId.current += 1;  //매번 1씩 id 증가
    setData([newItem, ...data]) //기존 아이템에 새로운 아이템을 추가
  }

  //작성된 일기를 삭제하는 함수
  const onRemove = (targetId) => {
    console.log(`${targetId}가 삭제되었습니다.`)
    const newDiaryList = data.filter((it) => it.id !== targetId); //targetId 일기를 제외한 모든 일기를 배열로 생성
    setData(newDiaryList) //data state 변경
  }

  //작성된 일기를 수정하는 함수
  const onEdit = (targetId, newContent) => {  //어떤 일기를 수정할지, 어떤 내용으로 수정할지
    setData(
      data.map((it)=>it.id === targetId ? {...it, content: newContent}:it)
    )
  }

  //감정을 분석하는 함수
  //useMemo: 인자로 콜백 함수를 받아, 콜백 함수가 리턴하는 값의 연산을 최적화
  const getDiaryAnalysis = useMemo(() => {
    console.log("일기 분석 시작")
    const goodCount = data.filter((it)=>it.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount/data.length)*100;
    return {goodCount, badCount, goodRatio};
  }, [data.length]);  //data.length가 변화하지 않는 이상 컴포넌트의 상태가 변해도 리랜더링x

  const {goodCount, badCount, goodRatio} = getDiaryAnalysis;

  return (
    <div className="App">
      <OptimizeTest/>
      <DiaryEditor onCreate={onCreate} />
      <div>전체 일기: {data.length}</div>
      <div>기분 좋은 일기 개수: {goodCount}</div>
      <div>기분 나쁜 일기 개수: {badCount}</div>
      <div>기분 좋은 일기 비율: {goodRatio}</div>
      <DiaryList onEdit={onEdit} onRemove={onRemove} diaryList={data} />
    </div>
  );
}

export default App;
