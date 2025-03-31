import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background: linear-gradient(to right, #2d3748, #4a5568);
  color: white;
  padding: 20px 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const Title = styled.h1`
  margin: 0;
  font-size: 28px;
  font-weight: 700;
  display: flex;
  align-items: center;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Content>
        <div>
          <Title>
            SQL Playground
          </Title>
        </div>
      </Content>
    </HeaderContainer>
  );
};

export default Header; 