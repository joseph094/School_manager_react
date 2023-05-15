import React from "react";
import styled from "styled-components";

const UnauthorizedPage = () => {
  return (
    <PageContainer>
      <Title>Unauthorized Access</Title>
      <Message>You are not authorized to access this page.</Message>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const Message = styled.p`
  font-size: 1.5rem;
  text-align: center;
`;

export default UnauthorizedPage;
