# 注意

## v-if 不适用

- v-if 换成三元运算表示
  > `{true?<div>{this.Event()}</div>:"123"}`

## v-for 不适用

- v-for 换成 map
>```
> {data.obj.map((pro: any) => {
>   return (
>     <div class="checkboxDiv">
>     </div>
>        )
>   })}
>```

## 事件

- 如@click====>onClick
>```
> onClick={() => { this.a++ }
>```

## 所有vue事件不适用 如: .self .stop .prevent 等均失效

-  阻止冒泡:stopPropagation()
>```
>    const stopPropagation = (e: any) => {
>      let ev = e || window.event
>      //阻止冒泡
>      ev.stopPropagation()
>    //其他部分添加自己的代码	
>    }
>```

-  阻止默认行为:preventDefault()
>```
>    const preventDefault = (e: any) => {
>      let ev = e || window.event
>      //阻止冒泡
>      ev.preventDefault()
>    //其他部分添加自己的代码	
>    }
>```


## 给方法传递参数

- 使用bind()来绑定参数的形式传参，需要带上this
>```
>    setup(){
>       function logs(val: string) {
>           conslog('触发事件！')
>       }
>       let str = '参数'
>       return () => (
>           <div>
>      	        <button onClick={logs.bind(this, str)}></button>
>           </div>
>       }  
>   }
>```


## 在{}内直接赋值

- 不可将赋值类型出错 需要函数对象
>```
> <button onClick={() => a=1}></button>
>```


## 常用事件

- onClick: 当用户点击某个对象时调用的事件句柄。
>`<Button onClick={() => { this.a++ }}>点击更改</Button>` 

- onmouseenter: 当鼠标指针移动到元素上时触发。
>`<Button onMouseenter={() => { this.a++ }}>点击更改</Button>` 

- onmouseleave	当鼠标指针移出元素时触发
>`<Button onMouseleave={() => { this.a++ }}>点击更改</Button>` 

- onmousemove	鼠标被移动。
- onmouseover	鼠标移到某元素之上。
- onmouseout	鼠标从某元素移开。
- onmouseup	    鼠标按键被松开。
- onkeydown	    某个键盘按键被按下。
- onload	    一张页面或一幅图像完成加载。
- onscroll	    当文档被滚动时发生的事件。
- onunload	    用户退出页面。
- onblur	    元素失去焦点时触发
- onchange	    该事件在表单元素的内容改变时触发。
- onfocus	    元素获取焦点时触发。

## Vue 包装了一批侦听数组的变更方法，以至于这些方法可以触发视图更新。被包装的变更方法如下：

- push()        在数组的后边追加元素

>```
> const animals = ['pigs', 'goats', 'sheep'];
> const count = animals.push('cows');
> console.log(count);
> // expected output: 4
> console.log(animals);
> // expected output: Array ["pigs", "goats", "sheep", "cows"]
> animals.push('chickens', 'cats', 'dogs');
> console.log(animals);
> // expected output: Array ["pigs", "goats", "sheep", "cows", "chickens", "cats", "dogs"]
>```

- pop()         删除数组的最后一个元素返回一个新的数组

>```
> const plants = ['broccoli', 'cauliflower', 'cabbage', 'kale', 'tomato'];
> console.log(plants.pop());
> 
> // expected output: "tomato"
> 
> console.log(plants);
> // expected output: Array ["broccoli", "cauliflower", "cabbage", "kale"]
> 
> plants.pop();
> 
> console.log(plants);
> // expected output: Array ["broccoli", "cauliflower", "cabbage"]
>```

- shift()       从数组中删除第一个元素，并返回该元素的值。此方法更改数组的长度。

>```
> const array1 = [1, 2, 3];
> 
> const firstElement = array1.shift();
> 
> console.log(array1);
> // expected output: Array [2, 3]
> 
> console.log(firstElement);
> // expected output: 1
>```

- unshift()     将一个或多个元素添加到数组的开头，并返回该数组的新长度(该方法修改原有数组)。

>```
> const array1 = [1, 2, 3];
> 
> console.log(array1.unshift(4, 5));
> // expected output: 5
> 
> console.log(array1);
> // expected output: Array [4, 5, 1, 2, 3]>
>```

- splice()      通过删除或替换现有元素或者原地添加新的元素来修改数组,并以数组形式返回被修改的内容。此方法会改变原数组。

>```
> const months = ['Jan', 'March', 'April', 'June'];
> months.splice(1, 0, 'Feb');
> // inserts at index 1
> console.log(months);
> // expected output: Array ["Jan", "Feb", "March", "April", "June"]
> 
> months.splice(4, 1, 'May');
> // replaces 1 element at index 4
> console.log(months);
> // expected output: Array ["Jan", "Feb", "March", "April", "May"]
>```

- sort()        用原地算法对数组的元素进行排序，并返回数组。默认排序顺序是在将元素转换为字符串，然后比较它们的UTF-16代码单元值序列时构建的

>```
> const months = ['March', 'Jan', 'Feb', 'Dec'];
> months.sort();
> console.log(months);
> // expected output: Array ["Dec", "Feb", "Jan", "March"]
> 
> const array1 = [1, 30, 4, 21, 100000];
> array1.sort();
> console.log(array1);
> // expected output: Array [1, 100000, 21, 30, 4]
>```

- reverse()     将数组中元素的位置颠倒，并返回该数组。数组的第一个元素会变成最后一个，数组的最后一个元素变成第一个。该方法会改变原数组。

>```
> const array1 = ['one', 'two', 'three'];
> console.log('array1:', array1);
> // expected output: "array1:" Array ["one", "two", "three"]
> 
> const reversed = array1.reverse();
> console.log('reversed:', reversed);
> // expected output: "reversed:" Array ["three", "two", "one"]
> 
> // Careful: reverse is destructive -- it changes the original array.
>  console.log('array1:', array1);
> // expected output: "array1:" Array ["three", "two", "one"]> 
>```


### 在计算属性中使用 reverse() 和 sort() 请保持谨慎！这两个方法将变更原始数组，计算函数中不应该这么做。请在调用这些方法之前创建一个原数组的副本：
> `return numbers.reverse() //不推荐(使用原数组会改变原数组)`
> `return [...numbers].reverse() //推荐(使用原数组副本,不会改变原数组)`
