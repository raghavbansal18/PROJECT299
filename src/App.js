import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from './components/Header';
import SQLEditor from './components/SQLEditor';
import ResultsTable from './components/ResultsTable';
import QueryList from './components/QueryList';
import QueryHistory from './components/QueryHistory';
import { parseCSVData, predefinedQueries, executeQuery } from './services/dataService';

const AppContainer = styled.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  color: #2d3748;
  min-height: 100vh;
  background-color: #f7fafc;
  overflow-x: hidden;
`;

const MainContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px 20px;
  
  @media (max-width: 768px) {
    padding: 20px 15px;
  }
`;

const ContentGrid = styled.div`
  display: flex;
  flex-direction: row;
  gap: 30px;
  margin-bottom: 30px;
  
  @media (max-width: 1200px) {
    gap: 20px;
  }
  
  @media (max-width: 992px) {
    flex-direction: column;
  }
`;

const LeftSidebar = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;
  min-width: 250px;
  max-width: 350px;
  gap: 20px;
  
  @media (max-width: 1200px) {
    width: 30%;
  }
  
  @media (max-width: 992px) {
    width: 100%;
    max-width: 100%;
  }
`;

const MainArea = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0; /* Prevents flex items from overflowing */
  gap: 20px;
  overflow: hidden;
`;

function App() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [results, setResults] = useState([]);
  const [executing, setExecuting] = useState(false);
  const [selectedQuery, setSelectedQuery] = useState(predefinedQueries[0]);
  const [queryHistory, setQueryHistory] = useState([]);
  const [executionTime, setExecutionTime] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const parsedData = await parseCSVData();
        setData(parsedData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleExecuteQuery = async (query) => {
    setExecuting(true);
    setExecutionTime(null);
    
    const startTime = performance.now();
    
    try {
      const queryResults = await executeQuery(query, data);
      const endTime = performance.now();
      const timeInMs = endTime - startTime;
      
      setResults(queryResults);
      setExecutionTime(timeInMs);
      
      // Add to history
      const newHistoryItem = {
        query,
        timestamp: new Date().toLocaleString(),
        executionTime: timeInMs
      };
      
      setQueryHistory([newHistoryItem, ...queryHistory.slice(0, 9)]);
    } catch (error) {
      console.error('Error executing query:', error);
      setExecutionTime(null);
    } finally {
      setExecuting(false);
    }
  };

  const handleSelectPredefinedQuery = (query) => {
    setSelectedQuery(query);
  };

  const handleSelectHistoryQuery = (query) => {
    const matchingPredefined = predefinedQueries.find(q => q.query === query);
    if (matchingPredefined) {
      setSelectedQuery(matchingPredefined);
    } else {
      setSelectedQuery({ ...selectedQuery, query });
    }
  };

  const handleClearHistory = () => {
    setQueryHistory([]);
  };

  return (
    <AppContainer>
      <Header />
      <MainContent>
        <ContentGrid>
          <LeftSidebar>
            <QueryList 
              queries={predefinedQueries} 
              onSelectQuery={handleSelectPredefinedQuery}
              selectedQueryId={selectedQuery?.id}
            />
            <QueryHistory 
              history={queryHistory}
              onSelectHistoryQuery={handleSelectHistoryQuery}
              onClearHistory={handleClearHistory}
            />
          </LeftSidebar>
          <MainArea>
            <SQLEditor 
              initialQuery={selectedQuery?.query}
              onExecuteQuery={handleExecuteQuery}
              isExecuting={executing}
            />
            <ResultsTable 
              results={results} 
              isLoading={loading || executing}
              executionTime={executionTime}
            />
          </MainArea>
        </ContentGrid>
      </MainContent>
    </AppContainer>
  );
}

export default App;
