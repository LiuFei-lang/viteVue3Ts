import * as types from './mutations-type'
export const setSinger = function ({commit}:any, username:any) {
    commit(types.SET_USERNAME, username)
}