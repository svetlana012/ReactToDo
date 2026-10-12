const ButtonFilter = () => {
    return (
        <select className="filter toolbar__filter" aria-label="Filter">
                <option className="filter__option">ALL</option>
                <option className="filter__option">COMPLETE</option>
                <option className="filter__option">INCOMPLETE</option>
              </select>
    )
}
export default ButtonFilter