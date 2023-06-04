export default class UserInfo {
  constructor({ selectorUserName, selectorUserInfo, selectorAvatar, userId }) {
    this._userNameElement = document.querySelector(selectorUserName);
    this._userInfoElement = document.querySelector(selectorUserInfo);
    this._userAvatarElement = document.querySelector(selectorAvatar);
    this._id = userId;
  }

  getUserInfo() {
    const userData = {
      userName: this._userNameElement.textContent,
      userInfo: this._userInfoElement.textContent,
      userId: this._id
    };
    return userData;
  }

  setUserInfo({ userName, userInfo, avatarLink, userId }) {
    this._userNameElement.textContent = userName;
    this._userInfoElement.textContent = userInfo;
    this._userAvatarElement.src = avatarLink;
    this._id = userId;
  };
}
