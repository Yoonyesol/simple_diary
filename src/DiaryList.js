import { useContext } from "react";
import DiaryItem from "./DiaryItem";
import { DiaryStateContext } from "./App";

//일기 리스트를 렌더링할 컴포넌트
const DiaryList = () => {
  const diaryList = useContext(DiaryStateContext); //context가 공급하는 데이터를 꺼내옴
  return <div className="DiaryList">
    <h2>일기 리스트</h2>
    <h4>{diaryList.length}개의 일기가 있습니다.</h4>
    <div>
      {diaryList.map((it)=>(  //it:diaryList의 요소(객체별로)렌더링
        <DiaryItem key={it.id} {...it} /> //key값과 모든 요소를 spread연산자로 전달
      ))}
    </div>
  </div>
};

DiaryList.defaultPops = { //dummy데이터가 지정되지 않을 시 지정할 상태
  diaryList:[]
}
export default DiaryList;