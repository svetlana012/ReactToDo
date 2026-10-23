const NoteItem = ({ onToggle, onEdit, onDelete, id, isDone, title }) => {
  const handleChange = (event) => {
    onToggle(id);
  };

  return (
    <li className="notes__item">
      <div className="note">
        <label className="note__label">
          <input
            className="note__checkbox"
            type="checkbox"
            onChange={handleChange}
            checked={isDone}
          />

          <span className="note__text">{title}</span>
        </label>
        <div className="note__actions">
          <button
            className="icon-btn"
            type="button"
            aria-label="Edit"
            onClick={() => onEdit(id)}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M17 3l4 4L8 20l-5 1 1-5L17 3z" />
            </svg>
          </button>

          <button
            className="icon-btn"
            type="button"
            aria-label="Delete"
            onClick={() => onDelete(id)}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M3 6h18M8 6V4h8v2M6 6l1 15h10l1-15M10 11v6M14 11v6" />
            </svg>
          </button>
        </div>
      </div>
    </li>
  );
};

export default NoteItem;
