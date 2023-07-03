import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({isOpen, onClose, onUpdateUser, isLoading}) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    if (isOpen) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser, isOpen]);

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleDescriptionChange(event) {
    setDescription(event.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name,
      about: description
    });
  }

  return (
    <PopupWithForm 
      isOpen = {isOpen}
      onClose = {onClose}
      isLoading = {isLoading}
      onSubmit = {handleSubmit}
      name = 'edit-profile'
      title = 'Редактировать профиль'
      textButton = 'Сохранить'>
          <input className="popup__input popup__input_text_name" id="firstname" value={name} onChange={handleNameChange} name="firstname" placeholder="Имя" type="text" required minLength="2" maxLength="40"/>
          <span className="popup__error" id="firstname-error"></span>
          <input className="popup__input popup__input_text_about" id="about" value={description} onChange={handleDescriptionChange} name="about" placeholder="О себе" type="text" required minLength="2" maxLength="200"/>
          <span className="popup__error" id="about-error"></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;