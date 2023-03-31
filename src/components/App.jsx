import React from 'react';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import ImagePopup from './ImagePopup';
import server from '../utils/Api';
import { CurrentUserContext } from './contexts/CurrentUserContext';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({ name: '', link: '' });
  const [currentUser, setCurrentUser] = React.useState([]);
  const [cardList, setCardList] = React.useState([]);

  React.useEffect(() => {
    server.getUserInfo()
      .then(res => {
        setCurrentUser(res)
      })
      .catch(err => {
        console.log(err);
      })

    server.getCardInfo()
      .then(result => {
        setCardList(result);
      })
      .catch(err => {
        console.log(err);
      })
  }, []);

  function handleCardLike(card) {
    const isLike = card.likes.some(i => i._id === currentUser._id);
    server.changeLikeCardStatus(card._id, !isLike)
      .then((newCard) => {
        setCardList((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleCardDelete(card) {
    server.deleteCardInfo(card._id)
      .then(() => setCardList(state => state.filter(item => item._id !== card._id)))
      .catch(err => console.log(err))
  }

  function handleUpdateUser(obj) {
    server.patchUserInfo(obj)
      .then(data => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(err => console.log(err))
  }

  function handleUpdateAvatar(obj) {
    server.changeAvatarUrl(obj)
      .then(data => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch()
  }

  function handleIsEditProfilePopup() {
    setIsEditProfilePopupOpen(true)
  }

  function handleIsAddPlacePopup() {
    setIsAddPlacePopupOpen(true)
  }

  function handleIsEditAvatarPopup() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleCardClick(data) {
    setSelectedCard({ name: data.name, link: data.link })
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false)
    setSelectedCard({ name: '', link: '' })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header />
      <Main
        onEditProfile={handleIsEditProfilePopup}
        onAddPlace={handleIsAddPlacePopup}
        onEditAvatar={handleIsEditAvatarPopup}
        onCardClick={handleCardClick}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDelete}
        cardList={cardList}
      />
      <Footer />

      {/* popup */}
      <EditProfilePopup isOpen={isEditProfilePopupOpen} isClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} isClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />


      <PopupWithForm name='card' title='Новое место' textButton='Сохранить' isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
        <input id="cardName-input" className="form__input" name="name" type="text" minLength="2" maxLength="30"
          placeholder="Название" required />
        <span className="form__input-error cardName-input-error"></span>
        <input id="cardUrl-input" className="form__input" name="link" type="url" placeholder="Ссылка на картинку"
          required />
        <span className="form__input-error cardUrl-input-error"></span>
      </PopupWithForm>



      <PopupWithForm name='delete' title='Вы уверены?' textButton='Да' onClose={closeAllPopups}>
        <input id="avatarUrl-input" className="form__input" name="avatar" type="url" placeholder="Ссылка на аватар"
          required />
        <span className="form__input-error avatarUrl-input-error"></span>
      </PopupWithForm>

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </CurrentUserContext.Provider>
  );
}

export default App;
