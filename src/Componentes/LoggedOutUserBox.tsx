import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import React from "react";
import { Link } from "react-router-dom";
import useInput from "src/Hooks/UseInput";
import styled from "styled-components";
import Input from "./Input";

const Container = styled.div`
  width: 100%;
  margin-bottom: 20px;
  padding: 20px 10px 10px 10px;
  background: white;
  border: ${(props) => props.theme.boxBorder};
`;

const AuthForm = styled.form`
  width: 100%;
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

const AuthMenu = styled.div`
  color: ${(props) => props.theme.darkGreyColor};
  font-size: 12px;
  :hover {
    color: ${(props) => props.theme.carrotColor};
  }
`;

const SLink = styled(Link)`
  margin-top: 10px;
  align-self: flex-end;
  justify-self: flex-end;
  cursor: pointer;
`;

interface SignIn {
  token: string;
}

interface SignInResponse {
  signIn: SignIn;
}

interface SignInInput {
  accountId: string;
  password: string;
}

interface LocalSignInInput {
  token: string;
}

const SIGN_IN = gql`
  mutation signIn($accountId: String!, $password: String!) {
    signIn(accountId: $accountId, password: $password) {
      token
    }
  }
`;

const LOCAL_LOG_USER_IN = gql`
  mutation logUserIn($token: String!) {
    logUserIn(token: $token) @client
  }
`;

const LoggedOutUserBox: React.FunctionComponent = () => {
  const accountID = useInput("");
  const password = useInput("");

  const [logIn, { loading, data }] = useMutation<SignInResponse, SignInInput>(
    SIGN_IN,
    {
      variables: { accountId: accountID.value, password: password.value }
    }
  );
  const [localLogIn] = useMutation<LocalSignInInput>(LOCAL_LOG_USER_IN, {
    variables: { token: data?.signIn.token }
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!loading) {
      await logIn();
      try {
        if (data?.signIn.token === undefined || data?.signIn.token === null) {
          console.log("아이디 혹은 비밀번호가 일치하지 않습니다.");
        } else {
          await localLogIn();
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  return (
    <Container>
      <AuthForm onSubmit={onSubmit}>
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
        <SLink to={"/signUp"}>
          <AuthMenu>회원가입</AuthMenu>
        </SLink>
      </AuthForm>
    </Container>
  );
};

export default LoggedOutUserBox;
