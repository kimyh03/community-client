import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import React, { useEffect } from "react";
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
  query signIn($accountId: String!, $password: String!) {
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
  const [logIn, { data }] = useLazyQuery<SignInResponse, SignInInput>(SIGN_IN, {
    variables: { accountId: accountID.value, password: password.value }
  });
  const [localLogIn] = useMutation<LocalSignInInput>(LOCAL_LOG_USER_IN, {
    variables: { token: data?.signIn.token }
  });

  useEffect(() => {
    logIn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    logIn();
    if (data?.signIn.token !== undefined && data?.signIn.token !== null) {
      localLogIn();
    } else {
      console.log("아이디 혹은 비밀번호가 일치하지 않습니다.");
    }
  };

  return (
    <Container>
      <AuthForm onSubmit={onSubmit}>
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

export default LoggedOutUserBox;
