const Modal = () => {

  const handleChange = (event) => {
    console.log(event.target.value);
  };

  return (
    <div className="modal" id="new-note">
      <div className="modal__dialog">
        <h2 className="modal__title">NEW NOTE</h2>
        <input className="modal__input" type="text" placeholder="Input your note..." onChange={handleChange}/>
        <div className="modal__actions">
          <a className="btn btn--outline" href="#">CANCEL</a>
          <a className="btn btn--primary" href="#">APPLY</a>
        </div>
      </div>
    </div>
  )
}

export default Modal