import  {Card}  from "./card.js";

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
const userName = userNameElement.textContent;
const userAboutElement = document.querySelector('.profile__additional');
const userAbout = userAboutElement.textContent;

const inputUserName = document.querySelector('.popup__input_type_name');
inputUserName.value = userName;

const inputUserAbout = document.querySelector('.popup__input_type_additional');
inputUserAbout.value = userAbout;

function openPopup(popup) {
  popup.classList.add('popup_opened');
  popup.addEventListener('click', handleClickClosePopup);
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
  openPopup(popupProfile);
});

buttonAddNewCard.addEventListener('click', function() {
  formAddNewPlace.reset();
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
formEditProfile.addEventListener('submit', handleEditFormSubmit);

const cardList =  document.querySelector('.element-list');
const cardTemplate = document.querySelector('#elementTemplate').content.children[0];

initialCards.forEach(cardData => {
  const newCard = new Card(cardData, '#elementTemplate', openPopupImage).returnCard();
  cardList.append(newCard);
});

const formAddNewPlace = document.forms['new-place-form'];
formAddNewPlace.addEventListener('submit', handleNewPlaceFormSubmit);

const newPlaceName = formAddNewPlace.querySelector('.popup__input_type_place-name');
const newPlaceLink = formAddNewPlace.querySelector('.popup__input_type_picture-ref');

function handleNewPlaceFormSubmit (evt) {
  evt.preventDefault();
  const newCardData = {
    name: newPlaceName.value,
    link: newPlaceLink.value
  };
  const newCard = new Card(newCardData, '#elementTemplate', openPopupImage).returnCard();
  cardList.prepend(newCard);
  closePopup(popupAddNewPlace);
  disableButton(evt.target.querySelector('.popup__button'));
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
