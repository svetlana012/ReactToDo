import { useState } from "react";
import useOutsideClick from "../../../hooks/useOutsideClick";

import modalStyles from "../Modal/Modal.module.scss";
import buttonStyles from "../../../styles/Buttons.module.scss";

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
          className={`${modalStyles.modal__input} ${
            error ? modalStyles["modal__input--error"] : ""
          }`}
          type="text"
          placeholder="Edit your note..."
          value={value}
          onChange={handleChange}
        />

        {error && <p className={modalStyles.modal__error}>{error}</p>}

        <div className={modalStyles.modal__actions}>
          <button
            className={`${buttonStyles.btn} ${buttonStyles.outline}`}
            type="button"
            onClick={onClose}
          >
            CANCEL
          </button>

          <button
            className={`${buttonStyles.btn} ${buttonStyles.primary}`}
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
