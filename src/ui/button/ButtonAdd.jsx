const ButtonAdd = (props) => {

  const onAddNote = () => {    
    props.onAddNote()
  };

  return (
    <button
      className="add-btn todo__add"
      aria-label="Add note"
      onClick={onAddNote}>
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <path d="M12 4v16M4 12h16" />
      </svg>
    </button>
  )
}

export default ButtonAdd