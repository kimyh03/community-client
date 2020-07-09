import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import React, { useState } from "react";
import styled from "styled-components";
import { HeartEmpty, HeartFull } from "./Icons";

interface IProps {
  isFav: boolean;
  category: string;
}

const TOGGLE_FAVCATEGORY = gql`
  mutation toggleFavCategory($title: String!) {
    toggleFavCategory(title: $title) {
      ok
    }
  }
`;

const Button = styled.button`
  background: none;
  border: none;
  height: 20px;
`;
const ToggleFavCategory: React.FunctionComponent<IProps> = (props) => {
  const [isFavS, setIsFav] = useState(props.isFav);
  const [toggleFavCategory] = useMutation(TOGGLE_FAVCATEGORY, {
    variables: { title: props.category }
  });
  const onClick = async () => {
    await toggleFavCategory();
    if (isFavS === true) {
      setIsFav(false);
    } else {
      setIsFav(true);
    }
  };
  return (
    <Button onClick={onClick}>{isFavS ? <HeartFull /> : <HeartEmpty />}</Button>
  );
};
export default ToggleFavCategory;
