import React from "react";
import styled from "styled-components";

const Text = styled.span`
  font-weight: 800;
  font-size: 17px;
  color: ${(props) => props.theme.carrotColor};
  align-self: flex-start;
  margin: 9px 0;
`;

interface IProps {
  text: string;
}

const CarrotText: React.FunctionComponent<IProps> = (props) => (
  <Text>{props.text}</Text>
);

export default CarrotText;
