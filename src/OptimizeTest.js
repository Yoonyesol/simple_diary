import React, { useEffect, useState } from "react";

const Textview = React.memo(({text}) => {   //해당 컴포넌트(함수) 변경 사항 없을 시, 랜더링 x
    useEffect(()=>{
        console.log(`Update:: Text : ${text}`)
    })
    return <div>{text}</div>
});

const Countview = ({count}) => {    //해당 컴포넌트 변경이 없을 시에도 랜더링 발생
    useEffect(()=>{
        console.log(`Update:: Count : ${count}`)
    })
    return <div>{count}</div>
}

const OptimizeTest = () =>{

    const [count, setCount] = useState(1);
    const [text, setText] = useState("");

    return <div style={{padding: 50}}>
        <div>
            <h2>count</h2>
            <Countview count={count}/>
            <button onClick={()=>setCount(count+1)}>+</button>
        </div>
        <div>
            <h2>text</h2>
            <Textview text={text}/>
            <input value={text} onChange={(e)=>setText(e.target.value)}/>
        </div>
    </div>
}
export default OptimizeTest;