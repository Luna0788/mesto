import  { Card }  from "../scripts/card.js";
import { initialCards } from '../scripts/cards.js';
import { FormValidator } from "../scripts/formValidator.js";

const validationConfig = {
  formSelector: '.popup__edit-form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}
const buttonOpenPopupProfile = document.querySelector('.button_type_edit');
const popupProfile = document.querySelector('.popup_type_profile-edit');

const buttonsClosePopups = document.querySelectorAll('.popup__toggle');
buttonsClosePopups.forEach((closeButton) => closeButton.addEventListener('click', function (evt) {
  const thisPopup = evt.target.closest('.popup');
  closePopup(thisPopup);
}));

const buttonAddNewCard = document.querySelector('.button_type_add');
const popupAddNewPlace = document.querySelector('.popup_type_new-place');
const userNameElement = document.querySelector('.profile__name');
const userAboutElement = document.querySelector('.profile__additional');
const inputUserName = document.querySelector('.popup__input_type_name');
const inputUserAbout = document.querySelector('.popup__input_type_additional');

function openPopup(popup) {
  popup.classList.add('popup_opened');
  popup.addEventListener('mousedown', handleClickClosePopup);
  document.addEventListener('keydown', handleEscapeClosePopup);
}

function handleClickClosePopup(evt) {
  if (evt.target.classList.contains('popup_opened')) {
    const openedPopup = evt.target;
    closePopup(openedPopup);
  }
}

function handleEscapeClosePopup(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscapeClosePopup);
  popup.removeEventListener('click', handleClickClosePopup);
}

buttonOpenPopupProfile.addEventListener('click', function() {
  const userName = userNameElement.textContent;
  inputUserName.value = userName;
  const userAbout = userAboutElement.textContent;
  inputUserAbout.value = userAbout;
  openPopup(popupProfile);
});

buttonAddNewCard.addEventListener('click', function() {
  formAddNewPlace.reset();
  validationAddNewPlace.disableButton();
  validationAddNewPlace.resetInputErrors();
  openPopup(popupAddNewPlace);
});

function handleEditFormSubmit (evt) {
  evt.preventDefault();
  const newUserName = inputUserName.value;
  const newUserAbout = inputUserAbout.value;
  userNameElement.textContent = newUserName;
  userAboutElement.textContent = newUserAbout;
  closePopup(popupProfile);
}

const formEditProfile = document.forms['edit-form'];
const validationEditProfile = new FormValidator (validationConfig, formEditProfile);
validationEditProfile.enableValidation();
formEditProfile.addEventListener('submit', handleEditFormSubmit);

const cardList =  document.querySelector('.element-list');

initialCards.forEach(cardData => {
  cardList.append(createCard(cardData));
});

function createCard(cardData) {
  const newCard = new Card(cardData, '#elementTemplate', openPopupImage).returnCard();
  return newCard;
};


const formAddNewPlace = document.forms['new-place-form'];
const validationAddNewPlace = new FormValidator (validationConfig, formAddNewPlace);
validationAddNewPlace.enableValidation();
formAddNewPlace.addEventListener('submit', handleNewPlaceFormSubmit);

const newPlaceName = formAddNewPlace.querySelector('.popup__input_type_place-name');
const newPlaceLink = formAddNewPlace.querySelector('.popup__input_type_picture-ref');

function handleNewPlaceFormSubmit (evt) {
  evt.preventDefault();
  const newCardData = {
    name: newPlaceName.value,
    link: newPlaceLink.value
  };
  cardList.prepend(createCard(newCardData));
  closePopup(popupAddNewPlace);
  validationAddNewPlace.disableButton();
};

const imagePopup = document.querySelector('.popup_type_image');
const imageView = imagePopup.querySelector('.popup__image');
const imageName = imagePopup.querySelector('.popup__heading_type_image');

function openPopupImage (name, link) {
  const alt =  `Фотография ${name}`;
  imageView.setAttribute('src', link);
  imageView.setAttribute('alt', alt);
  imageName.textContent = name;
  openPopup(imagePopup);
};
