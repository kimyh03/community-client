import React from "react";
import styled, { keyframes } from "styled-components";
import CarrotText from "./CarrotText";

const Animation = keyframes`
    0%{
        opacity:0
    }
    50%{
        opacity:1
    }
    100%{
        opacity:0;
    }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${Animation} 1s linear infinite;
  opacity: 0.7;
`;

export default () => (
  <Container>
    <CarrotText text={"Loading..."} />
  </Container>
);
