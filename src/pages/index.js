import "./index.css";

import { Card } from "../components/Card.js";
import { initialCards, validationConfig } from "../utils/constants.js";
import { FormValidator } from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Api from "../components/Api.js";

const buttonOpenPopupProfile = document.querySelector(".button_type_edit");
const buttonAddNewCard = document.querySelector(".button_type_add");
const inputUserName = document.querySelector(".popup__input_type_name");
const inputUserAbout = document.querySelector(".popup__input_type_additional");
const formEditProfile = document.forms["edit-form"];
const formAddNewPlace = document.forms["new-place-form"];

const apiOptions = {
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-66",
  headers: {
    authorization: "eeea63f2-ab02-4294-9d67-84220d1763e5",
    "Content-Type": "application/json",
  },
};

const api = new Api(apiOptions);

const popupFormEditProfile = new PopupWithForm(
  ".popup_type_profile-edit",
  handleEditFormSubmit
);
const validationEditProfile = new FormValidator(
  validationConfig,
  formEditProfile
);
const imagePopup = new PopupWithImage(".popup_type_image");
const popupFormAddNewPlace = new PopupWithForm(
  ".popup_type_new-place",
  handleNewPlaceFormSubmit
);
const validationAddNewPlace = new FormValidator(
  validationConfig,
  formAddNewPlace
);

const userInfo = new UserInfo({
  selectorUserName: ".profile__name",
  selectorUserInfo: ".profile__additional",
});

//получение информации о пользователе с сервера...
api
  .getUserInfo()
  .then((data) => {
    userInfo.setUserInfo({
      userName: data.name,
      userInfo: data.about,
    });
  })
  .catch((err) => console.log(err));

//получение карточек с сервера и их загрузка в случае успеха...
api
  .getInitialCards()
  .then((data) => {
    cardsSection.renderItems(data);
  })
  .catch((err) => {
    console.log(err);
  });

const cardsSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = createCard(item);
      cardsSection.addItem(card);
    },
  },
  ".element-list"
);

cardsSection.renderItems();
popupFormEditProfile.setEventListeners();
validationEditProfile.enableValidation();
imagePopup.setEventListeners();
popupFormAddNewPlace.setEventListeners();
validationAddNewPlace.enableValidation();

buttonOpenPopupProfile.addEventListener("click", function () {
  const userData = userInfo.getUserInfo();
  inputUserName.value = userData.userName;
  inputUserAbout.value = userData.userInfo;
  validationEditProfile.resetInputErrors();
  popupFormEditProfile.open();
});

buttonAddNewCard.addEventListener("click", function () {
  validationAddNewPlace.disableButton();
  validationAddNewPlace.resetInputErrors();
  popupFormAddNewPlace.open();
});

function handleEditFormSubmit(newData) {
  //обновление данных пользователя на сервере
  api
    .patchUserInfo({
      name: newData.name,
      about: newData.additional,
    })
    .then((data) => {
      userInfo.setUserInfo({
        userName: data.name,
        userInfo: data.about,
      });
    })
    .catch((err) => {
      console.log(err);
    });
  popupFormEditProfile.close();
}

function createCard(cardData) {
  const newCard = new Card(cardData, "#elementTemplate", () =>
    imagePopup.open(cardData)
  ).returnCard();
  return newCard;
}

function handleNewPlaceFormSubmit(newData) {
  const newCardData = {
    name: newData["place-name"],
    link: newData["picture-ref"],
  };
  //добавление новой карточки на сервер
  api
    .postNewCard({
      name: newData["place-name"],
      link: newData["picture-ref"],
    })
    .then((data) => {
      cardsSection.addItem(createCard(data));
    })
    .catch((err) => {
      console.log(err);
    });
  popupFormAddNewPlace.close();
  validationAddNewPlace.disableButton();
}
