// import { Base } from "./base";
import { Request } from "./request";

class api {
  /* api接口模块 */
  public static article = {
     // 直接在index.ts中设置不需要Base模块
     // 基于Base模块封装调用
    getuser: (data:any) => Request.post('/api/api011/user/index',data),
    //会员登录 /api/api011/user/login
    login:(data:any) => Request.post('/api/api011/user/login',data),


    
  }
}
export {
  api
}