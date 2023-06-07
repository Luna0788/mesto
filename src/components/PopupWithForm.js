import Popup from "./Popup.js";

export default class PopupWithForm extends Popup{
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._form = this._popupElement.querySelector('.popup__edit-form');
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._popupElement.querySelectorAll('.popup__input');
    this._submitButton = this._popupElement.querySelector('.button_type_save');
    this._submitButtonText = this._submitButton.textContent;
  };

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  };

  setEventListeners() {
    super.setEventListeners();
    this._popupElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.renderLoading(true);
      this._handleFormSubmit(this._getInputValues());
    } );
  };

  close() {
    super.close();
    if (this._inputList) {
      this._form.reset();
    }
  };

  renderLoading(isLoad, loadingText='Сохранение...') {
    if(isLoad) {
      this._submitButton.textContent = loadingText;
    }
    else {
      this._submitButton.textContent = this._submitButtonText;
    }

  }
}
