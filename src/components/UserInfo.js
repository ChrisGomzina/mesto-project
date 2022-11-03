export default class UserInfo {
  constructor({ userName, userInfo, userAvatar }) {
    this._user = document.querySelector(userName);
    this._userInfo = document.querySelector(userInfo);
    this._avatar = document.querySelector(userAvatar);
  }

  //Получение информации о пользователе
  getUserInfo() {
    const userData = {
      name: this._user.textContent,
      about: this._userInfo.textContent,
      avatar: this._avatar,
    };
    return userData;
  }

  //Изменение информации о пользователе
  setUserInfo(data) {
    this._user.textContent = data.name;
    this._userInfo.textContent = data.about;
    this._avatar.src = data.avatar;
  }
}
