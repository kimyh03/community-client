import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import React, { useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { HeartEmpty, HeartFull } from "./Icons";

interface IProps {
  isLiked: boolean;
  postId: string;
}

const TOGGLE_POST_LIKE = gql`
  mutation toggleLikePost($id: String!) {
    toggleLikePost(id: $id) {
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
const TogglePostLike: React.FunctionComponent<IProps> = (props) => {
  const [isLikeS, setIsLike] = useState(props.isLiked);
  const [toggleLikePost] = useMutation(TOGGLE_POST_LIKE, {
    variables: { id: props.postId }
  });
  const onClick = async () => {
    try {
      if (isLikeS === true) {
        setIsLike(false);
        toast.warning("추천이 취소되었습니다!");
      } else {
        setIsLike(true);
        toast.success("추천이 등록되었습니다!");
      }
      await toggleLikePost();
    } catch (error) {
      toast.error("로그인 후 이용해 주세요");
    }
  };
  return (
    <Button onClick={onClick}>
      {isLikeS ? <HeartFull /> : <HeartEmpty />}
    </Button>
  );
};
export default TogglePostLike;
