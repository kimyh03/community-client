import React from "react";
import useInput from "src/Hooks/UseInput";
import styled from "styled-components";
import CarrotText from "./CarrotText";
import Input from "./Input";

const Container = styled.div`
  width: 100%;
  height: 180px;
  margin: 0;
  margin: auto;
`;

const AuthForm = styled.form`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0;
  margin: auto;
`;

const Button = styled.button`
  width: 100%;
  padding: 5px 0;
  border-width: 1px;
  border-style: solid;
  border-color: #ddd #ccc #bbb #d6d6d6;
  border-radius: 3px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  color: #000;
  opacity: 0.7;

  :hover {
    opacity: 1;
  }
  :focus {
    opacity: 1;
  }
`;

interface IProps {
  isLoggedIn: boolean;
}

const UserBox: React.FunctionComponent<IProps> = (props) => {
  const accountID = useInput("");
  const password = useInput("");
  return (
    <Container>
      <AuthForm>
        <CarrotText text="로그인" />
        <Input
          placeholder="아이디"
          required={true}
          type={"text"}
          {...accountID}
        ></Input>
        <Input
          placeholder="비밀번호"
          required={true}
          type={"text"}
          {...password}
        ></Input>
        <Button>로그인</Button>
      </AuthForm>
    </Container>
  );
};

export default UserBox;
