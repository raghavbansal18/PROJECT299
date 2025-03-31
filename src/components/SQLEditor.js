import React, { useState, useEffect } from 'react';
import AceEditor from 'react-ace';
import styled from 'styled-components';

// Import ace editor themes
import 'ace-builds/src-noconflict/mode-sql';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/ext-language_tools';

const EditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  width: 100%;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
`;

const EditorHeader = styled.div`
  background-color: #2d3748;
  color: white;
  padding: 10px 12px;
  font-size: 16px;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  
  @media (max-width: 576px) {
    padding: 8px 10px;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionButton = styled.button`
  background-color: #4299e1;
  border: none;
  color: white;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.2s;

  &:hover {
    background-color: #3182ce;
  }

  &:disabled {
    background-color: #a0aec0;
    cursor: not-allowed;
  }
  
  @media (max-width: 576px) {
    padding: 4px 10px;
    font-size: 14px;
  }
`;

const ClearButton = styled(ActionButton)`
  background-color: #718096;
  
  &:hover {
    background-color: #4a5568;
  }
`;

const EditorWrapper = styled.div`
  width: 100%;
  
  .ace_editor {
    font-family: 'Fira Code', 'Courier New', monospace;
    line-height: 1.5;
  }
  
  @media (max-width: 576px) {
    .ace_editor {
      font-size: 13px !important;
    }
  }
`;

const SQLEditor = ({ initialQuery, onExecuteQuery, isExecuting }) => {
  const [query, setQuery] = useState(initialQuery || 'SELECT * FROM Customers');
  const [editorHeight, setEditorHeight] = useState('180px');

  useEffect(() => {
    const updateEditorHeight = () => {
      if (window.innerWidth <= 576) {
        setEditorHeight('120px');
      } else if (window.innerWidth <= 992) {
        setEditorHeight('150px');
      } else {
        setEditorHeight('180px');
      }
    };
    
    updateEditorHeight();
    window.addEventListener('resize', updateEditorHeight);
    
    return () => {
      window.removeEventListener('resize', updateEditorHeight);
    };
  }, []);

  useEffect(() => {
    if (initialQuery && initialQuery !== query) {
      setQuery(initialQuery);
    }
  }, [initialQuery, query]);

  const handleChange = (newValue) => {
    setQuery(newValue);
  };

  const handleExecute = () => {
    onExecuteQuery(query);
  };
  
  const handleClear = () => {
    setQuery('');
  };

  return (
    <EditorContainer>
      <EditorHeader>
        <span>SQL Query Editor</span>
        <ButtonsContainer>
          <ClearButton 
            onClick={handleClear}
            disabled={isExecuting || !query.trim()}
          >
            Clear
          </ClearButton>
          <ActionButton 
            onClick={handleExecute} 
            disabled={isExecuting || !query.trim()}
          >
            {isExecuting ? 'Executing...' : 'Execute Query'}
          </ActionButton>
        </ButtonsContainer>
      </EditorHeader>
      <EditorWrapper>
        <AceEditor
          mode="sql"
          theme="github"
          name="sql-editor"
          fontSize={14}
          width="100%"
          height={editorHeight}
          value={query}
          onChange={handleChange}
          showPrintMargin={false}
          showGutter={true}
          highlightActiveLine={true}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: false,
            showLineNumbers: true,
            tabSize: 2,
          }}
        />
      </EditorWrapper>
    </EditorContainer>
  );
};

export default SQLEditor; 