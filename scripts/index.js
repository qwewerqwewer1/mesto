const initialCards = [
  {
      title: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      title: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      title: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      title: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      title: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      title: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//Переменные Попапов
let popupProfile = document.querySelector('.popup_profile');
let popupCloseProfile = document.querySelector('.popup__close_profile');
let popupFormProfile = document.querySelector('.popup__form-profile');
let popupFormAddCards = document.querySelector('.popup__form-add_cards');
let popupInputTitle = document.querySelector('.popup__input_name_title');
let popupInputSubtitle = document.querySelector('.popup__input_name_subtitle');
let editButton = document.querySelector('.profile__edit-button');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');

//Переменные ПЛЮС кнопок
let popupButtonPlus = document.querySelector('.profile__add-button');
let popupPlus = document.querySelector('.popup_plus');
let popupClosePlus = document.querySelector('.popup__close_plus');

const elements = document.querySelector('.elements');
////Элементы Templ
const popupButtonSaveCard = document.querySelector('.popup__button_save_card');

//Лайтбокс темы
let popupLightbox = document.querySelector('.popup_lightbox');
let lightBoxElement = document.querySelector('.lightbox');
let lightBoxImage = lightBoxElement.querySelector('.lightbox__image');
let lightBoxTitle = lightBoxElement.querySelector('.lightbox__title');
let popupCloseLightbox = document.querySelector('.popup__close_lightbox');

//Функция Открытия Профиля Попапа
function openPopupForm() {
  popupInputTitle.value = profileTitle.textContent;
  popupInputSubtitle.value = profileSubtitle.textContent;
  openPopup(popupProfile);
};


//Функция Открывающая все попапы
function openPopup (popup) {
  popup.classList.add('popup_opened');
};

//Функция Закрывающая все Попапы
function closePopup (popup) {
popup.classList.remove('popup_opened');
};

//Функция Сохранения Имен Профиля
function saveChangesProfile (evt) {
  evt.preventDefault();
  profileTitle.textContent = popupInputTitle.value;
  profileSubtitle.textContent = popupInputSubtitle.value;
  closePopup(popupProfile);
};

//Функция Сохранения карточек АдКардс
function saveChangesAddCards(evt) {
  evt.preventDefault();
  const nameCardTitle = document.querySelector('.popup__input_name_cardtitle');
  const urlCardTitle = document.querySelector('.popup__input_url_cardtitle');
  elements.append(createCard({title: nameCardTitle.value, link: urlCardTitle.value}));
  closePopup(popupPlus);
};

//Функция Добавления Карточки Template
function createCard(cardData) {
  const template = document.querySelector('#card').content;
  const newCopyCard = template.cloneNode(true);
  const сardImage = newCopyCard.querySelector('.element__image');
  сardImage.src = cardData.link;
  сardImage.alt = cardData.title;
  сardImage.addEventListener('click', openLightBox);
//Наполняем карточки
  newCopyCard.querySelector('.element__paragraph').textContent = cardData.title;
  newCopyCard.querySelector('.element__like').addEventListener('click', likeElem);
  newCopyCard.querySelector('.element__delete').addEventListener('click', delCard);
  return newCopyCard;
};
//Загрузка первой шестерки через создания карточек
initialCards.forEach(cardData => {
  const cardElement = createCard(cardData);
  elements.append(cardElement);
});

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

//События Профильного Попапа
popupProfile.addEventListener('submit', saveChangesProfile);
popupFormAddCards.addEventListener('submit', saveChangesAddCards);
editButton.addEventListener('click', openPopupForm);
popupButtonSaveCard.addEventListener('click', createCard);
popupCloseProfile.addEventListener('click', () => {popupProfile.classList.remove('popup_opened')});
popupClosePlus.addEventListener('click', () => {popupPlus.classList.remove('popup_opened')});
popupCloseLightbox.addEventListener('click', () => {popupLightbox.classList.remove('popup_opened')});
popupButtonPlus.addEventListener('click', () => {popupPlus.classList.add('popup_opened')});