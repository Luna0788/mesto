export default class Card {

  constructor (cardData, userId, cardTemplateSelector, handleCardClick, handleDeleteClick, handleLikeClick, handleDeleteLikeClick) {
    this._template = document.querySelector(cardTemplateSelector).content.children[0];
    this._card = this._template.cloneNode(true);
    this._data = cardData;
    this._likes = this._data.likes;
    this._likeButton = this._card.querySelector('.element__like-button');
    this._cardPhoto = this._card.querySelector('.element__photo');
    this._placeName = this._card.querySelector('.element__name');
    this._likeCounter = this._card.querySelector('.element__like-counter');
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteLikeClick = handleDeleteLikeClick;
    this._userId = userId;
    this._owner = cardData.owner._id;
    this._trashButton = null;
  }


  _createCard () {
    this._cardPhoto.src = this._data.link;
    this._cardPhoto.alt = `Фотография ${this._data.name}`;
    this._placeName.textContent = this._data.name;
    this._likeCounter.textContent = this._data.likes && this._data.likes.length ? this._data.likes.length : '';
    this._addTrashButton();
    this._checkOnewrsLike();
    this._setEventListeners();
  }

  _setEventListeners () {
    this._likeButton.addEventListener('click',() => {
      if (this._likeButton.classList.contains('element__like-button_active')) {
        this._handleDeleteLikeClick(this);
      }
      else {
        this._handleLikeClick(this);
      }
    });
    if (this._trashButton) {
      this._trashButton.addEventListener('click', () => {
        this._handleDeleteClick(this);
      });
    }
    this._cardPhoto.addEventListener('click', () => {
      this._handleCardClick(this._data);
    });
  }

  _addTrashButton () {
    if (this._data.owner['_id'] === this._userId) {
      this._trashButton = this._card.querySelector('.element__delete-button');
    }
    else {
      this._card.removeChild(this._card.querySelector('.element__delete-button'));
    }
  }

  delete =() => {
    this._card.remove();
  }

  returnCard () {
    this._createCard();
    return this._card;
  }

  updateCardInfo(newData) {
    this._data = newData;
    this._likes = this._data.likes;
    this._checkOnewrsLike();
    this._likeCounter.textContent = this._likes && this._likes.length ? this._likes.length : '';
  }

  getId() {
    return this._data._id;
  }

  _checkOnewrsLike() {
    if (this._likes.some((user) =>  user._id === this._userId)) {
      this._likeButton.classList.add('element__like-button_active');
    }
    else {
      this._likeButton.classList.remove('element__like-button_active');
    }
  }
}

