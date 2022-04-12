// 同步方法，修改state的值
import * as types from './mutations-type'

const mutations = {
  [types.SET_USERNAME](state:any, username:string) {
      console.log("这是mutations.ts中的提示username=",username)
      state.username = username
  }
}

export default mutations