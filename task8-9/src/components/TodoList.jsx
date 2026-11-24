import { memo } from 'react';

import TodoItem from './TodoItem.jsx';

function TodoList({ todos, onToggle, onEdit, onDelete }) {
  if (todos.length === 0) {
    return <p className="empty">Здесь пока ничего нет</p>;
  }

  return (
    <ul className="list">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onToggle={onToggle} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </ul>
  );
}

export default memo(TodoList);
