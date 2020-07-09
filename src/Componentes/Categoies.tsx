import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Item = styled.div`
  margin: 10px;
  min-width: 30px;
  height: 10px;
  font-size: 15px;
  color: ${(props) => props.theme.blackColor};
  opacity: 0.7;
  :hover {
    opacity: 1;
    color: ${(props) => props.theme.carrotColor};
  }
`;

interface IProps {
  key: string;
  id: string;
  title: string;
}

const Categoies: React.FunctionComponent<IProps> = (props) => {
  return (
    <Link to={`/category/${props.title}/1`}>
      <Item id={props.id}>{`• ${props.title}`}</Item>
    </Link>
  );
};

export default Categoies;
