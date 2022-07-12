<!--
 * @Author: lu
 * @Date: 2022-07-12 10:28:08
 * @LastEditTime: 2022-07-12 17:23:03
 * @FilePath: \interviewCollection\README.md
 * @Description: 
-->
# interviewCollection
面试合集
## 快速布局
1. 实现div的水平垂直居中
```js
// 最高效的方法
.con{
    width: 300px;
    height: 300px;
    background-color: yellowgreen;
    margin: auto; // *
}
body{
    height: 100%; // *
    display: flex; // *
}
```
## css面试集锦
### 1. padding 和 margin 有什么不同（深信服，字节）
    - 作用对象不同，内边距padding针对的是自身，外边距margin作用于外部对象
### 2. vw和百分比的区别
    - vw只和设备的宽度有关系
    - 百分比有继承关系
### 3. 行内元素和块元素
    - 块元素：占一行
    - 行内元素：内容多大就显示多大
### 4. 如何让谷歌浏览器支持小字体
    - 通过缩放
```css
    .small-font{
        transform: scale(0.8);
        -webkit-transform: scale(0.8);
    }
```

## let 和 var
    - 声明提升 => 先上车后买票
    - 没有局部作用域 => 红杏出墙
    - 声明覆盖 => 套牌车
```js
// console.log(name); // Uncaught ReferenceError: Cannot access 'name' before initialization
        // let name = "李长歌"

        // 1. 声明提升 => 先上车后买票
        console.log(name1); // undefined
        var name1 = "驭灵师"

        // 2. 没有局部作用域 => 红杏出墙
        function fn1(){
            for(var i=0; i<5; i++){
            }
            console.log(i) // 5
        }
        fn1()
        function fn2(){
            for(let i=0; i<5; i++){
            }
            // console.log(i) // i is not defined at fn1
        }
        fn2()

        // 3. 声明覆盖 => 套牌车
        var name2 = "纪云禾"
        var name2 = "长意"
        console.log(name2); // 长意
```

## 深拷贝与浅拷贝
### 1. 基本数据类型 => 严格意义上不能算拷贝，叫赋值
```js
    let a = 5;
    let b = a;
    b = 3;
    console.log(a, b); // 5 3
```
### 2. 数组与对象的赋值都叫做浅拷贝（藕断丝连）
```js
    let arr = [1, 2, 3];
    let newArr = arr;
    newArr.push(4);
    console.log(arr, newArr); // arr 发生变化
```
### 3.解构赋值是深拷贝还是浅拷贝？
- 针对一位数组和对象可以看做是深拷贝，多为数组就是浅拷贝
```js
    let arr1 = [1, 2, 3];
    let newArr1 = [...arr];
    newArr1.push(4);
    console.log(arr1, newArr1); // arr 不变

    let arr2 = [[1,2,3],[4,5,6]];
    let newArr2 = [...arr2];
    newArr2[0].push(888);
    console.log(arr2, newArr2); // arr 发生变化
```
### 深拷贝的用法
- 能解决80%，当有function方法的时候 不管用
```js
    let list = [
        {id: 1, stuName: "小米", class: "五年一班"},
        {id: 2, stuName: "小好", class: "五年二班"},
        {id: 3, stuName: "小得", class: "五年三班"},
    ]

    let newList = JSON.parse(JSON.stringify(list))
    newList.push({id:4})
    console.log(list, newList); // list 不变
```
### 标准的深拷贝 => 针对  引用数据类型（数组，对象）
```JS
    function deepClone(source){
        const targetObj = source.constructor === Array ? [] : {};
        for(let keys in source){
            if(source.hasOwnProperty(keys)){
                // keys => 3种，基本数据类型，引用数据类型
                // 引用数据类型
                if(source[keys] && typeof source[keys] === "object"){
                    // 递归
                    targetObj[keys] = deepClone(source[keys])
                }else{ 
                    // 基本数据类型，直接赋值
                    targetObj[keys] = source[keys]                       
                }
            }
            
        }
        return targetObj;
    }

    let objC = {
        name: "热巴",
        arr: [[1,2,3], 5,6,7],
        list: list,
        obj: {name:"冷巴", actor:{title:"长歌行"}}
    }
    const newObjC = deepClone(objC);
    newObjC.obj.age = 18
    console.log('objC',objC);
    console.log('newObjC',newObjC);
```