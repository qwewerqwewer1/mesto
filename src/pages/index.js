import './index.css';

import { Card } from '../components/Card.js'
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';

import {
  initialCards,
  editButton,
  popupFormProfile,
  popupInputTitle,
  popupInputSubtitle,
  popupButtonPlus,
  popupFormAddCards,
  settings,
} from '../scripts/constants.js';

// Функция создания карточки
function createCard(cardItem) {
  const card = new Card({ data: cardItem, handleCardClick: () => { lightBoxPopup.open({ name: cardItem.title, link: cardItem.link }); } }, 'card');
  return card.generateCard();
}

function openProfileEditForm() {
  const userData = userInfo.getUserInfo();
  popupInputTitle.value = userData.name;
  popupInputSubtitle.value = userData.status;
  editProfileFormValidation.resetValidationState();
  editProfilePopup.open();
}

// Функция «Открыть форму добавления места»
function openPlaceAddForm() {
  addPlaceFormValidation.resetValidationState();
  addPlacePopup.open();
}

// Попап редактирования профиля
const editProfilePopup = new PopupWithForm('.popup_profile', (evt, fields) => {
  evt.preventDefault();
  userInfo.setUserInfo({ data: { name: fields['profileName'], status: fields['profileProfession'] } })
  editProfilePopup.close();
});

editProfilePopup.setEventListeners();

// Попап редактирования нового места
const addPlacePopup = new PopupWithForm('.popup_plus', (evt, fields) => {
  evt.preventDefault();
  const cardItem = { title: fields['addCardName'], link: fields['addCardUrl'] };
  const cardElement = createCard(cardItem);
  cardList.prependItem(cardElement);
  addPlacePopup.close();
});

addPlacePopup.setEventListeners();

// Попап с картинкой
const lightBoxPopup = new PopupWithImage('.popup_lightbox');

lightBoxPopup.setEventListeners();

// Информация о пользователе
const userInfo = new UserInfo('.profile__title', '.profile__subtitle');

// Валидация форм
const editProfileFormValidation = new FormValidator(popupFormProfile, settings);
editProfileFormValidation.enableValidation();
const addPlaceFormValidation = new FormValidator(popupFormAddCards, settings);
addPlaceFormValidation.enableValidation();

// Открытие попапов при нажатии на кнопку
editButton.addEventListener('click', openProfileEditForm);
popupButtonPlus.addEventListener('click', openPlaceAddForm);

// Инициализация первых карточек
const cardList = new Section(
  {
    data: initialCards,
    renderer: (cardItem) => {
      const cardElement = createCard(cardItem);
      cardList.appendItem(cardElement);
    }
  }, '.elements'
);

cardList.renderItems();