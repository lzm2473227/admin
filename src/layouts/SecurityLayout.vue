<template>
    <spin v-if="(!isLogin && loading) || !isReady" style="height: 200px;"/>
    <router-view v-if="isLogin" />
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Spin from '@/components/Spin/index.vue';
import { StateType as UserStateType, CurrentUser } from "@/store/user";
import store from '../store/user';

// interface SecurityLayoutSetupData {
//     isLogin: boolean;
//     loading: boolean;
//     getUser: () => Promise<void>;
//     isReady: boolean;
// }

export default defineComponent({
    name: 'SecurityLayout',
    components: {
        Spin
    },
    data(){
        return {
            isLogin:false,
            loading:false,
            isReady:false
        }
    },
    mounted(){
       
        let t = this;
        let isReady = t.isReady; // 是否读取过用户信息
        let loading =  t.loading;
        let isLogin = t.isLogin;
        getuser();
       async function getuser() {
            t.loading = true;
            // console.log(router.currentRoute.value.path)
              
              await t.$store.dispatch('user/fetchCurrent');
            const currentUser =  t.$store.state.user.currentUser;
       
            isLogin = currentUser && currentUser.id? true :false;
            // console.log('999');
           
        //  console.log(currentUser)
            if(!isLogin && t.$router.currentRoute.value.path !== '/user/login') {
                // console.log(t.$router.currentRoute.value.path)
                //  console.log(t.$router.currentRoute.value.path)
                t.$router.replace({
                    path: '/user/login',
                    query: {
                        redirect: t.$router.currentRoute.value.path,
                        ...t.$router.currentRoute.value.query
                    }
                })
            }            
            t.loading = false;
            t.isReady = true;
            t.isLogin =isLogin
        }
        // console.log(t.isLogin,t.loading, t.isReady)
           
       }   
     
    

    // setup(): SecurityLayoutSetupData {
    //     const router = useRouter();
    //     const store = useStore<{user: UserStateType}>();
    //     const fechuser=async ()=>{
             
    //     }
        
    //     // 获取当前登录用户信息
        
    //     //  console.log('2222');
    //     //  console.log(store.state.user.message);
    //     //  let gg = store.state.user;
    //     //  console.log(gg["currentUser"])
    //     //  console.log(store.state.user);
        
    //     // 判断是否登录
    
    //   //  console.log(isLogin);
    //     // 读取当前用户信息func
    //     const isReady = ref<boolean>(false); // 是否读取过用户信息
    //     const loading = ref<boolean>(false);
    //     let isLogin = true;
    //     const getUser = async () => {
    //         loading.value = true;
    //         console.log(router.currentRoute.value.path)
              
    //           await store.dispatch('user/fetchCurrent');
    //    const currentUser =  store.state.user.currentUser;
       
     
    //         console.log('999');
    //         if(currentUser.id){
    //             isLogin =  true;
    //         }
    //      console.log(currentUser)
    //         if(!isLogin && router.currentRoute.value.path !== '/user/login') {
    //             router.replace({
    //                 path: '/user/login',
    //                 query: {
    //                     redirect: router.currentRoute.value.path,
    //                     ...router.currentRoute.value.query
    //                 }
    //             })
    //         }            
    //         loading.value = false;
    //         isReady.value = true;
    //     }

    //     onMounted(() => {
    //         getUser();
    //     })


    //     return {
    //         isLogin: isLogin as unknown as boolean,
    //         loading: loading as unknown as boolean,
    //         getUser,
    //         isReady: isReady as unknown as boolean
    //     }


    // }
})
</script>