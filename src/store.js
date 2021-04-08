import {createStore} from 'vuex'
import Vuex from 'vuex' 
 
import { setToken } from '@/utils/localToken';
import { removeToken } from "@/utils/localToken";
const store = new Vuex.Store({
    state: {
        loginStatus:'error',
        currentUser: {},
    },
    mutations: {
        changeLoginStatus(state, payload) {
          
            state.loginStatus = payload;
        },
        saveCurrentUser(state, payload) {
            state.currentUser =  payload
    },},
    actions: {
          //登录
        async loginsucess({ commit }, payload) {
             //更新登录状态
            commit('changeLoginStatus',payload);
        },
        async logout({ commit }) {
            try {
           
           
              await removeToken();
              commit('saveCurrentUser',  {
                id: 0,
                name: '',
                avatar: '',
                roles: [],
              });
              return true;
            } catch (error) {
              return false;
            }
          }
    }
  })
export default store
 