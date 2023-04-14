
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
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

buttonOpenPopupProfile.addEventListener('click', function() {
  openPopup(popupProfile);
});

buttonAddNewCard.addEventListener('click', function() {
  newPlaceName.value = '';
  newPlaceLink.value = '';
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
const cardTemplate = document.querySelector('#elementTemplate').content.querySelector('.element');

function createCard(card) {
  const newCard = cardTemplate.cloneNode(true);
  const cardPhoto = newCard.querySelector('.element__photo');
  const cardName = newCard.querySelector('.element__name');
  newCard.querySelector('.element__like-button').addEventListener('click', function(evt) {
    evt.target.classList.toggle('element__like-button_active');
  });
  newCard.querySelector('.element__delete-button').addEventListener('click', handleDeleteCard);
  cardName.textContent = card.name;
  cardPhoto.setAttribute('src', card.link);
  cardPhoto.setAttribute('alt', `Фотография ${card.name}`);
  cardPhoto.addEventListener('click', () => openPopupImage(card.name, card.link));
  return newCard;
}

initialCards.forEach(card => {
  cardList.append(createCard(card));
});

const formAddNewPlace = document.forms['new-place-form'];
formAddNewPlace.addEventListener('submit', handleNewPlaceFormSubmit);

const newPlaceName = formAddNewPlace.querySelector('.popup__input_type_place-name');
const newPlaceLink = formAddNewPlace.querySelector('.popup__input_type_picture-ref');

function handleNewPlaceFormSubmit (evt) {
  evt.preventDefault();
  const newCard = {
    name: newPlaceName.value,
    link: newPlaceLink.value
  };
  cardList.prepend(createCard(newCard));
  closePopup(popupAddNewPlace);
};

function handleDeleteCard(evt) {
const thisElement = evt.target.closest('.element');
thisElement.remove();
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
