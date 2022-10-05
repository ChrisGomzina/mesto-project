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
export function getUserInfo(config) {
  return fetch(`${config.url}/users/me`, {
    method: 'GET',
    headers: config.headers
  })
  .then(res => checkResponse(res));
};

//Получение карточек с сервера
export function getInitialCards(config) {
  return fetch(`${config.url}/cards`, {
     method: 'GET',
     headers: config.headers
  })
  .then(res => checkResponse(res));
};

//Редактирование профиля
export function editUserInfo(config, userData) {
  return fetch(`${config.url}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: userData.userName,
      about: userData.userJob
    })
  })
  .then(res => checkResponse(res));
};

//Добавление новой карточки
export function addCard(config, data) {
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
export function likeCard(config, id) {
    return fetch(`${config.url}/cards/likes/${id}`, {
      method: 'PUT',
      headers: config.headers
    })
    .then(res => checkResponse(res));
  };

//Дизлайки
export function dislikeCard(config, id) {
    return fetch(`${config.url}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: config.headers
    })
    .then(res => checkResponse(res));
  };

//Удаление карточки
 export function deleteCard(config, id) {
    return fetch(`${config.url}/cards/${id}`, {
      method: 'DELETE',
      headers: config.headers
    })
    .then(res => checkResponse(res));
  };

//Обновление аватара
export function editAvatar(config, data) {
  return fetch(`${config.url}/users/me/avatar`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        avatar: data.avatar
      })
  })
  .then(res => checkResponse(res));
};

export function getAllData() {
  return Promise.all([getInitialCards(), getUserInfo()]);
};
