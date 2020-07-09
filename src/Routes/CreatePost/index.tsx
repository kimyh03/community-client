import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import React from "react";
import { Link, withRouter } from "react-router-dom";
import useInput from "src/Hooks/UseInput";
import styled from "styled-components";

const Category = styled.div`
  font-size: 25px;
  font-weight: 700;
  color: ${(props) => props.theme.carrotColor};
  margin-bottom: 15px;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: white;
  border: ${(props) => props.theme.boxBorder};
  padding: 30px 50px;
`;

const CreatePostForm = styled.form`
  width: 70%;
  display: flex;
  flex-direction: column;
`;

const TilteInput = styled.input`
  width: 100%;
  height: 35px;
  margin-bottom: 30px;
  border: ${(props) => props.theme.boxBorder};
  border-radius: 10px;
  border-width: 1px;
  border-style: solid;
  box-shadow: inset 1px 1px 2px rgba(0, 0, 0, 0.1);
  opacity: 0.8;
  padding: 10px;
  :focus {
    border-width: 3px;
    opacity: 1;
  }
  :hover {
    opacity: 1;
  }
`;

const TextInput = styled.input`
  width: 100%;
  min-height: 500px;
  border: ${(props) => props.theme.boxBorder};
  border-radius: 10px;
  border-width: 1px;
  border-style: solid;
  box-shadow: inset 1px 1px 2px rgba(0, 0, 0, 0.1);
  opacity: 0.8;
  padding: 10px;
  :focus {
    border-width: 3px;
    opacity: 1;
  }
  :hover {
    opacity: 1;
  }
`;

const Text = styled.div`
  color: ${(props) => props.theme.carrotColor};
  font-weight: 700;
  margin-bottom: 15px;
`;

const Button = styled.button`
  align-self: flex-end;
  margin: 20px 0 0 0;
  width: 80px;
  height: 35px;
  background: ${(props) => props.theme.carrotColor};
  color: white;
  border-radius: 7px;
  border: none;
  font-size: 15px;
  font-weight: 600;
  text-align: center;
  opacity: 1;
  transition: ease-in 0.1s;
  :hover {
    opacity: 0.8;
  }
`;

const CREATE_POST = gql`
  mutation createPost(
    $categoryTitle: String!
    $title: String!
    $text: String!
  ) {
    createPost(categoryTitle: $categoryTitle, title: $title, text: $text) {
      ok
    }
  }
`;

const CreatePost = (props) => {
  const {
    match: {
      params: { category }
    }
  } = props;
  const title = useInput("");
  const text = useInput("");
  const [createPost] = useMutation(CREATE_POST, {
    variables: { categoryTitle: category, title: title.value, text: text.value }
  });
  const onSubmit = async () => {
    try {
      await createPost();
      window.location.href = `http://localhost:3000/category/${category}/1`;
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <Link to={`/category/${category}/1`}>
        <Category>{category}</Category>
      </Link>
      <Container>
        <CreatePostForm onSubmit={onSubmit}>
          <Text>제목</Text>
          <TilteInput
            placeholder={"제목을 입력해 주세요"}
            value={title.value}
            onChange={title.onChange}
          ></TilteInput>
          <Text>내용</Text>
          <TextInput
            placeholder={"내용을 입력해 주세요"}
            value={text.value}
            onChange={text.onChange}
          ></TextInput>
          <Button>등록</Button>
        </CreatePostForm>
      </Container>
    </>
  );
};

export default withRouter(CreatePost);
