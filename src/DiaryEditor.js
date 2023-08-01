import { useState } from "react";

const DiaryEditor = () => {
  //input 안에 들어가는 값을 관리하는 변수 author와, 그 변수의 상태를 관리하는 상태관리 함수 setAuthor 선언
  // const [author, setAuthor] = useState("");
  // const [content, setContent] = useState("");

  //비슷한 역할을 수행하는 두 값을 아래와 같이 묶어서 관리
  const [state, setState] = useState({
    author: "",
    content: ""
  })

  const handleChangeState = (e) => {
    //값이 바뀌었을 때 수행되는 콜백함수
    //setAuthor(e.target.value);
    setState({
      ...state, //기존값 펼쳐주기(펼쳐주기, 변경하기 순서주의)
      author: e.target.value, //author만 새로 받는 값으로 변경
      //content: state.content  //기존값 유지
    })
  }
  
  return (
    <div className="DiaryEditor">
      <h2>오늘의 일기</h2>
      <div>
        <input
          name = "author"
          value={state.author}
          onChange={handleChangeState}/>
      </div>
      <div>
        <textarea
          name = "content"
          value={state.content}
          onChange={(e) => {
            //setContent(e.target.value);
            setState({
              author: state.author,
              content: e.target.value
            })
          }}
        />
      </div>
    </div>
  )
};
export default DiaryEditor;