const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const editProfileButton = document.querySelector('.button_type_edit');
const editProfilePopup = document.querySelector('.popup_type_profile-edit');

const closePopupButtons = document.querySelectorAll('.popup__toggle');
closePopupButtons.forEach((closeButton) => closeButton.addEventListener('click', function (evt) {
  const thisPopup = evt.target.closest('.popup');
  closePopup(thisPopup);
}));

const addNewPlaceButton = document.querySelector('.button_type_add');
const addNewPlacePopup = document.querySelector('.popup_type_new-place');

const userNameElement = document.querySelector('.profile__name');
let userName = userNameElement.textContent;
const userAboutElement = document.querySelector('.profile__additional');
let userAbout = userAboutElement.textContent;

const userNameInput = document.querySelector('.popup__input_type_name');
userNameInput.value = userName;

const userAboutInput = document.querySelector('.popup__input_type_additional');
userAboutInput.value = userAbout;

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

editProfileButton.addEventListener('click', function() {
  openPopup(editProfilePopup);
});

addNewPlaceButton.addEventListener('click', function() {
  openPopup(addNewPlacePopup);
});

function handleEditFormSubmit (evt) {
  evt.preventDefault();
  let newUserName = userNameInput.value;
  let newUserAbout = userAboutInput.value;
  userNameElement.textContent = newUserName;
  userAboutElement.textContent = newUserAbout;
  closePopup(editProfilePopup);
}

const editForm = document.forms['edit-form'];
editForm.addEventListener('submit', handleEditFormSubmit);

const cardList =  document.querySelector('.element-list');
const cardTemplate = document.querySelector('#elementTemplate').content;

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
  return newCard;
}

initialCards.forEach(card => {
  cardList.append(createCard(card));
});

const newPlaceForm = document.forms['new-place-form'];
newPlaceForm.addEventListener('submit', handleNewPlaceFormSubmit);

function handleNewPlaceFormSubmit (evt) {
  evt.preventDefault();
  const newCard = {
    name: newPlaceForm.querySelector('.popup__input_type_place-name').value,
    link: newPlaceForm.querySelector('.popup__input_type_picture-ref').value
  };
  cardList.prepend(createCard(newCard));
  closePopup(addNewPlacePopup);
};

function handleDeleteCard(evt) {
const thisElement = evt.target.closest('.element');
thisElement.remove();
};
