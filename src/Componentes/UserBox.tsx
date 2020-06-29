import React from "react";
import styled from "styled-components";

const UserBox = styled.div`
  width: 100px;
  height: 80px;
`;

const AuthForm = styled.form``;
const Input = styled.input``;
const Button = styled.button``;

export default () => (
  <UserBox>
    <AuthForm>
      <Input></Input>
      <Input></Input>
      <Button>로그인</Button>
    </AuthForm>
  </UserBox>
);
