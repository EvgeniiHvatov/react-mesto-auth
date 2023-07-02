export default function InfoTooltip({popupStatus, isOpen, onClose}) {
  return (
    <div className={`popup popup_type_infoTooltip ${isOpen && 'popup_opened'}`}>
      <figure className="popup__container popup__container_type_info">
        <button onClick={onClose} className="popup__close" type="button"></button>
        <img src={popupStatus.image} alt={`Информационное сообщение: ${popupStatus.message}`} className="popup__icon" />
        <figcaption className="popup__icon-caption">{popupStatus.message}</figcaption>
      </figure>
    </div>
  );
};