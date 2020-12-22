/*const formSelector = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inputInvalidClass: 'popup__input_state_invalid',
  buttonInvalidClass: 'popup__button_inactive',
};

function hideError(form, input, config) {
  form.querySelector(`.${input.id}-error`).textContent = '';
  input.classList.remove(config.inputInvalidClass);
}

function showError(form, input, config) {
  form.querySelector(`.${input.id}-error`).textContent = input.validationMessage;
  input.classList.add(config.inputInvalidClass);
}

function checkInputValidity(form, input, config) {
  if (!input.validity.valid) {
    showError(form, input, config);
  } else {
    hideError(form, input, config);
  }
}

function setButtonState(button, isActive, config) {
  if (isActive) {
    button.classList.remove(config.buttonInvalidClass);
    button.disabled = false;
  } else {
    button.classList.add(config.buttonInvalidClass);
    button.disabled = true;
  }
}

function setEventListeners(form, config) {
  const inputsList = form.querySelectorAll(config.inputSelector);
  const submitButton = form.querySelector(config.submitButtonSelector);

  inputsList.forEach((input) => {
    input.addEventListener('input', () => {
      checkInputValidity(form, input, config);
      setButtonState(submitButton, form.checkValidity(), config);
    });
  });
}

function enableValidation(config) {
  const forms = document.querySelectorAll(config.formSelector);
  forms.forEach((form) => {
    setEventListeners(form, config);
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    const submitButton = form.querySelector(config.submitButtonSelector);
    setButtonState(submitButton, form.checkValidity(), config);
  });
}
enableValidation(FormValidator);*/



export class FormValidator {
  constructor(form, selectorsAndClasses) {
    this._selectorsAndClasses = selectorsAndClasses;
    this._form = form;
    this._inputList = Array.from(this._form.querySelectorAll(this._selectorsAndClasses.inputSelector));
    this._buttonElement = this._form.querySelector(this._selectorsAndClasses.submitButtonSelector);
  }

  _hideError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`)
    inputElement.classList.remove(this._selectorsAndClasses.inputInvalidClass);
    errorElement.classList.remove(this._selectorsAndClasses.inputInvalidClass)
    errorElement.textContent = ''
  }

  _showError(inputElement, errorMessage) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`)
    inputElement.classList.add(this._selectorsAndClasses.inputInvalidClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._selectorsAndClasses.inputInvalidClass)
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showError(inputElement, inputElement.validationMessage);
    } else {
      this._hideError(inputElement);
    }
  }

  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._toggleButtonState();
        this._checkInputValidity(inputElement);
      });
    });
  };

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _enableButton() {
    this._buttonElement.classList.remove(this._selectorsAndClasses.buttonInvalidClass);
    this._buttonElement.removeAttribute("disabled", false);
  }

  _disableButton() {
    this._buttonElement.classList.add(this._selectorsAndClasses.buttonInvalidClass);
    this._buttonElement.setAttribute("disabled", false);
  }

  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this._disableButton();
    } else {
      this._enableButton();
    }
  };

  enableValidation() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }

  resetValidationState() {
    this._inputList.forEach((inputElement) => {
      this._hideError(inputElement);
    })
    this._disableButton();
  }
}