import { lightBoxTitle, lightBoxImage, popupLightbox } from './initial-сards.js';
import { openPopup } from './index.js';
//Создаем конструктор будущих карт
export class Card {
  constructor(data, cardContainer) {
    this._title = data.title;
    this._link = data.link;
    this._cardContainer = cardContainer;
  }
  //Получаем Темплейт
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardContainer) // используем this._cardSelector
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  _likeElem(evt) {
    evt.target.classList.toggle('element__like_active')
  };

  _delCard() {
    this._element.remove();
  }

  _openLightBox() {
    lightBoxTitle.textContent = this._title;
    lightBoxImage.alt = this._title;
    lightBoxImage.src = this._link;
    openPopup(popupLightbox);
  }

  _setEventListeners() {
    this._element.querySelector('.element__like').addEventListener('click', (evt) => {
      this._likeElem(evt);
    });
    this._element.querySelector('.element__delete').addEventListener('click', () => {
      this._delCard();
    });
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._openLightBox();
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector('.element__paragraph').textContent = this._title;
    const cardImage = this._element.querySelector('.element__image');
    cardImage.src = this._link;
    cardImage.alt = this._title;
    this._setEventListeners();
    return this._element;
  }
}

