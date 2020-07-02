import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import React from "react";
import CarrotText from "src/Componentes/CarrotText";
import Categoies from "src/Componentes/Categoies";
import Loader from "src/Componentes/Loader";
import useButton from "src/Hooks/UseButton";
import styled from "styled-components";

interface Category {
  id: string;
  title: string;
  group: string;
}

interface CategoryData {
  categories: Category[];
}

const GET_CATEGORIES = gql`
  {
    categories {
      id
      title
      group
    }
  }
`;

const Title = styled.div`
  margin: 10px 0;
`;

const CategoiesBox = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  border-left: ${(props) => props.theme.boxBorder};
  border-right: ${(props) => props.theme.boxBorder};
  border-bottom: ${(props) => props.theme.boxBorder};
  border-bottom-left-radius: 7px;
  border-bottom-right-radius: 7px;
  background: white;
`;
const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
`;
const Button = styled.button<{ isClicked: boolean }>`
  background: white;
  width: 100%;
  height: 25px;
  border-left: ${(props) => props.theme.boxBorder};
  border-right: ${(props) => props.theme.boxBorder};
  border-top: ${(props) => props.theme.boxBorder};
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  opacity: ${(props) => (props.isClicked ? 1 : 0.6)};
  color: ${(props) =>
    props.isClicked ? props.theme.carrotColor : props.theme.blackColor};
  border-bottom: ${(props) => (props.isClicked ? 0 : props.theme.boxBorder)};
  font-weight: 600;

  :hover {
    opacity: 1;
    color: ${(props) => props.theme.carrotColor};
    border-bottom: none;
  }
`;

const sortItmes = [
  "All",
  "ㄱ",
  "ㄴ",
  "ㄷ",
  "ㄹ",
  "ㅁ",
  "ㅂ",
  "ㅅ",
  "ㅇ",
  "ㅈ",
  "ㅊ",
  "ㅋ",
  "ㅌ",
  "ㅍ",
  "ㅎ"
];

export default () => {
  const { loading, data } = useQuery<CategoryData>(GET_CATEGORIES);
  const { sortTerm, onClick } = useButton("All");
  let cleanCategories;
  if (sortTerm === "All") {
    cleanCategories = data?.categories;
  } else {
    cleanCategories = data?.categories.filter(
      (item) => item.group === sortTerm
    );
  }
  return (
    <>
      <Title>
        <CarrotText text="카테고리" />
      </Title>
      <ButtonContainer>
        {sortItmes.map((item) => (
          <Button
            isClicked={item === sortTerm}
            key={item}
            value={item}
            onClick={onClick}
          >
            {item}
          </Button>
        ))}
      </ButtonContainer>
      {loading ? (
        <Loader />
      ) : (
        <CategoiesBox>
          {cleanCategories?.map((item) => (
            <Categoies key={item.id} id={item.id} title={item.title} />
          ))}
        </CategoiesBox>
      )}
    </>
  );
};
