const {
    VUE_APP_APIHOST
} = process.env
import axios from 'axios';
// import router from 'router.js';
// import store from '../store';
//http请求封装     //router.push(/login)
//1.请求类型 2.传入对象 3.路径
export default function httpreques(type, params, path) {

    // axios.interceptors.response.use(function (response) {
    //     if (response.data.msg === 'TOKEN无效或已过期') {
    //         Storage.localRemove('token') // 删除已经失效或过期的token（不删除也可以，因为登录后覆盖）
    //         router.replace({path: '/login'})}
    // })
    // console.log(store);
    // console.log(path);
    // window.location.href = 'login';
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('loginuser') ? ('Bearer '+JSON.parse(localStorage.getItem('loginuser')).token ): "";
    path = VUE_APP_APIHOST +path;// 线下api
    
       
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
        //没有token 则不添加 auth 验证信息
        return axios.post(path, params);
    }

    function put() {
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