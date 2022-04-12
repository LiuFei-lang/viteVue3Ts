import { Button, message } from 'ant-design-vue';
import { defineComponent } from 'vue';
import axios from 'axios';
import bus from "vue3-eventbus"
import "./search.module.scss"
export default defineComponent({
    components: {  },
    setup(){
        const searchText = ""
        return{ searchText }
    },
    render(){
        return(
            <div class='search-module_main'>
                <input class="search-module_inputSearch" v-model={this.searchText} placeholder="123"></input>
                <Button class="search-module_ButtonSearch" onClick={()=>{
                    message.loading("加载中...")
                    axios.get(`https://api.github.com/search/users?q=${this.searchText}`).then(
                        response=>{
                            //请求成功
                            bus.emit("updateList",response.data.items)
                        },
                        error=>{
                            //请求失败
                            console.log(error.Msg)
                        }
                    )
                }}>搜索</Button>
            </div>
        );
    }
});