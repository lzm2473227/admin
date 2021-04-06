const {
    VUE_APP_APIHOST
} = process.env
import axios from 'axios';
//http请求封装  
//1.请求类型 2.传入对象 3.路径
export default function httpreques(type, params, path) {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('loginuser') ? ('Bearer '+JSON.parse(localStorage.getItem('loginuser')).token ): '';
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