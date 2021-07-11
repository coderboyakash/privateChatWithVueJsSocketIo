import { createStore } from 'vuex'
const store = createStore({
    state () {
      return {
        token: null,
        loggedIn: false,
        userdata: null,
        socket_id: null
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
      },
      setSocketId(state, payload){
        state.socket_id = payload;
      }
    },
    getters:{
        getLoggedIn(state){
          return state.loggedIn
        },
        getUserData(state){
          return state.userdata
        },
        getToken(state){
          return state.token
        },
        getSocketId(state){
          return state.socket_id
        }
    }
})
export default store