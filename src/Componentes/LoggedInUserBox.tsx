import { useMutation, useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import React from "react";
import styled from "styled-components";
import CarrotText from "./CarrotText";
import Loader from "./Loader";

interface User {
  id: string;
  nickname: string;
}

interface GetMeData {
  ok: boolean;
  user: User;
}

interface GetMeResponse {
  getMe: GetMeData;
}

const GET_ME = gql`
  {
    getMe {
      ok
      user {
        id
        nickname
      }
    }
  }
`;

const LOCAL_LOG_USER_OUT = gql`
  mutation logUserOut {
    logUserOut @client
  }
`;

const Container = styled.div`
  width: 100%;
  height: 130px;
  margin: 10px 0;
  padding-top: 10px;
  background: white;
  border: ${(props) => props.theme.boxBorder};
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  margin: 10px 0;
`;
const Greeting = styled.span`
  margin: 15px 0;
`;

const Nickname = styled.span`
  margin: 15px 0;
  font-weight: 700;
  color: ${(props) => props.theme.carrotColor};
`;

const Button = styled.button`
  width: 80%;
  height: 30px;
  margin: 5px 0;
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
    opacity: 0.7;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 40%;
`;

const SLink = styled.a`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const AuthMenu = styled.div`
  color: ${(props) => props.theme.darkGreyColor};
  font-size: 11px;
  margin: 10px 15px 0 0;
  align-self: flex-end;
  justify-self: flex-end;
  cursor: pointer;
`;

const LoggedInUserBox: React.FunctionComponent = () => {
  const { loading, data } = useQuery<GetMeResponse>(GET_ME);
  const [localLogOut] = useMutation(LOCAL_LOG_USER_OUT);

  const onClick = async () => {
    try {
      await localLogOut();
    } catch (error) {
      console.log(error.message);
    }
  };
  if (loading) {
    return (
      <>
        <Title>
          <CarrotText text="내정보" />
        </Title>
        <Container>
          <Loader />;
        </Container>
      </>
    );
  } else if (!loading && data?.getMe.user) {
    return (
      <>
        <Title>
          <CarrotText text="내정보" />
        </Title>
        <Container>
          {loading ? (
            <Loader />
          ) : (
            <>
              <Wrapper>
                <Nickname>{`${data?.getMe.user.nickname}`}</Nickname>
                <Greeting> 님 안녕하세요!</Greeting>
              </Wrapper>
              <SLink href={`/user/${data?.getMe.user.nickname}`}>
                <Button>내피드</Button>
              </SLink>
              <AuthMenu onClick={onClick}>로그아웃</AuthMenu>
            </>
          )}
        </Container>
      </>
    );
  } else
    return (
      <>
        <Title>
          <CarrotText text="내정보" />
        </Title>
      </>
    );
};

export default LoggedInUserBox;
