import { observable, action, computed } from 'mobx';
import { get } from 'axios';

export default class Common {
  @observable title;

  @observable data;

  @observable appLoaded = true;

  constructor() {
    this.title = 'My App';
    this.data = [];
    this.getData();
  }

  @action getData() {
    get('http://localhost:3000/api/v1/customers').then(data => {
      // eslint-disable-next-line no-console
      // console.log(data.data.data);
      this.data.replace(data.data.data);
    });
  }

  @computed get datas() {
    return this.data.slice();
  }

  @action setTitle(title) {
    this.title = title;
  }

  @action setAppLoaded() {
    this.appLoaded = true;
  }
}
