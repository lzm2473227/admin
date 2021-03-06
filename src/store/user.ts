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
  identities: string[],
  token: string,
 
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
    identities: [],
    token: "",
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
      // console.log(payload)
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
        // console.log(response);
        //判断权限
        // const { userDetails } = response;
        //const userDetails = response.identities[0]
        let userDetails = {
          id: 0,
          idNumber: '',
          name: '',
          roles: [],
          token:"",
          identities:[]
        };
        userDetails.
        id = response.uuid;
        userDetails.idNumber = response.idNumber;
        userDetails.name = response.name;
        userDetails.token = response.token;
        userDetails.identities = response.identities;
        const rolename = JSON.parse(localStorage.getItem('roleEnum'));
 
        // console.log(userDetails);
        
        // 什么情况？不是随便写验证码吗
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
          //门店管理员基础权限
          userDetails.roles = ['md', 'productlist', 'purchase', 'product', 'inventory', 'sale', 'setting', 'user', 'noreceive', 'receive', 'checkproduct', 'nocheckproduct', 'sales', 'nosale', 'storelist', 'machine',
        , 'power', 'newstore', 'clerklist', "newproduct", 'newclerk', 'advertmentlist', 'newadvertment', 'Authority','tab', 'userlv','newclerktwo','newproducttwo','newstoretwo','newadvertmenttwo','machinenew',
        ,'public','file','nobank','bank','commodity1','commodity2','integralrule','integralobj','memberset','newintegralrule','newintegralobj','newmemberset',"theme","themenew","consumerlist",
        ]
          let rolelv = ["clerk","shopowner",'citydistributor','provincedistributor','countrydistributor','sysuser'];//角色多重身份 【与indexlayouts下的index组件菜单对应。否则有权限，无菜单。只能手动输入路由】
 
          rolelv.forEach((item)=>{
            if(item=="clerk"){
              //店员身份权限
              userDetails.roles.push('clerk','clerknoreceive','clerkreceive','clerknocheckproduct','clerknosale','clerksale','clerkcheckproduct',
              'clerkbank','clerkguarantee','clerknoreceive','clerkreceive',"Sellinglist",'promotion',"newactivity","newselling","ruleOutGoods","newactivity2","newactivity3");
            }
            if(item=="shopowner"){
               //店长身份权限
              userDetails.roles.push('shopowner','shopownernoreceive','shopownerreceive','shopownernocheckproduct','shopownernosale','shopownersales','shopownercheckproduct','shopownerbank','shopownerguarantee',);
            }
            if(item=="citydistributor"){
              //市级管理员权限
              userDetails.roles.push('citydistributor','citydistributornoreceive','citydistributorreceive','citydistributornocheckproduct','citydistributornosale','citydistributorsales','citydistributorcheckproduct',
              'citydistributorbank','citydistributorguarantee',"citydistributorsale",);
            }
            if(item=="provincedistributor"){
              //省级管理员权限
              userDetails.roles.push('provincedistributor','provincedistributornoreceive','provincedistributorreceive','provincedistributornocheckproduct','provincedistributornosale','provincedistributorsales',
              'provincedistributorcheckproduct',"provincedistributorsale","provincedistributorbank","provincedistributorguarantee");
            }
            if(item=="countrydistributor"){
              //全国经销商权限
              userDetails.roles.push('countrydistributor','countrydistributorcheck','countrydistributornocheckproduct','countrydistributornocheckproduct','countrydistributornocheckproduct','countrydistributorcheckproduct',
              'countrydistributorreceive','countrydistributorsale','countrydistributornosale','countrydistributorsale','countrydistributorbank','countrydistributorguarantee',"countrydistributornoreceive");
            }
          })
          };
          function logistics(){
            userDetails.roles =['productlist','userlv']
          };
          function warehouse(){
            userDetails.roles =['productlist','userlv']
          };
          function factory(){
            userDetails.roles =['productlist','userlv']
          };
          function insurance(){
            userDetails.roles =['productlist','userlv']
          };
          function bank(){
            userDetails.roles =['productlist','userlv']
          };
          function kaihua(){
            userDetails.roles =['kh','product','productinfo','store','storeapproval','rolepower','funcmenu','khset','bank',
          'insurance','factory','warehouse','logistics','customer','sysuser','systemUser','userlist','consumerlist',
            "systemset","systemsetrole","systemsetmenu",'newuser',"dealer","newdealer","newbank","newsystemsetrole","newlogistics",
          "newconsumerlist","newlogistics","newwarehouse","newfactory","newinsurance","set","noset","account","noaccount","appropriation","noappropriation",
          'chexk','nochexk',"newsystemsetmenu"]
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