import React, { useState, useRef, useContext } from "react";
import { DiaryDispatchContext } from "./App";

const DiaryEditor = () => {
  const { onCreate } = useContext(DiaryDispatchContext);
  
  const authorInput = useRef(); //html dom요소에 접근
  const contentInput = useRef();
  const [state, setState] = useState({
    author: "",
    content: "",
    emotion: 1
  })

  const handleChangeState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,  //각 요소의 이름에 따라 해당 값을 변화
    })
  }

  const handleSubmit = () => {
    if (state.author.length < 1) {  //길이가 1이하인 경우
      authorInput.current.focus();  //authorInput 객체가 가리키는 현재 태그값(input)에 focus
      return; //종료
    }

    if (state.content.length < 5) {  //길이가 5이하인 경우
      contentInput.current.focus();
      return; //종료
    }

    //onCreate 함수를 호출해 현재 form의 저자, 컨텐츠, 감정을 인자로 전달
    onCreate(state.author, state.content, state.emotion);
    alert("저장 성공!");
    setState({  //컴포넌트의 state(입력폼) 초기화
      author: "",
      content: "",
      emotion: 1
    })
  }
  
  return (
    <div className="DiaryEditor">
      <h2>오늘의 일기</h2>
      <div>
        <input
          ref = {authorInput} //input태그에 접근
          name = "author"
          value={state.author}
          onChange={handleChangeState}/>
      </div>
      <div>
        <textarea
          ref = {contentInput}
          name = "content"
          value={state.content}
          onChange={handleChangeState}
        />
      </div>
      <div>
        오늘의 감정점수:  
        <select name="emotion" value={state.emotion} onChange={handleChangeState}>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>
      <div>
        <button onClick={handleSubmit}>일기 저장하기</button>
      </div>
    </div>
  )
};
export default React.memo(DiaryEditor);