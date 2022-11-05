export default class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  //Проверка ответа сервера
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
  }

  //Получение информации о пользователе
  getProfileInfo() {
    return this._specifyRequest("GET", "/users/me");
  }

  //Получение карточек с сервера
  renderCards() {
    return this._specifyRequest("GET", "/cards");
  }

  //Редактирование профиля
  patchProfileInfo(name, about) {
    return this._specifyRequest("PATCH", "/users/me", {
      name: name,
      about: about,
    });
  }

  //Обновление аватара
  patchProfileAvatar(data) {
    return this._specifyRequest("PATCH", "/users/me/avatar", {
      avatar: data.avatar,
    });
  }

  //Добавление новой карточки
  postNewCard(data) {
    return this._specifyRequest("POST", "/cards", {
      link: data.image,
      name: data.place,
    });
  }

  //Удаление карточки
  deleteCard(cardId) {
    return this._specifyRequest("DELETE", `/cards/${cardId}`);
  }

  //Лайки
  likeCard(cardId) {
    return this._specifyRequest("PUT", `/cards/likes/${cardId}`);
  }

  //Дизлайки
  unlikeCard(cardId) {
    return this._specifyRequest("DELETE", `/cards/likes/${cardId}`);
  }
}
