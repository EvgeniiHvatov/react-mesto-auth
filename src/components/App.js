import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import {signUp, signIn, checkToken} from '../utils/apiAuth';

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
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import checkmarkImg from '../images/checkmark.svg'
import crossImg from '../images/cross.svg'

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState(null)
  const [isLoading, setLoading] = useState(false)

  const [currentUser, setCurrentUser] = useState({})
  const [cards, setCards] = useState([]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [emailValue, setEmailValue] = useState(null);
  const [popupStatus, setPopupStatus] = useState({ image:'', message:'' });
  const [infoTooltip, setInfoTooltip] = useState(false);
  const navigate = useNavigate();

  function handleLogin(email, password) {
    signIn(email, password)
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        setIsLoggedIn(true);
        setEmailValue(email);
        navigate("/");
      })
      .catch(() => {
        setPopupStatus({image: crossImg, message: 'Что-то пошло не так! Попробуйте еще раз.'});
        handleInfoTooltip();
      });
  };

  function handleRegister(email, password) {
    signUp(email, password)
      .then(() => {
        setPopupStatus({image: checkmarkImg, message: 'Вы успешно зарегистрировались!'});
        navigate("/signin");
      })
      .catch(() => {
        setPopupStatus({image: crossImg, message: 'Что-то пошло не так! Попробуйте еще раз.'});
      })
      .finally(handleInfoTooltip);
  };

  function handleLogOut() {
    setIsLoggedIn(false);
    localStorage.removeItem('jwt');
    setEmailValue(null);
    navigate("/signin");
  };

  function handleInfoTooltip() {
    setInfoTooltip(true);
  };

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      checkToken(jwt)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            setEmailValue(res.data.email);
            navigate('/');
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn){
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([profileInfo, card]) => {
        setCurrentUser(profileInfo);
        setCards(card)
      })
      .catch((err) => {
      console.error(err);
      })
    }
  }, [isLoggedIn])

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
    api.updateUserInfo(data)
    .then((newUser) => {
      setCurrentUser(newUser);
      closeAllPopups();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      setLoading(false)
    });
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
    setInfoTooltip(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Routes>
            <Route exact path='/'
              element={
                <>
                  <Header
                    title='Выйти'
                    route=''
                    email={emailValue}
                    onClick={handleLogOut}
                  />

                  <ProtectedRoute
                    component={Main}
                    isLoggedIn={isLoggedIn}
                    onEditProfile = {handleEditProfileClick}
                    onAddPlace = {handleAddPlaceClick}
                    onEditAvatar = {handleEditAvatarClick}
                    onCardClick = {handleCardClick}
                    onCardLike = {handleCardLike}
                    cards={cards}
                    onCardDelete = {handleCardDelete}
                    />
                </>
              }
            />

            <Route path='/signup'
              element={
                <>
                  <Header
                    title='Войти'
                    route='/signin'
                  />
                  <Register
                    onRegister={handleRegister}
                  />
                </>
              }
            />

            <Route path='/signin'
              element={
                <>
                  <Header
                    title='Регистрация'
                    route='/signup'
                  />
                  <Login
                    onLogin={handleLogin}
                  />
                </>
              }
            />

            <Route exact path="*"
              element={
                isLoggedIn ? <Navigate to="/" /> : <Navigate to="/signin"/>
              }
            />
          </Routes>

          <Footer/>

          <InfoTooltip
          popupStatus={popupStatus}
          isOpen={infoTooltip}
          onClose = {closeAllPopups}
          />

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
