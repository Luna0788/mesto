import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageElement =  this._popupElement.querySelector('.popup__image');
    this._nameElement = this._popupElement.querySelector('.popup__heading_type_image');
  }

  open(image) {
    super.open();
    this._imageElement.src = image.link;
    this._imageElement.alt = `Фотография ${image.name}`;
    this._nameElement.textContent = image.name;
  }

};
