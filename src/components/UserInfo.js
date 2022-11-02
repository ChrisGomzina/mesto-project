export default class UserInfo {
  constructor({ userName, userInfo, userAvatar }) {
    this._user = document.querySelector(userName);
    this._userInfo = document.querySelector(userInfo);
    this._avatar = document.querySelector(userAvatar);
  }

  getUserInfo() {
    const userData = {
      name: this._user.textContent,
      about: this._userInfo.textContent,
      // id: this._userId,
      avatar: this._avatar,
    };
    return userData;
  }

  setUserInfo(data) {

    this._user.textContent = data.name;
    this._userInfo.textContent = data.about;
    // this._userId = data.id;
    this._avatar.src = data.avatar;
  }

  // getUserId() {
  //   return this._useerId;
  // }

  // getUserAvatar() {
  //   return this._avatar.src;
  // }
}
