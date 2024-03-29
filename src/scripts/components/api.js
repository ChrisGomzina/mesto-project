export const config = {
  url: "https://nomoreparties.co/v1/plus-cohort-15",
  headers: {
    "content-type": "application/json",
    "authorization": "9cfce386-84bd-41a8-ae69-e779d7b6a47d"
  },
};

//Проверка ответа сервера
export function checkResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
};

//Получение информации о пользователе
export function getUserInfo() {
  return fetch(`${config.url}/users/me`, {
    method: 'GET',
    headers: config.headers
  })
  .then(res => checkResponse(res));
};

//Получение карточек с сервера
export function getInitialCards() {
  return fetch(`${config.url}/cards`, {
     method: 'GET',
     headers: config.headers
  })
  .then(res => checkResponse(res));
};

//Редактирование профиля
export function editUserInfo(userName, userJob) {
  return fetch(`${config.url}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: userName,
      about: userJob
    })
  })
  .then(res => checkResponse(res));
};

//Добавление новой карточки
export function addCard(data) {
  return fetch(`${config.url}/cards`, {
     method: 'POST',
     headers: config.headers,
     body: JSON.stringify({
        name: data.name,
        link: data.link
      })
  })
  .then(res => checkResponse(res));
};

//Лайки
export function likeCard(id) {
    return fetch(`${config.url}/cards/likes/${id}`, {
      method: 'PUT',
      headers: config.headers
    })
    .then(res => checkResponse(res));
  };

//Дизлайки
export function dislikeCard(id) {
    return fetch(`${config.url}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: config.headers
    })
    .then(res => checkResponse(res));
  };

//Удаление карточки
 export function deleteCard(id) {
    return fetch(`${config.url}/cards/${id}`, {
      method: 'DELETE',
      headers: config.headers
    })
    .then(res => checkResponse(res));
  };

//Обновление аватара
export function editAvatar(avatarURL) {
  return fetch(`${config.url}/users/me/avatar`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        avatar: avatarURL
      })
  })
  .then(res => checkResponse(res));
};

