import React from "react";
import styled from "styled-components";

const Container = styled.input`
  margin-bottom: 8px;
  width: 100%;
  height: 35px;
  background: #f6f6f6;
  border-width: 1px;
  border-style: solid;
  border-color: #aaa #ccc #ccc #aaa;
  border-radius: 3px;
  box-shadow: inset 1px 1px 2px rgba(0, 0, 0, 0.1);
  opacity: 0.6;
  padding: 10px;

  :focus {
    border-width: 3px;
  }

  :hover {
    opacity: 1;
  }
`;

interface IProps {
  placeholder: string;
  required: boolean;
  value: string;
  onChange;
  type: string;
}

const Input: React.FunctionComponent<IProps> = (props) => (
  <Container
    placeholder={props.placeholder}
    required={props.required}
    value={props.value}
    onChange={props.onChange}
    type={props.type}
  />
);

export default Input;
