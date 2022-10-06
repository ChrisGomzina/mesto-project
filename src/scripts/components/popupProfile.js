import { nameProfile,
  jobProfile,
  nameInput,
  jobInput,
  profilePopup} from './constants.js';

import { closePopup } from './popup.js';

import { editUserInfo } from './api.js';

//Ниже реализована функция редактирование имени и информации о себе
export function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  editUserInfo(nameInput.value, jobInput.value)
    .then((res) => {
      nameProfile.textContent = nameInput.value;
      jobProfile.textContent = jobInput.value;
      closePopup(profilePopup);
    })

    .catch((err) => {
      console.log(err);
    })
}
