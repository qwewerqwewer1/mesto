export class Api {
  constructor({ address, token, groupId }) {
    this._address = address;
    this._token = token;
    this._groupId = groupId;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  //GET
  _get(url) {
    return fetch(url, {
      headers: {
        authorization: this._token
      }
    })
      .then(this._checkResponse)
  }

  //PATCH
  _patch(url, body) {
    return fetch(url, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body
    })
      .then(this._checkResponse)
  }

  //POST
  _post(url, body) {
    return fetch(url, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body
    })
      .then(this._checkResponse)
  }

  //PUT
  _put(url) {
    return fetch(url, {
      method: 'PUT',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
      .then(this._checkResponse)
  }

  _delete(url) {
    return fetch(url, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
      .then(this._checkResponse)
  }



  getCards() {
    const cardsUrl = `${this._address}${this._groupId}/cards`
    return this._get(cardsUrl);
  }


  getUserInfo() {
    const userUrl = `${this._address}${this._groupId}/users/me`
    return this._get(userUrl);
  }

  setProfile(name, about) {
    const userUrl = `${this._address}${this._groupId}/users/me`
    const body = JSON.stringify({
      name: name,
      about: about,
    })
    return this._patch(userUrl, body)
  }

  setAvatar(avatar) {
    const userUrl = `${this._address}${this._groupId}/users/me/avatar`
    const body = JSON.stringify({
      avatar: avatar
    })
    return this._patch(userUrl, body)
  }

  postCard(name, link) {
    const userUrl = `${this._address}${this._groupId}/cards`
    const body = JSON.stringify({
      name: name,
      link: link
    })
    return this._post(userUrl, body)
  }

  showLike(cardId) {
    const userUrl = `${this._address}${this._groupId}/cards/${cardId}`
    return this._get(userUrl)
      .then((res) => {
        console.log(res)
      })
  }

  setLike(cardId) {
    const userUrl = `${this._address}${this._groupId}/cards/likes/${cardId}`
    return this._put(userUrl)
  }

  delLike(cardId) {
    const userUrl = `${this._address}${this._groupId}/cards/likes/${cardId}`
    return this._delete(userUrl)
  }

  delCard(cardId) {
    const userUrl = `${this._address}${this._groupId}/cards/${cardId}`
    return this._delete(userUrl)
  }
}

