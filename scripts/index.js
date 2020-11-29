//Переменные Попапов
const popupProfile = document.querySelector('.popup_profile');
const popupCloseProfile = document.querySelector('.popup__close_profile');
const popupFormProfile = document.querySelector('.popup__form-profile');
const popupFormAddCards = document.querySelector('.popup__form-add');
const popupInputTitle = document.querySelector('.popup__input_name_title');
const popupInputSubtitle = document.querySelector('.popup__input_name_subtitle');
const editButton = document.querySelector('.profile__edit-button');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

//Переменные ПЛЮС кнопок
const popupButtonPlus = document.querySelector('.profile__add-button');
const popupPlus = document.querySelector('.popup_plus');
const popupClosePlus = document.querySelector('.popup__close_plus');
const elements = document.querySelector('.elements');
const nameCardTitle = document.querySelector('.popup__input_name_cardtitle');
const urlCardTitle = document.querySelector('.popup__input_url_cardtitle');

////Элементы Templ
const template = document.querySelector('#card').content;
const saveProfileButton = document.querySelector('.popup__button_save_profile');
const saveCardButton = document.querySelector('.popup__button_save_card');

//Лайтбокс темы
const popupLightbox = document.querySelector('.popup_lightbox');
const lightBoxElement = document.querySelector('.lightbox');
const lightBoxImage = lightBoxElement.querySelector('.lightbox__image');
const lightBoxTitle = lightBoxElement.querySelector('.lightbox__title');
const popupCloseLightbox = document.querySelector('.popup__close_lightbox');

//ESCAPEs
const ESC_KEY = "Escape";

//Функция Открытия Профиля Попапа
function openPopupForm() {
  popupInputTitle.value = profileTitle.textContent;
  popupInputSubtitle.value = profileSubtitle.textContent;
  openPopup(popupProfile);
};

//Функция Открывающая все попапы
function openPopup (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', keydownEscape);
};

//Функция Закрывающая все Попапы
function closePopup (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', keydownEscape);
};

//Функция Сохранения Имен Профиля
function saveChangesProfile (evt) {
  profileTitle.textContent = popupInputTitle.value;
  profileSubtitle.textContent = popupInputSubtitle.value;
  closePopup(popupProfile);
};

//Функция Добавления Карточки Template
function createCard(cardData) {
  const newCopyCard = template.cloneNode(true);
  const сardImage = newCopyCard.querySelector('.element__image');
  сardImage.src = cardData.link;
  сardImage.alt = cardData.title;
  сardImage.addEventListener('click', openLightBox);
  newCopyCard.querySelector('.element__paragraph').textContent = cardData.title;
  newCopyCard.querySelector('.element__like').addEventListener('click', likeElem);
  newCopyCard.querySelector('.element__delete').addEventListener('click', delCard);
  return newCopyCard;
};

//Функция Сохранения карточек АдКардс
function saveChangesAddCards(evt) {
  elements.prepend(createCard({title: nameCardTitle.value, link: urlCardTitle.value}));
  closePopup(popupPlus);
  popupFormAddCards.reset()
  setButtonState(saveCardButton, false, validationConfig);
};

function openPopupPlus() {
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

//Функция лайбокса карточки
function openLightBox(evt) {
  lightBoxTitle.textContent = evt.target.parentElement.querySelector('.element__paragraph').textContent;
  lightBoxImage.alt = evt.target.alt;
  lightBoxImage.src = evt.target.src;
  openPopup(popupLightbox);
};

//Функция лайка карточки
function likeElem (evt) {
    evt.target.classList.toggle('element__like_active')
};

//Функция удаления карточки
function delCard (evt) {
    evt.target.parentElement.remove();
};

function closeOverlay(evt) {
  if (evt.target.classList.contains('popup')){
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
saveCardButton.addEventListener('click', createCard);
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