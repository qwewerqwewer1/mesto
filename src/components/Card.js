export class Card {
  constructor({ data, handleCardClick }, cardSelector) {
    this._title = data.title;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document.getElementById(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true)
    return cardElement;
  }

  _likeCard(evt) {
    evt.target.classList.toggle('element__like_active');
  }

  _deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._element.querySelector('.element__like').addEventListener('click', (evt) => {
      this._likeCard(evt);
    });
    this._element.querySelector('.element__delete').addEventListener('click', () => {
      this._deleteCard();
    });
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handleCardClick();
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