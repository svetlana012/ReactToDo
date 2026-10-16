const Modal = () => {

  const handleChange = (event) => {
    console.log(event.target.value);
  };

  const handleClick = () => {
    console.log('Кнопка нажата!');
  };

  return (
    <div className="modal" id="new-note">
      <div className="modal__dialog">
        <h2 className="modal__title">NEW NOTE</h2>
        <input className="modal__input" type="text" placeholder="Input your note..." onChange={handleChange} />
        <div className="modal__actions">
          <button className="btn btn--outline" onClick={handleClick}>CANCEL</button>
          <button className="btn btn--primary" onClick={handleClick}>APPLY</button>
        </div>
      </div>
    </div>
  )
}

export default Modal