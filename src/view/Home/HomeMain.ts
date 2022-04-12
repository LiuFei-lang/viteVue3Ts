/**
 * 泛型
 */

import { number, string } from "vue-types"

;(()=>{
    function getMinArr(arr:number[]):number{
        var min = arr[0]
        arr.forEach(value=>{
            if(value<min){
                min=value
            }
        })
        return min
    }
    console.log("这是HomeMain中的输出==>",getMinArr([1,2,5,4,7]))

    function getMinStr(arr:string[]):string{
        var min = arr[0]
        arr.forEach(value=>{
            if(value<min){
                min=value
            }
        })
        return min
    }
    console.log("这是HomeMain中的输出==>",getMinStr(['a','b','c']))


    function getMin<T>(arr:T[]):T{
        var min = arr[0]
        arr.forEach(value=>{
            if(value<min){
                min=value
            }
        })
        return min
    }
    console.log("这是HomeMain中泛型的输出==>",getMin([1,2,5,4,7]))
    console.log("这是HomeMain中泛型的输出==>",getMin(['a','b','c']))



    interface len {
        length:number
    }
    function Str<T extends len>(arr:T):T{
        console.log(arr.length)
        var min = arr
        return min
    }
    console.log("这是HomeMain中泛型的约束==>",Str("adagfgafg"))

    class User {
        name:string
        age:number
        constructor(name:string,age:number){
            this.name=name;
            this.age=age
        }
    }
    const stu = {
        name:string,
        age:number
    }
    function getUser<stu>(){
        let a = 1
        console.log(a++)
        return  {
            name:"123",age:19
        }
    }

    console.log(getUser())
    
    function getT<T extends len>(s:T):number{
        return s.length
    }
    console.log(getT("abc"))

})()