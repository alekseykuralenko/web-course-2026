import { memo } from 'react';

function Sorting({ sorts, activeId, onChange }) {
  return (
    <label className="sorting">
      <span>Сортировка</span>
      <select value={activeId} onChange={(event) => onChange(event.target.value)}>
        {sorts.map((sort) => (
          <option key={sort.id} value={sort.id}>
            {sort.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export default memo(Sorting);
