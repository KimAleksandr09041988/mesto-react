import React from 'react';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import server from '../utils/Api';
import { CurrentUserContext } from './contexts/CurrentUserContext';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({ name: '', link: '' });
  const [currentUser, setCurrentUser] = React.useState([]);

  React.useEffect(() => {
    server.getUserInfo()
      .then(res => {
        setCurrentUser(res)
      })
      .catch(err => {
        console.log(err);
      })
  }, []);

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

  function closeAllPopups(e) {
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
      />
      <Footer />

      {/* popup */}
      <PopupWithForm name='profile' title='Редактировать профиль' textButton='Сохранить' isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
        <input id="fullName-input" className="form__input" name="name" type="text" minLength="2" maxLength="40"
          placeholder="ФИО" required />
        <span className="form__input-error fullName-input-error"></span>
        <input id="profession-input" className="form__input" name="about" type="text" placeholder="Профессия"
          minLength="2" maxLength="200" required />
        <span className="form__input-error profession-input-error"></span>
      </PopupWithForm>

      <PopupWithForm name='card' title='Новое место' textButton='Сохранить' isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
        <input id="cardName-input" className="form__input" name="name" type="text" minLength="2" maxLength="30"
          placeholder="Название" required />
        <span className="form__input-error cardName-input-error"></span>
        <input id="cardUrl-input" className="form__input" name="link" type="url" placeholder="Ссылка на картинку"
          required />
        <span className="form__input-error cardUrl-input-error"></span>
      </PopupWithForm>

      <PopupWithForm name='avatar' title='Обновить аватар' textButton='Сохранить' isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
        <input id="avatarUrl-input" className="form__input" name="avatar" type="url" placeholder="Ссылка на аватар"
          required />
        <span className="form__input-error avatarUrl-input-error"></span>
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
