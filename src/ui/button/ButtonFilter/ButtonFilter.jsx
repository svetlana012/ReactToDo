import styles from './ButtonFilter.module.scss';

const ButtonFilter = ({ onFilterChange }) => {
  const handleChange = (event) => {
    onFilterChange(event.target.value);
  };
  return (
    <select
      className={`${styles.filter}`}
      aria-label="Filter"
      onChange={handleChange}
    >
      <option className={styles.filter__option}>ALL</option>
      <option className={styles.filter__option}>COMPLETE</option>
      <option className={styles.filter__option}>INCOMPLETE</option>
    </select>
  );
};
export default ButtonFilter;
