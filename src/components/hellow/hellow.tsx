import { onMounted, defineComponent, reactive, h, ref, toRefs, defineProps, computed, getCurrentScope, watch, watchEffect, onBeforeMount, onBeforeUnmount } from "vue";
import "./hellow.css"
import { api } from "../../ts/axios/api"
import { LoadingOutlined } from '@ant-design/icons-vue';
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { Base64 } from "js-base64";
import bus from "vue3-eventbus"
// import utils from "../../ts/utils/suanfa"


import "../../ts/class/UserClass"

export default defineComponent({
  components: {

  },
  //传递给组件的值的声明(父传子)
  props: {
    title: String,
    count: String
  },
  emits: ['cancelChange'],
  setup(props, { emit }) {
    
    //暴露utils的模块算法
    // const { strMaxFun, unique } = utils()
    //获取字符串中出现最多的字母或数字
    // console.log("字符串中出现最多的字母或数字", strMaxFun("abihfgaaa"))
    //数组去重
    // console.log("数组去重:", unique([1, 2, 3, 1]))

    //获取父页面的值
    // console.log(toRefs(props))
    const counts = props.count

    //获取vuex实例
    const store = useStore()
    const name = "我是子组件的值"
    //获取路由实例
    const rout = useRoute()
    //获取路由传递的参数
    // console.log('rout', Base64.decode(rout.query.a as string))

    //动态添加vuex模板
    // const user = {
    //   username: "",
    //   id: 0
    // }
    // const bStore = {
    //   state: user
    // }
    // store.registerModule("b", bStore)
    //请求接口
    const getuser = () => {
      api.article.getuser({}).then((res: any) => {
        console.log(res)
        store.dispatch("SET_A_Action", res.data.id)
      })
    }


    // 子组件点击的时候告诉父元素  要传值了**
    const handleCancel = () => {
      store.commit("SET_USERNAME", "ZHANGSAN")
      bus.emit("cancel","345")
      emit('cancelChange', [345,456]);
    };

    const textstrs:any = {
      textstr : ref(store.state.username),
      textstr1 : computed(() => {
        return textstrs.textstr.value
      }),
      textstr2 : computed({
        get() {
          return textstrs.textstr.value
        },
        set(val: string) {
          textstrs.textstr.value = val
        }
      }),
      textstr3 : ref('')
    }
    
    watch(textstrs.textstr, () => {
      textstrs.textstr3.value = textstrs.textstr.value
    }, {
      immediate: true,
      deep: true
    })
    watch(textstrs.textstr3, () => {
      textstrs.textstr.value = textstrs.textstr3.value
    }, {
      //先执行一次
      immediate: true,
      //深度监听,默认为false
      deep: true
    })
    /* 
    watch多个数据: 
      使用数组来指定
      如果是ref对象, 直接指定
      如果是reactive对象中的属性,  必须通过函数来指定
    */
    watch([textstrs.textstr, textstrs.textstr3], (values) => {
      //values则是对应的数据集合
      // console.log(values)
    })
    /**
     * watchEffect 相当于将 watch 的依赖源和回调函数合并，
     * 当任何你有用到的响应式依赖更新时，该回调函数便会重新执行。
     * 不同于 watch，watchEffect 的回调函数会被立即执行（即 { immediate: true }）
     */
    watchEffect(() => {
      // console.log('watchEffect')
      textstrs.textstr3.value = textstrs.textstr.value
    })
    const inputRef = ref<HTMLElement | null>(null)
    const a = (str: number) => {
      return (
        <div>
          <div style="color:red">--------这是store---------</div>
          <div>123  {store.state.a.a} {name}  {store.state.username}</div>
          <div style="color:red">--------这是props---------</div>
          <div onClick={handleCancel} v-show={str === 1}> {counts}   {props.title} 点击返回上一页</div>
          <input type="text" v-model={textstrs.textstr.value} ref={inputRef} /><br />
          {textstrs.textstr.value}<br />
          <input type="text" v-model={textstrs.textstr1.value} /><br />
          <input type="text" v-model={textstrs.textstr2.value} /><br />
          <input type="text" v-model={textstrs.textstr3.value} /><br />
          <LoadingOutlined />
        </div>
      )
    }

    const hellowFun = (value:number)=>{
      console.log(value)
    }
    onMounted(() => {
      //获取单个元素节点 并且输入框获取焦点
      inputRef.value && inputRef.value.focus()
    })
    onBeforeMount(()=>{
      bus.on("hellow",hellowFun)
    })
    onBeforeUnmount(()=>{
      bus.off("hellow",hellowFun)
    })
    onMounted(() => {
      // getuser()
    })
    return {
      a
    };
  },
  render() {
    return (
      <div>
        <div class="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
          {this.a(1)} 
        </div>
      </div>
    );
  }
});

