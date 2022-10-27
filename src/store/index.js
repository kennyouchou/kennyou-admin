import { createStore } from "vuex";
import { login , getInfo } from '@/api/manager'
import { setToken, removeToken } from "@/composables/auth"
const store = createStore({
  state() {
    return{
      // 用户信息
      user:{}
    }
  },
  mutations:{
    // 记录用户信息
    SET_USERINFO(state,user){
        state.user = user
        console.log(state.user);
    }
  },
  actions:{
    // 登录 传用户名和密码 方法 
    actionLogin( {commit} , { username,password }){
        return new Promise((resolve,reject) => {
          login(username,password).then(res => {
              setToken(res.token)
              resolve(res)
          }).catch(err => {
              reject(err)
          })
        })
    }, 
    // 获取当前登录用户信息
    actionGetInFo( {commit} ){
        return new Promise((resolve,reject) => {
          getInfo().then(res => {
            commit("SET_USERINFO",res)
            resolve(res)
          }).catch(err => reject(err))
        })
    },
    actionLogout( {commit} ){
        //移除cookie里的token
        removeToken()
        // 清除当前用户状态 vuex
        commit("SET_USERINFO",{})
    }
  }
})

export default store