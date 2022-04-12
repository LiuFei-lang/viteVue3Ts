import './index.css';
import { defineComponent, onMounted, onRenderTracked,onBeforeMount, onBeforeUnmount } from "vue";
import Hellow from '../../components/hellow/hellow'
import navBar from "../../components/nabBar/nabBar"
import tabBar from '../../components/tabBar/tabBar';
//引入indexfun.ts,并暴露indexFun函数
import indexFun from './indexfun';
// import "./indexMain"
import bus from "vue3-eventbus"

export default defineComponent({
  components: {
    Hellow,navBar,tabBar
  },
  setup(props, context) {
    //暴露indexFun中的内容
    let {handleClick,count,nametext,cancelChange} = indexFun()
    const cancelFun = (e:any) =>{
      console.log("从组件传递过来的数据",e)
    }
    onRenderTracked(()=>{
      console.log("onRenderTracked")
    })
    onBeforeMount(()=>{
      bus.on("cancel",cancelFun)
    })
    onBeforeUnmount(()=>{
      bus.off("cancel",cancelFun)
    })
    
    return {
      handleClick,count,nametext,cancelChange
    };
  },
  render() {
    return (
      <div>
        <div><navBar title='index' onNabBack={(bool:string)=>{ console.log(bool);}}></navBar></div>
        <div>
          <Hellow count={this.nametext} title="父组件的title" onCancelChange={(bool:Array<number>) => this.cancelChange(bool)}></Hellow>
        </div>
        <div><tabBar></tabBar></div>
      </div>
    );
  },
});