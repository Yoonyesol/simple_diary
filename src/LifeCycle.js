import { useEffect, useState } from "react";

const UnmountTest = () => {
  useEffect(() => {
    console.log("Mount");
    return () => {
      //Unmount 시점에 실행되게 함
      console.log("Unmount");
    }
  }, [])
  return <div>Unmount Testing Component</div>
}

const LifeCycle = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggle = () => setIsVisible(!isVisible);

  return <div style={{ padding: 20 }}>
    <button onClick={toggle}>ON/OFF</button>
    {isVisible && <UnmountTest />} {/*단락회로평가를 통해 뒤의 컴포넌트를 랜더링할 것인지 정하기*/}
  </div>
};

export default LifeCycle;