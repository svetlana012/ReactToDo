import { memo, useState } from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";

import styles from "./NoteItem.module.scss";

const NoteItem = ({ onToggle, onEdit, onDelete, id, isDone, title }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleChange = () => {
    onToggle(id);
  };

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      onDelete(id);
    }, 300);
  };

  return (
    <li
      className={clsx(
        styles.notes__item,
        isDeleting && styles["notes__item--deleting"],
      )}
    >
      <div className={styles.note}>
        <label className={styles.note__label}>
          <input
            className={styles.note__checkbox}
            type="checkbox"
            onChange={handleChange}
            checked={isDone}
          />          
        </label>
        <Link className={styles.note__text} to={`/tasks/${id}`}>
          {title}
        </Link>
        <div className={styles.note__actions}>
          <button
            className={styles.icon__btn}
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
            className={styles.icon__btn}
            type="button"
            aria-label="Delete"
            onClick={handleDelete}
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

export default memo(NoteItem);
