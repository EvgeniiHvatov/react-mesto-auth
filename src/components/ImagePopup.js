function ImagePopup({card, onClose}) {
  return (
    <div className={`popup popup_full-image ${card && 'popup_opened'}`} >
      <div className="popup__container popup__container_type_image">
        <button onClick={onClose} className="popup__close" type="button"></button>
        <img src={card && card.link} alt={card && card.name} className="popup__image popup__image_full" />
        <h2 className="popup__heading popup__heading_caption">{card && card.name}</h2>
      </div>
    </div>
  );
};

export default ImagePopup;
