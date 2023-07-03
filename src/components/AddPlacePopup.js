import React from "react";
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({isOpen, onClose, onAddPlace, isLoading}) {
  const [title, setTitle] = React.useState('');
  const [link, setLink] = React.useState('');

  React.useEffect(() => {
    if (isOpen) {
      setTitle('');
      setLink('');
    }
  }, [isOpen])

  function handleTitleChange(event) {
    setTitle(event.target.value);
  }

  function handleLinkChange(event) {
    setLink(event.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name: title,
      link: link
    });
  }

  return (
    <PopupWithForm 
            isOpen = {isOpen}
            onClose = {onClose}
            onSubmit = {handleSubmit}
            isLoading = {isLoading}
            name = 'add-card'
            title = 'Новое место'
            textButton = 'Создать'>
                <input className="popup__input popup__input_text_name-place" value={title} onChange={handleTitleChange} id="nameplace" name="name" placeholder="Название" type="text" required minLength="2" maxLength="30"/>
                <span className="popup__error" id="nameplace-error"></span>
                <input className="popup__input popup__input_text_image-link" value={link} onChange={handleLinkChange} id="imagelink" name="link" placeholder="Ссылка на картинку" required type="url"/>
                <span className="popup__error" id="imagelink-error"></span>
          </PopupWithForm>
  )
}

export default AddPlacePopup;
