

export const loginStore = {
    namespace:"loginStore",
    state: {
        login:{
            token:'',
            username:"123",
            password:""
        },
        userList:[]
    },
    mutations: {
        SET_LOGIN(state:any,login:object){
            console.log(login)
            state.login=login
        },
        SET_USERLIST(state:any,userList:object){
            state.userList = userList
        }
    },
    actions: {
        increment (context:any,val:object) {
            context.commit('SET_LOGIN',val)
        },
        setUserList (context:any,val:object) {
            context.commit('SET_USERLIST',val)
        }
    },
    getters:{
        
    }
}