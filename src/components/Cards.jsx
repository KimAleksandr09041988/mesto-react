import React from "react";
import { CurrentUserContext } from "./contexts/CurrentUserContext";

export default function Card({ card, onCardClick }) {
  const userContext = React.useContext(CurrentUserContext);
  const isOwn = card._id === userContext._id;
  const isLike = card.likes.some(i => i._id === userContext._id)
  const cardLikeButtonClassName = `gallery__like ${isLike && 'gallery__like_condition_active'}`

  return (
    <li className="gallery__card">
      <img className="gallery__img"
        src={card.link}
        alt={card.name}
        onClick={() => onCardClick(card)} />
      <div className="gallery__info">
        <h2 className="gallery__title">{card.name}</h2>
        <div className="gallery__wrapper">
          <button className={cardLikeButtonClassName} type="button"></button>
          <span className="gallery__quantity-like">{card.likes.length}</span>
        </div>
      </div>
      {isOwn && <button className="gallery__btn-remove"></button>}
    </li>
  )
}
