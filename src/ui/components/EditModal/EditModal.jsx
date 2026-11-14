import { useState } from "react";
import clsx from "clsx";
import useOutsideClick from "@/hooks/useOutsideClick";

import modalStyles from "../Modal/Modal.module.scss";

const EditModal = ({ onEdit, onClose, id, title }) => {
  const [value, setValue] = useState(title);
  const [error, setError] = useState("");

  const modalRef = useOutsideClick(onClose);

  const handleChange = (event) => {
    setValue(event.target.value);
    if (event.target.value.trim()) {
      setError("");
    }
  };

  const handleApply = () => {
    const newTitle = value.trim();

    if (!newTitle) {
      setError("Note title cannot be empty");
      return;
    }

    onEdit(id, newTitle);
    onClose();
  };

  return (
    <div className={modalStyles.modal} id="edit-note">
      <div className={modalStyles.modal__dialog} ref={modalRef}>
        <h2 className={modalStyles.modal__title}>EDIT NOTE</h2>

        <input
          className={clsx(modalStyles.modal__input, {
            [modalStyles["modal__input--error"]]: error
          })}
          type="text"
          placeholder="Edit your note..."
          value={value}
          onChange={handleChange}
        />

        {error && <p className={modalStyles.modal__error}>{error}</p>}

        <div className={modalStyles.modal__actions}>
          <button
            className={clsx(modalStyles.btn, modalStyles.outline)}
            type="button"
            onClick={onClose}
          >
            CANCEL
          </button>

          <button
            className={clsx(modalStyles.btn, modalStyles.primary)}
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

export default EditModal;
