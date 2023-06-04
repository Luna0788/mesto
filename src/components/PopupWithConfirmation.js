import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
constructor(popupSelector, handleFormSubmit) {
  super(popupSelector);
  this._form = this._popupElement.querySelector('.popup__confirmation-form');
  this._handleFormSubmit = handleFormSubmit;
};
open(elementToConfirm) {
  super.open();
  this._elementToConfirm = elementToConfirm;
}
setEventListeners() {
  super.setEventListeners();
  this._form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    this._handleFormSubmit(this._elementToConfirm);
  } );
};
}
