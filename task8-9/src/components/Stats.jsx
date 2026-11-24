import { memo } from 'react';

function Stats({ stats }) {
  const { total, left, done } = stats;
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);

  return (
    <section className="panel stats">
      <div className="stats__numbers">
        <span>Всего: <strong>{total}</strong></span>
        <span>Осталось: <strong>{left}</strong></span>
        <span>Выполнено: <strong>{done}</strong></span>
      </div>
      <div className="progress" aria-label={`Выполнено ${percent}%`}>
        <div className="progress__bar" style={{ width: `${percent}%` }} />
      </div>
    </section>
  );
}

export default memo(Stats);
