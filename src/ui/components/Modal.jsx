import { useState } from "react";

const Modal = (props) => {

  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value)
  };

  const handleApply = () => {    
    props.onAdd(value);
    setValue("");
    props.onClose();
  };

  return (
    <div className="modal" id="new-note">
      <div className="modal__dialog">
        <h2 className="modal__title">NEW NOTE</h2>

        <input
          className="modal__input"
          type="text"
          placeholder="Input your note..."
          onChange={handleChange}
          value={value} />

        <div className="modal__actions">
          <button
            className="btn btn--outline"
            onClick={props.onClose}>CANCEL
          </button>

          <button
            className="btn btn--primary"
            onClick={handleApply}>APPLY
          </button>

        </div>
      </div>
    </div>
  )
}

export default Modal