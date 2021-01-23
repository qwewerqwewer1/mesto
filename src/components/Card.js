export class Card {
  constructor({ data, handleCardClick, handleRemoveButtonClick, handleLikeClick, isLiked, isOwner }, cardSelector) {
    this._likes = data.likes.length
    this._arrayLikes = data.likes
    this.id = data._id
    this._title = data.name;
    this._link = data.link;
    this._owner = isOwner;
    this._handleRemoveButtonClick = handleRemoveButtonClick
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._cardSelector = cardSelector;
    this._isLiked = isLiked;
  }

  _getTemplate() {
    const cardElement = document.getElementById(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true)

    if (this._isLiked) {
      cardElement.querySelector('.element__like').classList.add('element__like_active');
    }
    if (!this._owner) {
      cardElement.querySelector('.element__delete').classList.remove('element__delete_active');
    }
    return cardElement;
  }

  _likeCard(evt) {
    evt.target.classList.toggle('element__like_active');
    this._handleLikeClick()
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  setLikes(sumLikes) {
    this._likes = sumLikes
    this._element.querySelector('.element__likes-users').textContent = this._likes;
  }

  changeStatus() {
    this._isLiked = !this._isLiked
  }


  _setEventListeners() {
    this._element.querySelector('.element__like').addEventListener('click', (evt) => {
      this._likeCard(evt);

    });
    this._element.querySelector('.element__delete').addEventListener('click', () => {
      //this._deleteCard();
      this._handleRemoveButtonClick(this)
    });
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handleCardClick();
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector('.element__paragraph').textContent = this._title;
    const cardImage = this._element.querySelector('.element__image');
    this._element.querySelector('.element__likes-users').textContent = this._likes;
    cardImage.src = this._link;
    cardImage.alt = this._title;
    this._setEventListeners();
    return this._element;
  }

}