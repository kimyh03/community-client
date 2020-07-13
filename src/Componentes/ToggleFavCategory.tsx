import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import React, { useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { StarEmpty, StarFull } from "./Icons";

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
  display: flex;
  align-items: center;
  justify-content: center;
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
    try {
      if (isFavS === true) {
        setIsFav(false);
        toast.warning("즐겨찾기가 해제 되었습니다.");
      } else {
        setIsFav(true);
        toast.success("즐겨찾기가 추가 되었습니다, 피드에서 확인하세요!");
      }
      await toggleFavCategory();
    } catch (error) {
      toast.error("로그인 후 이용하실 수 있습니다.");
    }
  };
  return (
    <Button onClick={onClick}>{isFavS ? <StarFull /> : <StarEmpty />}</Button>
  );
};
export default ToggleFavCategory;
