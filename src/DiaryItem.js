const DiaryItem = ({onRemove, author, content, created_date, emotion, id}) => {
  return <div className="DiaryItem">
    <div className="info">
      <span>작성자:{author} | 감정점수: {emotion}</span> 
      <br/>
      <span className="date">{new Date(created_date).toLocaleString()}</span>
    </div>
    <div className="content">{content}</div>
    <button onClick={() => {
      if (window.confirm(`${id}번째 일기를 정말 삭제하시겠습니까?`)) {
        onRemove(id); //확인 선택시 onRemove 실행
      }
    }}>삭제하기</button>
  </div>
};
export default DiaryItem;