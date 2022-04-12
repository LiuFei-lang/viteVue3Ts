import { reactive, ref } from "vue";
import { useRouter, useRoute } from 'vue-router';
import { Base64 } from 'js-base64';

export default function indexFun(){
    const router = useRouter()
    //指向的是Router
    console.log('query', Base64.decode(router.currentRoute.value.query.a as string))

    //指向的是RouteLocationNormalizedLoaded (获取用户原信息,需要断言)
    const rout = useRoute()
    console.log('rout', Base64.decode(rout.query.a as string))

    const count = ref(10);
    const handleClick = () => {
      count.value++;
    }
    const nametext = "我是父组件的值"
    
    const arrData = ["张安","李四","王二"]
    const arrProxyData = reactive(arrData)

    //子组件传父组件
    const cancelChange = (bool:Array<number>) => {
      console.log("父组件", bool);
      //回到前一页
      // router.go(-1) //后退页面并刷新
      // router.back()  //原页表表单中的内容会保留；
      // window.history.go(-1) //history.go(-1)是返回浏览器的上一页，而由于Vue是单页面应用，有的浏览器对于hash变更不认为是两个不同的页面，在hash模式下就不会跳回浏览器上一页
    }
    return {
        handleClick,count,nametext,cancelChange,arrProxyData
    }
}

