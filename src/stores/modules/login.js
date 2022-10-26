import { defineStore } from 'pinia'
import { login } from '@/api/manager.js'


const useLoginStore = defineStore('city',{
  state: () => ({
    username:'',
    password:''
  }),
  actions:{
    async loginData() {
      const res = await login()
    }
  }
})

export default useLoginStore