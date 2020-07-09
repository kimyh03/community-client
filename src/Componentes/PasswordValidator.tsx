import React from "react";
import styled from "styled-components";

const Message = styled.div<{ isCorrect: boolean }>`
  opacity: 0.6;
  color: ${(props) => (props.isCorrect ? "green" : "red")};
`;

interface IProps {
  isCorrect: boolean;
}

const PasswordValidator: React.FunctionComponent<IProps> = (props) => {
  if (props.isCorrect === false) {
    return (
      <Message isCorrect={props.isCorrect}>
        비밀번호가 일치하지 않습니다.
      </Message>
    );
  } else {
    return (
      <Message isCorrect={props.isCorrect}>비밀번호가 일치합니다.</Message>
    );
  }
};

export default PasswordValidator;
