import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TodoList from './pages/Todo/TodoList';
import CreateTodo from './pages/Todo/CreateTodo';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TodoList />} />
        <Route path="/create" element={<CreateTodo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
