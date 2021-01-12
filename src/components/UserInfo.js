export class UserInfo {
  constructor(profileNameSelector, profileStatusSelector) {
    this._profileName = document.querySelector(profileNameSelector);
    this._profileStatus = document.querySelector(profileStatusSelector);
  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      status: this._profileStatus.textContent
    }
  }

  setUserInfo({ data }) {
    this._profileName.textContent = data.name;
    this._profileStatus.textContent = data.status;
  }
}