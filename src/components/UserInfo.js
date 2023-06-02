export default class UserInfo {
  constructor({ selectorUserName, selectorUserInfo }) {
    this._userNameElement = document.querySelector(selectorUserName);
    this._userInfoElement = document.querySelector(selectorUserInfo);
  }

  getUserInfo() {
    const userData = {
      userName: this._userNameElement.textContent,
      userInfo: this._userInfoElement.textContent
    };
    return userData;
  }

  setUserInfo({ userName, userInfo }) {
    this._userNameElement.textContent = userName;
    this._userInfoElement.textContent = userInfo;
  };
}
