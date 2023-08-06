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
  return (
    <div className="App">
      <DiaryEditor />
      <DiaryList diaryList={dummyList} />
    </div>
  );
}

export default App;
