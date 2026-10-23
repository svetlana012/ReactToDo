const ButtonFilter = ({ onFilterChange }) => {
  const handleChange = (event) => {
    onFilterChange(event.target.value);
  };
  return (
    <select
      className="filter toolbar__filter"
      aria-label="Filter"
      onChange={handleChange}
    >
      <option className="filter__option">ALL</option>
      <option className="filter__option">COMPLETE</option>
      <option className="filter__option">INCOMPLETE</option>
    </select>
  );
};
export default ButtonFilter;
