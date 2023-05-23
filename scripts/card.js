export class Card {

  constructor (cardData, cardTemplateselector, handleCardClick) {
    this._template = document.querySelector(cardTemplateselector).content.children[0];
    this._card = this._template.cloneNode(true);
    this._data = cardData;
    this._cardPhoto = this._card.querySelector('.element__photo');
    this._placeName = this._card.querySelector('.element__name');
    this._handleCardClick = handleCardClick;
  }


  _createCard () {
    this._cardPhoto.setAttribute('src', this._data.link);
    this._cardPhoto.setAttribute('alt', `Фотография ${this._data.name}`);
    this._placeName.textContent = this._data.name;
    this._setEventListeners();
  }

  _setEventListeners () {
    this._card.querySelector('.element__like-button').addEventListener('click',this._onLike);
    this._card.querySelector('.element__delete-button').addEventListener('click', this._onDelete);
    this._cardPhoto.addEventListener('click', () => {
      this._handleCardClick(this._data.name, this._data.link);
    });
  }


  _onLike = (evt) => {
    evt.target.classList.toggle('element__like-button_active');
  }

  _onDelete =() => {
    this._card.remove();
  }

  returnCard () {
    this._createCard();
    return this._card;
  }
}

