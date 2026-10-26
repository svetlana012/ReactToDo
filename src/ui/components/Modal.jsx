import { useState, useEffect, useRef } from "react";

const Modal = ({ onAdd, onClose }) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

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

    onAdd(newTitle);
    setValue("");
    setError("");
    onClose();
  };

  return (
    <div className="modal" id="new-note">
      <div className="modal__dialog">
        <h2 className="modal__title">NEW NOTE</h2>

        <input
          className={`modal__input ${error ? "modal__input--error" : ""}`}
          type="text"
          placeholder="Input your note..."
          onChange={handleChange}
          value={value}
          ref={inputRef}
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

export default Modal;
