import { Card } from './Card.js'
import { openPopup, closePopup, closeOverlay } from './utils.js';
import { FormValidator } from './FormValidator.js';
import {
  initialCards,
  popupFormProfile,
  popupProfile,
  popupCloseProfile,
  popupFormAddCards,
  popupInputTitle,
  popupInputSubtitle,
  editButton,
  profileTitle,
  profileSubtitle,
  popupButtonPlus,
  popupAddCards,
  popupClosePlus,
  elements,
  nameCardTitle,
  urlCardTitle,
  saveCardButton,
  popupLightbox,
  popupCloseLightbox,
  settings,
} from './constants.js';

//Функция Открытия Профиля Попапа
function openPopupForm() {
  popupInputTitle.value = profileTitle.textContent;
  popupInputSubtitle.value = profileSubtitle.textContent;
  formProfileValidator.resetValidationState()
  openPopup(popupProfile);
};

//Функция Открытия Добавления Карточек Попапа
function openPopupAddCards() {
  formAddCardsValidator.resetValidationState()
  openPopup(popupAddCards);
};

//Функция Сохранения Имен Профиля
function saveChangesProfile() {
  profileTitle.textContent = popupInputTitle.value;
  profileSubtitle.textContent = popupInputSubtitle.value;
  closePopup(popupProfile);
};

function createCard(arr) {
  return new Card(arr, '#card')
}

initialCards.forEach((arg) => {
  const formCard = createCard(arg)
  const cardElement = formCard.generateCard();
  elements.append(cardElement);
});

const formProfileValidator = new FormValidator(popupFormProfile, settings);
const formAddCardsValidator = new FormValidator(popupFormAddCards, settings);
formProfileValidator.enableValidation();
formAddCardsValidator.enableValidation();


//Функция Сохранения карточек АдКардс
function saveChangesAddCards() {
  const card = createCard({ title: nameCardTitle.value, link: urlCardTitle.value })
  const cardElement = card.generateCard();
  elements.prepend(cardElement);
  popupFormAddCards.reset();
  closePopup(popupAddCards);
};

function closePopupProfile() {
  closePopup(popupProfile);
};

function closePopupAddCards() {
  closePopup(popupAddCards);
};

function closePopupLightbox() {
  closePopup(popupLightbox);
};

//События Профильного Попапа
popupProfile.addEventListener('submit', saveChangesProfile);
popupFormAddCards.addEventListener('submit', saveChangesAddCards);
editButton.addEventListener('click', openPopupForm);
saveCardButton.addEventListener('click', Card);
popupButtonPlus.addEventListener('click', openPopupAddCards);
popupCloseProfile.addEventListener('click', closePopupProfile);
popupClosePlus.addEventListener('click', closePopupAddCards);
popupCloseLightbox.addEventListener('click', closePopupLightbox);