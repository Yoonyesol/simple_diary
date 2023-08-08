import { useRef, useState } from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';

const dummyList = [
  {
    id: 1, 
    author: "둘리",
    content: "하이1",
    emotion: 1,
    created_date: new Date().getTime()  //현재 시간을 ms로 반환
  },
  {
    id: 2, 
    author: "또치",
    content: "하이13",
    emotion: 5,
    created_date: new Date().getTime() 
  },
  {
    id: 3, 
    author: "마이콜",
    content: "하이1543",
    emotion: 4,
    created_date: new Date().getTime() 
  },
  {
    id: 4, 
    author: "희동이",
    content: "하이13242",
    emotion: 5,
    created_date: new Date().getTime()  
  },
  {
    id: 5, 
    author: "고길동",
    content: "하이13424",
    emotion: 3,
    created_date: new Date().getTime() 
  },
]

function App() {
  const [data, setData] = useState(dummyList); //일기 데이터 배열, 배열을 관리할 변수
  
  const dataId = useRef(0); //일기 id

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
  const onDelete = (targetId) => {
    console.log(`${targetId}가 삭제되었습니다.`)
    const newDiaryList = data.filter((it) => it.id !== targetId); //targetId 일기를 제외한 모든 일기를 배열로 생성
    setData(newDiaryList) //data state 변경
  }
  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate} />
      <DiaryList onDelete={onDelete} diaryList={data} />
    </div>
  );
}

export default App;
