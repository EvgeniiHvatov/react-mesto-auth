import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar, isLoading}) {
  const ref = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: ref.current.value
    });
  }

  React.useEffect(() => {
    ref.current.value = '';
  }, [isOpen]);

  return(
    <PopupWithForm 
    isOpen = {isOpen}
    onClose = {onClose}
    onSubmit = {handleSubmit}
    isLoading = {isLoading}
    name = 'edit-avatar'
    title = 'Обновить аватар'
    textButton = 'Сохранить'>
      <>
        <input className="popup__input" id="avatarlink" ref={ref} name="url" type="url" placeholder="Ссылка на аватар" required />
        <span className="popup__error" id="avatarlink-error"></span>
      </>
  </PopupWithForm>
  )
}

export default EditAvatarPopup;