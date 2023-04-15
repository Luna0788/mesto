const enableValidation = ( {formSelector, ...rest} ) => {
  const forms = Array.from(document.querySelectorAll(formSelector));

  forms.forEach(form => {
    setEventListeners(form, rest);
  });

};

const setEventListeners = (formToValidate, { inputSelector, submitButtonSelector, ...rest } ) => {
  const formInputs = Array.from(formToValidate.querySelectorAll(inputSelector));
  const formButton = formToValidate.querySelector(submitButtonSelector);

  toggleButtonState(formInputs, formButton);

  formInputs.forEach(inputToValidate => {
    inputToValidate.addEventListener('input', () => {
      checkInputValidity(inputToValidate, formToValidate, rest);
      toggleButtonState(formInputs, formButton);
    });
  });

};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonElement);
  }
  else {
    enableButton(buttonElement);
  }
};

const hasInvalidInput = inputList => {
  return inputList.some(input => {
    return !input.validity.valid;
  });
};

const disableButton = button => {
  button.setAttribute('disabled', true);
};

const enableButton = button => {
  button.removeAttribute('disabled');
};

const showInputError = (formElement, inputElement, errorMessage, { inputErrorClass }) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
}

const hideInputError = (formElement, inputElement, { inputErrorClass }) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = '';
}

function checkInputValidity(inputElement, formElement, rest) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, rest);
  } else {
    hideInputError(formElement, inputElement, rest);
  }
};

const validationConfig = {
  formSelector: '.popup__edit-form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

enableValidation(validationConfig);
