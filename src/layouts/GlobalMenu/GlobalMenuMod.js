// import Serv from './OrderDetailServ';
import { observable, action, runInAction, configure } from 'mobx';
import { DB } from '@/utils/DB';

configure({ enforceActions: true });

const state = function () {
  return {
    currentRoute: DB.get('currentRoute', 'session') || {},
    routeCaches: DB.get('routeCaches', 'session') || [],
  };
};

class GlobalMenuMod {
  constructor() {}

  @observable state = state();

  @action
  updateStore(payload) {
    this.state = {
      ...this.state,
      ...payload,
    };
  }

  // @action
  // async getDetail(id) {
  //   let { resultCode, data } = await Serv.getDetail({ id });
  //   runInAction(() => {
  //     if (resultCode + '' === '0') {
  //       this.state.data = data;
  //     }
  //   });
  // }
}

const mod = new GlobalMenuMod();
export default mod;
