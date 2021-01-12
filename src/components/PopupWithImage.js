import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
    this._popupImage = this._popup.querySelector('.lightbox__image')
    this._popupName = this._popup.querySelector('.lightbox__title')
  }
  open({ name, link }) {
    this._popupImage.alt = name;
    this._popupImage.src = link;
    this._popupName.textContent = name;
    super.open();
  }
}
