import { ref,reactive } from "vue"

//手写shallowReactive和reactive
const reactiveHandler = {
    get(target:any,prop:any){
        console.log("拦截到了获取数据")
        return Reflect.get(target,prop)
    },
    set(target:any,prop:any,value:any){
        console.log("拦截到了写数据或者添加属性")
        return Reflect.set(target,prop,value)
    },
    deleteProperty (target:any,prop:any,){
        console.log("拦截到了删除属性")
        return Reflect.deleteProperty (target,prop)
    }
}

function shallowReactive(target:any){
    if(target&&typeof target ==="object"){
        return new Proxy(target,reactiveHandler )
    }
    return target
}
function reactives(target:any){
    if(target&&typeof target ==="object"){
        if(Array.isArray(target)){
            target.forEach((item,index)=>{
                target[index]=reactive(item)
            })
        }else{
            Object.keys(target).forEach(key=>{
                target[key]=reactive(target[key])
            })
        }
        return new Proxy(target,reactiveHandler )
    }
    return target
}


; (() => {
    console.log("=======Proxy开始=======")
    //通过代理做到响应式
    const user = {
        name: "张三",
        age: 18
    }
    const proxyUser = new Proxy(user, {
        get(target, prop) {
            console.log("get方法调用了")
            return Reflect.get(target, prop)
        },
        //可以修改属性值和添加新的属性值
        set(target, prop, val) {
            console.log("set方法调用了")
            return Reflect.set(target, prop, val)
        },
        //用来删除属性值 删除关键字 : delete 对象.属性
        deleteProperty(target, prop) {
            console.log("deleteProperty方法调用了")
            return Reflect.deleteProperty(target, prop)
        }
    })
    //使用proxyUser代理获取属性值
    console.log(proxyUser.name)
    //使用proxyUser代理更新属性值
    proxyUser.name = "李四"
    console.log(proxyUser.name)
    //使用proxyUser代理添加新的属性,在ts中会发生错误,但能正常运行
    // proxyUser.gender = '男'
    // console.log(user)
    //使用proxyUser代理删除某个属性,在ts中会发生错误,但能正常运行
    // delete proxyUser.age
    // console.log(user)

    //
    const count = ref({name:"小明",age:18,wu:{name:"小红"}})
    const counts = reactive({name:"小明",age:18,wu:{name:"小红"}})
    console.log(count)
    console.log(counts)

    console.log("=======Proxy结束=======")


    /**
     * shallowReactive()浅,只能第一层数据
     * reactive()深入到每一层数据
     */
    console.log("===================================手写shallowReactive和reactive 组合Api开始===================================")
    console.log("shallowReactiveAPI开始(浅监听,只能监听到第一层的数据)")
    const shallowReactUser = shallowReactive({
        name:"小明",
        car:{
            name:"小红"
        }
    })
    //监听到读和写
    shallowReactUser.name+="=="
    //没监听到
    shallowReactUser.car.name+="==="
    // 监听到读和删除
    delete shallowReactUser.name
    // 监听到读
    delete shallowReactUser.car.name
    console.log("shallowReactiveAPI  end")
    console.log("reactiveAPI开始(深监听,能监听到每一层的数据)")
    const reactUser = shallowReactive({
        name:"小明",
        car:{
            name:"小红"
        }
    })
    //监听到读和写
    reactUser.name+="=="
    //监听到读和写
    reactUser.car.name+="==="
    // 监听到读和删除
    delete reactUser.name
    // 监听到读和删除
    delete reactUser.car.name
    console.log("reactUserAPI  end")
    
    console.log("===================================手写shallowReactive和reactive 组合Api结束===================================")


    
    
})()