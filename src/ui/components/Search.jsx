const Search = (props) => {

  const handleChange = (event) => {
    props.onSearch(event.target.value)
  };

  return (
    <div className="search toolbar__search">
      <input className="search__input" type="text" placeholder="Search note..." onChange={handleChange}/>
      <svg
        className="search__icon"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
      </svg>
    </div>
  )
}

export default Search