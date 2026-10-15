const ButtonAdd = () => {
  return (
    <a className="add-btn todo__add" href="#new-note" aria-label="Add note">
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
    </a>
  )
}

export default ButtonAdd