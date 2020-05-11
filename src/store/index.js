
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)




const store = new Vuex.Store({

state:{
    loading: sessionStorage.getItem('loading') || false,
    logged_user: sessionStorage.getItem('logged_user') || ''
    // loading: false,
    // logged_user: ''
},
getters:{
    getLoading(){
        return state.loading
    },
    getLoggedUser(){
        return state.logged_user
    }
},
mutations:{
    enableLoading(state){
        sessionStorage.setItem('loading','true')
        state.loading = true
    },
    disableLoading(state){
        sessionStorage.setItem('loading','')
        state.loading = false
    },
    registerLoggedUser(state, logged_user){
        sessionStorage.setItem('logged_user',logged_user)
        state.logged_user = logged_user
    },
    logoutLoggedUser(state){
        sessionStorage.setItem('logged_user','')
        state.logged_user = ''
    }
},
actions:{
    enableLoading({commit}){
        commit('enableLoading')
    },
    disableLoading({commit}){
        commit('disableLoading')
    },
    registerLoggedUser({commit},logged_user){
        commit('registerLoggedUser',logged_user)
    },
    logoutLoggedUser({commit}){
        commit('logoutLoggedUser')
    }
}

})


export default store