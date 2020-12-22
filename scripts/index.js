import { initialCards, popupFormProfile } from './initial-сards.js'
import { Card } from './Card.js'
import { FormValidator } from './FormValidator.js';
import {
  popupProfile,
  popupCloseProfile,
  popupFormAddCards,
  popupInputTitle,
  popupInputSubtitle,
  editButton,
  profileTitle,
  profileSubtitle,
  popupButtonPlus,
  popupPlus,
  popupClosePlus,
  elements,
  nameCardTitle,
  urlCardTitle,
  saveCardButton,
  popupLightbox,
  popupCloseLightbox,
  settings,
} from './initial-сards.js';

//ESCAPEs
const ESC_KEY = "Escape";

//Функция Открытия Профиля Попапа
function openPopupForm() {
  popupInputTitle.value = profileTitle.textContent;
  popupInputSubtitle.value = profileSubtitle.textContent;
  formProfileValidator.resetValidationState()
  openPopup(popupProfile);
};

//Функция Открывающая все попапы
export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', keydownEscape);
};

//Функция Закрывающая все Попапы
export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', keydownEscape);
};

//Функция Сохранения Имен Профиля
function saveChangesProfile(evt) {
  profileTitle.textContent = popupInputTitle.value;
  profileSubtitle.textContent = popupInputSubtitle.value;
  closePopup(popupProfile);
};

initialCards.forEach((arg) => {
  const formCard = new Card(arg, '#card');
  const cardElement = formCard.generateCard();
  elements.append(cardElement);
});

const formProfileValidator = new FormValidator(popupFormProfile, settings);
const formAddCardsValidator = new FormValidator(popupFormAddCards, settings);
formProfileValidator.enableValidation();
formAddCardsValidator.enableValidation();


//Функция Сохранения карточек АдКардс
function saveChangesAddCards() {
  const card = new Card({ title: nameCardTitle.value, link: urlCardTitle.value }, '#card');
  const cardElement = card.generateCard();
  elements.prepend(cardElement);
  popupFormAddCards.reset();
  closePopup(popupPlus);
};

function openPopupPlus() {
  formAddCardsValidator.resetValidationState()
  openPopup(popupPlus);
};

function closePopupProfile() {
  closePopup(popupProfile);
};

function closePopupPlus() {
  closePopup(popupPlus);
};

function closePopupLightbox() {
  closePopup(popupLightbox);
};

function closeOverlay(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
}

function keydownEscape(evt) {
  if (evt.key === ESC_KEY) {
    const currentPopup = document.querySelector('.popup_opened');
    closePopup(currentPopup);
  }
};

//События Профильного Попапа
popupProfile.addEventListener('submit', saveChangesProfile);
popupFormAddCards.addEventListener('submit', saveChangesAddCards);
editButton.addEventListener('click', openPopupForm);
saveCardButton.addEventListener('click', Card);
popupButtonPlus.addEventListener('click', openPopupPlus);
popupCloseProfile.addEventListener('click', closePopupProfile);
popupClosePlus.addEventListener('click', closePopupPlus);
popupCloseLightbox.addEventListener('click', closePopupLightbox);
//Закрытия НЕ по крестику
popupProfile.addEventListener('click', closeOverlay);
popupPlus.addEventListener('click', closeOverlay);
popupLightbox.addEventListener('click', closeOverlay);
//Слушатель EscapeOFF
popupProfile.addEventListener('keydown', keydownEscape);
popupPlus.addEventListener('keydown', keydownEscape);
popupLightbox.addEventListener('keydown', keydownEscape);