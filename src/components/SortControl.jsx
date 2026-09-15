function SortControl({ sortConfig, onSortChange }) {
  const sortOptions = [
    { label: 'ID', value: 'id' },
    { label: 'Name', value: 'name' },
    { label: 'Category', value: 'category' },
    { label: 'Price', value: 'price' },
  ];

  return (
    <div className="d-flex align-items-center gap-2">
      <label className="form-label mb-0">Sort by</label>
      <select
        className="form-select form-select-sm"
        value={sortConfig.field}
        onChange={(event) => onSortChange(event.target.value)}
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <button
        type="button"
        className="btn btn-outline-secondary btn-sm"
        onClick={() => onSortChange(sortConfig.field, sortConfig.direction === 'asc' ? 'desc' : 'asc')}
      >
        {sortConfig.direction === 'asc' ? 'Asc' : 'Desc'}
      </button>
    </div>
  );
}

export default SortControl;
