export class FormValidator {
  constructor(validationData, formToValidate) {
    this._data = validationData;
    this._form = formToValidate;
    this._formInputs = Array.from(formToValidate.querySelectorAll(this._data.inputSelector));
    this._formButton = formToValidate.querySelector(this._data.submitButtonSelector);
    this._inputErrorClass = validationData._inputErrorClass;
  }


  enableValidation() {
    this._setEventListeners();
  }

  _setEventListeners() {
    this._toggleButtonState();
    this._formInputs.forEach(inputToValidate => {
      inputToValidate.addEventListener('input', () => {
        this._checkInputValidity(inputToValidate);
        this._toggleButtonState();
      });
    });

  };

  _toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      this._disableButton();
    }
    else {
      this._enableButton();
    }
  };

  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _showInputError = (inputElement, errorMessage) => {
    this._errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    this._errorElement.textContent = errorMessage;
  };

  _hideInputError = (inputElement) => {
    this._errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    this._errorElement.textContent = '';
  };

  _hasInvalidInput = () => {
    return this._formInputs.some(input => {
      return !input.validity.valid;
    });
  };

  _disableButton = () => {
    this._formButton.setAttribute('disabled', true);
  };

  _enableButton = () => {
    this._formButton.removeAttribute('disabled');
  };
}
