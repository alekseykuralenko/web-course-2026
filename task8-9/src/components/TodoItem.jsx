import { memo, useState } from 'react';

function TodoItem({ todo, onToggle, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(todo.text);

  function startEdit() {
    setDraft(todo.text);
    setIsEditing(true);
  }

  function saveEdit() {
    const cleanText = draft.trim();
    if (!cleanText) return;
    onEdit(todo.id, cleanText);
    setIsEditing(false);
  }

  function handleEditKeyDown(event) {
    if (event.key === 'Enter') saveEdit();
    if (event.key === 'Escape') setIsEditing(false);
  }

  return (
    <li className={todo.completed ? 'todo todo--done' : 'todo'}>
      <label className="todo__check">
        <input type="checkbox" checked={todo.completed} onChange={() => onToggle(todo.id)} aria-label="Выполнено" />
        <span className="todo__box" />
      </label>

      {isEditing ? (
        <input
          className="todo__edit"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={handleEditKeyDown}
          aria-label="Новый текст задачи"
          autoFocus
        />
      ) : (
        <span className="todo__text">{todo.text}</span>
      )}

      <div className="todo__actions">
        {isEditing ? (
          <button type="button" className="link" onClick={saveEdit}>Сохранить</button>
        ) : (
          <button type="button" className="link" onClick={startEdit}>Изменить</button>
        )}
        <button type="button" className="link link--danger" onClick={() => onDelete(todo.id)}>Удалить</button>
      </div>
    </li>
  );
}

export default memo(TodoItem);
