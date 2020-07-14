import React from "react";
import useInput from "src/Hooks/UseInput";
import styled from "styled-components";

const Container = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 500px;
  height: 40px;
  border: solid 3px #ec6a36;
`;

const Input = styled.input`
  border: none;
  width: 80%;
  height: 100%;
  padding: 10px;
  opacity: 0.7;
  font-size: 15px;
`;

const Button = styled.button`
  color: white;
  width: 20%;
  height: 100%;
  background: ${(props) => props.theme.carrotColor};
  border: none;
  opacity: 1;
  transition: ease-in 0.1s;
  :hover {
    opacity: 0.7;
  }
`;

export default () => {
  const { value, onChange, setValue } = useInput("");
  const onSubmit = (event) => {
    event.preventDefault();
    window.location.href = `http://localhost:3000/search/${value}`;
    setValue("");
    return null;
  };
  return (
    <Container onSubmit={onSubmit}>
      <Input
        value={value}
        onChange={onChange}
        placeholder="검색어를 입력하세요"
      />
      <Button>검색</Button>
    </Container>
  );
};
