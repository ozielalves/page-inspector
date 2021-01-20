import { observable, action } from 'mobx';

export interface IRequest {
  apiId: string;
  keyword: string;
}

class RequestState {
  @observable apiId: string = "";

  @observable keyword: string = "";

  @action setKeyword = (value: string) => {
    this.keyword = value;
  };
  @action setApiId = (value: string) => {
    this.apiId = value;
  };
}

export const requestState = new RequestState();
