import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Left, Right } from "./Icons";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.7;
`;

const LeftArrow = styled.button`
  background: none;
  border: none;
`;

const RightArrow = styled.button`
  background: none;
  border: none;
`;

const PageNumber = styled.button`
  background: none;
  border: none;
`;

interface IProps {
  postCount: number;
  category: string;
}

const Pages: React.FunctionComponent<IProps> = (props) => {
  const numberOfPages = Math.ceil(props.postCount / 15);
  return (
    <Container>
      <LeftArrow>
        <Left />
      </LeftArrow>
      {[...Array(numberOfPages)].map((n, index) => {
        return (
          <Link key={index} to={`/category/${props.category}/${index + 1}`}>
            <PageNumber>{index + 1}</PageNumber>
          </Link>
        );
      })}
      <RightArrow>
        <Right />
      </RightArrow>
    </Container>
  );
};

export default Pages;
