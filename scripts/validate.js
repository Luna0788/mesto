import { FormValidator } from "./formValidator.js";

const validationConfig = {
  formSelector: '.popup__edit-form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

const forms = Array.from(document.querySelectorAll(validationConfig.formSelector));
forms.forEach(form => {
  const formValidator = new FormValidator(validationConfig, form);
  formValidator.enableValidation();
});

