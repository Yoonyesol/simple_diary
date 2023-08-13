import { useCallback, useEffect, useMemo, useReducer, useRef} from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';

const reducer = (state, action) => {//상태변화 일어나기 전의 상태, 어떤 상태변화를 일으켜야 하는지에 대한 정보가 담겨있는 객체
  switch (action.type) {  //action의 타입에 따라 코드 실행. 리턴값이 data의 값이 된다
    case 'INIT': {
      return action.data  //새로운 state 리턴
    }
    case 'CREATE': {
      const created_date = new Date().getTime();
      const newItem = {
        ...action.data, 
        created_date
      }
      return [newItem, ...state]
    }
    case 'REMOVE': {
      return state.filter((it)=>it.id !== action.targetId)
    }
    case 'EDIT': {
      return state.map((it) => it.id === action.targetId ?
        { ...it, content: action.newContent } : it) //컨텐츠 부분만 수정해서 전달
    }
    default:
      return state;  //상태변화x
  }
}

function App() {
  //const [data, setData] = useState([]); //일기 데이터 배열, 배열을 관리할 변수
  
  //상태관리 로직을 컴포넌트 밖으로 분리
  const [data, dispatch] = useReducer(reducer, [])  //(함수명, 초기값)
  
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

    dispatch({type: 'INIT', data: initData})
  }

  //Mount 시에 getData함수 실행
  useEffect(() => {
    getData();
  }, [])

  //새로운 일기를 추가하는 함수
  const onCreate = useCallback((author, content, emotion) => {  //setData를 통해, 작성된 일기데이터를 data에 업데이트
    dispatch({ type: "CREATE", data: {author, content, emotion, id: dataId.current} })
    dataId.current += 1;  //매번 1씩 id 증가
  }, []) 

  //작성된 일기를 삭제하는 함수
  const onRemove = useCallback((targetId) => {
    dispatch({type: "REMOVE", targetId})
  },[])

  //작성된 일기를 수정하는 함수
  const onEdit = useCallback((targetId, newContent) => {  //어떤 일기를 수정할지, 어떤 내용으로 수정할지
    dispatch({type: "EDIT", targetId, newContent})
  },[])

  //감정을 분석하는 함수
  //useMemo: 인자로 콜백 함수를 받아, 콜백 함수가 리턴하는 값의 연산을 최적화
  const getDiaryAnalysis = useMemo(() => {
    const goodCount = data.filter((it)=>it.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount/data.length)*100;
    return {goodCount, badCount, goodRatio};
  }, [data.length]);  //data.length가 변화하지 않는 이상 컴포넌트의 상태가 변해도 리랜더링x

  const {goodCount, badCount, goodRatio} = getDiaryAnalysis;

  return (
    <div className="App">
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
