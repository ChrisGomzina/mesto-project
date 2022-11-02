export default class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  _specifyRequest(method, way, body = "") {
    const inputs = {
      method: method,
      headers: this.headers,
    };

    if (method != "GET" && body) inputs.body = JSON.stringify(body);
    return fetch(`${this.baseUrl}${way}`, inputs)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  getProfileInfo() {
    return this._specifyRequest("GET", "/users/me");
  }

  renderCards() {
    return this._specifyRequest("GET", "/cards");
  }

  patchProfileInfo(name, about) {
    return this._specifyRequest("PATCH", "/users/me", {
      name: name,
      about: about,
    });
  }

  patchProfileAvatar(avatar) {
    return this._specifyRequest("PATCH", "/users/me/avatar", {
      avatar: avatar,
    });
  }

  postNewCard(data) {
    return this._specifyRequest("POST", "/cards", {
      link: data.image,
      name: data.place,
    });
  }

  deleteCard(cardId) {
    return this._specifyRequest("DELETE", `/cards/${cardId}`);
  }

  likeCard(cardId) {
    return this._specifyRequest("PUT", `/cards/likes/${cardId}`);
  }

  unlikeCard(cardId) {
    return this._specifyRequest("DELETE", `/cards/likes/${cardId}`);
  }
}

// export default class Api {
//   constructor(options) {
//     this._baseUrl = options.baseUrl;
//     this._headers = options.headers;
//   }

//   //Проверка ответа сервера
//   _checkResponse(res) {
//     if (res.ok) {
//       return res.json();
//     } else {
//       return Promise.reject(`Ошибка: ${res.status}`);
//     }
//   };

//   //Получение информации о пользователе
//   getUserInfo() {
//     return fetch(`${this._baseUrl}/users/me`, {
//       method: 'GET',
//       headers: this._headers
//     })
//     .then(res => _checkResponse(res));
//   };

//   //Получение карточек с сервера
//   getInitialCards() {
//     return fetch(`${this._baseUrl}/cards`, {
//       method: 'GET',
//       headers: this._headers
//     })
//     .then(res => _checkResponse(res));
//   };

//   //Редактирование профиля
//   editUserInfo(userName, userJob) {
//     return fetch(`${this._baseUrl}/users/me`, {
//       method: 'PATCH',
//       headers: this._headers,
//       body: JSON.stringify({
//         name: userName,
//         about: userJob
//       })
//     })
//     .then(res => _checkResponse(res));
//   };

//    //Добавление новой карточки
//   addCard(data) {
//     return fetch(`${this._baseUrl}/cards`, {
//       method: 'POST',
//       headers: this._headers,
//       body: JSON.stringify({
//         name: data.name,
//         link: data.link
//       })
//     })
//     .then(res => _checkResponse(res));
//   };

//   //Лайки
//   likeCard(id) {
//     return fetch(`${this._baseUrl}/cards/likes/${id}`, {
//       method: 'PUT',
//       headers: this._headers
//     })
//     .then(res => _checkResponse(res));
//   };

//   //Дизлайки
//   dislikeCard(id) {
//     return fetch(`${this._baseUrl}/cards/likes/${id}`, {
//       method: 'DELETE',
//       headers: this._headers
//     })
//     .then(res => _checkResponse(res));
//   };

//   //Удаление карточки
//   deleteCard(id) {
//     return fetch(`${this._baseUrl}/cards/${id}`, {
//       method: 'DELETE',
//       headers: this._headers
//     })
//     .then(res => _checkResponse(res));
//   };

//   //Обновление аватара
//   editAvatar(avatarURL) {
//     return fetch(`${this._baseUrl}/users/me/avatar`, {
//       method: 'PATCH',
//       headers: this._headers,
//       body: JSON.stringify({
//         avatar: avatarURL
//       })
//     })
//     .then(res => _checkResponse(res));
//   };

// }

// const api = new Api({
//   baseUrl: 'https://nomoreparties.co/v1/plus-cohort-15',
//   headers: {
//     'content-type': 'application/json',
//     'authorization': '9cfce386-84bd-41a8-ae69-e779d7b6a47d'
//   }
// });
