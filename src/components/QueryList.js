import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin-bottom: 0;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  max-height: 400px;
  
  @media (max-width: 992px) {
    max-height: 350px;
  }
  
  @media (max-width: 576px) {
    max-height: 300px;
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

const QueryListContainer = styled.div`
  overflow-y: auto;
  background-color: white;
  flex: 1;
  min-height: 0; /* Critical for scrolling in a flex container */
`;

const QueryItem = styled.div`
  padding: 8px 10px;
  border-bottom: 1px solid #e2e8f0;
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  flex-direction: column;
  
  &:hover {
    background-color: #ebf4ff;
  }
  
  &.selected {
    background-color: #ebf4ff;
    border-left: 4px solid #4299e1;
    padding-left: 6px;
  }
  
  @media (max-width: 992px) {
    padding: 7px 8px;
    
    &.selected {
      padding-left: 4px;
    }
  }
  
  @media (max-width: 576px) {
    padding: 6px 6px;
    
    &.selected {
      padding-left: 2px;
    }
  }
`;

const QueryName = styled.div`
  font-weight: 600;
  margin-bottom: 2px;
  font-size: 14px;
  
  @media (max-width: 576px) {
    font-size: 13px;
  }
`;

const QueryDescription = styled.div`
  color: #718096;
  font-size: 12px;
  margin-bottom: 2px;
  
  @media (max-width: 576px) {
    font-size: 11px;
  }
`;

const QuerySyntax = styled.div`
  font-family: monospace;
  background-color: #f7fafc;
  padding: 4px;
  margin-top: 4px;
  border-radius: 4px;
  color: #4a5568;
  font-size: 11px;
  overflow-x: auto;
  line-height: 1.2;
  
  @media (max-width: 576px) {
    font-size: 10px;
    padding: 3px;
    margin-top: 3px;
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 3px 8px;
  background-color: #f7fafc;
  border-top: 1px solid #e2e8f0;
  align-items: center;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
`;

const PageIndicator = styled.div`
  color: #4a5568;
  font-size: 12px;
  
  @media (max-width: 576px) {
    font-size: 11px;
  }
`;

const PaginationButton = styled.button`
  background-color: transparent;
  color: #4a5568;
  border: 1px solid #e2e8f0;
  padding: 3px 6px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 11px;
  min-width: 26px;
  min-height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  &:hover:not(:disabled) {
    background-color: #edf2f7;
  }
  
  @media (max-width: 576px) {
    padding: 2px 4px;
    min-width: 22px;
    min-height: 22px;
  }
`;

const QueryList = ({ queries, onSelectQuery, selectedQueryId }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const queriesPerPage = 2;
  
  const indexOfLastQuery = currentPage * queriesPerPage;
  const indexOfFirstQuery = indexOfLastQuery - queriesPerPage;
  const currentQueries = queries.slice(indexOfFirstQuery, indexOfLastQuery);
  const totalPages = Math.ceil(queries.length / queriesPerPage);
  
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Container>
      <Header>Predefined Queries</Header>
      <QueryListContainer>
        {currentQueries.map((query) => (
          <QueryItem 
            key={query.id} 
            onClick={() => onSelectQuery(query)}
            className={selectedQueryId === query.id ? 'selected' : ''}
          >
            <QueryName>{query.name}</QueryName>
            <QueryDescription>{query.description}</QueryDescription>
            <QuerySyntax>{query.query}</QuerySyntax>
          </QueryItem>
        ))}
      </QueryListContainer>
      {queries.length > queriesPerPage && (
        <PaginationContainer>
          <PaginationButton 
            onClick={handlePrevPage} 
            disabled={currentPage === 1}
            title="Previous queries"
          >
            {'<'}
          </PaginationButton>
          <PageIndicator>
            {indexOfFirstQuery + 1}-{Math.min(indexOfLastQuery, queries.length)} of {queries.length}
          </PageIndicator>
          <PaginationButton 
            onClick={handleNextPage} 
            disabled={currentPage === totalPages}
            title="Next queries"
          >
            {'>'}
          </PaginationButton>
        </PaginationContainer>
      )}
    </Container>
  );
};

export default QueryList; 