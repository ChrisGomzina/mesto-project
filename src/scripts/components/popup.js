//Функция открытия мадального окна
export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscapeKey);
}

//Функция закрытия мадального окна
export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscapeKey);
}

//Закрытие модального окна кнопкой escape
export function handleEscapeKey(evt) {
  if (evt.key === "Escape") {
    const activePopup = document.querySelector('.popup_opened');
    if (activePopup) {
      closePopup(activePopup);
    }
  }
};

