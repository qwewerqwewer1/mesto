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