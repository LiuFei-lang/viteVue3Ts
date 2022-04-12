import { createStore, } from "vuex";
import { loginStore } from './modules/loginStore'
import * as actions from './actions'
import * as getters from './getter'
import state from './state'
import mutations from './mutations'

const store = createStore({
    actions,
    getters,
    state,
    mutations,
    modules: {
        loginStore
    }
})

//动态添加模块
const aScore = {
    state: {
        a: 1
    },
    mutations: {
        SET_A_A(state: any, a: number) {
            console.log("SET_A_A接入值=", a)
            state.a = a
        }
    },
    actions: {
        SET_A_Action(content: any, a: number) {
            content.commit("SET_A_A", a)
        }
    },
    getters: {

    }
}
store.registerModule('a', aScore)


export default store

