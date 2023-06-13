
import { createStore } from 'vuex'

export default createStore({
  state: {
    count: 1,
    loginIn: false,
  },
  mutations: {
    setStateByKey (state, {key, value}) {
      if(key != undefined && state.hasOwnProperty(key)){
        if(value != undefined){
          state[key] = value
        }
      }
    },
    increment({state}) {
      state.count++
    }
  },
  getters:{
    getUserName({state}){
       return 'my name is '+state.count
    } 
  },
  actions: {
    changeLoginIn({commit}, value){
      commit('setStateByKey', {
        key: 'loginIn', 
        value
      })
    }
  }
})

