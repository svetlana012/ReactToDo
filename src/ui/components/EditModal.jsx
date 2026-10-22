import { useState } from "react";

const EditModal = ({ onEdit, onClose, id, title }) => {
  const [value, setValue] = useState(title);
  const [error, setError] = useState("");

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
    <div className="modal" id="edit-note">
      <div className="modal__dialog">
        <h2 className="modal__title">EDIT NOTE</h2>

        <input
          className={`modal__input ${error ? "modal__input--error" : ""}`}
          type="text"
          placeholder="Edit your note..."
          value={value}
          onChange={handleChange}
        />

        {error && <p className="modal__error">{error}</p>}

        <div className="modal__actions">
          <button className="btn btn--outline" type="button" onClick={onClose}>
            CANCEL
          </button>

          <button
            className="btn btn--primary"
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
