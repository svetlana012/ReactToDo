const ButtonTheme = () => {

  const handleClick = () => {
    console.log('Кнопка нажата!');
  };

  return (
    <button
      className="theme-btn toolbar__theme"
      type="button"
      aria-label="Toggle theme"
      onClick={handleClick}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
    </button>
  )
}

export default ButtonTheme