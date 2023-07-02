import React, { useEffect } from 'react';

import api from '../utils/api';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState(null)
  const [isLoading, setLoading] = React.useState(false)

  const [currentUser, setCurrentUser] = React.useState({})
  const [cards, setCards] = React.useState([]);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()]).then(([profileInfo, card]) => {
      setCurrentUser(profileInfo);
      setCards(card)
    }).catch((err) => {
      console.error(err);
    })
  }, [])

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  };

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  };

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  };

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    if (!isLiked) {
      api.addCardLike(card._id).then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      }).catch((err) => {
        console.error(err);
      });
    } else {
      api.deleteCardLike(card._id).then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      }).catch((err) => {
        console.error(err);
      });
    }
  }

  function handleUpdateAvatar(data) {
    setLoading(true);
    api.updateProfileAvatar(data).then((newAvatar) => {
      setCurrentUser(newAvatar);
      closeAllPopups();
    }).catch((err) => {
      console.error(err);
    }).finally(() => {setLoading(false)});
  }

  function handleUpdateUser(data) {
    setLoading(true);
    api.updateUserInfo(data).then((newUser) => {
      setCurrentUser(newUser);
      closeAllPopups();
    }).catch((err) => {
      console.error(err);
    }).finally(() => {setLoading(false)});
  }

  function handleAddPlaceSubmit(data) {
    setLoading(true);
    api.addNewCard(data).then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    }).catch((err) => {
      console.error(err);
    }).finally(() => {setLoading(false)});
  }

  function handleCardDelete(card) {
    api.removeCard(card._id).then(() => {
      setCards((items) => items.filter((c) => c._id !== card._id && c));
    }).catch((err) => {
      console.error(err);
    });
  }
 

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setSelectedCard(null);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Header/>
          <Main
            onEditProfile = {handleEditProfileClick}
            onAddPlace = {handleAddPlaceClick}
            onEditAvatar = {handleEditAvatarClick}
            onCardClick = {handleCardClick}
            onCardLike = {handleCardLike}
            cards = {cards}
            onCardDelete = {handleCardDelete}
          />
          <Footer/>

          <EditProfilePopup
            isOpen = {isEditProfilePopupOpen}
            onClose = {closeAllPopups}
            onUpdateUser = {handleUpdateUser}
            isLoading = {isLoading}
          />

          <EditAvatarPopup
            isOpen = {isEditAvatarPopupOpen}
            onClose = {closeAllPopups}
            onUpdateAvatar = {handleUpdateAvatar}
            isLoading = {isLoading}
          />

          <AddPlacePopup 
            isOpen = {isAddPlacePopupOpen}
            onClose = {closeAllPopups}
            onAddPlace = {handleAddPlaceSubmit}
            isLoading = {isLoading}
          />

          <PopupWithForm 
            name = 'confirmation'
            title = 'Вы уверены?'
            onCardDelete = {handleCardDelete}
          />

          <ImagePopup
            card = {selectedCard}
            onClose = {closeAllPopups}
          />  
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
