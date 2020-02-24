import { observable, action, reaction } from 'mobx';
// import axios from 'axios';

export default class Common {
  @observable title;

  @observable appLoaded = true;

  @observable token = window.localStorage.getItem('jwt');

  constructor() {
    this.title = 'My App';
    reaction(
      () => this.token,
      token => {
        if (token) {
          window.localStorage.setItem('jwt', token);
        } else {
          window.localStorage.removeItem('jwt');
        }
      },
    );
  }

  @action setToken(token) {
    this.token = token;
  }

  @action setTitle(title) {
    this.title = title;
  }

  @action setAppLoaded() {
    this.appLoaded = true;
  }
}
