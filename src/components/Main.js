import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({onEditProfile, onAddPlace, onEditAvatar, cards, onCardClick, onCardLike, onCardDelete}) {
  const currentUser = React.useContext(CurrentUserContext);


  return (
    <main className="content">
      <section className="profile">
        <div className="profile__container">
        <button onClick={onEditAvatar}  className="profile__avatar-button" type="button"></button>
        <img src={currentUser.avatar} alt="Ваше фото (аватарка)" className="profile__avatar"/>
        </div>
        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <p className="profile__subtitle">{currentUser.about}</p>
          <button onClick={onEditProfile} type="button" className="profile__edit-button"></button>
        </div>
        <button onClick={onAddPlace} type="button" className="profile__add-button"></button>
      </section>
      <section className="places">
        <ul className="places__list">
        {cards.map((card) => (
          <Card 
          card = {card}
          key = {card._id}
          onCardClick = {onCardClick}
          onCardLike = {onCardLike}
          onCardDelete = {onCardDelete}
          />
        ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;