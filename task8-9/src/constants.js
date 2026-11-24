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

export const SORTS = [
  { id: 'new', label: 'Сначала новые', compare: (a, b) => b.createdAt - a.createdAt },
  { id: 'old', label: 'Сначала старые', compare: (a, b) => a.createdAt - b.createdAt },
  { id: 'az', label: 'По алфавиту А → Я', compare: (a, b) => a.text.localeCompare(b.text, 'ru') },
  { id: 'za', label: 'По алфавиту Я → А', compare: (a, b) => b.text.localeCompare(a.text, 'ru') },
];

export const STORAGE_KEY = 'todo-react:todos';
