import { Base64 } from 'js-base64';
import { defineComponent,ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import "../../assets/icon.scss"
import { } from '../../router';
import "./tabBar.module.scss"
export default defineComponent({
    components: {},
    setup(){
        const router = useRouter();
        console.log(router)
        const store = useStore();
        const tabBarList = [
            {
                title:"home",
                icon:"liu-home",
                url:"home",
                query:undefined
            },{
                title:"index",
                icon:"liu-shouye",
                url:"index",
                query:{a:Base64.encode('1')}
            },{
                title:"searchList",
                icon:"liu-xinzengdaohangliebiao",
                url:"searchList",
                query:undefined
            },
        ]
        const rep = (url:any)=>{
            console.log(url)
            router.replace(url)
        }
        return{ tabBarList,rep,store }
    },
    render(){
        return(
            <div class="tabBar-module_tabBarMain">
                {
                    this.tabBarList.map((e,i)=>{
                        return (
                            <div class={ this.store.state.tabBarIndex ===i ? "tabBar-module_tabBarisCheck" : "tabBar-module_tabBarIndex" } onClick={()=>{
                                // if(this.store.state.tabBarIndex = i){
                                //     return
                                // }
                                this.store.state.tabBarIndex = i;
                                this.rep({path:e.url,query:e.query})
                                // {path:e.url,query:e.query}
                            }}>
                                <div ><text class={ "isicon iconfont "+e.icon }></text></div>
                                <div>{e.title}</div>
                            </div>
                        )
                    })
                }
            </div>
        );
    }
});