export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._closePopupButton = this._popupElement.querySelector('.popup__toggle');
  };

  open() {
    this._popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose.bind(this));
  };

  close() {
    this._popupElement.classList.remove('popup_opened');
    this._popupElement.removeEventListener('mousedown', () => this.close());
    document.removeEventListener('keydown', this._handleEscClose.bind(this));
  };

  _handleEscClose(evt) {

    if (evt.key === 'Escape') {
      this.close();
    }
  };

  setEventListeners() {
    this._closePopupButton.addEventListener('click', () => this.close());
    this._popupElement.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) this.close();
    });
  };

}
