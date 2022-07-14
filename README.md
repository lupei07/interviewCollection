<!--
 * @Author: lu
 * @Date: 2022-07-12 10:28:08
 * @LastEditTime: 2022-07-14 17:13:28
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
#### - `hasOwnProperty`检测一个属性是否是对象的自有属性
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

## Promise
[Promise链接](https://github.com/lupei07/Promise)

## 原型与原型链
```js
    // 原型  prototype ==> 原型函数特有的
    // 原型链 _proto_ => [[prototype]]

    let obj = {}
    let arr = []
    // 常规的对象，数组是没有原型的
    // obj.prototype.a = 666 // 报错

    function Person(){

    }
    Person.prototype.name="唱歌"
    Person.prototype.age =18
    Person.prototype.getAge = function(){
        console.log(this.age);
    }

    // 实例
    let person1 = new Person(); // 通过new关键字继承Person的原型属性和方法
    person1.age = 28
    console.log(person1.name);
    person1.getAge()

    // 从当前的实例属性去查找，如果找到了返回，否则顺着原型链一层一层网上找
    // 直到找到null为止，如果null都没有找到，报错
    console.log(person1.demo) // undefined
    // person1.fn() // 不错


    // 找自身的私有属性
    let item;
    for(item in person1){
        if(person1.hasOwnProperty(item)){
            console.log(item);
        }
    }
```

## 防抖与节流
```js
    // 防抖 =>  固定时间内，事件只允许发生一次
    // 场景：搜索，鼠标滚动

    function debounce(fn, wait){
        let timer = null;
        return args =>{
            if(timer) clearTimeout(timer)
            timer = setTimeout(fn, wait)
        }
    }


    // 节流 => 一定时间内只调用一次函数
    // 场景：提交表单 高频监听
    function throttle(fn, time){
        let timer = null;
        return function(){
            if(!timer){
                timer=setTimeout(()=>{
                    fn();
                    timer = null;
                },time)
            }
        }
    }

    // 通过时间戳
```

## 闭包
```js
    // 1. 闭包是什么？ -- 方法里返回一个方法
    function fn(){
        let a1 = 1;
        return function(){
            return a1
        }
    }

    // 2. 闭包存在的意义？
    // 2.1 延长变量的生命周期
    // 2.2 创建私有环境
    function fn1(){
        let num = 0
        function change(val){
            num += val
        }
        return {
            add: function(){
                change(1)
            },
            value: function(){
                return num
            }
        }
    }
```

## ES6相关
### 1. var let const
```js
    // var 
    // 1. 声明提升  2. 变量覆盖  3. 没有块级作用域
    console.log(num); // undefined
    var num = 123

    // const
    // 1. const声明之后必须赋值 否则就报错
    // 2. 定义的值不能修改，否则报错
    // 3. 支持let的其他属性
```
### 2. 解构
```js
    let a = 1;
    let b = 2;
    [a, b] = [b, a] // a b 值互换
```
### 3. 快速去重
```js
    let arr = [12, 23, 53, 23, 12, 43]
    let item = [...new Set(arr)]
```
### 4. Promise
```js
    // 标杆 => 构造函数同步执行
    const promise = new Promise((resolve, reject)=>{
        console.log('1');
        resolve();
        console.log('2');
    })
    // .then()异步执行
    promise.then(()=>{
        console.log('3');
    })
    console.log('4');
    // 1 2 4 3
```

## v-model 双向数据绑定
```js
    <input type="text" id="username">
    显示值：<p id="uName"></p>
    <script>
        let obj = {};
        Object.defineProperty(obj, "name", {
            get: function(){
                console.log('取值');
            },
            set: function(val){
                console.log('设置值');
                document.getElementById("uName").innerText = val
            }
        })
        document.getElementById("username").addEventListener("keyup", function(){
            obj.name = event.target.value;
        })
    </script>
```
## vue中的data为什么是个函数
1. 闭包设计：每一个组件都有自己的私有作用域，确保各组件数据不会相互干扰
2. 如果是纯对象设计：会有干扰

## 虚拟dom详解
### 1. 虚拟dom是什么？
- vue2.x 才有的虚拟dom
- 本质：就是js对象 => 跨平台
### 2. 虚拟dom在vue中做了什么？
- vue的渲染过程（HTML，css，js）
    - 将真实dom转化虚拟dom（js对象）
    - 更新的时候做对比
### 3. 虚拟dom是如何提升vue的渲染效率的？
- 局部更新（节点数据）
- 将直接操作dom的地方拿到两个js对象中去做比较
## diff中patch

## 打包
```js
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
let isProduction = process.env.NODE_ENV;
module.exports = {
  configureWebpack: (config) => {
    // 生产环境相关配置
    if (isProduction == "production") {
      // 代码压缩
      config.plugins.push(
        new UglifyJsPlugin({
          uglifyOptions: {
            // 生产环境自动删除console
            warnings: false,
            compress: {
              drop_debugger: true,
              drop_console: true,
              pure_funcs: ["console.log"],
            },
          },
          sourceMap: false, // 不打印日志
          parallel: true, // 开启并行化，加快打包速度
        })
      );
    }
  },
};
```

## 拯救繁乱的template
- 页面中有很多的v-if的判断 可以考虑优化
### 使用 `render()`函数
- template => render() => 虚拟dom => 转化成真实dom
```js
<script>
    export default {
        props: {
            type: {
                type: String,
                default: 'normal'
            },
            text: {
                type: String,
                default: 'normal'
            }
        },
        render(h){
            // h => 原生JS中createElement()
            return h('button',{
                // v-bind: class
                class: {
                    btn: true,
                    'btn-success': this.type === 'success',
                    'normal': !this.type
                },
                // dom属性
                domProps: {
                    innerText: this.text || '默认按钮'
                },
                // v-on:click
                on: {

                }
            })
        }
    }
</script>
<style>
.btn{}
.btn-success{}
.normal{}
</style>
``` 
## 路由拦截
```js
router.beforeEach((to, from, next) => {
  const loginInfo = useStore();

  let requiredAuth = to.meta.requiredAuth || undefined;
  if (requiredAuth && !loginInfo.isLogin) {
    alert("need required");
    next({ path: "/" });
    return;
  }
  next();
});
```

## 指令的权限控制
```js
export const permission = {
  mounted(el, binding) {
    const { value } = binding;
    const roles = ["bills-capital"];
    if (value && value instanceof Array && value.length > 0) {
      const permissionRoles = value;
      const hasPermission = roles.some((role) => {
        return permissionRoles.includes(role);
      });
      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el);
      }
    } else {
      throw new Error(`need array like v-permission='[""]'`);
    }
  },
};

```

## 面向对象编程
## JS发布订阅模式