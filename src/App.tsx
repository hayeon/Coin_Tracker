import { useState } from "react";
import styled from "styled-components";

const Box = styled.div`
  background-color: ${bgProps => bgProps.theme.bgColor}; //이렇게 하면 theme에 있는 bgColor에 접근 가능
`;

function App() {
  const [value, setValue] = useState("");
  const onChange = (e:React.FormEvent<HTMLInputElement>) => { //any 타입을 지양할 것! 따라서 event의 타입을 설정 후, 어떤 종류의 Element가 이 onChange 이벤트를 발생시킬지 특정
    const {
      currentTarget:{value},
    } = e;
    setValue(value);
  }
  const onSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("hello", value);
  };
  return (
    <Box>
      <form onSubmit={onSubmit}>
        <input value={value} onChange={onChange} type="text" placeholder="username" />
        <button>Log in</button>
      </form>
    </Box>
  );
}

export default App;