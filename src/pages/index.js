import "./index.css";

import  Card  from "../components/card.js";
import { initialCards, validationConfig } from "../utils/constants.js";
import { FormValidator } from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Api from "../components/Api.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

const buttonOpenPopupProfile = document.querySelector(".button_type_edit");
const buttonAddNewCard = document.querySelector(".button_type_add");
const inputUserName = document.querySelector(".popup__input_type_name");
const inputUserAbout = document.querySelector(".popup__input_type_additional");
const formEditProfile = document.forms["edit-form"];
const formAddNewPlace = document.forms["new-place-form"];
let cardsSection;
const apiOptions = {
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-66",
  headers: {
    authorization: "eeea63f2-ab02-4294-9d67-84220d1763e5",
    "Content-Type": "application/json",
  },
};

const userInfo = new UserInfo({
  selectorUserName: ".profile__name",
  selectorUserInfo: ".profile__additional",
  selectorAvatar: '.profile__avatar',
  userId: ''
});

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

const popupFormConfirmationDelete = new PopupWithConfirmation(
  '.popup_type_confirmation',
  handleConfirmationDeleteSubmit
);
popupFormConfirmationDelete.setEventListeners();



//получение информации о пользователе с сервера...
api
  .getUserInfo()
  .then((data) => {
    userInfo.setUserInfo({
      userName: data.name,
      userInfo: data.about,
      avatarLink: data.avatar,
      userId: data._id
    });
  })
  .catch((err) => console.log(err));

//получение карточек с сервера и их загрузка в случае успеха...
api
  .getInitialCards()
  .then((data) => {
    cardsSection = new Section(
      {
        items: data,
        renderer: (item) => {
          const card = createCard(item);
          cardsSection.addItem(card);
        },
      },
      ".element-list"
    );
    cardsSection.renderItems(data);
  })
  .catch((err) => {
    console.log(err);
  });

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

function handleConfirmationDeleteSubmit(cardToDelete) {
  api
    .deleteCard(cardToDelete.getId())
    .then(() => {
      cardToDelete.delete();
    })
    .catch((err) => {
      console.log(err);
    })
  popupFormConfirmationDelete.close();
}

function createCard(cardData) {
  const newCard = new Card(cardData, userInfo.getUserInfo().userId, "#elementTemplate",
  handleCardClick, handleDeleteCardClick, handleLikeCardClick, handleDeleteLikeCardClick)
  .returnCard();
  return newCard;
}

function handleCardClick(cardData) {
  imagePopup.open(cardData);
}

function handleDeleteCardClick(card) {
  popupFormConfirmationDelete.open(card);
}

function handleLikeCardClick(card) {
  api.putLikes(card.getId())
    .then((data) => {
      card.updateCardInfo(data);
    })
    .catch((err) => {
      console.log(err);
    });
}

function handleDeleteLikeCardClick(card) {
  api.deleteLikes(card.getId())
    .then((data) => {
      card.updateCardInfo(data);
    })
    .catch((err) => {
      console.log(err);
    });
}

function handleNewPlaceFormSubmit(newData) {
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
