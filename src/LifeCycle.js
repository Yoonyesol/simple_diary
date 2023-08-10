import { useEffect, useState } from "react";

const LifeCycle = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  useEffect(() => { //초기 랜딩 시
    console.log("Mount!");
  }, [])

  useEffect(() => { //컴포넌트가 업데이트되어 상태변화가 발생할 때마다
    console.log("Update!");
  })

  useEffect(() => { //count의 상태가 변화할 때마다
    console.log(`count is update: ${count}`)
    if (count > 5) {  //원하는 변수의 값이 변화하는 것을 감지하여 아래 코드를 수행 
      alert("count가 5를 넘었습니다. 따라서 1로 초기화합니다.");
      setCount(1);
    }
  }, [count])
  
  useEffect(() => { //text의 상태가 변화할 때마다
    console.log(`text is update: ${text}`)
  },[text])

  return <div style={{ padding: 20 }}>
    <div>
      {count}
      <button onClick={() => setCount(count + 1)}>+</button>
      <div>
        <input value={text} onChange={(e)=>setText(e.target.value)}></input>
      </div>
    </div>
  </div>
};

export default LifeCycle;