const {
    VUE_APP_APIHOST
} = process.env
import axios from 'axios';
// import Vue from 'vue';
import router from '../layouts/IndexLayout/routes';
import store from '../store/user';
//http请求封装     //router.push(/login)
//1.请求类型 2.传入对象 3.路径

// var token = window.localStorage.getItem("loginuser");
// Vue.http.interceptors.push(function(request, next) {
//     request.headers.set('loginuser', loginuser); //setting request.headers
//     next(function(response){
//         if(response.body.code==="TOKEN_INVALID"){ //与后台约定登录失效的返回码
//             parent.location.href ='/user/login';
//         }
//         return response
//     })
// })
// console.log(token);
// console.log(router);
export default function httpreques(type, params, path) {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('loginuser') ? ('Bearer ' + JSON.parse(localStorage.getItem('loginuser')).token) : "";
    path = VUE_APP_APIHOST + path; // 线下api
    //  var token =JSON.parse(localStorage.getItem('loginuser'))

    // var token =JSON.parse(localStorage.getItem('loginuser')).token
    // console.log(token);
    // console.log(store.state.currentUser.token);
    // console.log(JSON.parse(localStorage.getItem('loginuser')));
    //获取localStroage值
    // let token = localStorage.getItem('loginuser') ? JSON.parse(localStorage.getItem('loginuser')).token : '';
    let httpdata = "";
    switch (type) {
        case 'get':
            httpdata = get();
            break;
        case 'post':
            httpdata = post();
            break;
        case 'put':
            httpdata = put();
            break;
        case 'delete':
            httpdata = del();
            break;
        default:
            httpdata = get();
            break
    }
    return httpdata;

    function get() {
        return axios.get(path, {
            params: params,
        });
    }

    function post() {
        // if(!token && token.token != store.state.token){
        // router.push("/user/login")
        // }
        //没有token 则不添加 auth 验证信息
        return axios.post(path, params);
    }

    function put() {
        // console.log(router);
        return axios.put(path, {
            params: params
        });
    }

    function del() {
        return axios.delete(path, {
            params: params
        });
    }

}