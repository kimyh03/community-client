import { useMutation, useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import React from "react";
import { Link, withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "src/Componentes/Loader";
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

const EditPostForm = styled.form`
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

const EDIT_POST = gql`
  mutation editPost($id: String!, $title: String!, $text: String!) {
    editPost(id: $id, title: $title, text: $text) {
      ok
    }
  }
`;

const GET_POST = gql`
  query getPostForEdit($id: String!) {
    getPostForEdit(id: $id) {
      post {
        title
        text
      }
    }
  }
`;

const EditPost = (props) => {
  const {
    match: {
      params: { post, category }
    }
  } = props;
  const { loading, data } = useQuery(GET_POST, { variables: { id: post } });
  const title = useInput("");
  const text = useInput("");
  const [editPost] = useMutation(EDIT_POST, {
    variables: { id: post, title: title.value, text: text.value }
  });
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await editPost();
      toast.success("글이 수정되었습니다.");
      window.location.href = `http://localhost:3000/post/${post}`;
    } catch (error) {
      toast.error("잘못된 접근입니다.");
      window.location.href = `http://localhost:3000`;
    }
  };
  if (loading) return <Loader />;
  if (!loading && data?.getPostForEdit && data?.getPostForEdit.post) {
    return (
      <>
        <Link to={`/category/${category}/1`}>
          <Category>{category}</Category>
        </Link>
        <Container>
          <EditPostForm onSubmit={onSubmit}>
            <Text>제목</Text>
            <TilteInput
              placeholder={data?.getPostForEdit.post.title}
              value={title.value}
              onChange={title.onChange}
            ></TilteInput>
            <Text>내용</Text>
            <TextInput
              placeholder={data?.getPostForEdit.post.text}
              value={text.value}
              onChange={text.onChange}
            ></TextInput>
            <Button>등록</Button>
          </EditPostForm>
        </Container>
      </>
    );
  } else return null;
};

export default withRouter(EditPost);
