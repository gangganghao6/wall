import {createStore} from 'vuex'
import createPersistedState from "vuex-persistedstate"
import axios from "axios";
axios.defaults.timeout = 5000;
axios.defaults.baseURL = "/api";
axios.defaults.withCredentials = true;

export default createStore({
    state: {
        user: ''
    },
    mutations: {
        updateUser(state, userData) {
            state.user = userData;
        }
    },
    actions: {
        async getUserInfo({commit,state}){
            let result = await axios.get('/user/getUserInfo',{
                params:{
                    phone:state.user.phone
                }
            })
            commit('updateUser',result.data.data)
        }
    },
    modules: {},
    plugins: [createPersistedState()]
})
