import { Mutation, Action } from 'vuex';
import { StoreModuleType } from "@/utils/store";
import { ResponseData } from '@/utils/request';
import { queryCurrent, queryMessage } from "@/services/user";
import { removeToken } from "@/utils/localToken";

export interface CurrentUser {
  id: number;
  idNumber: string;
  name: string;
  roles: string[];
  authList: string[],
}

export interface StateType {
  currentUser: CurrentUser;
  message: number;
}

export interface ModuleType extends StoreModuleType<StateType> {
  state: StateType;
  mutations: {
    saveCurrentUser: Mutation<StateType>;
    saveMessage: Mutation<StateType>;
  };
  actions: {
    fetchCurrent: Action<StateType, StateType>;
    fetchMessage: Action<StateType, StateType>;
    logout: Action<StateType, StateType>;
  };
}

const initState: StateType = {
  currentUser: {
    id: 0,
    idNumber: '',
    name: '',
    roles: [],
    authList: []
  },
  message: 0,
}

const StoreModel: ModuleType = {
  namespaced: true,
  name: 'user',
  state: {
    ...initState
  },
  mutations: {
    saveCurrentUser(state, payload) {
      state.currentUser = {
        ...initState.currentUser,
        ...payload,
      }
    },
    saveMessage(state, payload) {
      state.message = payload;
    }
  },
  actions: {
    async fetchCurrent({ commit }) {
      try {
        const response = JSON.parse(localStorage.getItem('loginuser'));
        //判断权限
        const { userDetails } = response;
        const rolename = JSON.parse(localStorage.getItem('roleEnum'));
        
        switch (rolename) {
          case "CUSTOMER":
            customer();
            break;
          case "STORE":
            store()
            break;
          case "LOGISTICS":
            logistics()
            break;
          case "WAREHOUSE":
            warehouse()
            break;
          case "FACTORY":
            factory()
            break;
          case "INSURANCE":
            insurance()
            break;
          case "BANK":
            bank()
            break;
          case "KAIHUA":
            kaihua()
            break;
          default:
             break;
            };
          //productlist 是商品列表
          function customer(){
            userDetails.roles =['productlist']
          };
          function store(){
          
                //门店管理员
          userDetails.roles = ['md', 'productlist', 'purchase', 'product', 'inventory', 'sale', 'setting', 'user', 'noreceive', 'receive', 'checkproduct', 'nocheckproduct', 'sales', 'nosale', 'storelist', 'machine',
        , 'power', 'newstore', 'clerklist', "newproduct", 'newclerk', 'advertmentlist', 'newadvertment', 'Authority','tab']
          };
          function logistics(){
            userDetails.roles =['productlist']
          };
          function warehouse(){
            userDetails.roles =['productlist']
          };
          function factory(){
            userDetails.roles =['productlist']
          };
          function insurance(){
            userDetails.roles =['productlist']
          };
          function bank(){
            userDetails.roles =['productlist']
          };
          function kaihua(){
             //凯华管理员
            userDetails.roles =['kh','product','productinfo','store','storeapproval','rolepower','funcmenu','khset','bank',
          'insurance','factory','warehouse','logistics','customer','sysuser']
          };
         
        commit('saveCurrentUser', userDetails || {});
        return true;
      } catch (error) {
        return false;
      }
    },
    async fetchMessage({ commit }) {
      try {
        const response: ResponseData = await queryMessage();
        const { data } = response;

        commit('saveMessage', data || 0);
        return true;
      } catch (error) {
        return false;
      }
    },
    async logout({ commit }) {
      try {
        await removeToken();
        commit('saveCurrentUser', { ...initState.currentUser });
        return true;
      } catch (error) {
        return false;
      }
    }
  }
}



export default StoreModel;
