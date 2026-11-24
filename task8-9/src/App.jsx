import { useState, useEffect, useMemo, useCallback } from 'react';
import TodoForm from './components/TodoForm.jsx';
import Filters from './components/Filters.jsx';
import Sorting from './components/Sorting.jsx';
import Stats from './components/Stats.jsx';
import TodoList from './components/TodoList.jsx';
import { FILTERS, SORTS, SAMPLE_TODOS, STORAGE_KEY, createId } from './constants.js';

/** @typedef {{ id: string, text: string, completed: boolean, createdAt: number }} Todo */

function loadTodos() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(saved) ? saved : SAMPLE_TODOS;
  } catch {
    return SAMPLE_TODOS;
  }
}

function App() {
  const [todos, setTodos] = useState(loadTodos);
  const [filterId, setFilterId] = useState('all');
  const [sortId, setSortId] = useState('new');

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch {
      // хранилище недоступно — работаем без сохранения
    }
  }, [todos]);

  const addTodo = useCallback((text, completed) => {
    const newTodo = { id: createId(), text, completed, createdAt: Date.now() };
    setTodos((prev) => [...prev, newTodo]);
  }, []);

  const toggleTodo = useCallback((id) => {
    setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  }, []);

  const editTodo = useCallback((id, text) => {
    setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, text } : todo)));
  }, []);

  const deleteTodo = useCallback((id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }, []);

  const visibleTodos = useMemo(() => {
    const activeFilter = FILTERS.find((filter) => filter.id === filterId);
    const activeSort = SORTS.find((sort) => sort.id === sortId);
    return [...todos].sort(activeSort.compare).filter(activeFilter.predicate);
  }, [todos, filterId, sortId]);

  const stats = useMemo(
    () => ({
      total: todos.length,
      done: todos.filter((todo) => todo.completed).length,
      left: todos.filter((todo) => !todo.completed).length,
    }),
    [todos]
  );

  return (
    <div className="app">
      <header className="app__header">
        <h1>Список задач</h1>
        <p>Добавляй, отмечай, фильтруй и сортируй</p>
      </header>
      <TodoForm onAdd={addTodo} />
      <Stats stats={stats} />
      <div className="toolbar">
        <Filters filters={FILTERS} activeId={filterId} onChange={setFilterId} />
        <Sorting sorts={SORTS} activeId={sortId} onChange={setSortId} />
      </div>
      <TodoList todos={visibleTodos} onToggle={toggleTodo} onEdit={editTodo} onDelete={deleteTodo} />
    </div>
  );
}

export default App;
