import { defineComponent } from 'vue';
import List from "../../components/searchList/List/list"
import Search from "../../components/searchList/search/search"
import tabBar from '../../components/tabBar/tabBar';
import "./searchList.module.scss"
export default defineComponent({
    components: {List,Search,tabBar},
    setup(){
        return{}
    },
    render(){
        return(
            <div>
                <Search />
                <List />
                <tabBar/>
            </div>
        );
    }
});