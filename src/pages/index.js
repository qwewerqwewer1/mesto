import './index.css';

import { Card } from '../components/Card.js'
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupDeleteCard } from '../components/PopupDeleteCard.js'
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';

import {
  token,
  elemAvatar,
  popupPhoto,
  editButton,
  popupFormProfile,
  popupInputTitle,
  popupInputSubtitle,
  popupButtonPlus,
  popupFormAddCards,
  settings,
} from '../scripts/constants.js';


// Функция Открытия профиля
function openProfileEditForm() {
  const userData = userInfo.getUserInfo();
  popupInputTitle.value = userData.name;
  popupInputSubtitle.value = userData.about;
  editProfileFormValidation.resetValidationState();
  editProfilePopup.open();
}

// Функция «Открыть форму добавления места»
function openPlaceAddForm() {
  addPlaceFormValidation.resetValidationState();
  addPlacePopup.open();
}


function openPopupAddPhoto() {
  popupPhotoFormValidation.resetValidationState();
  avatarPopup.open();
}

// Попап редактирования профиля
const editProfilePopup = new PopupWithForm('.popup_profile', (evt, fields) => {
  evt.preventDefault();
  editProfilePopup.renderLoading(true);
  api.setProfile(fields['profileName'], fields['profileProfession'])
    .then(result => {
      userInfo.setUserInfo(result.name, result.about)
      editProfilePopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      editProfilePopup.renderLoading(false);
    });
})


// Функция создания карточки
function createCard(cardItem) {
  const myId = userInfo.getUserInfo().id
  let isLikedApi = false
  cardItem.likes.forEach((obj) => {
    if (obj._id === myId) {
      isLikedApi = true
    }
  })

  const isOwner = cardItem.owner._id === myId

  const card = new Card({
    data: cardItem,
    isLiked: isLikedApi,
    isOwner: isOwner,
    handleRemoveButtonClick: (card) => {
      deleteCardPopup.open(card);
    },
    handleCardClick: () => { lightBoxPopup.open({ name: cardItem.name, link: cardItem.link }); },
    handleLikeClick: () => {
      if (!card._isLiked) {
        api.setLike(card.id)
          .then(res => {
            card.setLikes(res.likes.length)
            card.changeStatus()
          })
      } else {
        api.delLike(card.id)
          .then(res => {
            card.setLikes(res.likes.length)
            card.changeStatus()
          })
      }
    }
  }, 'card');

  return card.generateCard();
}

const avatarPopup = new PopupWithForm('.popup_photo', (evt, fields) => {
  evt.preventDefault()
  avatarPopup.renderLoading(true);
  api.setAvatar(fields['inputPhoto'])
    .then(result => {
      userInfo.setUserAvatar(result.avatar)
      avatarPopup.close()
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      avatarPopup.renderLoading(false);
    });
});
avatarPopup.setEventListeners();


const deleteCardPopup = new PopupDeleteCard('.popup_delete-card', (evt, card) => {
  evt.preventDefault();
  api.delCard(card.id)
    .then(() => {
      card.deleteCard()
      deleteCardPopup.close()
    })
    .catch((err) => {
      console.log(err)
    })
})

deleteCardPopup.setEventListeners()

const cardList = new Section(
  {
    renderer: (data) => {
      cardList.appendItem(createCard(data));
    }
  }, '.elements'
);

editProfilePopup.setEventListeners();

// Попап редактирования нового места
const addPlacePopup = new PopupWithForm('.popup_plus', (evt, fields) => {
  evt.preventDefault();
  addPlacePopup.renderLoading(true);
  api.postCard(fields['addCardName'], fields['addCardUrl'])
    .then(res => {
      cardList.prependItem(createCard(res));
      addPlacePopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      addPlacePopup.renderLoading(false);
    });
});
addPlacePopup.setEventListeners();


// Попап с картинкой
const lightBoxPopup = new PopupWithImage('.popup_lightbox');
lightBoxPopup.setEventListeners();

// Информация о пользователе
const userInfo = new UserInfo('.profile__title', '.profile__subtitle', '.profile__avatar');

// Валидация форм
const editProfileFormValidation = new FormValidator(popupFormProfile, settings);
editProfileFormValidation.enableValidation();
const addPlaceFormValidation = new FormValidator(popupFormAddCards, settings);
addPlaceFormValidation.enableValidation();
const popupPhotoFormValidation = new FormValidator(popupPhoto, settings);
popupPhotoFormValidation.enableValidation();

// Открытие попапов при нажатии на кнопку
elemAvatar.addEventListener('click', openPopupAddPhoto);
editButton.addEventListener('click', openProfileEditForm);
popupButtonPlus.addEventListener('click', openPlaceAddForm);

//                                                 0.Данные API  
const api = new Api({
  address: 'https://mesto.nomoreparties.co/v1/',
  token: token,
  groupId: 'cohort-19',
});

//                                                 1.Загрузка информации о пользователе с сервера
api.getUserInfo()
  .then(resApi => {
    userInfo.setUserInfo(resApi.name, resApi.about, resApi._id)
    userInfo.setUserAvatar(resApi.avatar)
  })

//                                                 2. Загрузка карточек с сервера
api.getCards()

  .then(res => {
    cardList.renderItems(res);
  })
//                                                 3. Слушатель лайка карточки
