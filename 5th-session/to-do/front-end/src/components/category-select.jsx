const categories = ["All", "Shopping", "Work", "Fitness", "Personal"];

export function CategorySelect({ value, onChange }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)} className="todo-select">
      {categories.map((cat) => (
        <option key={cat} value={cat}>
          {cat}
        </option>
      ))}
    </select>
  );
}
