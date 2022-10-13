export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  //Проверка ответа сервера
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  };

  //Получение информации о пользователе
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
    .then(res => _checkResponse(res));
  };

  //Получение карточек с сервера
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: this._headers
    })
    .then(res => _checkResponse(res));
  };

  //Редактирование профиля
  editUserInfo(userName, userJob) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: userName,
        about: userJob
      })
    })
    .then(res => _checkResponse(res));
  };

   //Добавление новой карточки
  addCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
    .then(res => _checkResponse(res));
  };

  //Лайки
  likeCard(id) {
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      method: 'PUT',
      headers: this._headers
    })
    .then(res => _checkResponse(res));
  };

  //Дизлайки
  dislikeCard(id) {
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(res => _checkResponse(res));
  };

  //Удаление карточки
  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(res => _checkResponse(res));
  };

  //Обновление аватара
  editAvatar(avatarURL) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarURL
      })
    })
    .then(res => _checkResponse(res));
  };

}

const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-15',
  headers: {
    'content-type': 'application/json',
    'authorization': '9cfce386-84bd-41a8-ae69-e779d7b6a47d'
  }
});




