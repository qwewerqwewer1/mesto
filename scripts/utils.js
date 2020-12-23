//Функция Открывающая все попапы
export function openPopup(popup) {
  popup.addEventListener('click', closeOverlay);
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', keydownEscape);
};

//Функция Закрывающая все Попапы
export function closePopup(popup) {
  popup.removeEventListener('click', closeOverlay);
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', keydownEscape);
};

export function closeOverlay(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
}

export function keydownEscape(evt) {
  if (evt.key === 'Escape') {
    const currentPopup = document.querySelector('.popup_opened');
    closePopup(currentPopup);
  }
};