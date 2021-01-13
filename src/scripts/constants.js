import one from '../images/1.jpg';
import two from '../images/2.jpg';
import three from '../images/3.jpg';
import four from '../images/4.jpg';
import five from '../images/5.jpg';
import six from '../images/6.jpg';


export const initialCards = [
    {
        title: 'BMW',
        link: one
    },
    {
        title: 'Winter',
        link: two
    },
    {
        title: '!Steve Jobs',
        link: three
    },
    {
        title: 'Vine',
        link: four
    },
    {
        title: 'New Year',
        link: five
    },
    {
        title: 'JS',
        link: six
    }
]

export const elements = document.querySelector('.elements');
export const editButton = document.querySelector('.profile__edit-button');
export const popupFormProfile = document.querySelector('.popup__form-profile');
export const popupFormAddCards = document.querySelector('.popup__form-add');
export const popupInputTitle = document.querySelector('.popup__input_name_title');
export const popupInputSubtitle = document.querySelector('.popup__input_name_subtitle');
export const popupButtonPlus = document.querySelector('.profile__add-button');

//Селектора форм в FormValidator
export const settings = {
    formSelector: '.popup__form',
    submitButtonSelector: '.popup__button',
    buttonInvalidClass: 'popup__button_inactive',
    inputSelector: '.popup__input',
    inputInvalidClass: '.popup__input_state_invalid',
}