class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkAnswer(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`${res.status} ${res.statusText}`);
    }
  }

  getUserInfo() {
    const requestUrl = this._baseUrl + `/users/me`;
    return fetch(requestUrl, {
      headers: this._headers,
    })
    .then(this._checkAnswer);
  }

  getInitialCards() {
    const requestUrl = this._baseUrl + '/cards';
    return fetch(requestUrl, {
      headers: this._headers,
    })
    .then(this._checkAnswer);
  }

  getDataFromServer() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()]);
  }

  updateUserInfo(body) {
    const requestUrl = this._baseUrl + `/users/me`;
    return fetch(requestUrl, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(body),
    })
    .then(this._checkAnswer);
  }

  addNewCard(body) {
    const requestUrl = this._baseUrl + '/cards';
    return fetch(requestUrl, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(body),
    })
    .then(this._checkAnswer);
  }

  removeCard(cardId) {
    const requestUrl = this._baseUrl + `/cards/${cardId}`;
    return fetch(requestUrl, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(this._checkAnswer);
  }

  addCardLike(cardId) {
    const requestUrl = this._baseUrl + `/cards/likes/${cardId}`;
    return fetch(requestUrl, {
      method: 'PUT',
      headers: this._headers,
    })
    .then(this._checkAnswer);
  }

  deleteCardLike(cardId) {
    const requestUrl = this._baseUrl + `/cards/likes/${cardId}`;
    return fetch(requestUrl, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(this._checkAnswer);
  }

  updateProfileAvatar(body) {
    const requestUrl = this._baseUrl + `/users/me/avatar`;
    return fetch(requestUrl, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(body),
    })
    .then(this._checkAnswer);
  }
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66',
  headers: {
    authorization: 'd7dcd0f2-c4b8-4c41-b858-1f8610d52fd1',
    'Content-Type': 'application/json'
  }
});

export default api;