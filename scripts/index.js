let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit-button');
let popupClose = document.querySelector('.popup__close');
let popupForm = document.querySelector('.popup__form');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');
let popupInputTitle = document.querySelector('.popup__input_name_title');
let popupInputSubtitle = document.querySelector('.popup__input_name_subtitle');

function openPopup () {
  popup.classList.add('popup__opened');
  popupInputTitle.value = profileTitle.textContent;
  popupInputSubtitle.value = profileSubtitle.textContent;
};

function closePopup () {
  popup.classList.remove('popup__opened');
};

function saveChanges (evt) {
  evt.preventDefault();
  profileTitle.textContent = popupInputTitle.value;
  profileSubtitle.textContent = popupInputSubtitle.value;
  closePopup();
};

popupForm.addEventListener('submit', saveChanges);
editButton.addEventListener('click', openPopup);
popupClose.addEventListener('click', closePopup);