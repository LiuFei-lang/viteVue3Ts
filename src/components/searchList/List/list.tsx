import { Image, message } from 'ant-design-vue';
import { defineComponent, onBeforeMount, onBeforeUnmount, reactive,ref } from 'vue';
import bus from "vue3-eventbus"
import { useStore } from 'vuex';
import "./list.module.scss"
export default defineComponent({
    components: {  },
    setup(){
        const store = useStore()
        const busFun = (userList:[])=>{
            store.commit('SET_USERLIST',userList)
            message.success("加载成功")
            console.log(bus)
        }
        onBeforeMount(()=>{
            console.log(bus)
            bus.on("updateList",busFun)
        })
        onBeforeUnmount(()=>{
            console.log(1)
            bus.off("updateList",busFun)
        })
        
        return{ store }
    },
    render(){
        return(
            <div class=''>
                {
                    this.store.state.loginStore.userList.map((e:any)=>{
                        return(
                            <div class="list-module_list">
                                <div class="list-module_list_left">
                                    <Image class="list-module_list_left_Image" width="2rem" height="2rem" src={e.avatar_url}></Image>
                                </div>
                                <div class="list-module_list_right">
                                    <div class="">{e.login}</div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        );
    }
});