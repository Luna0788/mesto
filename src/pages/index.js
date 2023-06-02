import './index.css';

import  { Card }  from "../components/card.js";
import { initialCards, validationConfig } from '../utils/constants.js';
import { FormValidator } from "../components/formValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";

const buttonOpenPopupProfile = document.querySelector('.button_type_edit');
const buttonAddNewCard = document.querySelector('.button_type_add');
const inputUserName = document.querySelector('.popup__input_type_name');
const inputUserAbout = document.querySelector('.popup__input_type_additional');
const formEditProfile = document.forms['edit-form'];
const formAddNewPlace = document.forms['new-place-form'];
const newPlaceName = formAddNewPlace.querySelector('.popup__input_type_place-name');
const newPlaceLink = formAddNewPlace.querySelector('.popup__input_type_picture-ref');

const popupFormEditProfile = new PopupWithForm('.popup_type_profile-edit', handleEditFormSubmit);
const validationEditProfile = new FormValidator (validationConfig, formEditProfile);
const imagePopup = new PopupWithImage('.popup_type_image');
const popupFormAddNewPlace = new PopupWithForm('.popup_type_new-place', handleNewPlaceFormSubmit);
const validationAddNewPlace = new FormValidator (validationConfig, formAddNewPlace);

const userInfo = new UserInfo ({
  selectorUserName: '.profile__name',
  selectorUserInfo: '.profile__additional'
});

const cardList =  new Section({
  items: initialCards,
  renderer: (item) => {
    const card = createCard(item);
    cardList.addItem(card);
  }
  }, '.element-list');

cardList.renderItems();
popupFormEditProfile.setEventListeners();
validationEditProfile.enableValidation();
imagePopup.setEventListeners();
popupFormAddNewPlace.setEventListeners();
validationAddNewPlace.enableValidation();

buttonOpenPopupProfile.addEventListener('click', function() {
  const userName = userInfo.getUserInfo().userName;
  inputUserName.value = userName;
  const userAbout = userInfo.getUserInfo().userInfo;
  inputUserAbout.value = userAbout;
  validationEditProfile.resetInputErrors();
  popupFormEditProfile.open();
});

buttonAddNewCard.addEventListener('click', function() {
  validationAddNewPlace.disableButton();
  validationAddNewPlace.resetInputErrors();
  popupFormAddNewPlace.open();
});

function handleEditFormSubmit (newData) {
  const newUserData = {
    userName: newData.name,
    userInfo: newData.additional
  }
  userInfo.setUserInfo(newUserData);
  popupFormEditProfile.close();
}

function createCard(cardData) {
  const newCard = new Card(cardData, '#elementTemplate', () => imagePopup.open(cardData)).returnCard();
  return newCard;
};

function handleNewPlaceFormSubmit (evt) {
  const newCardData = {
    name: newPlaceName.value,
    link: newPlaceLink.value
  };
  cardList.addItem(createCard(newCardData));
  popupFormAddNewPlace.close();
  validationAddNewPlace.disableButton();
};
