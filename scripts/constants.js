export const initialCards = [
    {
        title: 'Осьминог',
        link: 'https://images.theconversation.com/files/57412/original/5qfxx2p7-1409066006.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop'
    },
    {
        title: 'Пиранья',
        link: 'https://www.meme-arsenal.com/memes/c92f1c2b426ec5ad2fb0a300dcdccabe.jpg'
    },
    {
        title: 'За минуту до...',
        link: 'https://ribalych.ru/wp-content/uploads/2017/01/fantasticheskie-tvari_356.jpg'
    },
    {
        title: 'Чача',
        link: 'https://live4fun.ru/data/old_pictures/img_14422104_21_0.jpg'
    },
    {
        title: 'Русалка',
        link: 'https://cs12.pikabu.ru/post_img/2020/08/07/11/1596826080178075264.webp'
    },
    {
        title: '???',
        link: 'https://mainstyles.ru/uploads/%D0%90%D0%BA%D0%B2%D0%B0%D0%BC%D0%B5%D0%BD_00.jpg'
    }
]

//Переменны Попапов
export const popupProfile = document.querySelector('.popup_profile');
export const popupCloseProfile = document.querySelector('.popup__close_profile');
export const popupFormProfile = document.querySelector('.popup__form-profile');
export const popupFormAddCards = document.querySelector('.popup__form-add');
export const popupInputTitle = document.querySelector('.popup__input_name_title');
export const popupInputSubtitle = document.querySelector('.popup__input_name_subtitle');
export const editButton = document.querySelector('.profile__edit-button');
export const profileTitle = document.querySelector('.profile__title');
export const profileSubtitle = document.querySelector('.profile__subtitle');

//Переменные ПЛЮС кнопок
export const popupButtonPlus = document.querySelector('.profile__add-button');
export const popupAddCards = document.querySelector('.popup_plus');
export const popupClosePlus = document.querySelector('.popup__close_plus');
export const elements = document.querySelector('.elements');
export const nameCardTitle = document.querySelector('.popup__input_name_cardtitle');
export const urlCardTitle = document.querySelector('.popup__input_url_cardtitle');

////Элементы Templ
export const template = document.querySelector('#card').content;
export const saveProfileButton = document.querySelector('.popup__button_save_profile');
export const saveCardButton = document.querySelector('.popup__button_save_card');

//Лайтбокс темы
export const popupLightbox = document.querySelector('.popup_lightbox');
export const lightBoxElement = document.querySelector('.lightbox');
export const lightBoxImage = lightBoxElement.querySelector('.lightbox__image');
export const lightBoxTitle = lightBoxElement.querySelector('.lightbox__title');
export const popupCloseLightbox = document.querySelector('.popup__close_lightbox');

//Селектора форм в FormValidator
export const settings = {
    formSelector: '.popup__form',
    submitButtonSelector: '.popup__button',
    buttonInvalidClass: 'popup__button_inactive',
    inputSelector: '.popup__input',
    inputInvalidClass: '.popup__input_state_invalid',
}