import { observable, action } from 'mobx';

export interface IRequest {
  id: string;
  keyword: string;
}

class RequestState {
  @observable id: string = "";

  @observable keyword: string = "";

  @action setKeyword = (value: string) => {
    this.keyword = value;
  };
  @action setId = (value: string) => {
    this.keyword = value;
  };
}

export const requestState = new RequestState();
