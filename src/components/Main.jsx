import React, { useEffect, useState } from "react";
import server from "../utils/Api";
import Card from "./Cards";

export default function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {
  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [cardList, setCardList] = useState([]);

  useEffect(() => {
    server.getUserInfo()
      .then(result => {
        setUserName(result.name);
        setUserDescription(result.about);
        setUserAvatar(result.avatar);
      })
      .catch(err => {
        console.log(err);
      });
    server.getCardInfo()
      .then(result => {
        console.log(result);
        setCardList(result);
      })
      .catch(err => {
        console.log(err);
      })
  }, []);

  return (
    <>
      <main>
        <section className="profile">
          <div className="profile__wrapper-avatar">
            <img className="profile__img-avatar" alt="Аватар" src={userAvatar} />
            <button className="profile__edit-avatar" type="button" onClick={onEditAvatar}></button>
          </div>
          <div className="profile__info">
            <div className="profile__wrapper">
              <h1 className="profile__name">{userName}</h1>
              <button className="profile__edit-btn" type="button" onClick={onEditProfile}></button>
            </div>
            <p className="profile__profession">{userDescription}</p>
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
    </>
  )
}
