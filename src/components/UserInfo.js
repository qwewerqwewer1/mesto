export class UserInfo {
  constructor(profileNameSelector, profileStatusSelector, profileAvatar) {
    this._profileName = document.querySelector(profileNameSelector);
    this._profileStatus = document.querySelector(profileStatusSelector);
    this._profileAvatar = document.querySelector(profileAvatar);
    this._profileId = '';

  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      about: this._profileStatus.textContent,
      avatar: this._profileAvatar.src,
      id: this._profileId
    }
  }

  setUserInfo(name, about, id) {
    this._profileName.textContent = name;
    this._profileStatus.textContent = about;
    this._profileId = id
  }

  setUserAvatar(avatar) {
    this._profileAvatar.style.backgroundImage = `url('${avatar}')`;
  }
}