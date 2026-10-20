import { useState } from "react";

const EditModal = (props) => {
  const [value, setValue] = useState(props.title);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleApply = () => {
    const newTitle = value.trim();

    if (!newTitle) {
      return;
    }

    props.onEdit(props.id, newTitle);
    props.onClose();
  };

  return (
    <div className="modal" id="edit-note">
      <div className="modal__dialog">
        <h2 className="modal__title">EDIT NOTE</h2>

        <input
          className="modal__input"
          type="text"
          placeholder="Edit your note..."
          value={value}
          onChange={handleChange}
        />

        <div className="modal__actions">
          <button
            className="btn btn--outline"
            type="button"
            onClick={props.onClose}
          >
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
