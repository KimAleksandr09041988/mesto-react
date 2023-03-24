import React, { useEffect, useState } from "react";
import server from "../utils/Api";
import Card from "./Cards";
import { CurrentUserContext } from "./contexts/CurrentUserContext";

export default function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {
  const [cardList, setCardList] = useState([]);
  const userContext = React.useContext(CurrentUserContext);

  useEffect(() => {
    server.getCardInfo()
      .then(result => {
        setCardList(result);
      })
      .catch(err => {
        console.log(err);
      })
  }, []);

  return (
    <main>
      <section className="profile">
        <div className="profile__wrapper-avatar">
          <img className="profile__img-avatar" alt="Аватар" src={userContext.avatar} />
          <button className="profile__edit-avatar" type="button" onClick={onEditAvatar}></button>
        </div>
        <div className="profile__info">
          <div className="profile__wrapper">
            <h1 className="profile__name">{userContext.name}</h1>
            <button className="profile__edit-btn" type="button" onClick={onEditProfile}></button>
          </div>
          <p className="profile__profession">{userContext.about}</p>
        </div>
        <button className="profile__add-btn" type="button" onClick={onAddPlace}></button>
      </section>
      <section className="gallery">
        <ul className="gallery__cards">
          {cardList.map((card) => (
            <Card key={card._id} card={card} onCardClick={onCardClick} />
          ))}
        </ul>
      </section>
    </main>
  )
}
