import { useState } from 'react';
import TodoForm from './components/TodoForm.jsx';
import Filters from './components/Filters.jsx';
import Stats from './components/Stats.jsx';
import TodoList from './components/TodoList.jsx';
import { FILTERS, SAMPLE_TODOS, createId } from './constants.js';

/** @typedef {{ id: string, text: string, completed: boolean, createdAt: number }} Todo */

function App() {
  const [todos, setTodos] = useState(SAMPLE_TODOS);
  const [filterId, setFilterId] = useState('all');

  function addTodo(text, completed) {
    const newTodo = { id: createId(), text, completed, createdAt: Date.now() };
    setTodos([...todos, newTodo]);
  }

  function toggleTodo(id) {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  }

  function editTodo(id, text) {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, text } : todo)));
  }

  function deleteTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  const activeFilter = FILTERS.find((filter) => filter.id === filterId);
  const visibleTodos = todos.filter(activeFilter.predicate);
  const stats = {
    total: todos.length,
    done: todos.filter((todo) => todo.completed).length,
    left: todos.filter((todo) => !todo.completed).length,
  };

  return (
    <div className="app">
      <header className="app__header">
        <h1>Список задач</h1>
        <p>Добавляй, отмечай и фильтруй</p>
      </header>
      <TodoForm onAdd={addTodo} />
      <Stats stats={stats} />
      <Filters filters={FILTERS} activeId={filterId} onChange={setFilterId} />
      <TodoList todos={visibleTodos} onToggle={toggleTodo} onEdit={editTodo} onDelete={deleteTodo} />
    </div>
  );
}

export default App;
