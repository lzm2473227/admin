import {createStore} from 'vuex'
import Vuex from 'vuex' 
 
import { setToken } from '@/utils/localToken';
import { removeToken } from "@/utils/localToken";
const store = new Vuex.Store({
    state: {
        loginStatus:'error',
        currentUser: {},
        selectmenu:""
    },
    mutations: {
        changeLoginStatus(state, payload) {
          
            state.loginStatus = payload;
        },
        saveCurrentUser(state, payload) {
            state.currentUser =  payload
        },
        changeSelectmenu(state, payload) {
          state.selectmenu =  payload
  
         
      },
  },
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
          },
        async changeSelectmenu({commit},payload){
          commit('changeSelectmenu',payload);
        }
    }
  })
export default store
 