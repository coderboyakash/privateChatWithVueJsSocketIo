import { createStore } from 'vuex'
const store = createStore({
    state () {
      return {
        token: null,
        loggedIn: false,
        userdata: null
      }
    },
    mutations: {
      setLoggedIn(state, payload){
        state.loggedIn = payload;
      },
      setToken(state, payload){
        state.token = payload;
      },
      setUserData(state, payload){
        state.userdata = payload;
      }
    },
    getters:{
        getLoggedIn(state){
          return state.loggedIn
        },
        getUserData(state){
          return state.userdata
        },
        getUserName(state){
          return state.userdata.name
        },
        getToken(state){
          return state.token
        }
    }
})
export default store