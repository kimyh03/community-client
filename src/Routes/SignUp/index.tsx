import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import React from "react";
import { toast } from "react-toastify";
import Input from "src/Componentes/Input";
import PasswordValidator from "src/Componentes/PasswordValidator";
import useInput from "src/Hooks/UseInput";
import styled from "styled-components";

const SIGN_UP = gql`
  mutation signUp($nickname: String!, $password: String!, $email: String!) {
    signUp(nickname: $nickname, password: $password, email: $email) {
      ok
      existEmail
      existNickname
    }
  }
`;

const Container = styled.div`
  width: 300px;
  margin: 0;
  margin: auto;
  text-align: center;
`;

const AuthForm = styled.form`
  width: 300px;
  padding: 30px 20px;
  background: white;
  border: ${(props) => props.theme.boxBorder};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  font-size: 25px;
  font-weight: 700;
  margin: 20px 0 40px 0;
  color: ${(props) => props.theme.carrotColor};
`;

const Spacer = styled.div`
  height: 30px;
`;

const SubmitButton = styled.button`
  width: 80%;
  height: 35px;
  margin: 30px 0 15px 0;
  background: ${(props) => props.theme.carrotColor};
  color: white;
  border-radius: 7px;
  border: none;
  font-size: 15px;
  font-weight: 600;
  text-align: center;
  opacity: 1;
  transition: ease-in 0.1s;
  :hover {
    opacity: 0.7;
  }
`;

export default () => {
  const nickname = useInput("");
  const password = useInput("");
  const confirmPassword = useInput("");
  const email = useInput("");

  const [signUp] = useMutation(SIGN_UP, {
    variables: {
      nickname: nickname.value,
      password: password.value,
      email: email.value
    },
    onError(error) {
      throw new Error(error.message.substring(15));
    }
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    if (password.value !== confirmPassword.value) {
      toast.error("비밀번호가 일치하지 않습니다.");
    }
    try {
      await signUp();
      window.location.href = "http://localhost:3000/";
      toast.success("회원가입이 완료 되었습니다!");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <>
      <Container>
        <Title>안녕하세요. 반갑습니다!</Title>
        <AuthForm onSubmit={onSubmit}>
          <Input
            placeholder={"아이디(활동명)"}
            required={true}
            value={nickname.value}
            onChange={nickname.onChange}
            type={"text"}
          ></Input>
          <Spacer />
          <Input
            placeholder={"비밀번호"}
            required={true}
            value={password.value}
            onChange={password.onChange}
            type={"password"}
          ></Input>
          <Spacer />
          <Input
            placeholder={"비밀번호 확인"}
            required={true}
            value={confirmPassword.value}
            onChange={confirmPassword.onChange}
            type={"password"}
          ></Input>
          {password.value !== "" && confirmPassword.value !== "" && (
            <PasswordValidator
              isCorrect={password.value === confirmPassword.value}
            />
          )}
          <Spacer />
          <Input
            placeholder={"이메일"}
            required={true}
            value={email.value}
            onChange={email.onChange}
            type={"email"}
          ></Input>
          <SubmitButton>회원가입</SubmitButton>
        </AuthForm>
      </Container>
    </>
  );
};
