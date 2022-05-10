import styled from "styled-components";

interface ContainerProps { //ContainerProps == CircleProps 둘 다 같은 bgColor를 보냄 //Container가 bgColor를 받을거라고 말해주는 interface
  bgColor : string;
  borderColor : string; //required 상태 따라서 Container에 borderColor를 넣어줘야함
}
const Container = styled.div<ContainerProps> ` //Container가 bgColor를 받을거라고 말해줌
  width: 200px;
  height: 200px;
  background-color: ${(props) => props.bgColor }; //타입스크립트는 bgColor가 올 걸 자동으로 알게 된다
  border-radius: 100px;
  border: 6px solid ${(props) => props.borderColor}; //Container에선 필수이므로 보내줘야 함
`;

interface CircleProps { //Container 스타일 컴포넌트로 보내주는 값
  bgColor: string;
  borderColor? : string; //? 붙이면 Optinal
  text ? :string;
}

function  Circle ({bgColor, borderColor, text= "기본문장입니다"}:CircleProps) { //여기서의 borderColor는 안 필수
  return (                                  //이건 js 문법임! 만약 이값이 존재하지 않으면 이걸 넣어주세요!
    <Container bgColor={bgColor} borderColor= {borderColor ?? bgColor}>
      {text}
      </Container> 
    //스타일 컴포넌트인 Container로 보내줌, borderColor 필수, 만약 borderColor가 없으면 bgColor를 사용
  );

  //function  Circle (props:CircleProps) {
//   return (
//     <Container bgColor={props.bgColor}></Container>
//   );

};
export default Circle;