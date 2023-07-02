function PopupWithForm({isOpen, onClose, name, title, onSubmit, textButton, children}) {
  return (
    <div className={`popup popup_${name} ${isOpen && `popup_opened`}`}>
      <div className="popup__container">
        <button onClick={onClose} type="button" className="popup__close"></button>
        <h2 className="popup__heading">{title}</h2>
        <form className="popup__form" name={`${name}`} onSubmit={onSubmit} >
          {children}
          <button className="popup__submit" type="submit">{textButton}</button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;