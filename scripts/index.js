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
const closeProfileButton = document.querySelector('.popup__toggle');

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

closeProfileButton.addEventListener('click', function() {
  closePopup(editProfilePopup);
});

function handleFormSubmit (evt) {
  evt.preventDefault();
  let newUserName = userNameInput.value;
  let newUserAbout = userAboutInput.value;
  userNameElement.textContent = newUserName;
  userAboutElement.textContent = newUserAbout;
  closePopup(editProfilePopup);
}

const formElement = document.forms['edit-form'];
formElement.addEventListener('submit', handleFormSubmit);

const cardList =  document.querySelector('.element-list');
const cardTemplate = document.querySelector('#elementTemplate').content;

function createCard(card) {
  const newCard = cardTemplate.cloneNode(true);
  const cardPhoto = newCard.querySelector('.element__photo');
  const cardName = newCard.querySelector('.element__name');
  cardName.textContent = card.name;
  cardPhoto.setAttribute('src', card.link);
  cardPhoto.setAttribute('alt', `Фотография ${card.name}`);

  cardList.append(newCard);
}

initialCards.forEach(createCard);
