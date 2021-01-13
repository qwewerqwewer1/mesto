export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this)
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _handleClickOverlay(evt) {
    if (evt.target.classList.contains('popup__opened')) {
      this.close();
    }
  }

  open() {
    this._popup.classList.add('popup__opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup__opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  setEventListeners() {
    this._popup.addEventListener('click', (evt) => { this._handleClickOverlay(evt); })
    this._popup.querySelector('.popup__close').addEventListener('click', (evt) => { this.close() });
  }

}