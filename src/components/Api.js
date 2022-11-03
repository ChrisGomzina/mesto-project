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

  patchProfileAvatar(data) {
    return this._specifyRequest("PATCH", "/users/me/avatar", {
      avatar: data.avatar,
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
