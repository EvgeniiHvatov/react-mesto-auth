import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({card, onCardClick, onCardLike, onCardDelete}) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = (`places__delete-card ${!isOwn && 'places__delete-card_hidden'}`);

  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (`places__like ${isLiked && 'places__like_active'}`);

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
      <li className="places__item">
        <button type="button" onClick={handleDeleteClick} className={cardDeleteButtonClassName}></button>
        <div onClick={handleClick} className="places__image-container">
          <img src={card.link} alt={card.name} className="places__image"/>
        </div>
        <div className="places__heading">
          <h2 className="places__text">{card.name}</h2>
          <div className="places__likes-container">
            <button type="button" onClick={handleLikeClick} className={cardLikeButtonClassName}></button>
            <p className="places__likes-indicator">{card.likes.length}</p>
          </div>
        </div>
      </li>
  )
}

export default Card;