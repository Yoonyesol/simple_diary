import React, { useEffect, useRef, useState } from "react";

const DiaryItem = ({ onEdit, onRemove, author, content, created_date, emotion, id }) => {
  useEffect(() => {
    console.log(`${id}번째 아이템 렌더!`)
  })
  
  const [isEdit, setIsEdit] = useState(false);  //값을 수정중인지 아닌지 저장
  const toggleIsEdit = () => setIsEdit(!isEdit); //isEdit값을 반전시킴

  const [localContent, setLocalContent] = useState(content); //수정 textarea에 들어갈 input을 핸들링
  const localContentInput = useRef(); //textarea 포커싱하기 위한 변수

  const handleRemove = () => {
    if (window.confirm(`${id}번째 일기를 정말 삭제하시겠습니까?`)) {
      onRemove(id); //확인 선택시 onRemove 실행
    }
  }

  const handleQuitEdit = () => {
    setIsEdit(false); //수정 상태에서 나가기
    setLocalContent(content); //content값으로 덮어씌우기
  }

  const handleEdit = () => {
    if (localContent.length < 5) {
      localContentInput.current.focus();
      return;
    }
    if (window.confirm(`${id}번째 일기를 수정하시겠습니까?`)) {
      onEdit(id, localContent);
      toggleIsEdit(); //수정 폼 닫아주기
    }
    
  }

  return <div className="DiaryItem">
    <div className="info">
      <span>작성자:{author} | 감정점수: {emotion}</span> 
      <br/>
      <span className="date">{new Date(created_date).toLocaleString()}</span>
    </div>
    <div className="content">{isEdit ? (<>
      <textarea ref={localContentInput} value={localContent} onChange={(e)=>setLocalContent(e.target.value)}>
      </textarea>
    </>) : (<>{content}</>)}</div>

    {isEdit ? <>
      <button onClick={handleQuitEdit}>수정 취소</button>
      <button onClick={handleEdit}>수정 완료</button>
    </> : <>
    <button onClick={handleRemove}>삭제하기</button>
      <button onClick={toggleIsEdit}>수정하기</button>
    </>}
    
  </div>
};
export default React.memo(DiaryItem);