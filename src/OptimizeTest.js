import React, { useEffect, useState } from "react";

const CounterA = React.memo(({ count }) => {
    useEffect(() => {   //memo의 동작여부를 알아보기 위해 아래 코드 실행
        console.log(`CounterA Update - count: ${count}`)
    })
    return <div>{count}</div>
})

const CounterB = React.memo(({ obj }) => {
    useEffect(() => {
        console.log(`CounterB Update - count: ${obj.count}`)
    })
    return <div>{obj.count}</div>
})

//얕은 복사를 방지하여 최적화시키기 위한 함수
const areEqual = (prevProps, nextProps) => {
    //true: 이전 프롭스와 현재 프롭스가 동일하다 -> 리렌더링X
    if (prevProps.obj.count === nextProps.obj.count) {
        return true;
    }
    return false;   //이전과 현재가 다르다 -> 리렌디링O
}

//Equal함수에 따라 CounterB의 리렌더링 여부가 결정되도록 하는 컴포넌트 생성
const MemorizedCounterB = React.memo(CounterB, areEqual);

const OptimizeTest = () => {
    const [count, setCount] = useState(1);
    const [obj, setObj] = useState({
        count:1 //객체로 카운터 사용
    });

    return <div style={{padding: 50}}>
        <div>
            <h2>Counter A</h2>
            <CounterA count={count} />
            <button onClick={()=>setCount(count)}>A button</button>{/* 상태변화 진행: count값(=1)으로 변함 */}
        </div>
        <div>
            <h2>Counter B</h2>
            <MemorizedCounterB obj={obj}/>
            <button onClick={()=>setObj({count: obj.count})}>B button</button>{/* 상태변화 진행 */}
        </div>
    </div>
}
export default OptimizeTest;