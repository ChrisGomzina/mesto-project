import { nameProfile,
  jobProfile,
  nameInput,
  jobInput,
  profilePopup} from './constants.js';

import { closePopup } from './popup.js';

//Ниже реализована функция редактирование имени и информации о себе
export function formSubmitHandler(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closePopup(profilePopup);
}
