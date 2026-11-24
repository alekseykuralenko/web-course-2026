function Filters({ filters, activeId, onChange }) {
  return (
    <nav className="filters" aria-label="Фильтры">
      {filters.map((filter) => (
        <button
          key={filter.id}
          type="button"
          className={filter.id === activeId ? 'chip chip--active' : 'chip'}
          onClick={() => onChange(filter.id)}
        >
          {filter.label}
        </button>
      ))}
    </nav>
  );
}

export default Filters;
