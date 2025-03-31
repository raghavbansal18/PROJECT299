import React, { useState } from 'react';
import styled from 'styled-components';

const TableContainer = styled.div`
  margin-top: 10px;
  margin-bottom: 0;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  width: 100%;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 400px);
  min-height: 300px;
  
  @media (max-width: 992px) {
    height: calc(100vh - 350px);
    min-height: 250px;
  }
  
  @media (max-width: 576px) {
    height: calc(100vh - 320px);
    min-height: 200px;
  }
`;

const TableHeader = styled.div`
  background-color: #2d3748;
  color: white;
  padding: 10px 12px;
  font-size: 15px;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  
  @media (max-width: 992px) {
    padding: 8px 10px;
  }
  
  @media (max-width: 576px) {
    padding: 6px 8px;
    font-size: 14px;
    flex-direction: column;
    align-items: flex-start;
  }
`;

const ExportButton = styled.button`
  background-color: #38a169;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 6px 12px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  
  &:hover {
    background-color: #2f855a;
  }
  
  &:disabled {
    background-color: #a0aec0;
    cursor: not-allowed;
  }
  
  @media (max-width: 992px) {
    padding: 5px 10px;
    font-size: 12px;
  }
  
  @media (max-width: 576px) {
    padding: 4px 8px;
    font-size: 12px;
    align-self: flex-end;
    margin-top: -28px;
  }
`;

const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  flex: 1;
  position: relative;
  scrollbar-width: thin;
  display: flex;
  flex-direction: column;
  
  &::-webkit-scrollbar {
    height: 8px;
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #cbd5e0;
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: #a0aec0;
  }
`;

const TableContent = styled.div`
  flex: 1;
  overflow: auto;
`;

const StyledTable = styled.table`
  width: 100%;
  min-width: 800px;
  border-collapse: collapse;
  background-color: white;
  table-layout: auto;
  margin-bottom: 0;
`;

const TableHeaderCell = styled.th`
  padding: 10px 16px;
  text-align: left;
  border-bottom: 2px solid #e2e8f0;
  background-color: #f7fafc;
  font-weight: 600;
  position: sticky;
  top: 0;
  z-index: 10;
  white-space: nowrap;
  min-width: 100px;
  
  @media (max-width: 992px) {
    padding: 8px 12px;
    font-size: 14px;
  }
  
  @media (max-width: 576px) {
    padding: 6px 8px;
    font-size: 13px;
    min-width: 80px;
  }
`;

const TableCell = styled.td`
  padding: 10px 16px;
  border-bottom: 1px solid #e2e8f0;
  vertical-align: top;
  min-width: 100px;
  max-width: 250px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  
  @media (max-width: 992px) {
    padding: 8px 12px;
    font-size: 14px;
  }
  
  @media (max-width: 576px) {
    padding: 6px 8px;
    font-size: 13px;
    min-width: 80px;
    max-width: 160px;
  }
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f7fafc;
  }

  &:hover {
    background-color: #ebf4ff;
  }
`;

const EmptyState = styled.div`
  padding: 40px;
  text-align: center;
  color: #a0aec0;
  margin: auto;
  
  @media (max-width: 576px) {
    padding: 20px;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 4px 10px;
  background-color: #f7fafc;
  align-items: center;
  border-top: 1px solid #e2e8f0;
  flex-wrap: wrap;
  gap: 4px;
  position: sticky;
  bottom: 0;
  width: 100%;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  margin-bottom: 0;
  
  @media (max-width: 992px) {
    padding: 3px 10px;
  }
  
  @media (max-width: 768px) {
    padding: 2px 8px;
  }
  
  @media (max-width: 576px) {
    justify-content: center;
    padding: 2px 6px;
  }
`;

const PaginationControls = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;
`;

const PageButton = styled.button`
  background-color: ${props => props.active ? '#4299e1' : 'transparent'};
  color: ${props => props.active ? 'white' : '#4a5568'};
  border: 1px solid ${props => props.active ? '#4299e1' : '#e2e8f0'};
  padding: 6px 12px;
  margin: 0 4px;
  border-radius: 4px;
  cursor: pointer;
  min-width: 36px;
  min-height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: ${props => props.active ? '#3182ce' : '#edf2f7'};
  }
  
  @media (max-width: 992px) {
    padding: 5px 10px;
    min-width: 32px;
    min-height: 32px;
    margin: 0 3px;
  }
  
  @media (max-width: 576px) {
    padding: 3px 6px;
    min-width: 26px;
    min-height: 26px;
    font-size: 13px;
    margin: 0 2px;
  }
`;

const ResultInfo = styled.div`
  color: #4a5568;
  font-size: 13px;
  margin-left: 8px;
  
  @media (max-width: 768px) {
    font-size: 12px;
  }
  
  @media (max-width: 576px) {
    font-size: 11px;
    margin-left: 0;
    width: 100%;
  }
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  
  @media (max-width: 576px) {
    width: 100%;
  }
`;

const ResultsTitle = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;
  
  @media (max-width: 576px) {
    width: 100%;
    margin-bottom: 4px;
  }
`;

const ExecutionTime = styled.span`
  font-size: 13px;
  color: #a0aec0;
  font-weight: normal;
  white-space: nowrap;
  
  @media (max-width: 768px) {
    font-size: 12px;
  }
  
  @media (max-width: 576px) {
    font-size: 11px;
  }
`;

const ResultsTable = ({ results, isLoading, executionTime }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const formatExecutionTime = (ms) => {
    if (ms < 1000) {
      return `${Math.round(ms)}ms`;
    } else {
      return `${(ms / 1000).toFixed(2)}s`;
    }
  };

  const exportToCSV = () => {
    if (!results || results.length === 0) return;
    
    const headerColumns = Object.keys(results[0]);
    
    // Create CSV header row
    let csvContent = headerColumns.join(',') + '\n';
    
    // Add data rows
    results.forEach(row => {
      const rowData = headerColumns.map(column => {
        const value = row[column] !== 'NULL' ? row[column] : '';
        // Handle values that contain commas by wrapping in quotes
        if (value && typeof value === 'string' && (value.includes(',') || value.includes('"') || value.includes('\n'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      });
      csvContent += rowData.join(',') + '\n';
    });
    
    // Create a blob and download it
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    // Set download attributes
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    link.setAttribute('href', url);
    link.setAttribute('download', `query-results-${timestamp}.csv`);
    link.style.visibility = 'hidden';
    
    // Append to the document, trigger download, and clean up
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <TableContainer>
        <TableHeader>
          <span>Query Results</span>
        </TableHeader>
        <EmptyState>Loading results...</EmptyState>
      </TableContainer>
    );
  }

  if (!results || results.length === 0) {
    return (
      <TableContainer>
        <TableHeader>
          <span>Query Results</span>
        </TableHeader>
        <EmptyState>No results to display. Execute a query to see results.</EmptyState>
      </TableContainer>
    );
  }

  const headerColumns = Object.keys(results[0]);
  const totalPages = Math.ceil(results.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = results.slice(indexOfFirstRow, indexOfLastRow);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <TableContainer>
      <TableHeader>
        <HeaderContent>
          <ResultsTitle>
            <span>Query Results</span>
            {executionTime && (
              <ExecutionTime>
                ({formatExecutionTime(executionTime)})
              </ExecutionTime>
            )}
          </ResultsTitle>
          <ResultInfo>
            {results.length} rows found
          </ResultInfo>
        </HeaderContent>
        <ExportButton onClick={exportToCSV} title="Export results to CSV file">
          Export CSV
        </ExportButton>
      </TableHeader>
      <TableWrapper>
        <TableContent>
          <StyledTable>
            <thead>
              <tr>
                {headerColumns.map((column, index) => (
                  <TableHeaderCell key={index}>{column}</TableHeaderCell>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentRows.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {headerColumns.map((column, colIndex) => (
                    <TableCell key={colIndex}>
                      {row[column] !== 'NULL' ? row[column] : <i>NULL</i>}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </tbody>
          </StyledTable>
        </TableContent>
        {totalPages > 1 && (
          <Pagination>
            <ResultInfo>
              Showing {indexOfFirstRow + 1} to {Math.min(indexOfLastRow, results.length)} of {results.length} entries
            </ResultInfo>
            <PaginationControls>
              <PageButton 
                onClick={() => paginate(1)} 
                disabled={currentPage === 1}
                title="First page"
              >
                {'<<'}
              </PageButton>
              <PageButton 
                onClick={() => paginate(currentPage - 1)} 
                disabled={currentPage === 1}
                title="Previous page"
              >
                {'<'}
              </PageButton>
              {Array.from({ length: totalPages }).map((_, index) => {
                // Show only nearby pages
                if (
                  index === 0 ||
                  index === totalPages - 1 ||
                  (index >= currentPage - 2 && index <= currentPage + 0)
                ) {
                  return (
                    <PageButton
                      key={index}
                      onClick={() => paginate(index + 1)}
                      active={currentPage === index + 1}
                    >
                      {index + 1}
                    </PageButton>
                  );
                } else if (
                  index === currentPage - 3 ||
                  index === currentPage + 1
                ) {
                  return <span key={index}>...</span>;
                }
                return null;
              })}
              <PageButton 
                onClick={() => paginate(currentPage + 1)} 
                disabled={currentPage === totalPages}
                title="Next page"
              >
                {'>'}
              </PageButton>
              <PageButton 
                onClick={() => paginate(totalPages)} 
                disabled={currentPage === totalPages}
                title="Last page"
              >
                {'>>'}
              </PageButton>
            </PaginationControls>
          </Pagination>
        )}
      </TableWrapper>
    </TableContainer>
  );
};

export default ResultsTable; 