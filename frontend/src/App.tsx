import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TodoList from './pages/Todo/TodoList';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ErrorAlert } from './components/common/ErrorAlert';



function App() {
  return (
    <ErrorBoundary>
      <ErrorAlert />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TodoList />} />
      </Routes>
    </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
