import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin-bottom: 0;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  flex: 1;
  display: flex;
  flex-direction: column;
  max-height: 300px;
  
  @media (max-width: 992px) {
    max-height: 280px;
  }
  
  @media (max-width: 576px) {
    max-height: 240px;
  }
`;

const Header = styled.div`
  background-color: #2d3748;
  color: white;
  padding: 10px 12px;
  font-size: 15px;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: 992px) {
    padding: 8px 10px;
  }
  
  @media (max-width: 576px) {
    padding: 6px 8px;
    font-size: 14px;
  }
`;

const ClearButton = styled.button`
  background-color: #e53e3e;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 4px 10px;
  font-size: 12px;
  cursor: pointer;
  
  &:hover {
    background-color: #c53030;
  }
  
  @media (max-width: 992px) {
    padding: 3px 8px;
  }
  
  @media (max-width: 576px) {
    padding: 2px 6px;
    font-size: 11px;
  }
`;

const HistoryListContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  background-color: white;
  min-height: 0; /* Crucial for flex child to enable scrolling */
`;

const HistoryItem = styled.div`
  padding: 8px 10px;
  border-bottom: 1px solid #e2e8f0;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #ebf4ff;
  }
  
  @media (max-width: 992px) {
    padding: 7px 8px;
  }
  
  @media (max-width: 576px) {
    padding: 6px 6px;
  }
`;

const HistoryQuery = styled.div`
  font-family: monospace;
  color: #4a5568;
  font-size: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.2;
  
  @media (max-width: 576px) {
    font-size: 11px;
  }
`;

const HistoryInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2px;
`;

const HistoryTime = styled.div`
  color: #a0aec0;
  font-size: 10px;
  
  @media (max-width: 576px) {
    font-size: 9px;
  }
`;

const ExecutionTime = styled.div`
  color: #a0aec0;
  font-size: 10px;
  
  @media (max-width: 576px) {
    font-size: 9px;
  }
`;

const EmptyHistory = styled.div`
  padding: 15px;
  text-align: center;
  color: #a0aec0;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  
  @media (max-width: 576px) {
    padding: 10px;
    font-size: 12px;
  }
`;

const formatExecutionTime = (ms) => {
  if (!ms) return '';
  
  if (ms < 1000) {
    return `${Math.round(ms)}ms`;
  } else {
    return `${(ms / 1000).toFixed(2)}s`;
  }
};

const QueryHistory = ({ history, onSelectHistoryQuery, onClearHistory }) => {
  return (
    <Container>
      <Header>
        <span>Query History</span>
        {history.length > 0 && (
          <ClearButton onClick={onClearHistory}>Clear</ClearButton>
        )}
      </Header>
      <HistoryListContainer>
        {history.length === 0 ? (
          <EmptyHistory>No queries executed yet</EmptyHistory>
        ) : (
          history.map((item, index) => (
            <HistoryItem 
              key={index} 
              onClick={() => onSelectHistoryQuery(item.query)}
            >
              <HistoryQuery>{item.query}</HistoryQuery>
              <HistoryInfo>
                <HistoryTime>{item.timestamp}</HistoryTime>
                {item.executionTime && (
                  <ExecutionTime>
                    {formatExecutionTime(item.executionTime)}
                  </ExecutionTime>
                )}
              </HistoryInfo>
            </HistoryItem>
          ))
        )}
      </HistoryListContainer>
    </Container>
  );
};

export default QueryHistory; 