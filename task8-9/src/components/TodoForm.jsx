import { memo, useState } from 'react';

const MAX_TEXT_LENGTH = 100;

function TodoForm({ onAdd }) {
  const [text, setText] = useState('');
  const [kind, setKind] = useState('active');
  const [error, setError] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    const cleanText = text.trim();
    if (!cleanText) {
      setError('Введи текст задачи');
      return;
    }
    if (cleanText.length > MAX_TEXT_LENGTH) {
      setError(`Не длиннее ${MAX_TEXT_LENGTH} символов`);
      return;
    }
    onAdd(cleanText, kind === 'done');
    setText('');
    setError('');
  }

  return (
    <form className="panel form" onSubmit={handleSubmit}>
      <input
        className="form__text"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Новая задача"
        aria-label="Текст задачи"
      />
      <select value={kind} onChange={(event) => setKind(event.target.value)} aria-label="Тип задачи">
        <option value="active">Невыполненная</option>
        <option value="done">Выполненная</option>
      </select>
      <button className="btn btn--primary" type="submit">
        Добавить
      </button>
      {error && <p className="form__error">{error}</p>}
    </form>
  );
}

export default memo(TodoForm);
