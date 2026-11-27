import { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import useOutsideClick from "@/hooks/useOutsideClick";

import styles from "./Modal.module.scss";

const Modal = ({ onAdd, onClose }) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef(null);
  const modalRef = useOutsideClick(onClose);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleChange = (event) => {
    setError("");
    setValue(event.target.value);

    if (event.target.value.trim()) {
      setError("");
    }
  };

  const handleApply = async () => {
    const newTitle = value.trim();

    if (!newTitle) {
      setError("Note title cannot be empty");
      return;
    }

    const success = await onAdd(newTitle);

    if (!success) {
      setError("Не удалось добавить задачу. Попробуйте ещё раз.");
      return;
    }

    setValue("");
    setError("");
    onClose();
  };

  return (
    <div className={styles.modal} id="new-note">
      <div className={styles.modal__dialog} ref={modalRef}>
        <h2 className={styles.modal__title}>NEW NOTE</h2>

        <input
          className={clsx(styles.modal__input, {
            [styles["modal__input--error"]]: error,
          })}
          type="text"
          placeholder="Input your note..."
          onChange={handleChange}
          value={value}
          ref={inputRef}
        />
        {error && <div className={styles.modal__error}>{error}</div>}
        <div className={styles.modal__actions}>
          <button
            className={clsx(styles.btn, styles.outline)}
            type="button"
            onClick={onClose}
          >
            CANCEL
          </button>

          <button
            className={clsx(styles.btn, styles.primary)}
            type="button"
            onClick={handleApply}
          >
            APPLY
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
