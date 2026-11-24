export const FILTERS = [
  { id: 'all', label: 'Все', predicate: () => true },
  { id: 'active', label: 'Активные', predicate: (todo) => !todo.completed },
  { id: 'completed', label: 'Завершённые', predicate: (todo) => todo.completed },
];

export const SAMPLE_TODOS = [
  { id: 't1', text: 'Сделать лабу по React', completed: false, createdAt: 3 },
  { id: 't2', text: 'Сходить в зал', completed: false, createdAt: 2 },
  { id: 't3', text: 'Прочитать условия лабы', completed: true, createdAt: 1 },
];

export function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
