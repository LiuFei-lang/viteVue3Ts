import './Login.css';
import { onMounted, defineComponent, reactive, h, ref, toRefs,computed } from "vue";
import Card from 'ant-design-vue/lib/card/Card';
import { Button, Input, message } from 'ant-design-vue';
import { api } from "../../ts/axios/api"
// import store from '../../vuex';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { Base64 }  from 'js-base64';



export default defineComponent({
  components: {

  },
  setup() {
    const store = useStore()
    const router = useRouter();
    //登录
    const getLogin = ()=>{
        api.article.login({account:loginObj.username,password:loginObj.password}).then((res:any)=>{
            // console.log(res.data.token)
            if(res.code==1){
              loginObj.token=res.data.token;
              console.log(loginObj);
              store.commit("SET_LOGIN",loginObj)
              window.localStorage.setItem("token",res.data.token)
              const hide = message.loading('跳转中...', 2)
              setTimeout(()=>{
                hide
                //使用push跳转会保留上一页记录,replace跳转不会留下 history 记录。即使点击返回按钮也不会回到这个页面
                router.replace({path:"index",query:{a:Base64.encode('1')}})
              }, 2000);
              
            }
            
        })
        
    }
    //取消
    //请求数据一般都在这里
    onMounted(()=>{

    })
    //登录信息
    const loginObj = {
        username:"",
        password:"",
        token:""
    }
    const login = () => {
      return (
        <div>
          <Card title="登录" extra={<a href="#">注册</a>} class="login">
            <Input placeholder="用户名" onChange={event => loginObj.username=event.target.value}/>
            <p></p>
            <Input.Password placeholder="input password" onChange={event => loginObj.password=event.target.value}/>
            <p></p>
            <div class="btnlist">
              <Button type="primary" onClick={(e)=>{getLogin()}}>登录</Button>
              <Button type="primary" onClick={(e)=>{}}>取消</Button>
            </div>
          </Card>
        </div>
      )
    }

    return {
      login
    };
  },
  render() {
    return (
      <div class="page">
        {this.login()}
      </div>
    );
  },
});




