import { message } from 'ant-design-vue';
import { defineComponent,ref } from 'vue'
// import "./nabBar.css"
import "./nabBar.module.css"
import bus from "vue3-eventbus"

export default defineComponent({
    components: {},
    props: {
        title: String,//标题
        isShowNabBack: Boolean,
    },
    emits: ['nabBack'],
    setup(props, {emit}) {
        const timer = ref(0)
        
        const restTest = (...rest:string[])=>{
            console.log(rest)
        }
        restTest("1","2")
        
        const tab = () => {
            return (
                <div class="nabBar-module_tabbar">
                    <div class="nabBar-module_navback" onClick={()=>{
                        //清除setTimeout
                        if(timer.value>0) clearTimeout(timer.value)
                        //返回上一页
                        emit("nabBack","需要带过去的值")
                    }}>返回</div>
                    <div class="nabBar-module_title">{props.title}</div>
                    <div class="nabBar-module_btn">
                        <a onClick={(e?: any) => {
                            if (e) {
                                //阻止默认操作
                                e.preventDefault()
                            }
                            //清除setTimeout
                            if(timer.value>0) clearTimeout(timer.value)
                            const hide = message.loading('Action in progress..', 0);
                            timer.value = setTimeout(hide, 2500);
                            //bus.emit后边参数只能有一个,emit则可以有多个
                            bus.emit("hellow",111)
                        }}>按钮</a>
                    </div>
                </div>
            )
        }
        return { tab }
    },
    render() {
        return (
            <div class="nabBar-module_main">
                {this.tab()}
            </div>
        );
    },
});