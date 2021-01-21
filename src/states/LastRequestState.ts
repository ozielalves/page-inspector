import { observable, action } from 'mobx';

class LastRequestState {
  @observable apiId: string = "";

  @observable keyword: string = "";

  @action setKeyword = (value: string) => {
    this.keyword = value;
  };
  @action setApiId = (value: string) => {
    this.apiId = value;
  };
}

export const lastRequestState = new LastRequestState();
